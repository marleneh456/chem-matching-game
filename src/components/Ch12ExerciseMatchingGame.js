// src/components/Ch12ExerciseMatchingGame.js
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./styles.css";

const defaultItems = [
  {
    id: 1,
    term: "Enzyme",
    definition: "A biomolecule that catalyzes chemical reactions",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 2,
    term: "Catalytic Efficiency",
    definition: null,
    termImage: null,
    definitionImage: "./images/Catalytic Efficiency.png",
  },
  {
    id: 3,
    term: "The influence of enzymes on the rates of reactions",
    definition: null,
    termImage: null,
    definitionImage: "./images/rates of reactions.png",
  },
  {
    id: 4,
    term: "Enzyme specificity is a second characteristic that is important in life processes",
    definition: null,
    termImage: null,
    definitionImage: "./images/Enzyme specificity.png",
  },
  {
    id: 5,
    term: "absolute specificity",
    definition: "The characteristic of an enzyme that it acts on one and only one substance.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 6,
    term: "relative specificity",
    definition: "The characteristic of an enzyme that it acts on several structurally related substances.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 7,
    term: "stereochemical specificity",
    definition: "The characteristic of an enzyme that it is able to distinguish between stereoisomers.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 8,
    term: "Regulation",
    definition: "The cell controls the rates of these reactions and the amount of any given product formed by regulating the action of the enzymes.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 9,
    term: "Oxidoreductases",
    definition: "Oxidation–reduction reactions",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 10,
    term: "Transferases",
    definition: "Transfer of functional groups",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 11,
    term: "Hydrolases",
    definition: "Hydrolysis reactions",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 12,
    term: "Lyases",
    definition: "Addition to double bonds or the reverse of that reaction",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 13,
    term: "Isomerases",
    definition: "Isomerization reactions",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 14,
    term: "Ligases",
    definition: "Formation of bonds with ATP cleavage",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 15,
    term: "substrate",
    definition: "The substance that undergoes a chemical change catalyzed by an enzyme.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 16,
    term: "The hydrolysis of urea",
    definition: null,
    termImage: null,
    definitionImage: "./images/hydrolysis of urea.png",
  },
  {
    id: 17,
    term: "Substrate: urea",
    definition: "Common name: urea + ase = urease",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 18,
    term: "Substrate: alcohol (ethyl alcohol)",
    definition: "Reaction type: dehydrogenation (removal of hydrogen) Common name: alcohol dehydrogenation + ase = alcohol dehydrogenase",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 19,
    term: "Learning check 20.1 Predict the substrates for the following enzymes: a. maltase",
    definition: "maltose",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 20,
    term: "Learning check 20.1 Predict the substrates for the following enzymes: b. peptidase",
    definition: "peptides",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 21,
    term: "Learning check 20.1 Predict the substrates for the following enzymes: c. glucose 6-phosphate isomerase",
    definition: "glucose-6-phosphate",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 22,
    term: "cofactor",
    definition: "A nonprotein molecule or ion required by an enzyme for catalytic activity.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 23,
    term: "coenzyme",
    definition: "An organic molecule required by an enzyme for catalytic activity.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 24,
    term: "apoenzyme",
    definition: "A catalytically inactive protein formed by removal of the cofactor from an active enzyme.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 25,
    term: "active enzyme",
    definition: null,
    termImage: null,
    definitionImage: "./images/active enzyme.png",
  },
  {
    id: 26,
    term: "biotin",
    definition: "Coenzyme Form: biocytin, Function: Carboxyl group removal or transfer",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 27,
    term: "folacin",
    definition: "Coenzyme Form: tetrahydrofolic acid, Function: One-carbon group transfer",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 28,
    term: "lipoic acid",
    definition: "Coenzyme Form: lipoamide, Function: Acyl group transfer",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 29,
    term: "niacin",
    definition: "Coenzyme Form: nicotinamide adenine dinucleotide (NAD+) , Function: Hydrogen transfer and Coenzyme Form: nicotinamide adenine dinucleotide phosphate (NADP+), Function: Hydrogen transfer",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 30,
    term: "pantothenic acid",
    definition: "Coenzyme Form: coenzyme A (CoA), Function: Acyl group carrier",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 31,
    term: "pyridoxal, pyridoxamine, pyridoxine (B6 group)",
    definition: "Coenzyme Form: pyridoxal phosphate, Function: Amino group transfer",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 32,
    term: "riboflavin",
    definition: "Coenzyme Form: flavin mononucleotide (FMN), Function: Hydrogen transfer, and Coenzyme Form: flavin adenine dinucleotide (FAD), Function: Hydrogen transfer",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 33,
    term: "thiamin (B1)",
    definition: "Coenzyme Form: thiamin pyrophosphate (TPP), Function: Aldehyde group transfer",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 34,
    term: "vitamin B12",
    definition: "Coenzyme Form: coenzyme B12, Function: Shift of hydrogen atoms between adjacent carbon atoms; methyl group transfer",
    termImage: null,
    definitionImage: null,
  },
];


const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MatchingGame = () => {
  const chapterKey = "execrise-ch12-flashcards";
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
    localStorage.setItem("flashcards", JSON.stringify(initialItems));
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
          {index === 0 && <Text style={styles.title}>Exercise Chapter 12</Text>}
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
      <h1>Exercise Chapter 12 Drag-and-Drop Matching Game</h1>

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
