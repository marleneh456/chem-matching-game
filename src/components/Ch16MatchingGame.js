// src/components/Ch16MatchingGame.js
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./styles.css";

const defaultItems = [
  {
    id: 1,
    term: "amine",
    definition: "An organic compound derived by replacing one or more of the hydrogen atoms of ammonia with alkyl or aromatic groups, as in RNH2, R2NH, and R3N.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 2,
    term: "primary amine",
    definition: "An amine having one alkyl or aromatic group bonded to nitrogen, as in R-NH2.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 3,
    term: "secondary amine",
    definition: "An amine having two alkyl or aromatic groups bonded to nitrogen, as in R2NH.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 4,
    term: "tertiary amine",
    definition: "An amine having three alkyl or aromatic groups bonded to nitrogen, as in R3N.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 5,
    term: "Learning Check 16.1 Classify each of the following amines as primary, secondary, or tertiary:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.1.png",
    definitionImage: "./ch16-images/Learning Check 16.1 answer.png",
  },
  {
    id: 6,
    term: "Subclasses of Amines",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Subclasses of Amines.png",
  },
  {
    id: 7,
    term: "methylamine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/methylamine.png",
  },
  {
    id: 8,
    term: "dimethylamine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/dimethylamine.png",
  },
  {
    id: 9,
    term: "ethylmethylamine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/ethylmethylamine.png",
  },
  {
    id: 10,
    term: "Learning Check 16.2 Assign a common name to the following amines:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.2.png",
    definitionImage: "./ch16-images/Learning Check 16.2 answer.png",
  },
  {
    id: 11,
    term: "2-pentanamine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/2-pentanamine.png",
  },
  {
    id: 12,
    term: "3-methyl-1-butanamine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/3-methyl-1-butanamine.png",
  },
  {
    id: 13,
    term: "N-methyl-2-butanamine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/N-methyl-2-butanamine.png",
  },
  {
    id: 14,
    term: "Learning Check 16.3 Give an IUPAC name for the following amines:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.3.png",
    definitionImage: "./ch16-images/Learning Check 16.3 answer.png",
  },
  {
    id: 15,
    term: "aniline",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/aniline.png",
  },
  {
    id: 16,
    term: "N-methylaniline",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/N-methylaniline.png",
  },
  {
    id: 17,
    term: "2-ethyl-N-methylaniline",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/2-ethyl-N-methylaniline.png",
  },
  {
    id: 18,
    term: "N,N-dimethylaniline",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/N,N-dimethylaniline.png",
  },
  {
    id: 19,
    term: "Learning Check 16.4 Name the following amines as derivatives of aniline:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.4.png",
    definitionImage: "./ch16-images/Learning Check 16.4 answer.png",
  },
  {
    id: 20,
    term: "Properties of Some Amines",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Properties of Some Amines.png",
  },
  {
    id: 21,
    term: "1 amine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/1 amine.png",
  },
  {
    id: 22,
    term: "2 amine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/2 amine.png",
  },
  {
    id: 23,
    term: "3 amine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/3 amine.png",
  },
  {
    id: 24,
    term: "Learning Check 16.5 Draw structural formulas to show how each of the following amines forms hydrogen bonds with water:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.5.png",
    definitionImage: "./ch16-images/Learning Check 16.5 answer.png",
  },
  {
    id: 25,
    term: "The reaction of NH3 with HCl gas",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/The reaction of NH3 with HCl gas.png",
  },
  {
    id: 26,
    term: "ammonia react with water to liberate OH- ions ",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/ammonia react with water to liberate OH- ions.png",
  },
  {
    id: 27,
    term: "the amines are derivatives of ammonia",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/the amines are derivatives of ammonia.png",
  },
  {
    id: 28,
    term: "Learning Check 16.6 Complete the following reactions:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.6.png",
    definitionImage: "./ch16-images/Learning Check 16.6 answer.png",
  },
  {
    id: 29,
    term: "All amines behave as weak bases and form salts when they react with acids",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/All amines behave as weak bases.png",
  },
  {
    id: 30,
    term: "Other acids, such as sulfuric, nitric, phosphoric, and carboxylic acids, also react with amines to form salts",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Other acids.png",
  },
  {
    id: 31,
    term: "Learning Check 16.7 Complete the following reactions:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.7.png",
    definitionImage: "./ch16-images/Learning Check 16.7 answer.png",
  },
  {
    id: 32,
    term: "ethyldimethylammonium bromide",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/ethyldimethylammonium bromide.png",
  },
  {
    id: 33,
    term: "triethylammonium acetate",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/triethylammonium acetate.png",
  },
  {
    id: 34,
    term: "morphine (water insoluble) to morphine sulfate (water soluble)",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/morphine (water insoluble) to morphine sulfate (water soluble).png",
  },
  {
    id: 35,
    term: "Amine salts are easily converted back to amines by adding a strong base",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Amine salts.png",
  },
  {
    id: 36,
    term: "The amine cations in the salts we have discussed to this point have one, two, or three alkyl groups attached to the nitrogen",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/The amine cations in the salts.png",
  },
  {
    id: 37,
    term: "triethylmethylammonium chloride",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/triethylmethylammonium chloride.png",
  },
  {
    id: 38,
    term: "quaternary ammonium salt",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/quaternary ammonium salt.png",
  },
  {
    id: 39,
    term: "choline cation",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/choline cation.png",
  },
  {
    id: 40,
    term: "acetylcholine cation",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/acetylcholine cation.png",
  },
  {
    id: 41,
    term: "Zephiran chloride (R represents a long alkyl chain)",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Zephiran chloride.png",
  },
  {
    id: 42,
    term: "amide",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/amide.png",
  },
  {
    id: 43,
    term: "amide linkage",
    definition: "The carbonyl carbon–nitrogen single bond of the amide group.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 44,
    term: "amide functional group",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/amide functional group.png",
  },
  {
    id: 45,
    term: "from a carboxylic acid and from ammonia or an amine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/from a carboxylic acid and from ammonia or an amine.png",
  },
  {
    id: 46,
    term: "Tertiary amines do not form amides because they lack a hydrogen atom on the nitrogen",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Tertiary amines do not form amides.png",
  },
  {
    id: 47,
    term: "Learning Check 16.8 Complete the following reactions:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.8.png",
    definitionImage: "./ch16-images/Learning Check 16.8 answer.png",
  },
  {
    id: 48,
    term: "the formation of nylon",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/the formation of nylon.png",
  },
  {
    id: 49,
    term: "amide linkages characteristic of proteins",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/amide linkages characteristic of proteins.png",
  },
  {
    id: 50,
    term: "neurotransmitter",
    definition: "A substance that acts as a chemical bridge in nerve impulse transmission between nerve cells.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 51,
    term: "A nerve cell and the transmission of a nerve signal",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/A nerve cell and the transmission of a nerve signal.png",
  },
  {
    id: 52,
    term: "norepinephrine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/norepinephrine.png",
  },
  {
    id: 53,
    term: "dopamine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/dopamine.png",
  },
  {
    id: 54,
    term: "serotonin",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/serotonin.png",
  },
  {
    id: 55,
    term: "acetylcholine cation",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/acetylcholine cation.png",
  },
  {
    id: 56,
    term: "tyrosine to dopa",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/tyrosine to dopa.png",
  },
  {
    id: 57,
    term: "dopamine to norepinephrine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/dopamine to norepinephrine.png",
  },
  {
    id: 58,
    term: "A Reaction Map for Amines",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/A Reaction Map for Amines.png",
  },
  {
    id: 59,
    term: "tryptophan to serotonin",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/tryptophan to serotonin.png",
  },
  {
    id: 60,
    term: "Serotonin 3D",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Serotonin 3D.png",
  },
  {
    id: 61,
    term: "epinephrine (adrenaline)",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/epinephrine (adrenaline).png",
  },
  {
    id: 62,
    term: "Amphetamine 3D",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Amphetamine 3D.png",
  },
  {
    id: 63,
    term: "amphetamine (Benzedrine)",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/amphetamine (Benzedrine).png",
  },
  {
    id: 64,
    term: "epinephrine (adrenaline)",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/epinephrine (adrenaline).png",
  },
  {
    id: 65,
    term: "amphetamines",
    definition: "A class of drugs structurally similar to epinephrine, used to stimulate the central nervous system.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 66,
    term: "N-methylamphetamine (Methedrine, or “speed”)",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/N-methylamphetamine (Methedrine, or “speed”).png",
  },
  {
    id: 67,
    term: "alkaloids",
    definition: "A class of nitrogen containing organic compounds obtained from plants.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 68,
    term: "Nicotine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Nicotine.png",
  },
  {
    id: 69,
    term: "Caffeine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Caffeine.png",
  },
  {
    id: 70,
    term: "quinine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/quinine.png",
  },
  {
    id: 71,
    term: "atropine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/atropine.png",
  },
  {
    id: 72,
    term: "morphine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/morphine.png",
  },
  {
    id: 73,
    term: "codeine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/codeine.png",
  },
  {
    id: 74,
    term: "heroin",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/heroin.png",
  },
  {
    id: 75,
    term: "Morphine 3D",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Morphine 3D.png",
  },
  {
    id: 76,
    term: "The nomenclature of Amides",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/The nomenclature of Amides.png",
  },
  {
    id: 77,
    term: "Learning Check 16.9",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.9.png",
    definitionImage: "./ch16-images/Learning Check 16.9 answer.png",
  },
  {
    id: 78,
    term: "Using N amides examples",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Using N amides examples.png",
  },
  {
    id: 79,
    term: "Learning Check 16.10 Give either a common name or the IUPAC name for each of the following amides:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.10.png",
    definitionImage: "./ch16-images/Learning Check 16.10 answer.png",
  },
  {
    id: 80,
    term: "Intermolecular hydrogen bonding in an unsubstituted amide",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Intermolecular hydrogen bonding in an unsubstituted amide.png",
  },
  {
    id: 81,
    term: "Hydrogen bonding between water",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Hydrogen bonding between water.png",
  },
  {
    id: 82,
    term: "Learning Check 16.11 Show how the amide below can form the following:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.11.png",
    definitionImage: "./ch16-images/Learning Check 16.11 answer.png",
  },
  {
    id: 83,
    term: "Amide Hydrolysis",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Amide Hydrolysis.png",
  },
  {
    id: 84,
    term: "heat is required for the hydrolysis of amides",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/heat is required for the hydrolysis of amides.png",
  },
  {
    id: 85,
    term: "Learning Check 16.12 Complete the following hydrolysis reactions:",
    definition: null,
    termImage: "./ch16-images/Learning Check 16.12.png",
    definitionImage: "./ch16-images/Learning Check 16.12 answer.png",
  },
  {
    id: 86,
    term: "Some Important Amides in Medicine",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Some Important Amides in Medicine.png",
  },
  {
    id: 87,
    term: "Reaction of amines with water",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Reaction of amines with water.png",
  },
  {
    id: 88,
    term: "Reaction of amines with acids",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Reaction of amines with acids.png",
  },
  {
    id: 89,
    term: "Conversion of amine salts back to amines",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Conversion of amine salts back to amines.png",
  },
  {
    id: 90,
    term: "Reaction of amines with acid chlorides to form amides",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Reaction of amines with acid chlorides to form amides.png",
  },
  {
    id: 91,
    term: "Acid hydrolysis of amides",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Acid hydrolysis of amides.png",
  },
  {
    id: 92,
    term: "Basic hydrolysis of amides",
    definition: null,
    termImage: null,
    definitionImage: "./ch16-images/Basic hydrolysis of amides.png",
  },  
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MatchingGame = () => {
  const chapterKey = "ch16-flashcards";
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
          {index === 0 && <Text style={styles.title}>Chapter 16 FlashCards</Text>}
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
      <h1>Chapter 16 Drag-and-Drop Matching Game</h1>

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