// src/components/Ch11MatchingGame.js
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./styles.css";

const defaultItems = [
  {
    id: 1,
    term: "21.1 What is the principal location of DNA within the eukaryotic cell?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.1 answer.png",
  },
  {
    id: 2,
    term: "21.2 Which pentose sugar is present in DNA? In RNA?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.2 answer.png",
  },
  {
    id: 3,
    term: "21.3 Name the three components of nucleotides.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.3 answer.png",
  },
  {
    id: 4,
    term: "21.4 Indicate whether each of the following is a pyrimidine or a purine: a. guanine , b. thymine , c. uracil , d. cytosine , e. adenine",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.4 answer.png",
  },
  {
    id: 5,
    term: "21.5 Which bases are found in DNA? In RNA?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.5 answer.png",
  },
  {
    id: 6,
    term: "21.6 Write the structural formula for the nucleotide thymidine 5'-monophosphate. The base component is thymine.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.6 answer.png",
  },
  {
    id: 7,
    term: "21.8 Identify the 3' and 5' ends of the DNA segment AGTCAT",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.8 answer.png"
  },
  {
    id: 8,
    term: "21.10 Describe the secondary structure of DNA as proposed by Watson and Crick.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.10 answer.png",
  },
  {
    id: 9,
    term: "21.11 Describe the role of hydrogen bonding in the secondary structure of DNA.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.11 answer.png",
  },
  {
    id: 10,
    term: "21.12 How many total hydrogen bonds would exist between the following strands of DNA and their complementary strands? a. CAGTAG & b. TTGACA",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.12 answer.png",
  },
  {
    id: 11,
    term: "21.14 A strand of DNA has the base sequence ATGCATC. Write the base sequence for the complementary strand.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.14 answer.png",
  },
  {
    id: 12,
    term: "21.16 What is a chromosome? How many chromosomes are in a human cell? What is the approximate number of genes in a human cell?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.16 answer.png"
  },
  {
    id: 13,
    term: "21.17 What is meant by the term semiconservative replication?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.17 answer.png",
  },
  {
    id: 14,
    term: "21.20 List the steps involved in DNA replication",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.20 answer.png",
  },
  {
    id: 15,
    term: "21.26 How does the sugar–phosphate backbone of RNA differ from the backbone of DNA?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.26 answer.png",
  },
  {
    id: 16,
    term: "21.28 Briefly describe the characteristics and functions of the three types of cellular RNA.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.28 answer.png",
  },
  {
    id: 17,
    term: "21.30 What are the two important regions of a tRNA molecule?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.30 answer.png",
  },
  {
    id: 18,
    term: "21.31 What is the central dogma of molecular biology?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.31 answer.png",
  },
  {
    id: 19,
    term: "21.32 In the flow of genetic information, what is meant by the terms transcription and translation?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.32 answer.png",
  },
  {
    id: 20,
    term: "21.34 Write the base sequence for the mRNA that would be formed during transcription from the DNA strand with the base sequence GCCATATTG.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.34 answer.png",
  },
  {
    id: 21,
    term: "21.37 What is a codon?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.37 answer.png",
  },
  {
    id: 22,
    term: "21.40 Which of the following statements about the genetic code are true and which are false? Correct each false statement. a. Each codon is composed of four bases. , b. Some amino acids are represented by more than one codon. , c. All codons represent an amino acid. , d. Each living species is thought to have its own unique genetic code. , e. The codon AUG at the beginning of a sequence is a signal for protein synthesis to begin at that codon. , and f. It is not known if the code contains stop signals for protein synthesis.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.40 answer.png",
  },
  {
    id: 23,
    term: "21.43 Beginning with DNA, describe in simple terms (no specific codons, etc.) how proteins are coded and synthesized.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.43 answer.png",
  },
  {
    id: 24,
    term: "21.48 What is a genetic mutation?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.48 answer.png",
  },
  {
    id: 25,
    term: "21.50 What is the result of a genetic mutation that causes the mRNA sequence GCC to be replaced by CCC?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.50 answer.png",
  },
  {
    id: 26,
    term: "21.60 Genetic engineering shows great promise for the future but has been controversial at times. Discuss with some classmates the pros and cons of genetic engineering. List two benefits and two concerns that come from your discussion.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.60 answer.png",
  },
  {
    id: 27,
    term: "21.61 Two samples of DNA are compared, and one has a greater percentage of guanine-cytosine base pairs. How should that greater percentage affect the attractive forces holding the double helix together?",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.61 answer.png",
  },
  {
    id: 28,
    term: "21.69 Put the following terms in the correct order of information transfer according to the central dogma of molecular biology: RNA, DNA, protein",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-exercise-images/21.69 answer.png",
  },
  {
    id: 29,
    term: "21.70 Which of the following are components of a nucleotide in a DNA molecule? a. Sugar b. A phospholipid c. A nitrogen base",
    definition: "a. Sugar and c. A nitrogen base",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 30,
    term: "21.72 The genes that encode for eukaryotic protein sequences are passed from one generation to the next via: a. other proteins. , b. rRNA. , c. tRNA. , and d. DNA.",
    definition: "d. DNA",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 31,
    term: "21.73 Which base is found in DNA but not in RNA? a. thymine , b. cytosine , c. guanine and d. adenine",
    definition: "d. adenine",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 32,
    term: "21.74 Which of the following best describes tRNA? a. It is the site of rRNA synthesis. , b. It is the product of transcription, and encodes for translated proteins. , c. It binds specific amino acids and carries them to the ribosomes during protein synthesis. , d. It contains the genome and is the site at which genes are used to make mRNA.",
    definition: "c. It binds specific amino acids and carries them to the ribosomes during protein synthesis.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 33,
    term: "21.75 Which of the following is the site of protein synthesis within a eukaryotic cell? a. the ribosomes , b. the nucleus , c. the mitochondria , d. the Golgi apparatus",
    definition: "a. the ribosomes",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 34,
    term: "21.76 In messenger RNA, a codon contains how many nucleotides? a. one , b. two , c. three , d. four",
    definition: "c. three",
    termImage: null,
    definitionImage: null,
  },
];


const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MatchingGame = () => {
  const chapterKey = "execrise-ch21-flashcards";
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
          {index === 0 && <Text style={styles.title}>Exercise Chapter 21</Text>}
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
      <h1>Exercise Chapter 21 Drag-and-Drop Matching Game</h1>

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
