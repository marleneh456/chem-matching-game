// src/components/Ch11MatchingGame.js
import React, { useState, useRef } from "react";
import { Document, Page, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./styles.css";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MatchingGame = () => {
  const initialItems = [
    {
      id: 1,
      term: "20.1 What is the role of enzymes in the body?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.1 answer.png",
    },
    {
      id: 2,
      term: "20.2 List two ways that enzyme catalysis of a reaction is superior to normal laboratory conditions.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.2 answer.png",
    },
    {
      id: 3,
      term: "20.3 What is the relationship between an enzyme and the energy of activation for a reaction?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.3 answer.png",
    },
    {
      id: 4,
      term: "20.4 Why are so many different enzymes needed?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.4 answer.png",
    },
    {
      id: 5,
      term: "20.9 What is the relationship between urea and urease? Between maltose and maltase?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.9 answer.png",
    },
    {
      id: 6,
      term: "20.10 Match the following enzymes and substrates:",
      definition: null,
      termImage: "./ch20-exercise-images/20.10 table.png",
      definitionImage: "./ch20-exercise-images/20.10 answer.png",
    },
    {
      id: 7,
      term: "20.11 Match the following general enzyme names and reactions catalyzed:",
      definition: null,
      termImage: "./ch20-exercise-images/20.11 table.png",
      definitionImage: "./ch20-exercise-images/20.11 answer.png"
    },
    {
      id: 8,
      term: "20.12 Because one substrate may undergo a number of reactions, it is often convenient to use an enzyme nomenclature system that includes both the substrate name (or general type and the type of reaction catalyzed. Identify the substrate and type of reaction for the following enzyme names: a. succinate dehydrogenase, b. l-amino acid reductase ,c. cytochrome oxidase , and d. glucose-6-phosphate isomerase",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.12 answer.png",
    },
    {
      id: 9,
      term: "20.14 What are the relationships among the terms cofactor, active enzyme, and apoenzyme?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.14 answer.png",
    },
    {
      id: 10,
      term: "20.15 State the relationship between vitamins and enzyme activity",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.15 answer.png",
    },
    {
      id: 11,
      term: "20.16 List some typical inorganic ions that serve as cofactors.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.16 answer.png",
    },
    {
      id: 12,
      term: "20.18 Explain what is meant by the following equation:",
      definition: null,
      termImage: "./ch20-exercise-images/20.18 equation.png",
      definitionImage: "./ch20-exercise-images/20.18 answer.png"
    },
    {
      id: 13,
      term: "20.19 In what way are the substrate and active site of an enzyme related?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.19 answer.png",
    },
    {
      id: 14,
      term: "20.20 How is enzyme specificity explained by the lock-and-key theory?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.20 answer.png",
    },
    {
      id: 15,
      term: "20.21 Compare the lock-and-key theory with the induced-fit theory.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.21 answer.png",
    },
    {
      id: 16,
      term: "20.22 An enzyme can catalyze reactions involving propanoic acid, butanoic acid, and pentanoic acid. Would the lock-and-key theory or the induced-fit theory best explain this enzyme’s mechanism of action? Why?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.22 answer.png",
    },
    {
      id: 17,
      term: "20.27 Use graphs to illustrate enzyme activity as a function of the following: a. substrate concentration , b. enzyme concentration , c. pH , d. temperature.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.27 answer.png",
    },
    {
      id: 18,
      term: "20.28 Write a single sentence to summarize the information of each graph in Exercise 20.27.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.28 answer.png",
    },
    {
      id: 19,
      term: "20.33 Distinguish between irreversible and reversible enzyme inhibition.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.33 answer.png",
    },
    {
      id: 20,
      term: "20.29 What happens to the rate of an enzyme-catalyzed reaction as substrate concentration is raised beyond the saturation point?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.29 answer.png",
    },
    {
      id: 21,
      term: "20.34 Distinguish between competitive and noncompetitive enzyme inhibition.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.34 answer.png",
    },
    {
      id: 22,
      term: "20.39 Describe the importance of zymogens in the body. Give an example of an enzyme that has a zymogen.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.39 answer.png",
    },
    {
      id: 23,
      term: "20.40 The clotting of blood occurs by a series of zymogen activations. Why are the enzymes that catalyze blood clotting produced as zymogens?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.40 answer.png",
    },
    {
      id: 24,
      term: "20.43 Explain how feedback enzyme inhibition works and why it is advantageous for the cell.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.43 answer.png",
    },
    {
      id: 25,
      term: "20.45 Why are enzyme assays of blood serum useful in a clinical diagnosis?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.45 answer.png",
    },
    {
      id: 26,
      term: "20.48 Why is an LDH assay a good initial diagnostic test?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.48 answer.png",
    },
    {
      id: 27,
      term: "20.55 Explain how the pasteurization of milk utilizes one of the factors that influence enzyme activity.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.55 answer.png",
    },
    {
      id: 28,
      term: "20.59 The active ingredient in meat tenderizer is the enzyme papain, a protease. Explain how treating meat with this material before cooking would make it more tender.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.59 answer.png",
    },
    {
      id: 29,
      term: "20.60 Why are enzymes that are used for laboratory or clinical work stored in refrigerators?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.60 answer.png",
    },
    {
      id: 30,
      term: "20.63 In Figure 20.9, it is noted that pickles resist spoilage. Why is that true for this acidic food?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.63 answer.png",
    },
    {
      id: 31,
      term: "20.66 Why might an enzyme be selected over an inorganic catalyst for a certain industrial process?",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-exercise-images/20.66 answer.png",
    },
    {
      id: 32,
      term: "20.72 Most human enzymes function best in the temperature range of:",
      definition: null,
      termImage: "./ch20-exercise-images/20.72 options.png",
      definitionImage: "./ch20-exercise-images/20.72 answer.png",
    },
    {
      id: 33,
      term: "20.73 The site on an enzyme molecule that does the catalytic work is called the: a. binding site. , b. allosteric site. , c. lock. , d. active site.",
      definition: "d. active site.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 34,
      term: "20.74 The process by which an enzyme acts on the substrate can be described by the: a. lock-and-key model. , b. enzyme-and-substrate model. , c. enzyme folding model., d. catalytic model.",
      definition: "a. lock-and-key model.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 35,
      term: "20.75",
      definition: "c. feedback inhibition",
      termImage: "./ch20-exercise-images/20.75 question.png",
      definitionImage: null,
    },
  ];



  const [termItems, setTermItems] = useState(shuffleArray([...initialItems]));
  const [definitionItems, setDefinitionItems] = useState(shuffleArray([...initialItems]));
  const [matches, setMatches] = useState({});
  const [usedTerms, setUsedTerms] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const termListRef = useRef(null);
  const definitionListRef = useRef(null);

  const handleDrop = (e, definitionId) => {
    const termId = e.dataTransfer.getData("termId");

    if (matches[definitionId]) {
      return;
    }

    setMatches((prev) => ({ ...prev, [definitionId]: parseInt(termId) }));
    setUsedTerms((prev) => [...prev, parseInt(termId)]);
  };

  const handleDragStart = (e, termId) => {
    e.dataTransfer.setData("termId", termId);
  };

  const removeMatch = (definitionId) => {
    const removedTerm = matches[definitionId];
    setMatches((prev) => {
      const updatedMatches = { ...prev };
      delete updatedMatches[definitionId];
      return updatedMatches;
    });
    setUsedTerms((prev) => prev.filter((term) => term !== removedTerm));
  };

  const checkAnswers = () => {
    setIsDone(true);
  };

  const resetGame = () => {
    setMatches({});
    setUsedTerms([]);
    setIsDone(false);
    setTermItems(shuffleArray([...initialItems]));
    setDefinitionItems(shuffleArray([...initialItems]));
  };

  const styles = StyleSheet.create({
    page: {
      padding: 10,
      fontSize: 12,
    },
    title: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    card: {
      border: "3px solid #000",
      padding: 5,
      marginBottom: 20,
      marginLeft: 10,
      marginTop: 20,
      width: 550,
      height: 700,
    },
    termText: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    definitionText: {
      marginBottom: 20,
    },
    image: {
      objectfit: "scale-down",
      marginBottom: 20,
    },
  });
  
  
  const PDFContent = () => (
    <Document>
      {termItems.map((item, index) => (
        <Page key={index} style={styles.page}>
          {/* Render the title only on the first page */}
          {index === 0 && <Text style={styles.title}>Chapter 20 Execise FlashCards</Text>}
          <div style={styles.section}>
            <div style={styles.card}>
              <Text style={styles.termText}>Term: {item.term}</Text>
              {item.termImage && <Image style={styles.image} src={item.termImage} />}
              <Text style={styles.definitionText}>
                Definition: {item.definition || "No definition provided"}
              </Text>
              {item.definitionImage && <Image style={styles.image} src={item.definitionImage} />}
            </div>
          </div>
        </Page>
      ))}
    </Document>
  );
  
  const downloadPDF = async () => {
    const blob = await pdf(<PDFContent />).toBlob();
    saveAs(blob, "FlashCards.pdf");
  };

  return (
    <div className="game-container">
      <h1>Chapter 20 Execise Drag-and-Drop Matching Game</h1>
      <div className="game-grid">
        <div className="term-list-container">
          <div className="term-list" ref={termListRef}>
            {termItems
              .filter((item) => !usedTerms.includes(item.id))
              .map((item) => (
                <div
                  key={`term-${item.id}`}
                  className="card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                >
                  <p>{item.term}</p>
                  {item.termImage && <img src={item.termImage} alt={item.term} />}
                </div>
              ))}
          </div>
        </div>

        <div className="definition-list-container">
          <div className="definition-list" ref={definitionListRef}>
            {definitionItems.map((item) => (
              <div
                key={`definition-${item.id}`}
                className={`card dropzone ${
                  isDone && matches[item.id] === item.id
                    ? "correct"
                    : isDone && matches[item.id] !== item.id
                    ? "incorrect"
                    : ""
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, item.id)}
              >
                {item.definitionImage && (
                  <img src={item.definitionImage} alt={item.definition} />
                )}
                <p>{item.definition}</p>
                {isDone && (
                  <div className="answer-section">
                    <p>
                      <strong>Correct Answer:</strong> {item.term}
                    </p>
                    <p>
                      <strong>Your Answer:</strong>{" "}
                      {matches[item.id]
                        ? termItems.find((term) => term.id === matches[item.id])
                            ?.term || "No Answer"
                        : "No Answer"}
                    </p>
                  </div>
                )}
                {matches[item.id] && !isDone && (
                  <div className="drop-result">
                    <span>
                      {termItems.find((i) => i.id === matches[item.id])?.term ||
                        ""}
                    </span>
                    <button
                      className="close-button"
                      onClick={() => removeMatch(item.id)}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pdf-link">
        <a href="./Chemistry textbook.pdf" target="_blank" rel="noopener noreferrer">
          View General, Organic, and Biochemistry PDF
        </a>
      </div>

      <div className="controls">
        <button className="done-button" onClick={checkAnswers}>
          Done
        </button>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
        <button className="download-button" onClick={downloadPDF}>
          Download Flash Cards (PDF)
        </button>
      </div>

      {isDone && (
        <div className="score-display">
          <h2>
            Score:{" "}
            {
              termItems.filter((item) => matches[item.id] === item.id).length
            }{" "}
            / {termItems.length}
          </h2>
        </div>
      )}

    </div>
  );
};

export default MatchingGame;
