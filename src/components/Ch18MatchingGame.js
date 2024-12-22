// src/components/Ch18MatchingGame.js
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
      term: "lipid",
      definition: "A biological compound that is soluble only in nonpolar solvents.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 2,
      term: "simple lipid",
      definition: "An ester-containing lipid with just two types of components: an alcohol and one or more fatty acids.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 3,
      term: "complex lipid",
      definition: "An ester-containing lipid with more than two types of components: an alcohol, fatty acids-plus others.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 4,
      term: "The major types of lipids",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/The major types of lipids.png",
    },
    {
      id: 5,
      term: "micelle",
      definition: "A spherical cluster of molecules in which the polar portions of the molecules are on the surface and the nonpolar portions are located in the interior.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 6,
      term: "The molecular structure of fatty acids: lauric acid and a simplified diagram of a fatty acid with a nonpolar tail and a polar head",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/The molecular structure of fatty acids.png",
    },
    {
      id: 7,
      term: "A cross section of a fatty acid micelle",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/A cross section of a fatty acid micelle.png",
    },
    {
      id: 8,
      term: "The fatty acids found in natural lipids have several characteristics in common",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/The fatty acids found in natural lipids have several characteristics in common.png",
    },
    {
      id: 9,
      term: "Some Important Fatty acids",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Some Important Fatty acids.png",
    },
    {
      id: 10,
      term: "essential fatty acid",
      definition: "A fatty acid needed by the body but not synthesized within the body.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 11,
      term: "linolenic acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/linolenic acid.png",
    },
    {
      id: 12,
      term: "Stearic Acid, Oleic Acid and Linoleic Acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Stearic Acid, Oleic Acid and Linoleic Acid.png",
    },
    {
      id: 13,
      term: "The Structure of Fats and Oils",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/The Structure of Fats and Oils.png",
    },
    {
      id: 14,
      term: "triglyceride or triacylglycerol",
      definition: "A triester of glycerol in which all three alcohol groups are esterified.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 15,
      term: "Learning Check 18.1 Write one structure (several possibilities exist) for a triglyceride derived from stearic acid, oleic acid, and palmitic acid.",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Learning Check 18.1 answer.png",
    },
    {
      id: 16,
      term: "fat",
      definition: "A triglyceride that is a solid at room temperature.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 17,
      term: "oil",
      definition: "A triglyceride that is a liquid at room temperature.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 18,
      term: "A comparison of saturated and unsaturated fatty acids in some foods",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/A comparison of saturated and unsaturated fatty acids in some foods.png",
    },
    {
      id: 19,
      term: "Hydrolysis",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Hydrolysis.png",
    },
    {
      id: 20,
      term: "Learning Check 18.2 Write the structures of the hydrolysis products of the following reaction:",
      definition: null,
      termImage: "./ch18-images/Learning Check 18.2.png",
      definitionImage: "./ch18-images/Learning Check 18.2 answer.png",
    },
    {
      id: 21,
      term: "soap",
      definition: "A salt of a fatty acid often used as a cleaning agent.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 22,
      term: "Saponifications",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Saponification.png",
    },
    {
      id: 23,
      term: "Learning Check 18.3 Write structures for the products formed when the following triglyceride is saponified using NaOH:",
      definition: null,
      termImage: "./ch18-images/Learning Check 18.3.png",
      definitionImage: "./ch18-images/Learning Check 18.3 answer.png",
    },
    {
      id: 24,
      term: "Hydrogenation",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Hydrogenation.png",
    },
    {
      id: 25,
      term: "Learning Check 18.4 If an oil with the following structure is completely hydrogenated, what is the structure of the product",
      definition: null,
      termImage: "./ch18-images/Learning Check 18.4.png",
      definitionImage: "./ch18-images/Learning Check 18.4 answer.png",
    },
    {
      id: 26,
      term: "a Reaction Map for Triglycerides",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/a Reaction Map for Triglycerides.png",
    },
    {
      id: 27,
      term: "wax",
      definition: "An ester of a long-chain fatty acid and a long-chain alcohol.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 28,
      term: "wax chart",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/wax chart.png",
    },
    {
      id: 29,
      term: "Beeswax structure",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/wax chart.png",
    },
    {
      id: 30,
      term: "phosphoglyceride",
      definition: "A complex lipid containing glycerol, fatty acids, phosphoric acid, and an aminoalcohol component.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 31,
      term: "phospholipid",
      definition: "A phosphorus containing lipid.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 32,
      term: "phosphoglyceride chart",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/phosphoglyceride chart.png",
    },
    {
      id: 33,
      term: "aminoalcohols",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/aminoalcohols.png",
    },
    {
      id: 34,
      term: "phosphatidylcholine",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/phosphatidylcholine.png",
    },
    {
      id: 35,
      term: "lecithin",
      definition: "A phosphoglyceride containing choline.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 36,
      term: "cephalin",
      definition: "A phosphoglyceride containing ethanolamine or serine.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 37,
      term: "Cephalins structure",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Cephalins structure.png",
    },
    {
      id: 38,
      term: "Learning Check 18.5 Draw a typical structure for a cephalin containing the cation of ethanolamine:",
      definition: null,
      termImage: "./ch18-images/Learning Check 18.5.png",
      definitionImage: "./ch18-images/Learning Check 18.5 answer.png",
    },
    {
      id: 39,
      term: "sphingolipid",
      definition: "A complex lipid containing the aminoalcohol sphingosine",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 40,
      term: "sphingosine",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/sphingosine.png",
    },
    {
      id: 41,
      term: "sphingomyelin chart",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/sphingomyelin chart.png",
    },
    {
      id: 42,
      term: "glycolipid",
      definition: "A complex lipid containing a sphingosine, a fatty acid, and a carbohydrate.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 43,
      term: "glycolipid chart",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/glycolipid chart.png",
    },
    {
      id: 44,
      term: "cerebroside structure",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/cerebroside structure.png",
    },
    {
      id: 45,
      term: "diseases Originating from abnormal Metabolism and accumulation of Glycolipids and Sphingomyelins",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/diseases Originating from abnormal Metabolism.png",
    },
    {
      id: 46,
      term: "prokaryotic cell",
      definition: "A simple unicellular organism that contains no nucleus and no membrane-enclosed organelles.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 47,
      term: "eukaryotic cell",
      definition: "A cell containing membrane-enclosed organelles, particularly a nucleus.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 48,
      term: "organelle",
      definition: "A specialized structure within a cell that performs a specific function.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 49,
      term: "The Functions of Some Cellular Organelles",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/The Functions of Some Cellular Organelles.png",
    },
    {
      id: 50,
      term: "fluid-mosaic model",
      definition: "A model of membrane structure in which proteins are embedded in a flexible lipid bilayer.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 51,
      term: "lipid bilayer ",
      definition: "A structure found in membranes, consisting of two sheets of lipid molecules arranged so that the hydrophobic portions are facing each other.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 52,
      term: "The fluid-mosaic model of membrane structure",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/The fluid-mosaic model of membrane structure.png",
    },
    {
      id: 53,
      term: "Lipid bilayers - Portion of a bilayer and Cutaway view of a lipid bilayer vesicle",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Lipid bilayers - Portion of a bilayer and Cutaway view of a lipid bilayer vesicle.png",
    },
    {
      id: 54,
      term: "steroid",
      definition: "A compound containing four rings fused in a particular pattern.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 55,
      term: "steroid ring system",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/steroid ring system.png",
    },
    {
      id: 56,
      term: "cholesterol",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/cholesterol.png",
    },
    {
      id: 57,
      term: "sodium glycocholate",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/sodium glycocholate.png",
    },
    {
      id: 58,
      term: "hormone",
      definition: "A chemical messenger secreted by specific glands and carried by the blood to a target tissue, where it triggers a particular response.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 59,
      term: "cortisol",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/cortisol.png",
    },
    {
      id: 60,
      term: "cortisone",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/cortisone.png",
    },
    {
      id: 61,
      term: "prednisolone",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/prednisolone.png",
    },
    {
      id: 62,
      term: "aldosterone",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/aldosterone.png",
    },
    {
      id: 63,
      term: "testosterone and methandrostenolone",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/testosterone and methandrostenolone.png",
    },
    {
      id: 64,
      term: "estradiol",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/estradiol.png",
    },
    {
      id: 65,
      term: "estrone",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/estrone.png",
    },
    {
      id: 66,
      term: "progesterone",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/progesterone.png",
    },
    {
      id: 67,
      term: "prostaglandin",
      definition: "A substance derived from unsaturated fatty acids, with hormonelike effects on a number of body tissues.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 68,
      term: "arachidonic acid prostaglandin",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/arachidonic acid prostaglandin.png",
    },
    {
      id: 69,
      term: "Hydrolysis of a triglyceride to glycerol and fatty acids-general reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Hydrolysis of a triglyceride to glycerol and fatty acids-general reaction.png",
    },
    {
      id: 70,
      term: "Saponification of a triglyceride to glycerol and fatty acid salts-general reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Saponification of a triglyceride to glycerol and fatty acid salts-general reaction.png",
    },
    {
      id: 71,
      term: "Hydrogenation of a triglyceride-general reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch18-images/Hydrogenation of a triglyceride-general reaction.png",
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
          {index === 0 && <Text style={styles.title}>Chapter 18 FlashCards</Text>}
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
      <h1>Chapter 18 Drag-and-Drop Matching Game</h1>
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
        <br />

        <a href="./CHEM 1020 Lecture Slides Chapter 18 - Copy.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1020 Lecture Slides Chapter 18 PDF
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
