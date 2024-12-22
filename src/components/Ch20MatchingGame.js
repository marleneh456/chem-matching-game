// src/components/Ch20MatchingGame.js
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
      definitionImage: "./ch20-images/Catalytic Efficiency.png",
    },
    {
      id: 3,
      term: "The influence of enzymes on the rates of reactions",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/rates of reactions.png",
    },
    {
      id: 4,
      term: "Enzyme specificity is a second characteristic that is important in life processes",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Enzyme specificity.png",
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
      definitionImage: "./ch20-images/hydrolysis of urea.png",
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
      definitionImage: "./ch20-images/active enzyme.png",
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
    {
      id: 35,
      term: "the participation of NAD+ in the oxidation of lactate by the enzyme lactate dehydrogenase (LDH)",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/oxidation of lactate.png",
    },
    {
      id: 36,
      term: "active site",
      definition: "The location on an enzyme where a substrate is bound and catalysis occurs.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 37,
      term: "The Mechanism of Enzyme general reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/The Mechanism of Enzyme general reaction.png",
    },
    {
      id: 38,
      term: "lock-and-key theory",
      definition: "A theory of enzyme specificity proposing that a substrate has a shape fitting that of the enzyme’s active site, as a key fits a lock.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 39,
      term: "induced-fit theory",
      definition: "A theory of enzyme action proposing that the conformation of an enzyme changes to accommodate an incoming substrate.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 40,
      term: "lock-and-key model",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/lock-and-key model.png",
    },
    {
      id: 41,
      term: "induced-fit model",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/induced-fit model.png",
    },
    {
      id: 42,
      term: "enzyme activity",
      definition: "A theory of enzyme action proposing that the conformation of an enzyme changes to accommodate an incoming substrate.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 43,
      term: "induced-fit theory",
      definition: "A theory of enzyme action proposing that the conformation of an enzyme changes to accommodate an incoming substrate.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 44,
      term: "Examples of Enzyme Turnover Numbers",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Examples of Enzyme Turnover Numbers.png",
    },
    {
      id: 45,
      term: "enzyme international unit (IU)",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/enzyme international unit (IU) .png",
    },
    {
      id: 46,
      term: "Learning Check 20.2 Differentiate between the terms turnover number and enzyme international unit.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Learning Check 20.2.png",
    },
    {
      id: 47,
      term: "When the enzyme concentration is increased, the concentration of ES also increases in compliance with reaction rate theory",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/the concentration of ES.png",
    },
    {
      id: 48,
      term: "The effect of enzyme concentration on the rate of a reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/The effect of enzyme concentration.png",
    },
    {
      id: 49,
      term: "Substrate Concentration graph",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Substrate Concentration graph.png",
    },
    {
      id: 50,
      term: "Temperature graph",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Temperature graph.png",
    },
    {
      id: 51,
      term: "The Effect of pH graph",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/The Effect of pH graph.png",
    },
    {
      id: 52,
      term: "optimum temperature",
      definition: "The temperature at which enzyme activity is highest.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 53,
      term: "optimum ph",
      definition: "The pH at which enzyme activity is highest.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 54,
      term: "The Effect of pH graph",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Examples of Optimum pH for Enzyme Activity.png",
    },
    {
      id: 55,
      term: "Learning Check 20.3 Indicate how each of the following affects the rate of an enzyme-catalyzed reaction: a. Increase in enzyme concentration",
      definition: "An increase in enzyme concentration increases the rate of an enzyme-catalyzed reaction",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 56,
      term: "Learning Check 20.3 Indicate how each of the following affects the rate of an enzyme-catalyzed reaction: b. Increase in substrate concentration",
      definition: "An increase in substrate concentration increases the rate until the enzyme is saturated. Above the saturation point, the rate of reaction is constant.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 57,
      term: "Learning Check 20.3 Indicate how each of the following affects the rate of an enzyme-catalyzed reaction: c. Increase in temperature",
      definition: "An increase in temperature increases the rate of the enzyme-catalyzed reaction until the optimum temperature is reached. Above the optimum temperature, the rate decreases.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 58,
      term: "Learning Check 20.3 Indicate how each of the following affects the rate of an enzyme-catalyzed reaction: Increase in pH",
      definition: "An increase in pH increases the reaction rate until the optimum pH is reached. Above the optimum pH, the rate decreases.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 59,
      term: "enzyme inhibitor",
      definition: "A substance that decreases the activity of an enzyme.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 60,
      term: "cytochrome oxidase to stable complex",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/cytochrome oxidase to stable complex.png",
    },
    {
      id: 61,
      term: "cyanide plus thiosulfate to thiocyanate plus sulfite",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/cyanide plus thiosulfate to thiocyanate plus sulfite.png",
    },
    {
      id: 62,
      term: "active enzyme to inactive enzyme",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/active enzyme to inactive enzyme.png",
    },
    {
      id: 63,
      term: "calcium ions of the salt are displaced by heavy-metal ions, such as lead, that bind to the chelate more tightly",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/calcium ions of the salt.png",
    },
    {
      id: 64,
      term: "extremozyme",
      definition: "A nickname for certain enzymes isolated from microorganisms that thrive in extreme environments.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 65,
      term: "antibiotic",
      definition: "A substance produced by one microorganism that kills or inhibits the growth of other microorganisms.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 66,
      term: "Four Widely Used Penicillins",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Four Widely Used Penicillins.png",
    },
    {
      id: 67,
      term: "Reversible Inhibition",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Reversible Inhibition.png",
    },
    {
      id: 68,
      term: "Succinate dehydrogenase catalyzes the oxidation of the substrate succinate to form fumarate by transferring two hydrogens to the coenzyme FAD",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Succinate dehydrogenase.png",
    },
    {
      id: 69,
      term: "competitive inhibitor ",
      definition: "An inhibitor that competes with substrate for binding at the active site of the enzyme.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 70,
      term: "succinate",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/succinate.png",
    },
    {
      id: 71,
      term: "malonate",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/malonate.png",
    },
    {
      id: 72,
      term: "Structural relationships of sulfanilamide, p-aminobenzoic acid, and folic acid.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Structural relationships of sulfanilamide.png",
    },
    {
      id: 73,
      term: "The behavior of competitive inhibitors",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/The behavior of competitive inhibitors.png",
    },
    {
      id: 74,
      term: "illustrated by the following equilibria that would exist in a solution containing enzyme (E), substrate (S), and competitive inhibitor (I)",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/equilibrium.png",
    },
    {
      id: 75,
      term: "noncompetitive inhibitor",
      definition: "An inhibitor that binds to the enzyme at a location other than the active site.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 76,
      term: "The behavior of noncompetitive inhibitors",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/The behavior of noncompetitive inhibitors.png",
    },
    {
      id: 77,
      term: "Learning Check 20.4 Compare a noncompetitive and a competitive inhibitor with regard to the following: a. Resemblance to substrate",
      definition: "The structure of a competitive inhibitor resembles that of the substrate. The structure of a noncompetitive inhibitor bears no resemblance to that of the substrate.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 78,
      term: "Learning Check 20.4 Compare a noncompetitive and a competitive inhibitor with regard to the following: b. Binding site on the enzyme",
      definition: "A competitive inhibitor binds at the active site. A noncompetitive inhibitor binds at some other region of the enzyme.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 79,
      term: "Learning Check 20.4 Compare a noncompetitive and a competitive inhibitor with regard to the following: c. The effect of increasing substrate concentration",
      definition: "Increasing substrate concentration reverses the effect of a competitive inhibitor, but has no effect on a noncompetitive inhibitor.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 80,
      term: "zymogen or proenzyme",
      definition: "The inactive precursor of an enzyme.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 81,
      term: "The products are the active enzyme (trypsin) and a hexapeptide",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/active enzyme (trypsin).png",
    },
    {
      id: 82,
      term: "Examples of Zymogen",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Examples of Zymogen.png",
    },
    {
      id: 83,
      term: "modulator",
      definition: "A substance that binds to an enzyme at a location other than the active site and alters the catalytic activity.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 84,
      term: "allosteric enzyme",
      definition: "An enzyme with a quaternary structure whose activity is changed by the binding of modulators.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 85,
      term: "activator",
      definition: "A substance that binds to an allosteric enzyme and increases its activity.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 86,
      term: "The allosteric regulation of threonine deaminase by isoleucine",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/The allosteric regulation of threonine.png",
    },
    {
      id: 87,
      term: "feedback inhibition",
      definition: "A process in which the end product of a sequence of enzyme-catalyzed reactions inhibits an earlier step in the process.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 88,
      term: "enzyme induction",
      definition: "The synthesis of an enzyme in response to a cellular need.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 89,
      term: "A Summary Chart of Enzyme Inhibitors",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/A Summary Chart of Enzyme Inhibitors.png",
    },
    {
      id: 90,
      term: "the hydrolysis of lactose to d-galactose and d-glucose.",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/the hydrolysis of lactose.png",
    },
    {
      id: 91,
      term: "Learning Check 20.5 Explain how each of the following processes is involved in the regulation of enzyme activity: a. Activation of zymogens",
      definition: "Several enzymes are synthesized in inactive forms called zymogens. Under the proper reaction conditions, zymogens are activated to carry out their catalytic role.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 92,
      term: "Learning Check 20.5 Explain how each of the following processes is involved in the regulation of enzyme activity: b. Allosteric regulation",
      definition: "The catalytic ability of allosteric enzymes may be either increased or decreased by the binding of modulators.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 93,
      term: "Learning Check 20.5 Explain how each of the following processes is involved in the regulation of enzyme activity: c. Genetic control",
      definition: "Certain enzymes are synthesized in greater amounts when needed and in smaller amounts when not needed.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 94,
      term: "isoenzyme",
      definition: "A slightly different form of the same enzyme produced by different tissues.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 95,
      term: "Diagnostically Useful Assays of Blood Serum Enzymes",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Diagnostically Useful Assays of Blood Serum Enzymes.png",
    },
    {
      id: 96,
      term: "Isomeric forms (isoenzymes) of lactate dehydrogenase",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Isomeric forms (isoenzymes).png",
    },
    {
      id: 97,
      term: "Tissue Distribution of LDH Isoenzymes",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Tissue Distribution of LDH Isoenzymes.png",
    },
    {
      id: 98,
      term: "Formation of an active enzyme",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Formation of an active enzyme.png",
    },
    {
      id: 99,
      term: "Mechanism of enzyme action",
      definition: null,
      termImage: null,
      definitionImage: "./ch20-images/Mechanism of enzyme action.png",
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
          {index === 0 && <Text style={styles.title}>Chapter 20 FlashCards</Text>}
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
      <h1>Chapter 20 Drag-and-Drop Matching Game</h1>
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
