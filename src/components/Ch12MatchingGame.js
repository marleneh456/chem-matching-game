// src/components/Ch12MatchingGame.js
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
      term: "unsaturated hydrocarbon",
      definition: "A hydrocarbon containing one or more multiple bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 2,
      term: "alkene",
      definition: "A hydrocarbon containing one or more double bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 3,
      term: "alkyne",
      definition: "A hydrocarbon containing one or more triple bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 4,
      term: "aromatic hydrocarbon",
      definition: "Any organic compound that contains the characteristic benzene ring or similar feature.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 5,
      term: "ethylene - (an alkene)",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/ethylene.png",
    },
    {
      id: 6,
      term: "acetylene - (an alkyne)",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/acetylene.png",
    },
    {
      id: 7,
      term: "benzene - (an aromatic)",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/benzene.png",
    },
    {
      id: 8,
      term: "ethylene, C2H4",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/ethylene, C2H4.png",
    },
    {
      id: 9,
      term: "propylene, C3H6",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/propylene, C3H6.png",
    },
    {
      id: 10,
      term: "Three structural isomers have the formula C4H8",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Three structural isomers.png",
    },
    {
      id: 11,
      term: "The IUPAC rules for naming alkenes",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/The IUPAC rules for naming alkenes.png",
    },
    {
      id: 12,
      term: "Learning Check 12.1 Give the IUPAC name for each of the following:",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.1.png",
      definitionImage: "./ch12-images/Learning Check 12.1 answer.png",
    },
    {
      id: 13,
      term: "Learning Check 12.2 Give the IUPAC name for each of the following:",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.2.png",
      definitionImage: "./ch12-images/Learning Check 12.2 answer.png",
    },
    {
      id: 14,
      term: "Physical Properties of a Pair of Geometric Isomers",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Pair of Geometric Isomers.png",
    },
    {
      id: 15,
      term: "In 2-butene, the two different groups are a methyl and a hydrogen for each double-bonded carbon",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/each double-bonded carbon.png",
    },
    {
      id: 16,
      term: "If either double-bonded carbon is attached to identical groups, no cis-trans isomers are possible. Thus, there are no geometric isomers of ethene or propene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/either double-bonded carbon.png",
    },
    {
      id: 17,
      term: "geometric isomers of propene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/isomers of propene.png",
    },
    {
      id: 18,
      term: "Learning Check 12.3 Determine which of the following can exhibit geometric isomerism, and draw structural formulas for the cis and trans isomers of those that can:",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.3.png",
      definitionImage: "./ch12-images/Learning Check 12.3 answer.png",
    },
    {
      id: 19,
      term: "Physical Properties of Some alkenes",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Physical Properties of Some alkenes.png",
    },
    {
      id: 20,
      term: "Chemical Properties",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Chemical Properties.png",
    },
    {
      id: 21,
      term: "addition reaction",
      definition: "A reaction in which a compound adds to a multiple bond.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 22,
      term: "haloalkane or alkyl halide",
      definition: "A derivative of an alkane in which one or more hydrogens are replaced by halogens.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 23,
      term: "reaction of 1-butene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/reaction of 1-butene.png",
    },
    {
      id: 24,
      term: "The reaction of bromine with an unsaturated hydrocarbon.",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/The reaction of bromine.png",
    },
    {
      id: 25,
      term: "Learning Check 12.4 Write the structural formula for the product of each of the following reactions:",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.4.png",
      definitionImage: "./ch12-images/Learning Check 12.4 answer.png",
    },
    {
      id: 26,
      term: "hydrogenation example",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/hydrogenation example.png",
    },
    {
      id: 27,
      term: "hydrogenation",
      definition: "A reaction in which the addition of hydrogen takes place.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 28,
      term: "polyunsaturated",
      definition: "A term usually applied to molecules with several double bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 29,
      term: "Learning Check 12.5 Write the structural formula for the product of each of the following reactions:",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.5.png",
      definitionImage: "./ch12-images/Learning Check 12.5 answer.png",
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
      term: "Markovnikov’s rule",
      definition: "In the addition of H-X to an alkene, the hydrogen becomes attached to the carbon atom that is already bonded to more hydrogens.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 32,
      term: "The reaction with HCl",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/The reaction with HCl.png",
    },
    {
      id: 33,
      term: "the reaction of HBr with propene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/the reaction of HBr with propene.png",
    },
    {
      id: 34,
      term: "rule to propene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/rule to propene.png",
    },
    {
      id: 35,
      term: "Learning Check 12.6 Use Markovnikov’s rule to predict the major product in the following reactions:",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.6.png",
      definitionImage: "./ch12-images/Learning Check 12.6 answer.png",
    },
    {
      id: 36,
      term: "hydration",
      definition: "The addition of water to a multiple bond.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 37,
      term: "H2O is written H-OH to emphasize the portions that add to the double bond.",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/H-OH to emphasize.png",
    },
    {
      id: 38,
      term: "hydration of fumaric acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/hydration of fumaric acid.png",
    },
    {
      id: 39,
      term: "Learning Check 12.7  Draw structural formulas for the major organic product of each of the following reactions:",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.7.png",
      definitionImage: "./ch12-images/Learning Check 12.7 answer.png",
    },
    {
      id: 40,
      term: "polymerization",
      definition: "A reaction that produces a polymer.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 41,
      term: "polymer",
      definition: "A very large molecule made up of repeating units.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 42,
      term: "addition polymer",
      definition: "A polymer formed by the linking together of many alkene molecules through addition reactions.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 43,
      term: "monomer",
      definition: "The starting material that becomes the repeating units of polymers.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 44,
      term: "ethylene molecules reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/ethylene molecules reaction.png",
    },
    {
      id: 45,
      term: "The polymerization reaction of ethylene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/The polymerization reaction of ethylene.png",
    },
    {
      id: 46,
      term: "a Reaction Map for alkenes",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/a Reaction Map for alkenes.png",
    },
    {
      id: 47,
      term: "the polymerization of vinyl chloride gives the polymer poly",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/the polymerization of vinyl chloride.png",
    },
    {
      id: 48,
      term: "Common polymer-based consumer products",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Common polymer-based consumer products.png",
    },
    {
      id: 49,
      term: "vinyl chloride to Saran Wrap",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/vinyl chloride to Saran Wrap.png",
    },
    {
      id: 50,
      term: "copolymer",
      definition: "An addition polymer formed by the reaction of two different monomers.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 51,
      term: "Common addition Polymers",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Common addition Polymers.png",
    },
    {
      id: 52,
      term: "Learning Check 12.8 Draw the structural formula of a portion of polypropylene containing four repeating units of the monomer propylene,",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.8.png",
      definitionImage: "./ch12-images/Learning Check 12.8 answer.png",
    },
    {
      id: 53,
      term: "1-butyne",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/1-butyne.png",
    },
    {
      id: 54,
      term: "3-methyl-1-butyne",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/3-methyl-1-butyne.png",
    },
    {
      id: 55,
      term: "Learning Check 12.9 Give the IUPAC name for each of the following:",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.9.png",
      definitionImage: "./ch12-images/Learning Check 12.9 answer.png",
    },
    {
      id: 56,
      term: "aliphatic compound",
      definition: "Any organic compound that is not aromatic.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 57,
      term: "The Hydration of Alkenes: an Addition Reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/The Hydration of Alkenes: an Addition Reaction.png",
    },
    {
      id: 58,
      term: "derivative of benzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/derivative of benzene.png",
    },
    {
      id: 59,
      term: "aminobenzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/aminobenzene.png",
    },
    {
      id: 60,
      term: "phenyl group benzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/phenyl group benzene.png",
    },
    {
      id: 61,
      term: "phenyl group benzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/phenyl group benzene.png",
    },
    {
      id: 62,
      term: "phenyl group",
      definition: "A benzene ring with one hydrogen absent, C6H5-.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 63,
      term: "o-dibromobenzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/o-dibromobenzene.png",
    },
    {
      id: 64,
      term: "m-dibromobenzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/m-dibromobenzene.png",
    },
    {
      id: 65,
      term: "p-dibromobenzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/p-dibromobenzene.png",
    },
    {
      id: 66,
      term: "m-bromochlorobenzene or 1-bromo-3-chlorobenzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/m-bromochlorobenzene or 1-bromo-3-chlorobenzene.png",
    },
    {
      id: 67,
      term: "1,2,4-trichlorobenzene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/1,2,4-trichlorobenzene.png",
    },
    {
      id: 68,
      term: "3,5-dichlorobenzoic acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/3,5-dichlorobenzoic acid.png",
    },
    {
      id: 69,
      term: "Learning Check 12.10 Name the following aromatic compounds",
      definition: null,
      termImage: "./ch12-images/Learning Check 12.10.png",
      definitionImage: "./ch12-images/Learning Check 12.10 answer.png",
    },
    {
      id: 70,
      term: "polycyclic aromatic compound",
      definition: "A derivative of benzene in which carbon atoms are shared between two or more benzene rings.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 71,
      term: "naphthalene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/naphthalene.png",
    },
    {
      id: 72,
      term: "a benzopyrene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/a benzopyrene.png",
    },
    {
      id: 73,
      term: "a dibenzanthracene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/a dibenzanthracene.png",
    },
    {
      id: 74,
      term: "Some Important aromatic Compounds",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Some Important aromatic Compounds.png",
    },
    {
      id: 75,
      term: "Halogenation of an alkene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Halogenation of an alkene.png",
    },
    {
      id: 76,
      term: "Hydrogenation of an alkene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Hydrogenation of an alkene.png",
    },
    {
      id: 77,
      term: "Addition of H-X to an alkene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Addition of H-X to an alkene.png",
    },
    {
      id: 78,
      term: "Hydration of an alkene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Hydration of an alkene.png",
    },
    {
      id: 79,
      term: "Addition polymerization of an alkene",
      definition: null,
      termImage: null,
      definitionImage: "./ch12-images/Addition polymerization of an alkene.png",
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
          {index === 0 && <Text style={styles.title}>Chapter 12 FlashCards</Text>}
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
      <h1>Chapter 12 Drag-and-Drop Matching Game</h1>
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
