import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function UpdateWordPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mainWord, setMainWord] = useState("");
  const [mainLanguage, setMainLanguage] = useState("");
  const [translations, setTranslations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);

  // Fetch available languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase.from("languages").select("*");
        if (error) console.error("Error fetching languages:", error);
        else setLanguages(data || []);
      } catch (err) {
        console.error("Unexpected error fetching languages:", err);
      }
    };

    fetchLanguages();
  }, []);

  // Fetch the word and its translations
  useEffect(() => {
    const fetchWordData = async () => {
      try {
        // Fetch data using the RPC function
        const { data, error } = await supabase.rpc("get_word_with_translations", {
          word_id: id,
        });
  
        if (error) throw error;
  
        if (data && data.length > 0) {
          const mainWordData = data[0];
          setMainWord(mainWordData.main_word);
          setMainLanguage(mainWordData.main_language_code);
  
          const translationData = data
            .filter((item) => item.related_word_id) // Exclude rows without related words
            .map((item) => ({
              word_id: item.related_word_id,
              translated_word: item.related_word,
              target_language: item.related_language_code,
            }));
  
          setTranslations(translationData);
        }
      } catch (err) {
        console.error("Error fetching word or translations:", err);
        setError("Failed to load the word or translations.");
      }
    };
  
    fetchWordData();
  }, [id]);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Update the main word
      const { error: wordError } = await supabase
        .from("words")
        .update({ word: mainWord })
        .eq("word_id", id);

      if (wordError) throw wordError;

      // Update translations
      for (const { word_id, translated_word } of translations) {
        if (!translated_word) continue;

        // Update the translated word in the words table
        const { error: updateError } = await supabase
          .from("words")
          .update({ word: translated_word })
          .eq("word_id", word_id);

        if (updateError) throw updateError;
      }

      navigate("/dictionary");
    } catch (err) {
      console.error("Error updating word or translations:", err);
      setError("An error occurred while updating the word or translations.");
    }
  };

  const handleTranslationChange = (index, field, value) => {
    const updatedTranslations = [...translations];
    updatedTranslations[index][field] = value;
    setTranslations(updatedTranslations);
  };

  const addTranslationField = () => {
    setTranslations((prev) => [
      ...prev,
      { word_id: null, target_language: "", translated_word: "" },
    ]);
  };

  return (
    <div className="flex h-screen w-full min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Update Word and Translations</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* Main Word Input */}
        <div>
          <label className="block text-gray-700 mb-2">
            {languages.find((lang) => lang.language_code === mainLanguage)?.language_name || "Main"}{" "}
            Word:
          </label>
          <input
            type="text"
            value={mainWord}
            onChange={(e) => setMainWord(e.target.value)}
            className="w-full p-3 border rounded shadow focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Translations */}
        {translations.map((translation, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-gray-700">
              Translation for{" "}
              {languages.find((lang) => lang.language_code === translation.target_language)
                ?.language_name || translation.target_language}
              :
            </label>
            <input
              type="text"
              value={translation.translated_word}
              onChange={(e) =>
                handleTranslationChange(index, "translated_word", e.target.value)
              }
              className="w-full p-3 border rounded shadow focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addTranslationField}
          className="w-full bg-gray-300 text-gray-700 p-3 rounded shadow hover:bg-gray-400"
        >
          Add Translation
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateWordPage;
