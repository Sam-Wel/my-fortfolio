import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function UpdateWordPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [word, setWord] = useState(state?.word || "");
  const [translations, setTranslations] = useState([]);
  const [languages, setLanguages] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  // Safely handle language mapping
  const languageMap = Array.isArray(languages)
    ? languages.reduce((map, lang) => {
        map[lang.language_code] = lang.language_name;
        return map;
      }, {})
    : {};

  // Fetch available languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase.from("languages").select("*");
        if (error) {
          console.error("Error fetching languages:", error);
        } else {
          console.log("Fetched languages:", data); // Debugging log
          setLanguages(data || []); // Ensure languages is an array
        }
      } catch (err) {
        console.error("Unexpected error fetching languages:", err);
      }
    };

    fetchLanguages();
  }, []);

  // Fetch translations for the given word
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const { data, error } = await supabase
          .from("translations")
          .select("translated_word, target_language")
          .eq("word_id", id);

        if (error) {
          console.error("Error fetching translations:", error);
        } else {
          console.log("Fetched translations:", data); // Debugging log
          setTranslations(data || []); // Ensure translations is an array
        }
      } catch (err) {
        console.error("Unexpected error fetching translations:", err);
      }
    };

    fetchTranslations();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the word in the `words` table
      const { error: wordError } = await supabase
        .from("words")
        .update({ word })
        .eq("word_id", id);

      if (wordError) throw wordError;

      // Update translations in the `translations` table
      for (const translation of translations) {
        const { error: translationError } = await supabase
          .from("translations")
          .update({
            translated_word: translation.translated_word,
          })
          .eq("word_id", id)
          .eq("target_language", translation.target_language);

        if (translationError) throw translationError;
      }

      navigate("/dictionary");
    } catch (err) {
      console.error("Error updating word or translations:", err);
      setError("An error occurred while updating the word.");
    }
  };

  // Handle input changes for translations
  const handleTranslationChange = (index, field, value) => {
    const updatedTranslations = [...translations];
    updatedTranslations[index][field] = value;
    setTranslations(updatedTranslations);
  };

  return (
    <div className="flex h-screen w-full min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Update Word and Translations</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Word Input */}
        <div>
          <label className="block text-gray-700 mb-2">Word:</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full p-3 border rounded shadow focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Translations */}
        {translations.map((translation, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-gray-700">
              Translation ({languageMap[translation.target_language] || translation.target_language}):
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

        {/* Submit Button */}
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
