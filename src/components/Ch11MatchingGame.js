// src/components/Ch11MatchingGame.js
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./styles.css";

const defaultItems = [
    {
      id: 1,
      term: "ammonium cyanate reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/ammonium cyanate reaction.png",
    },
    {
      id: 2,
      term: "organic compound",
      definition: "A compound that contains the element carbon.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 3,
      term: "organic chemistry ",
      definition: "The study of carbon-containing compounds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 4,
      term: "inorganic chemistry ",
      definition: "The study of the elements and all noncarbon compounds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 5,
      term: "Properties of Typical Organic and Inorganic Compounds",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Typical Organic and Inorganic Compounds.png",
    },
    {
      id: 6,
      term: "Learning Check 11.1 Classify each of the following compounds as organic or inorganic",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.1.png",
      definitionImage: "./ch11-images/Learning Check 11.1 answer.png",
    },
    {
      id: 7,
      term: "Learning Check 11.2 Decide whether each of the following characteristics most likely describes an organic or inorganic compound: a. Flammable b. Low boiling point & c. Soluble in water",
      definition: " a. organic , b. organic & c. inorganic",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 8,
      term: "isomerism",
      definition: "A property in which two or more compounds have the same molecular formula but different arrangements of atoms.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 9,
      term: "structural isomers ",
      definition: "Compounds that have the same molecular formula but in which the atoms bond in different patterns.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 10,
      term: "Learning Check 11.3 Which one of the structures below represents a structural isomer of",
      definition: "Compound (a) is a structural isomer because it has the same molecular formula but a different structural formula.",
      termImage: "./ch11-images/Learning Check 11.3.png",
      definitionImage: null,
    },
    {
      id: 11,
      term: "Ball-and-stick models of the isomers of C2H6O",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/isomers of C2H6O.png",
    },
    {
      id: 12,
      term: "functional group",
      definition: "A unique reactive combination of atoms that differentiates molecules of organic compounds of one class from those of another.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 13,
      term: "expanded structural formula",
      definition: "A structural molecular formula showing all the covalent bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 14,
      term: "condensed structural formula",
      definition: "A structural molecular formula showing the general arrangement of atoms but without showing all the covalent bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 15,
      term: "Alkane Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Alkane class.png",
    },
    {
      id: 16,
      term: "Alkene Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Alkene class.png",
    },
    {
      id: 17,
      term: "Alkyne Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Alkyne class.png",
    },
    {
      id: 18,
      term: "Aromatic Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Aromatic class.png",
    },
    {
      id: 19,
      term: "Alcohol Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Alcohol class.png",
    },
    {
      id: 20,
      term: "Ether Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Ether class.png",
    },
    {
      id: 21,
      term: "Amine Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Amine class.png",
    },
    {
      id: 22,
      term: "Aldehyde Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Aldehyde class.png",
    },
    {
      id: 23,
      term: "Ketone Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Ketone class.png",
    },
    {
      id: 24,
      term: "Carboxylic acid Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Carboxylic acid class.png",
    },
    {
      id: 25,
      term: "Ester Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Ester class.png",
    },
    {
      id: 26,
      term: "Amide Class",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Amide class.png",
    },
    {
      id: 27,
      term: "Learning Check 11.4 Write a condensed structural formula for each of the following compounds. Retain the bonds to and within the functional groups.",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.4.png",
      definitionImage: "./ch11-images/Learning Check 11.4 answer.png",
    },
    {
      id: 28,
      term: "hydrocarbon",
      definition: "An organic compound that contains only carbon and hydrogen.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 29,
      term: "saturated hydrocarbon",
      definition: "Another name for an alkane.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 30,
      term: "alkane",
      definition: "A hydrocarbon that contains only single bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 31,
      term: "Classification of hydrocarbons",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Classification of hydrocarbons.png",
    },
    {
      id: 32,
      term: "Structural representations of methane, CH4.",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Structural representations of methane, CH4.png",
    },
    {
      id: 33,
      term: "Perspective models of the ethane molecule, CH3CH3.",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/ethane molecule.png",
    },
    {
      id: 34,
      term: "normal alkane",
      definition: "Any alkane in which all the carbon atoms are aligned in a continuous chain.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 35,
      term: "branched alkane",
      definition: "An alkane in which at least one carbon atom is not part of a continuous chain.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 36,
      term: "n-butane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/n-butane.png",
    },
    {
      id: 37,
      term: "isobutane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/isobutane.png",
    },
    {
      id: 38,
      term: "Learning Check 11.5: a. Determine the molecular formula of the alkane containing eight carbon atoms. and b. Draw the condensed structural formula of the normal isomer of the compound in part a.",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Learning Check 11.5 answer.png",
    },
    {
      id: 39,
      term: "Molecular Formulas and Possible Structural Isomers of Alkanes",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Isomers of Alkanes.png",
    },
    {
      id: 40,
      term: "conformations",
      definition: "The different arrangements of atoms in space achieved by rotation about single bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 41,
      term: "Rotation about single bonds (n-butane molecule)",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/n-butane molecule.png",
    },
    {
      id: 42,
      term: "Perspective models and carbon skeletons of two conformations of n-butane.",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/two conformations of n-butane.png",
    },
    {
      id: 43,
      term: "Learning Check 11.6 Which of the following pairs represent structural isomers, and which are simply the same compound?",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.6.png",
      definitionImage: "./ch11-images/Learning Check 11.6 answer.png",
    },
    {
      id: 44,
      term: "Names of Alkanes",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Names of Alkanes.png",
    },
    {
      id: 45,
      term: "n-alkane and iso-alkane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/n-alkane and iso-alkane.png",
    },
    {
      id: 46,
      term: "IUPAC name for an organic compound",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/IUPAC name for an organic compound.png",
    },
    {
      id: 47,
      term: "alkyl group",
      definition: "A group differing by one hydrogen from an alkane.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 48,
      term: "Common Alkyl Groups",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Common Alkyl Groups.png",
    },
    {
      id: 49,
      term: "Common Nonalkyl Groups",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Common Nonalkyl Groups.png",
    },
    {
      id: 50,
      term: "Step 1 of IUPAC name of an alkane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Step 1 of IUPAC name of an alkane.png",
    },
    {
      id: 51,
      term: "Step 2 of IUPAC name of an alkane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Step 2 of IUPAC name of an alkane.png",
    },
    {
      id: 52,
      term: "Step 3 of IUPAC name of an alkane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Step 3 of IUPAC name of an alkane.png",
    },
    {
      id: 53,
      term: "Step 4 of IUPAC name of an alkane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Step 4 of IUPAC name of an alkane.png",
    },
    {
      id: 54,
      term: "Step 5 of IUPAC name of an alkane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Step 5 of IUPAC name of an alkane.png",
    },
    {
      id: 55,
      term: "cycloalkane",
      definition: "An alkane in which carbon atoms form a ring.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 56,
      term: "Structural Formulas and Symbols for Common Cycloalkanes",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Common Cycloalkanes.png",
    },
    {
      id: 57,
      term: "The ring numbering begins with the carbon attached to the first group alphabetically and proceeds around the ring in the direction that will give the lowest numbers for the locations of the other attached groups.",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/The ring numbering.png",
    },
    {
      id: 58,
      term: "Learning Check 11.7 Identify the longest carbon chain in the following:",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.7.png",
      definitionImage: "./ch11-images/Learning Check 11.7 answer.png",
    },
    {
      id: 59,
      term: "Learning Check 11.8 Decide how to correctly number the longest chain in the following according to IUPAC rules:",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.8.png",
      definitionImage: "./ch11-images/Learning Check 11.8 answer.png",
    },
    {
      id: 60,
      term: "Learning Check 11.9 Identify the alkyl groups attached to the horizontal line, which symbolizes a long carbon chain. Refer to Table 11.5 if necessary.",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.9.png",
      definitionImage: "./ch11-images/Learning Check 11.9 answer.png",
    },
    {
      id: 61,
      term: "Learning Check 11.10 Give the correct IUPAC name to each of the following:",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.10.png",
      definitionImage: "./ch11-images/Learning Check 11.10 answer.png",
    },
    {
      id: 62,
      term: "Learning Check 11.11 Draw a condensed structural formula for each of the following compounds: a. 2,2,4-trimethylpentane , b. 3-isopropylhexane and c. 3-ethyl-2,4-dimethylheptane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Learning Check 11.11 answer.png",
    },
    {
      id: 63,
      term: "Learning Check 11.12 Give each of the following compounds the correct IUPAC name:",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.12.png",
      definitionImage: "./ch11-images/Learning Check 11.12 answer.png",
    },
    {
      id: 64,
      term: "Ball-and-stick models for common cycloalkanes.",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Ball-and-stick models for common cycloalkanes.png",
    },
    {
      id: 65,
      term: "Rotation about C-C single bonds occurs in open chain compounds but not within rings.",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/open chain compounds.png",
    },
    {
      id: 66,
      term: "stereoisomers",
      definition: "Compounds with the same structural formula but different spatial arrangements of atoms.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 67,
      term: "Two geometric isomers of 1,2-dimethylcyclopentane",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/1,2-dimethylcyclopentane.png",
    },
    {
      id: 68,
      term: "geometric isomers",
      definition: "Molecules with restricted rotation around C—C bonds that differ in the three-dimensional arrangements of their atoms in space and not in the order of linkage of atoms.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 69,
      term: "cis-",
      definition: "On the same side (as applied to geometric isomers).",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 70,
      term: "trans-",
      definition: "On opposite sides (as applied to geometric isomers).",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 71,
      term: "Learning Check 11.13",
      definition: null,
      termImage: "./ch11-images/Learning Check 11.13.png",
      definitionImage: "./ch11-images/Learning Check 11.13 answer.png",
    },
    {
      id: 72,
      term: "homologous series",
      definition: "Compounds of the same functional class that differ by a -CH2- group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 73,
      term: "Physical Properties of Some Normal Alkanes",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Some Normal Alkanes.png",
    },
    {
      id: 74,
      term: "Normal alkane boiling points depend on chain length.",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/Normal alkane boiling points.png",
    },
    {
      id: 75,
      term: "hydrophobic",
      definition: "Molecules or parts of molecules that repel (are insoluble in) water.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 76,
      term: "palmitic acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/palmitic acid.png",
    },
    {
      id: 77,
      term: "alkanes burn to form carbon dioxide and water, liberating large quantities of heat",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/large quantities of heat.png",
    },
    {
      id: 78,
      term: "incomplete combustion of hydrocarbons",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/incomplete combustion of hydrocarbons.png",
    },
    {
      id: 79,
      term: "A luminous yellow flame from a laboratory burner",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/A luminous yellow flame.png",
    },
    {
      id: 80,
      term: "complete combustion of alkanes",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/complete combustion of alkanes.png",
    },
    {
      id: 81,
      term: "incomplete combustion of alkanes",
      definition: null,
      termImage: null,
      definitionImage: "./ch11-images/incomplete combustion of alkanes.png",
    },
  
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MatchingGame = () => {
  const chapterKey = "ch11-flashcards";
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
          {index === 0 && <Text style={styles.title}>Chapter 11 FlashCards</Text>}
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
      <h1>Chapter 11 Drag-and-Drop Matching Game</h1>

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
