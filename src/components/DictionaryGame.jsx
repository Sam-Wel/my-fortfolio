import React, { useState } from "react";
import { supabase } from "../util/supabaseClient";

const DictionaryGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [languageCode, setLanguageCode] = useState("am"); // Default to Tigrinya
  const [suffix, setSuffix] = useState("ሐ"); // Default suffix
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
  
      if (wordsError) {
        console.error("Error fetching Ge'ez words:", wordsError);
        alert("Error fetching Ge'ez words. Please try again.");
        return;
      }
  
      if (!wordsData || wordsData.length === 0) {
        console.warn(`No words found with suffix '${suffix}'.`);
        alert(`No words found with suffix '${suffix}'.`);
        return;
      }
  
      console.log("Fetched Ge'ez Words:", wordsData);
  
      // Shuffle the Ge'ez words
      const shuffledWords = wordsData.sort(() => Math.random() - 0.5);
      setGeezWords(shuffledWords);
  
      // Fetch translations for all Ge'ez words
      const geezWordIds = shuffledWords.map((word) => word.word_id);
      console.log("Ge'ez Word IDs:", geezWordIds);
  
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
  
      if (translationsError) {
        console.error("Error fetching translations:", translationsError);
        alert("Error fetching translations. Please try again.");
        return;
      }
  
      if (!translationsData || translationsData.length === 0) {
        console.warn("No translations found for the fetched words.");
        alert("No translations found for the selected language.");
        return;
      }
  
      console.log("Fetched Translations:", translationsData);
      setTranslations(translationsData);
  
      // Start the first challenge
      setCurrentChallengeIndex(0);
      setScore(0);
      setGameStarted(true);
      setUserAnswer(null);
      loadChallenge(shuffledWords[0], translationsData);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };
  
  
  
  
  const loadChallenge = (geezWord, translations) => {
    try {
      // Find valid translations for the current Ge'ez word
      const currentTranslations = translations.filter(
        (t) => t.word_id === geezWord.word_id && t.words?.word
      );
  
      if (currentTranslations.length === 0) {
        console.warn(`No valid translations found for Ge'ez word: ${geezWord.word}`);
        const nextIndex = currentChallengeIndex + 1;
        if (nextIndex < geezWords.length) {
          setCurrentChallengeIndex(nextIndex);
          loadChallenge(geezWords[nextIndex], translations);
        } else {
          alert("Game Over! No more challenges.");
          setGameStarted(false);
        }
        return;
      }
  
      // Randomly select one correct translation
      const randomIndex = Math.floor(Math.random() * currentTranslations.length);
      const correctTranslation = currentTranslations[randomIndex]?.words;
  
      if (!correctTranslation || !correctTranslation.word) {
        console.warn("Correct translation is missing 'word' property.");
        const nextIndex = currentChallengeIndex + 1;
        if (nextIndex < geezWords.length) {
          setCurrentChallengeIndex(nextIndex);
          loadChallenge(geezWords[nextIndex], translations);
        } else {
          alert("Game Over! No more challenges.");
          setGameStarted(false);
        }
        return;
      }
  
      const correctOption = correctTranslation.word;
  
      // Shuffle translations to randomize distractor selection
      const shuffledTranslations = [...translations].sort(() => Math.random() - 0.5);
  
      // Create unique distractors that do not repeat
      const distractors = [...new Set(
        shuffledTranslations
          .filter((t) => t.word_id !== geezWord.word_id && t.words?.word && t.words.word !== correctOption)
          .map((t) => t.words.word)
      )];
  
      // Ensure at least 5 distractors are available
      while (distractors.length < 5) {
        const randomExtra = shuffledTranslations[Math.floor(Math.random() * shuffledTranslations.length)];
        if (randomExtra?.words?.word && !distractors.includes(randomExtra.words.word) && randomExtra.words.word !== correctOption) {
          distractors.push(randomExtra.words.word);
        }
      }
  
      // Combine the correct option with distractors and shuffle
      const options = [correctOption, ...distractors.slice(0, 5)].sort(() => Math.random() - 0.5);
  
      setCurrentChallenge({
        geez: geezWord.word,
        options,
        correctOption,
      });
    } catch (error) {
      console.error("Error loading challenge:", error);
    }
  };
  
  
  
  // Helper function to find and load the next challenge
  const findNextChallenge = (translations) => {
    const nextIndex = currentChallengeIndex + 1;
    if (nextIndex < geezWords.length) {
      setCurrentChallengeIndex(nextIndex);
      loadChallenge(geezWords[nextIndex], translations);
    } else {
      alert("Game Over! No more challenges.");
      setGameStarted(false);
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
    paddingTop: "3rem", // For navbar spacing
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
    fontFamily: "'Roboto', sans-serif",
    color: "#333",
    padding: "2rem",
  };

  const cardStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "500px",
  };

  const welcomeTitleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#495057",
  };

  const labelStyle = {
    fontSize: "1rem",
    marginRight: "1rem",
    color: "#495057",
  };

  const selectStyle = {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    marginBottom: "1rem",
  };

  const startButtonStyle = {
    padding: "0.8rem 1.5rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const startButtonHoverStyle = {
    ...startButtonStyle,
    backgroundColor: "#0056b3",
  };

  const optionButtonStyle = (option) => ({
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    border: "1px solid #dee2e6",
    borderRadius: "5px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: userAnswer
      ? option === currentChallenge.correctOption
        ? "#d4edda"
        : option === userAnswer
        ? "#f8d7da"
        : "#fff"
      : "#fff",
    color: "#495057",
    flex: "1 1 calc(30% - 1rem)",
    margin: "0.5rem",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  });

  const geezWordStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#212529",
    marginBottom: "1.5rem",
  };

  const scoreStyle = {
    fontSize: ".8rem",
    fontWeight: "bold",
    marginTop: "1rem",
    color: "#495057",
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  };

  return (
    <div style={containerStyle}>
      {!gameStarted ? (
        <div style={cardStyle}>
          <h1 style={welcomeTitleStyle}>Dictionary Game</h1>
          <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#6c757d" }}>
            Test your knowledge of Ge'ez words and their translations.
          </p>
          <label htmlFor="language-select" style={labelStyle}>
            Select Language:
          </label>
          <select
            id="language-select"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value)}
            style={selectStyle}
          >
            <option value="ti">Tigrinya</option>
            <option value="am">Amharic</option>
          </select>
          <br />
          <label htmlFor="suffix-select" style={labelStyle}>
            Select Suffix:
          </label>
          <select
            id="suffix-select"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            style={selectStyle}
          >
            <option value="ሐ">ሐ</option>
            <option value="ሀ">ሀ</option>
            <option value="ኀ">ኀ</option>
            <option value="ለ">ለ</option>
            <option value="መ">መ</option>
            <option value="ሰ">ሰ</option>
            <option value="ሠ">ሠ</option>
            <option value="ረ">ረ</option>
            <option value="ቀ">ቀ</option>
            <option value="በ">በ</option>
            <option value="በ">ተ</option>
            <option value="ነ">ነ</option>

          </select>
          <br />
          <button
            style={startButtonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div style={cardStyle}>
          {currentChallenge ? (
            <>
              <h2 style={geezWordStyle}>{currentChallenge.geez}</h2>
              <div style={gridStyle}>
                {currentChallenge.options.map((option, index) => (
                  <button
                    key={index}
                    style={optionButtonStyle(option)}
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
