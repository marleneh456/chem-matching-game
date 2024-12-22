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
      term: "The reflection of a right hand is a left hand",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The reflection of a right hand is a left hand.png",
    },
    {
      id: 13,
      term: "chiral",
      definition: "A descriptive term for compounds or objects that cannot be superimposed on their mirror image",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 14,
      term: "Two right hands can be superimposed; a right hand and a left hand cannot.",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Two right hands can be superimposed; a right hand and a left hand cannot..png",
    },
    {
      id: 15,
      term: "chiral carbon",
      definition: "A carbon atom with four different groups attached",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 16,
      term: "center carbon of glyceraldehyde",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/center carbon of glyceraldehyde.png",
    },
    {
      id: 17,
      term: "Learning Check 17.1 Which of the carbon atoms shown in color is chiral?",
      definition: null,
      termImage: "./ch17-images/Learning Check 17.1.png",
      definitionImage: "./ch17-images/Learning Check 17.1 answer.png",
    },
    {
      id: 18,
      term: "Learning Check 17.2 Identify the chiral carbon atoms in the following:",
      definition: null,
      termImage: "./ch17-images/Learning Check 17.2.png",
      definitionImage: "./ch17-images/Learning Check 17.2 answer.png",
    },
    {
      id: 19,
      term: "Learning Check 17.3 How many stereoisomers are possible for the following?",
      definition: null,
      termImage: "./ch17-images/Learning Check 17.3.png",
      definitionImage: "./ch17-images/Learning Check 17.3 answer.png",
    },
    {
      id: 20,
      term: "Fischer projection",
      definition: "A method of depicting three-dimensional shapes for chiral molecules.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 21,
      term: "Ball-and-stick models (top) and Fischer projections (bottom) of the two enantiomers of glyceraldehyde.",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Ball-and-stick models (top) and Fischer projections (bottom).png",
    },
    {
      id: 22,
      term: "Learning Check 17.4 Draw Fischer projections for the d and l forms of the following:",
      definition: null,
      termImage: "./ch17-images/Learning Check 17.4.png",
      definitionImage: "./ch17-images/Learning Check 17.4 answer.png",
    },
    {
      id: 23,
      term: "Learning Check 17.5 Identify each structure as d or l:",
      definition: null,
      termImage: "./ch17-images/Learning Check 17.5.png",
      definitionImage: "./ch17-images/Learning Check 17.5 answer.png",
    },
    {
      id: 24,
      term: "levorotatory",
      definition: "Rotates plane polarized light to the left.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 25,
      term: "dextrorotatory",
      definition: "Rotates plane polarized light to the right.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 26,
      term: "The rotation of plane-polarized light by the solution of an enantiomer.",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The rotation of plane-polarized light.png",
    },
    {
      id: 27,
      term: "optically active molecule",
      definition: "A molecule that rotates the plane of polarized light.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 28,
      term: "glucose, an aldohexose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/glucose, an aldohexose.png",
    },
    {
      id: 29,
      term: "ribulose, a ketopentose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/ribulose, a ketopentose.png",
    },
    {
      id: 30,
      term: "Monosaccharide Classification based on the Number of Carbons in Their Chains",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Monosaccharide Classification based on the Number of Carbons in Their Chains.png",
    },
    {
      id: 31,
      term: "Learning Check 17.6 Classify each of the following monosaccharides by combining the aldehyde–ketone designation with terminology indicating the number of carbon atoms:",
      definition: null,
      termImage: "./ch17-images/Learning Check 17.6.png",
      definitionImage: "./ch17-images/Learning Check 17.6 answer.png",
    },
    {
      id: 32,
      term: "The family of D aldoses, shown in Fischer projections.",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The family of D aldoses, shown in Fischer projections.png",
    },
    {
      id: 33,
      term: "The Relative Sweetness of Sugars (Sucrose = 1.00)",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The Relative Sweetness of Sugars (Sucrose = 1.00).png",
    },
    {
      id: 34,
      term: "the numbering of the carbon atoms that begins at the end of the chain, giving the lowest number to the carbonyl group carbon",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/the numbering of the carbon atoms.png",
    },
    {
      id: 35,
      term: "pyranose ring",
      definition: "A six-membered sugar ring system containing an oxygen atom.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 36,
      term: "haworth structure",
      definition: "A method of depicting three-dimensional carbohydrate structures.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 37,
      term: "anomeric carbon",
      definition: "An acetal, ketal, hemiacetal, or hemiketal carbon atom giving rise to two stereoisomers.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 38,
      term: "anomers",
      definition: "Stereoisomers that differ in the three-dimensional arrangement of groups at the carbon of an acetal, ketal, hemiacetal, or hemiketal group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 39,
      term: "Convenient condensed structures for the cyclic compounds omit the carbon atoms in the ring and the hydrogen atoms attached to the ring carbons",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Convenient condensed structures for the cyclic compounds.png",
    },
    {
      id: 40,
      term: "furanose ring",
      definition: "A five-membered sugar ring system containing an oxygen atom.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 41,
      term: "The orientation of the -OH group at position 2 determines whether fructose is in the a or b form",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The orientation of the -OH group.png",
    },
    {
      id: 42,
      term: "Haworth structures of monosaccharides",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Haworth structures of monosaccharides.png",
    },
    {
      id: 43,
      term: "Learning Check 17.7 Draw the Haworth structure for the anomer of d-ribose. Label the new compound as a or b.",
      definition: null,
      termImage: "./ch17-images/Learning Check 17.7.png",
      definitionImage: "./ch17-images/Learning Check 17.7 answer.png",
    },
    {
      id: 44,
      term: "reducing sugar",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/reducing sugar.png",
    },
    {
      id: 45,
      term: "Reducing sugar reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Reducing sugar reaction.png",
    },
    {
      id: 46,
      term: "D-glucose to D-gluconic acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/D-glucose to D-gluconic acid.png",
    },
    {
      id: 47,
      term: "glucose 6-phosphate",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/glucose 6-phosphate.png",
    },
    {
      id: 48,
      term: "fructose 6-phosphate",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/fructose 6-phosphate.png",
    },
    {
      id: 49,
      term: "glycoside",
      definition: "Another name for a carbohydrate containing an acetal or ketal group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 50,
      term: "The reaction of a-d-glucose with methanol",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The reaction of a-d-glucose with methanol.png",
    },
    {
      id: 51,
      term: "glycosidic linkage",
      definition: "The carbon–oxygen–carbon linkage that joins the components of a glycoside to the ring.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 52,
      term: "Learning Check 17.8 Two glycosides are shown below. Circle any acetal or ketal groups and use an arrow to identify the glycosidic linkages.",
      definition: null,
      termImage: "./ch17-images/Learning Check 17.8.png",
      definitionImage: "./ch17-images/Learning Check 17.8 answer.png",
    },
    {
      id: 53,
      term: "D-ribose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/D-ribose.png",
    },
    {
      id: 54,
      term: "D-deoxyribose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/D-deoxyribose.png",
    },
    {
      id: 55,
      term: "D-glucose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/D-glucose.png",
    },
    {
      id: 56,
      term: "D-galactose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/D-galactose.png",
    },
    {
      id: 57,
      term: "Maltose linkage equation",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Maltose linkage equation.png",
    },
    {
      id: 58,
      term: "maltose is a reducing sugar",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/maltose is a reducing sugar.png",
    },
    {
      id: 59,
      term: "maltose forms two molecules of d-glucose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/maltose forms two molecules of d-glucose.png",
    },
    {
      id: 60,
      term: "lactose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/lactose.png",
    },
    {
      id: 61,
      term: "sucrose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/sucrose.png",
    },
    {
      id: 62,
      term: "Benedict’s test on disaccharides",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Benedict’s test on disaccharides.png",
    },
    {
      id: 63,
      term: "invert sugar",
      definition: "A mixture of equal amounts of glucose and fructose.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 64,
      term: "mixture of d-glucose and d-fructose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/mixture of d-glucose and d-fructose.png",
    },
    {
      id: 65,
      term: "Some important Disaccharides",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Some important Disaccharides.png",
    },
    {
      id: 66,
      term: "Properties of Polysaccharides Compared with Those of Monosaccharides and Disaccharides",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Properties of Polysaccharides Compared with Those of Monosaccharides and Disaccharides.png",
    },
    {
      id: 67,
      term: "The structure of amylose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The structure of amylose.png",
    },
    {
      id: 68,
      term: "The molecular conformation of starch and the starch–iodine complex.",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The molecular conformation of starch and the starch–iodine complex.png",
    },
    {
      id: 69,
      term: "The partial structure of an amylopectin molecule. Glycogen has a similar structure.",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/structure of an amylopectin molecule.png",
    },
    {
      id: 70,
      term: "Amylopectin and Glycogen",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Amylopectin and Glycogen.png",
    },
    {
      id: 71,
      term: "The structure of cellulose",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/The structure of cellulose.png",
    },
    {
      id: 72,
      term: "Oxidation of a sugar",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Oxidation of a sugar.png",
    },
    {
      id: 73,
      term: "Glycoside formation",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Glycoside formation.png",
    },
    {
      id: 74,
      term: "Hydrolysis of disaccharides",
      definition: null,
      termImage: null,
      definitionImage: "./ch17-images/Hydrolysis of disaccharides.png",
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
