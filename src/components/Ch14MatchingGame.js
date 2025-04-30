// src/components/Ch14MatchingGame.js
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./styles.css";

const defaultItems = [
  {
    id: 1,
    term: "carbonyl group",
    definition: "a carbon is double bonded to an oxygen atom and single bonded to two other atoms",
    termImage: null,
    definitionImage: "./ch14-images/carbonyl group.png",
  },
  {
    id: 2,
    term: "glucose",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/glucose.png",
  },
  {
    id: 3,
    term: "fructose",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/fructose.png",
  },
  {
    id: 4,
    term: "aldehyde",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/aldehyde.png",
  },
  {
    id: 5,
    term: "ketone",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/ketone.png",
  },
  {
    id: 6,
    term: "Ball-and-stick models of formaldehyde and acetone.",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/formaldehyde and acetone.png",
  },
  {
    id: 7,
    term: "Some Common Aldehydes and Ketones",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Some Common Aldehydes and Ketones.png",
  },
  {
    id: 8,
    term: "Learning Check 14.1 Give IUPAC names to the following aldehydes:",
    definition: null,
    termImage: "./ch14-images/Learning Check 14.1.png",
    definitionImage: "./ch14-images/Learning Check 14.1 answer.png",
  },
  {
    id: 9,
    term: "Learning Check 14.2 Give IUPAC names to the following ketones:",
    definition: null,
    termImage: "./ch14-images/Learning Check 14.2.png",
    definitionImage: "./ch14-images/Learning Check 14.2 answer.png",
  },
  {
    id: 10,
    term: "A Comparison of Physical Properties",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/A Comparison of Physical Properties.png",
  },
  {
    id: 11,
    term: "The boiling points of aldehydes and ketones",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/The boiling points of aldehydes and ketones.png",
  },
  {
    id: 12,
    term: "Oxidation",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Oxidation.png",
  },
  {
    id: 13,
    term: "benzaldehyde oxidation",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/benzaldehyde oxidation.png",
  },
  {
    id: 14,
    term: "Attempted oxidation of acetone and oxidation of benzaldehyde. As the reaction proceeds, chromium is reduced, forming a grayish green precipitate.",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/oxidation of acetone and oxidation of benzaldehyde.png",
  },
  {
    id: 15,
    term: "Learning Check 14.3 Draw the structural formula for each product. Write “no reaction” if none occurs",
    definition: null,
    termImage: "./ch14-images/Learning Check 14.3.png",
    definitionImage: "./ch14-images/Learning Check 14.3 answer.png",
  },
  {
    id: 16,
    term: "Tollens’ reagent",
    definition: "A mild oxidizing solution containing silver ions used to test for aldehydes.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 17,
    term: "Tollens’ reagent + aldehyde reaction",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Tollens’ reagent + aldehyde reaction.png",
  },
  {
    id: 18,
    term: "Benedict’s reagent ",
    definition: "A mild oxidizing solution containing Cu2+ ions used to test for the presence of aldehydes.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 19,
    term: "Benedict’s reagent + aldehyde reaction",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Benedict’s reagent + aldehyde reaction.png",
  },
  {
    id: 20,
    term: "an aldehyde with an adjacent carbonyl group",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/an aldehyde with an adjacent carbonyl group.png",
  },
  {
    id: 21,
    term: "an aldehyde with an adjacent alcohol group",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/an aldehyde with an adjacent alcohol group.png",
  },
  {
    id: 22,
    term: "a ketone with an adjacent alcohol group",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/a ketone with an adjacent alcohol group.png",
  },
  {
    id: 23,
    term: "The Benedict’s test for glucose",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/The Benedict’s test for glucose.png",
  },
  {
    id: 24,
    term: "The Addition of Hydrogen",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/The Addition of Hydrogen.png",
  },
  {
    id: 25,
    term: "Learning Check 14.4 Draw the structural formula for each product of the following reactions:",
    definition: null,
    termImage: "./ch14-images/Learning Check 14.4.png",
    definitionImage: "./ch14-images/Learning Check 14.4 answer.png",
  },
  {
    id: 26,
    term: "hemiacetal",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/hemiacetal.png",
  },
  {
    id: 27,
    term: "The Addition of Alcohols",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/The Addition of Alcohols.png",
  },
  {
    id: 28,
    term: "acetal",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/acetal.png",
  },
  {
    id: 29,
    term: "hemiacetal carbon and acetal carbon",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/hemiacetal carbon and acetal carbon.png",
  },
  {
    id: 30,
    term: "hemiketal",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/hemiketal.png",
  },
  {
    id: 31,
    term: "ketal",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/ketal.png",
  },
  {
    id: 32,
    term: "hemiacetal reaction",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/hemiacetal reaction.png",
  },
  {
    id: 33,
    term: "hemiacetal to the acetal",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/hemiacetal to the acetal.png",
  },
  {
    id: 34,
    term: "ketones can react with alcohols to form hemiketals and ketals",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/form hemiketals and ketals.png",
  },
  {
    id: 35,
    term: "Learning Check 14.5 Draw the structural formula for the hemiacetal and hemi ketal intermediates and for the acetal and ketal products of the following reactions. Label each structure as a hemiacetal, hemiketal, ketal, or acetal.",
    definition: null,
    termImage: "./ch14-images/Learning Check 14.5.png",
    definitionImage: "./ch14-images/Learning Check 14.5 answer.png",
  },
  {
    id: 36,
    term: "A Reaction Map for Aldehydes and Ketones",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/A Reaction Map for Aldehydes and Ketones.png",
  },
  {
    id: 37,
    term: "Acetals and ketals are stable structures, but the reactions may be reversed by using water and an acid catalyst",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Acetals and ketals are stable structures.png",
  },
  {
    id: 38,
    term: "hydrolysis",
    definition: "Bond breakage by reaction with water.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 39,
    term: "Learning Check 14.6 Draw the structural formulas needed to complete the following hydrolysis reactions:",
    definition: null,
    termImage: "./ch14-images/Learning Check 14.6.png",
    definitionImage: "./ch14-images/Learning Check 14.6 answer.png",
  },
  {
    id: 40,
    term: "Learning Check 14.7 Identify each of the following as cyclic hemiacetals, hemiketals, acetals, or ketals and show structural formulas for the hydrolysis products:",
    definition: null,
    termImage: "./ch14-images/Learning Check 14.7.png",
    definitionImage: "./ch14-images/Learning Check 14.7 answer.png",
  },
  {
    id: 41,
    term: "Formaldehyde",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Formaldehyde.png",
  },
  {
    id: 42,
    term: "Acetone",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Acetone.png",
  },
  {
    id: 43,
    term: "progesterone and testosterone",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/progesterone and testosterone.png",
  },
  {
    id: 44,
    term: "Some Fragrant Aldehydes and Ketones",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Some Fragrant Aldehydes and Ketones.png",
  },
  {
    id: 45,
    term: "Oxidation of an aldehyde to give a carboxylic acid",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Oxidation of an aldehyde to give a carboxylic acid.png",
  },
  {
    id: 46,
    term: "Attempted oxidation of a ketone",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Attempted oxidation of a ketone.png",
  },
  {
    id: 47,
    term: "Hydrogenation of an aldehyde to give a primary alcohol",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Hydrogenation of an aldehyde to give a primary alcohol.png",
  },
  {
    id: 48,
    term: "Hydrogenation of a ketone to give a secondary alcohol",
    definition: null,
    termImage: null,
    definitionImage: "./ch14-images/Hydrogenation of a ketone to give a secondary alcohol.png",
  },
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MatchingGame = () => {
  const chapterKey = "ch14-flashcards";
  const [initialItems, setInitialItems] = useState(() => {
  const saved = localStorage.getItem(chapterKey);
  return saved ? JSON.parse(saved) : defaultItems;
  });

  const [termItems, setTermItems] = useState(shuffleArray([...initialItems]));
  const [definitionItems, setDefinitionItems] = useState(shuffleArray([...initialItems]));
  const [matches, setMatches] = useState({});
  const [usedTerms, setUsedTerms] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const [newTerm, setNewTerm] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [newTermImage, setNewTermImage] = useState(null);
  const [newTermImageName, setNewTermImageName] = useState("");
  const [newDefinitionImage, setNewDefinitionImage] = useState(null);
  const [newDefinitionImageName, setNewDefinitionImageName] = useState("");

  const termListRef = useRef(null);
  const definitionListRef = useRef(null);

  useEffect(() => {
      localStorage.setItem(chapterKey, JSON.stringify(initialItems));
    }, [initialItems]);

  const handleDrop = (e, definitionId) => {
    const termId = e.dataTransfer.getData("termId");
    if (matches[definitionId]) return;
    setMatches((prev) => ({ ...prev, [definitionId]: parseInt(termId) }));
    setUsedTerms((prev) => [...prev, parseInt(termId)]);
  };

  const handleDragStart = (e, termId) => {
    e.dataTransfer.setData("termId", termId);
  };

  const removeMatch = (definitionId) => {
    const removedTerm = matches[definitionId];
    setMatches((prev) => {
      const updated = { ...prev };
      delete updated[definitionId];
      return updated;
    });
    setUsedTerms((prev) => prev.filter((id) => id !== removedTerm));
  };

  const checkAnswers = () => setIsDone(true);

  const resetGame = () => {
    setMatches({});
    setUsedTerms([]);
    setIsDone(false);
    setTermItems(shuffleArray([...initialItems]));
    setDefinitionItems(shuffleArray([...initialItems]));
  };

  const addFlashcard = () => {
    const newCard = {
      id: Date.now(),
      term: newTerm,
      definition: newDefinition,
      termImage: newTermImage,
      definitionImage: newDefinitionImage,
    };
    const updated = [...initialItems, newCard];
    setInitialItems(updated);
    setTermItems(shuffleArray([...updated]));
    setDefinitionItems(shuffleArray([...updated]));
    setNewTerm("");
    setNewDefinition("");
    setNewTermImage(null);
    setNewTermImageName("");
    setNewDefinitionImage(null);
    setNewDefinitionImageName("");
  };

  const deleteFlashcard = (id) => {
    const updated = initialItems.filter((item) => item.id !== id);
    setInitialItems(updated);
    setTermItems(shuffleArray([...updated]));
    setDefinitionItems(shuffleArray([...updated]));
    setMatches((prev) => {
      const updatedMatches = { ...prev };
      for (const key in updatedMatches) {
        if (updatedMatches[key] === id || parseInt(key) === id) {
          delete updatedMatches[key];
        }
      }
      return updatedMatches;
    });
    setUsedTerms((prev) => prev.filter((termId) => termId !== id));
  };

  const handleImageUpload = (e, setImage, setImageName) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageDrop = (e, setImage, setImageName) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageName(file.name);
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = (setImage, setImageName) => {
    setImage(null);
    setImageName("");
  };

  const styles = StyleSheet.create({
    page: { padding: 10, fontSize: 12 },
    title: { textAlign: "center", fontSize: 16, marginBottom: 20 },
    section: { marginBottom: 20 },
    card: { border: "3px solid #000", padding: 5, marginBottom: 20, marginLeft: 10, marginTop: 20, width: 550, height: 700 },
    termText: { fontWeight: "bold", marginBottom: 20 },
    definitionText: { marginBottom: 20 },
    image: { objectFit: "scale-down", marginBottom: 20 },
  });

  const PDFContent = () => (
    <Document>
      {termItems.map((item, index) => (
        <Page key={index} style={styles.page}>
          {index === 0 && <Text style={styles.title}>Chapter 14 FlashCards</Text>}
          <div style={styles.section}>
            <div style={styles.card}>
              <Text style={styles.termText}>{index + 1}. Term: {item.term}</Text>
              {item.termImage && <Image style={styles.image} src={item.termImage} />}
              <Text style={styles.definitionText}>Definition: {item.definition || "No definition provided"}</Text>
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
      <h1>Chapter 14 Drag-and-Drop Matching Game</h1>

      {/* Add Flashcard */}
      <div className="add-flashcard">
        <h2>Add New Flashcard</h2>
        <input type="text" placeholder="Term" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} />
        <input type="text" placeholder="Definition" value={newDefinition} onChange={(e) => setNewDefinition(e.target.value)} />

        <div className="upload-box" onDrop={(e) => handleImageDrop(e, setNewTermImage, setNewTermImageName)} onDragOver={(e) => e.preventDefault()}>
          Drag & Drop Term Image Here
          <input type="file" onChange={(e) => handleImageUpload(e, setNewTermImage, setNewTermImageName)} />
        </div>
        {newTermImageName && (
          <div className="file-info">
            {newTermImageName}
            <button className="remove-image" onClick={() => removeImage(setNewTermImage, setNewTermImageName)}>×</button>
          </div>
        )}

        <div className="upload-box" onDrop={(e) => handleImageDrop(e, setNewDefinitionImage, setNewDefinitionImageName)} onDragOver={(e) => e.preventDefault()}>
          Drag & Drop Definition Image Here
          <input type="file" onChange={(e) => handleImageUpload(e, setNewDefinitionImage, setNewDefinitionImageName)} />
        </div>
        {newDefinitionImageName && (
          <div className="file-info">
            {newDefinitionImageName}
            <button className="remove-image" onClick={() => removeImage(setNewDefinitionImage, setNewDefinitionImageName)}>×</button>
          </div>
        )}

        <button onClick={addFlashcard}>Add Flashcard</button>
      </div>

      {/* Delete Flashcard */}
      <div className="delete-flashcard">
        <h2>Delete Flashcard</h2>
        {initialItems.map((item) => (
          <div key={item.id}>
            <button onClick={() => deleteFlashcard(item.id)}>Delete "{item.term}"</button>
          </div>
        ))}
      </div>

      {/* Matching Game */}
      <div className="game-grid">
        <div className="term-list-container">
          <div className="term-list" ref={termListRef}>
            {termItems.filter((item) => !usedTerms.includes(item.id)).map((item) => (
              <div key={`term-${item.id}`} className="card" draggable onDragStart={(e) => handleDragStart(e, item.id)}>
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
                  isDone && matches[item.id] === item.id ? "correct" :
                  isDone && matches[item.id] !== item.id ? "incorrect" : ""
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, item.id)}
              >
                {item.definitionImage && <img src={item.definitionImage} alt="Definition" />}
                <p>{item.definition}</p>
                {isDone && (
                  <div className="answer-section">
                    <p><strong>Correct:</strong> {item.term}</p>
                    <p><strong>Your Answer:</strong> {matches[item.id] ? termItems.find(t => t.id === matches[item.id])?.term || "No Answer" : "No Answer"}</p>
                  </div>
                )}
                {matches[item.id] && !isDone && (
                  <div className="drop-result">
                    <span>{termItems.find((i) => i.id === matches[item.id])?.term || ""}</span>
                    <button className="close-button" onClick={() => removeMatch(item.id)}>&times;</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pdf-link">
        <a href="./Chemistry textbook.pdf" target="_blank" rel="noopener noreferrer">View General, Organic, and Biochemistry PDF</a>
      </div>

      <div className="controls">
        <button className="done-button" onClick={checkAnswers}>Done</button>
        <button className="reset-button" onClick={resetGame}>Reset</button>
        <button className="download-button" onClick={downloadPDF}>Download FlashCards (PDF)</button>
      </div>

      {isDone && (
        <div className="score-display">
          <h2>Score: {termItems.filter((item) => matches[item.id] === item.id).length} / {termItems.length}</h2>
        </div>
      )}
    </div>
  );
};

export default MatchingGame;

