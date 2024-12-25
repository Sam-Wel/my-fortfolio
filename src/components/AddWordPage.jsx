import React, { useState } from "react";
import { supabase } from "../supabaseClient";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { geez, tigrinya, amharic, english } = wordData;

    if (!geez || !tigrinya || !amharic || !english) {
      setError("All fields are required.");
      return;
    }

    try {
      // Insert Ge'ez word
      const { data: geezWord, error: geezError } = await supabase
        .from("words")
        .insert([{ word: geez, language_code: "gz" }])
        .select();

      if (geezError) throw geezError;

      const geezWordId = geezWord[0]?.word_id;

      // Insert translations for Ge'ez word
      const translations = [
        { word_id: geezWordId, translated_word: tigrinya, target_language: "ti" },
        { word_id: geezWordId, translated_word: amharic, target_language: "am" },
        { word_id: geezWordId, translated_word: english, target_language: "en" },
      ];

      const { error: translationsError } = await supabase
        .from("translations")
        .insert(translations);

      if (translationsError) throw translationsError;

      setSuccess("Word and translations added successfully!");
      setWordData({ geez: "", tigrinya: "", amharic: "", english: "" });
    } catch (err) {
      console.error("Error adding word:", err);
      setError("Failed to add the word. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Add New Word</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          {["geez", "tigrinya", "amharic", "english"].map((lang, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={lang}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)} Word:
              </label>
              <input
                type="text"
                id={lang}
                name={lang}
                value={wordData[lang]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300"
                placeholder={`Enter word in ${lang}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            Add Word
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWordPage;
