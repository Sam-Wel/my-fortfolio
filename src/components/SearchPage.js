import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('gz'); // Default to Ge'ez
  const [languages, setLanguages] = useState([]);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch available languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase.from('languages').select('*');
        if (error) {
          console.error('Error fetching languages:', error);
        } else {
          setLanguages(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchLanguages();
  }, []);

  // Map language codes to language names
  const languageMap = languages.reduce((map, lang) => {
    map[lang.language_code] = lang.language_name;
    return map;
  }, {});

  // Fetch suggestions as the user types
  const fetchSuggestions = async (value) => {
    if (!value.trim() || !selectedLanguage) {
      setSuggestions([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('words')
        .select('word')
        .eq('language_code', selectedLanguage)
        .ilike('word', `${value}%`) // Match words starting with the input
        .limit(5); // Limit suggestions to 5

      if (error) {
        console.error('Error fetching suggestions:', error);
      } else {
        setSuggestions(data.map((item) => item.word));
      }
    } catch (err) {
      console.error('Unexpected error fetching suggestions:', err);
    }
  };

  // Handle search functionality
  const handleSearch = async () => {
    if (!query.trim() || !selectedLanguage) {
      setError('Please enter a search term and select a language.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.rpc('get_translations', {
        search_word: `%${query}%`,
        language: selectedLanguage,
      });

      if (error) {
        setError('Failed to fetch data. Please try again.');
        console.error(error);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4 pt-24">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Dictionary</h1>

      {/* Language Selection Dropdown */}
      <div className="mb-4 w-full max-w-lg">
        <label className="block text-gray-600 mb-2 text-lg">Select Language:</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400"
        >
          {languages.map((language) => (
            <option key={language.language_code} value={language.language_code}>
              {language.language_name}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-lg">
        <div className="flex items-center border rounded-lg shadow-sm w-full relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            placeholder="Enter a word to search..."
            className="w-full p-4 pl-12 text-lg rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          />
          <FaSearch className="absolute left-4 text-blue-500 text-xl" />
        </div>
        {suggestions.length > 0 && (
          <ul className="block left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="mt-4 w-full max-w-lg bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700"
      >
        Search
      </button>

      {/* Loading and Error Messages */}
      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Results Display */}
      <div className="mt-8 w-full max-w-lg">
        {results.length > 0 ? (
          <div className="p-6 border rounded-lg shadow-xl bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Word: <span className="text-blue-600">{results[0].word}</span>
            </h2>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-blue-50 hover:bg-blue-100 transition shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-blue-700">
                      {languageMap[result.target_language] || result.target_language}
                    </p>
                    <p className="text-lg text-gray-900">{result.translated_word}</p>
                  </div>
                  {/* <button
                    onClick={() =>
                      navigate(`/update-word/${result.word_id}`, { state: result })
                    }
                    className="bg-blue-600 text-white px-5 py-2 mt-2 sm:mt-0 rounded-lg shadow hover:bg-blue-700"
                  >
                    Edit
                  </button> */}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !loading && query.trim() && (
            <p className="text-gray-500 mt-4">No results found.</p>
          )
        )}
      </div>
    </div>
  );
}

export default SearchPage;
