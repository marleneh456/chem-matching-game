// src/components/Ch15MatchingGame.js
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
      term: "carboxylic acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxylic acid.png",
    },
    {
      id: 2,
      term: "carboxyl group",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxyl group.png",
    },
    {
      id: 3,
      term: "Examples of Carboxylic Acids",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Examples of Carboxylic Acids.png",
    },
    {
      id: 4,
      term: "fatty acid",
      definition: "A long-chain carboxylic acid found in fats.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 5,
      term: "Learning Check 15.1 Give the IUPAC name to the following:",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.1.png",
      definitionImage: "./ch15-images/Learning Check 15.1 answer.png",
    },
    {
      id: 6,
      term: "Physical Properties of Some Carboxylic Acids",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Physical Properties of Some Carboxylic Acids.png",
    },
    {
      id: 7,
      term: "boiling Points of Compounds with Similar Molecular Weight",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/boiling Points of Compounds with Similar Molecular Weight.png",
    },
    {
      id: 8,
      term: "The boiling points of carboxylic acids",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/The boiling points of carboxylic acids.png",
    },
    {
      id: 9,
      term: "dimer",
      definition: "Two identical molecules bonded together.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 10,
      term: "carboxylate ion",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxylate ion.png",
    },
    {
      id: 11,
      term: "The Acidity of Carboxylic Acids",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/The Acidity of Carboxylic Acids.png",
    },
    {
      id: 12,
      term: "Learning Check 15.2 Pyruvic acid, an important intermediate in the energy-conversion reactions in living organisms, is usually called pyruvate because it is commonly in the carboxylate form. Draw the structure of pyruvate.",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.2.png",
      definitionImage: "./ch15-images/Learning Check 15.2 answer.png",
    },
    {
      id: 13,
      term: "carboxylic acids react readily with strong bases",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxylic acids react readily with strong bases.png",
    },
    {
      id: 14,
      term: "Learning Check 15.3 Write the structural formulas for the products of the following reaction:",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.3.png",
      definitionImage: "./ch15-images/Learning Check 15.3 answer.png",
    },
    {
      id: 15,
      term: "Learning Check 15.4 Give the IUPAC name for the following salts:",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.4.png",
      definitionImage: "./ch15-images/Learning Check 15.4 answer.png",
    },
    {
      id: 16,
      term: "nonpolar hydrocarbon portion can be solubilized by converting them into salts",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/nonpolar hydrocarbon portion.png",
    },
    {
      id: 17,
      term: "sodium benzoate",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/sodium benzoate.png",
    },
    {
      id: 18,
      term: "citric acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/citric acid.png",
    },
    {
      id: 19,
      term: "carboxylic ester",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxylic ester.png",
    },
    {
      id: 20,
      term: "esterification",
      definition: "The process of forming an ester.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 21,
      term: "ester linkage",
      definition: "The carbonyl carbon–oxygen single bond of the ester group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 22,
      term: "A molecule of water splits out and a carboxylic ester is formed",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/A molecule of water splits out.png",
    },
    {
      id: 23,
      term: "ester group",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/ester group.png",
    },
    {
      id: 24,
      term: "many esters are very fragrant and represent some of nature’s most pleasant odors",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/nature’s most pleasant odors.png",
    },
    {
      id: 25,
      term: "Learning Check 15.5 Give the structure of the products formed in the following reactions:",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.5.png",
      definitionImage: "./ch15-images/Learning Check 15.5 answer.png",
    },
    {
      id: 26,
      term: "condensation polymerization",
      definition: "The process by which monomers combine together with the simultaneous elimination of a small molecule.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 27,
      term: "terephthalic acid to polyethylene terephthalate (PET)",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/terephthalic acid to polyethylene terephthalate (PET).png",
    },
    {
      id: 28,
      term: "carboxylic acid chloride",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxylic acid chloride.png",
    },
    {
      id: 29,
      term: "carboxylic acid anhydride",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxylic acid anhydride.png",
    },
    {
      id: 30,
      term: "carboxylic acid chloride reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxylic acid chloride reaction.png",
    },
    {
      id: 31,
      term: "carboxylic acid anhydride reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/carboxylic acid anhydride reaction.png",
    },
    {
      id: 32,
      term: "acetyl chloride reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/acetyl chloride reaction.png",
    },
    {
      id: 33,
      term: "acetic anhydride reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/acetic anhydride reaction.png",
    },
    {
      id: 34,
      term: "Learning Check 15.6 Write equations to represent ester formation when the following pairs of compounds are reacted:",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.6.png",
      definitionImage: "./ch15-images/Learning Check 15.6 answer.png",
    },
    {
      id: 35,
      term: "The Nomenclature of Esters",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/The Nomenclature of Esters.png",
    },
    {
      id: 36,
      term: "Learning Check 15.7 Give both the common and the IUPAC names for each of the following esters:",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.7.png",
      definitionImage: "./ch15-images/Learning Check 15.7 answer.png",
    },
    {
      id: 37,
      term: "Ester Hydrolysis",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Ester Hydrolysis.png",
    },
    {
      id: 38,
      term: "Learning Check 15.8 Give the structure of the products formed in the following hydrolysis reaction:",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.8.png",
      definitionImage: "./ch15-images/Learning Check 15.8 answer.png",
    },
    {
      id: 39,
      term: "saponification",
      definition: "The basic cleavage of an ester linkage.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 40,
      term: "saponification examples",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/saponification examples.png",
    },
    {
      id: 41,
      term: "A Reaction Map for Carboxylic Acids",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/A Reaction Map for Carboxylic Acids.png",
    },
    {
      id: 42,
      term: "Learning Check 15.9 Give structural formulas for the products of the following saponification reactions:",
      definition: null,
      termImage: "./ch15-images/Learning Check 15.9.png",
      definitionImage: "./ch15-images/Learning Check 15.9 answer.png",
    },
    {
      id: 43,
      term: "ester",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/ester.png",
    },
    {
      id: 44,
      term: "Esters of inorganic Acids examples",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Esters of inorganic Acids examples.png",
    },
    {
      id: 45,
      term: "glucose-6-phosphate",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/glucose-6-phosphate.png",
    },
    {
      id: 46,
      term: "phosphoric anhydride",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/phosphoric anhydride.png",
    },
    {
      id: 47,
      term: "a diphosphate ester",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/a diphosphate ester.png",
    },
    {
      id: 48,
      term: "a triphosphate ester",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/a triphosphate ester.png",
    },
    {
      id: 49,
      term: "ADP",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/ADP.png",
    },
    {
      id: 50,
      term: "ATP",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/ATP.png",
    },
    {
      id: 51,
      term: "Dissociation of a carboxylic acid to give a carboxylate ion",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Dissociation of a carboxylic acid to give a carboxylate ion.png",
    },
    {
      id: 52,
      term: "Reaction of a carboxylic acid with base to produce a carboxylate salt plus water",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Reaction of a carboxylic acid with base to produce a carboxylate salt plus water.png",
    },
    {
      id: 53,
      term: "Reaction of a carboxylic acid with an alcohol to produce an ester plus water",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Reaction of a carboxylic acid with an alcohol to produce an ester plus water.png",
    },
    {
      id: 54,
      term: "Reaction of a carboxylic acid chloride with an alcohol to produce an ester plus hydrogen chloride",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Reaction of a carboxylic acid chloride with an alcohol to produce an ester plus hydrogen chloride.png",
    },
    {
      id: 55,
      term: "Ester hydrolysis to produce a carboxylic acid and alcohol",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Ester hydrolysis to produce a carboxylic acid and alcohol.png",
    },
    {
      id: 56,
      term: "Ester saponification to give a carboxylate salt and alcohol",
      definition: null,
      termImage: null,
      definitionImage: "./ch15-images/Ester saponification to give a carboxylate salt and alcohol.png",
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
          {index === 0 && <Text style={styles.title}>Chapter 15 FlashCards</Text>}
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
      <h1>Chapter 15 Drag-and-Drop Matching Game</h1>
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
