// src/components/NewExerciseMatchingGame.js
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./styles.css";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const NewExerciseMatchingGame = ({ chapterId }) => {
  const chapterKey = `flashcards-${chapterId}`;
  const titleKey = `title-${chapterId}`;

  const [title, setTitle] = useState(() => localStorage.getItem(titleKey) || "New Exercise Matching Game");
  const [editingTitle, setEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);

  const [initialItems, setInitialItems] = useState(() => {
    const saved = localStorage.getItem(chapterKey);
    return saved ? JSON.parse(saved) : [];
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
  }, [initialItems, chapterKey]);

  useEffect(() => {
    localStorage.setItem(titleKey, title);
  }, [title, titleKey]);

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
          {index === 0 && <Text style={styles.title}>{title}</Text>}
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
    saveAs(blob, "ExerciseFlashCards.pdf");
  };

  return (
    <div className="game-container">
      {editingTitle ? (
        <div>
          <input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} />
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => { setTitle(draftTitle); setEditingTitle(false); }}>Save</button>
            <button style={{ marginLeft: "10px" }} onClick={() => {
              setDraftTitle(title);
              setEditingTitle(false);
            }}>Cancel</button>
          </div>
        </div>
      ) : (
        <h1 onClick={() => setEditingTitle(true)}>{title}</h1>
      )}

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

      <div className="delete-flashcard">
        <h2>Delete Flashcard</h2>
        {initialItems.map((item) => (
          <div key={item.id}>
            <button onClick={() => deleteFlashcard(item.id)}>Delete "{item.term}"</button>
          </div>
        ))}
      </div>

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
                className={`card dropzone ${isDone && matches[item.id] === item.id ? "correct" : isDone && matches[item.id] !== item.id ? "incorrect" : ""}`}
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

export default NewExerciseMatchingGame;