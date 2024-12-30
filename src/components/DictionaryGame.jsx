import React, { useState } from "react";
import { supabase } from "../util/supabaseClient";

const DictionaryGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [languageCode, setLanguageCode] = useState("ti"); // Default to Tigrinya
  const [suffix, setSuffix] = useState("ነ"); // Default suffix
  const [geezWords, setGeezWords] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const startGame = async () => {
    try {
      // Fetch Ge'ez words with the given suffix
      const { data: wordsData, error: wordsError } = await supabase
        .from("words")
        .select("word_id, word")
        .eq("language_code", "gz")
        .ilike("word", `%${suffix}`);
  
      if (wordsError || wordsData.length === 0) {
        console.error("Error fetching Ge'ez words:", wordsError);
        alert("No words found with the selected suffix.");
        return;
      }
  
      setGeezWords(wordsData);
  
      // Fetch translations for all Ge'ez words explicitly specifying the join
      const geezWordIds = wordsData.map((word) => word.word_id);
      const { data: translationsData, error: translationsError } = await supabase
        .from("translationmappings")
        .select(
          `
          word_id, 
          related_word_id, 
          words!translationmappings_related_word_id_fkey(word, language_code)
          `
        )
        .in("word_id", geezWordIds)
        .eq("words.language_code", languageCode);
  
      if (translationsError || translationsData.length === 0) {
        console.error("Error fetching translations:", translationsError);
        alert("No translations found for the selected language.");
        return;
      }
  
      setTranslations(translationsData);
  
      // Start the first challenge
      setCurrentChallengeIndex(0);
      setScore(0);
      setGameStarted(true);
      setUserAnswer(null);
      loadChallenge(wordsData[0], translationsData);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };
  
  const loadChallenge = (geezWord, translations) => {
    try {
      // Find the translations for the current Ge'ez word
      const currentTranslations = translations.filter(
        (t) => t.word_id === geezWord.word_id
      );
  
      if (currentTranslations.length === 0) {
        console.error(`No translations found for Ge'ez word: ${geezWord.word}`);
        return;
      }
  
      // Select a random correct option
      const correctTranslation = currentTranslations[0].words;
  
      if (!correctTranslation || !correctTranslation.word) {
        console.error("Correct translation is missing 'word' property.");
        return;
      }
  
      const correctOption = correctTranslation.word;
  
      // Create distractors from other translations
      const distractors = translations
        .filter((t) => t.word_id !== geezWord.word_id && t.words?.word)
        .map((t) => t.words.word)
        .slice(0, 5);
  
      // Combine the correct option with distractors and shuffle
      const options = [correctOption, ...distractors].sort(() => Math.random() - 0.5);
  
      // Set the current challenge
      setCurrentChallenge({
        geez: geezWord.word,
        options,
        correctOption,
      });
    } catch (error) {
      console.error("Error loading challenge:", error);
    }
  };
  

  const handleAnswer = (option) => {
    const isCorrect = option === currentChallenge.correctOption;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setUserAnswer(option);
    setTimeout(() => {
      setUserAnswer(null);
      const nextIndex = currentChallengeIndex + 1;
      if (nextIndex < geezWords.length) {
        setCurrentChallengeIndex(nextIndex);
        loadChallenge(geezWords[nextIndex], translations);
      } else {
        alert(`Game Over! Your score: ${score + (isCorrect ? 1 : 0)}`);
        setGameStarted(false);
        setGeezWords([]);
        setTranslations([]);
      }
    }, 1000);
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to bottom, #f9f9f9, #eaeaea)",
  };

  const buttonStyle = {
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const scoreStyle = {
    fontSize: "1.5rem",
    marginTop: "2rem",
    color: "#444",
  };

  return (
    <div style={containerStyle}>
      {!gameStarted ? (
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#3a3a3a",
              marginBottom: "1.5rem",
            }}
          >
            Dictionary Game
          </h1>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="language-select"
              style={{ fontSize: "1.2rem", marginRight: "1rem" }}
            >
              Choose Language for Options:
            </label>
            <select
              id="language-select"
              value={languageCode}
              onChange={(e) => setLanguageCode(e.target.value)}
              style={{ padding: "0.5rem", fontSize: "1rem" }}
            >
              <option value="ti">Tigrinya</option>
              <option value="am">Amharic</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="suffix-select"
              style={{ fontSize: "1.2rem", marginRight: "1rem" }}
            >
              Choose Suffix for Ge'ez Words:
            </label>
            <select
              id="suffix-select"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              style={{ padding: "0.5rem", fontSize: "1rem" }}
            >
              <option value="ሐ">ሐ</option>
              <option value="ለ">ለ</option>
              <option value="መ">መ</option>
              <option value="ነ">ነ</option>
              <option value="ረ">ረ</option>
            </select>
          </div>

          <button
            style={{ ...buttonStyle, background: "#007bff", color: "white" }}
            onClick={startGame}
          >
            Play
          </button>
        </div>
      ) : (
        <div>
          {currentChallenge ? (
            <>
              <h2
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#555",
                }}
              >
                Ge'ez Word: {currentChallenge.geez}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                {currentChallenge.options.map((option, index) => (
                  <button
                    key={index}
                    style={{
                      ...buttonStyle,
                      background: userAnswer
                        ? option === currentChallenge.correctOption
                          ? "#28a745"
                          : option === userAnswer
                          ? "#dc3545"
                          : "#f9f9f9"
                        : "#f9f9f9",
                      color: userAnswer
                        ? option === currentChallenge.correctOption ||
                          option === userAnswer
                          ? "white"
                          : "#333"
                        : "#333",
                      border: "2px solid #ccc",
                    }}
                    onClick={() => handleAnswer(option)}
                    disabled={!!userAnswer}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p style={scoreStyle}>Score: {score}</p>
              <p style={scoreStyle}>
                Remaining Challenges: {geezWords.length - currentChallengeIndex}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DictionaryGame;
