import React, { useState } from "react";
import { supabase } from "../util/supabaseClient";

const AddWordPage = () => {
  const [wordData, setWordData] = useState({
    geez: "",
    tigrinya: "",
    amharic: "",
    english: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWordData((prev) => ({ ...prev, [name]: value }));
  };

  const getOrInsertWord = async (word, language_code) => {
    try {
      const { data: existingWord, error: fetchError } = await supabase
        .from("words")
        .select("word_id")
        .eq("word", word)
        .eq("language_code", language_code)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existingWord) {
        return existingWord.word_id;
      }

      const { data: newWord, error: insertError } = await supabase
        .from("words")
        .insert([{ word, language_code }])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      return newWord.word_id;
    } catch (err) {
      throw new Error(`Error handling word '${word}' (${language_code}): ${err.message}`);
    }
  };

  const insertMappings = async (wordId, relatedWordIds) => {
    try {
      const mappings = relatedWordIds.map((relatedWordId) => ({
        word_id: wordId,
        related_word_id: relatedWordId,
      }));
  
      if (mappings.length > 0) {
        const { error: mappingError } = await supabase
          .from("translationmappings")
          .upsert(mappings, { onConflict: ["word_id", "related_word_id"] });
  
        if (mappingError) {
          throw new Error(`Error inserting/updating mappings: ${mappingError.message}`);
        }
      }
    } catch (err) {
      throw new Error(`Error creating mappings: ${err.message}`);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { geez, tigrinya, amharic, english } = wordData;

    if (!geez) {
      setError("The Ge'ez word is required.");
      return;
    }

    try {
      const wordEntries = [];

      const addWordIfProvided = async (word, languageCode) => {
        if (word) {
          const wordId = await getOrInsertWord(word, languageCode);
          wordEntries.push({ id: wordId, word, languageCode });
        }
      };

      await addWordIfProvided(geez, "gz");
      await addWordIfProvided(tigrinya, "ti");
      await addWordIfProvided(amharic, "am");
      await addWordIfProvided(english, "en");

      for (let i = 0; i < wordEntries.length; i++) {
        const wordId = wordEntries[i].id;
        const relatedWordIds = wordEntries
          .filter((entry, index) => index !== i)
          .map((entry) => entry.id);

        await insertMappings(wordId, relatedWordIds);
      }

      setSuccess("Word(s) and mappings added successfully!");
      setWordData({ geez: "", tigrinya: "", amharic: "", english: "" });
    } catch (err) {
      console.error("Error adding word:", err);
      setError(`Failed to add the word(s): ${err.message}`);
    }
  };

  return (
    <div className="flex h-screen w-full min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add New Word
        </h2>

        {error && (
          <div className="text-red-500 bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-500 bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {["geez", "tigrinya", "amharic", "english"].map((lang, index) => (
            <div key={index} className="mb-6">
              <label
                htmlFor={lang}
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)} Word:
              </label>
              <input
                type="text"
                id={lang}
                name={lang}
                value={wordData[lang]}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400 text-gray-700"
                placeholder={`Enter word in ${lang}`}
                required={lang === "geez"} // Ge'ez is required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none transition"
          >
            Add Word
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWordPage;
