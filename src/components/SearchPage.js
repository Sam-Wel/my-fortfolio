import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        console.log('Query result:', data); // Debug the structure
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Search Word Translations</h1>

      {/* Language Selection Dropdown */}
      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 mb-2">Select Language:</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-3 border rounded shadow focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">-- Select a Language --</option>
          {languages.map((language) => (
            <option key={language.language_code} value={language.language_code}>
              {language.language_name}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a word to search..."
          className="w-full p-4 pl-10 text-lg border rounded shadow focus:outline-none focus:ring focus:border-blue-300"
        />
        <FaSearch className="absolute left-3 top-4 text-gray-400" />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="mt-4 w-full max-w-md bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600"
      >
        Search
      </button>

      {/* Loading and Error Messages */}
      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Results Display */}
      <div className="mt-8 w-full max-w-md">
        {results.length > 0 ? (
          <div className="p-4 border rounded mb-4">
            <strong>Word:</strong> {results[0].word}
            <ul className="mt-2">
              {results.map((result, index) => (
                <li key={index}>
                  <strong>{languageMap[result.target_language] || result.target_language}:</strong>{' '}
                  {result.translated_word}
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
