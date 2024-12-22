// src/components/Ch19MatchingGame.js
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
      term: "alpha-amino acid",
      definition: "An organic compound containing both an amino group and a carboxylate group, with the amino group attached to the carbon next to the carboxylate group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 2,
      term: "The structure of proline",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/The structure of proline.png",
    },
    {
      id: 3,
      term: "The general structure of alpha-amino acids",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/The general structure of alpha-amino acids.png",
    },
    {
      id: 4,
      term: "cysteine (Cys) C",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/cysteine (Cys) C.png",
    },
    {
      id: 5,
      term: "glutamine (Gln) Q",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/cysteine (Cys) C.png",
    },
    {
      id: 6,
      term: "asparagine (Asn) N",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/asparagine (Asn) N.png",
    },
    {
      id: 7,
      term: "an L-amino acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/an L-amino acid.png",
    },
    {
      id: 8,
      term: "a D-amino acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/a D-amino acid.png",
    },
    {
      id: 9,
      term: "NEUTRAL, NONPOLAR SIDE CHAINS",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/NEUTRAL, NONPOLAR SIDE CHAINS.png",
    },
    {
      id: 10,
      term: "NEUTRAL, POLAR SIDE CHAINS",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/NEUTRAL, POLAR SIDE CHAINS.png",
    },
    {
      id: 11,
      term: "BASIC, POLAR SIDE CHAINS",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/BASIC, POLAR SIDE CHAINS.png",
    },
    {
      id: 12,
      term: "ACIDIC, POLAR SIDE CHAINS",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/ACIDIC, POLAR SIDE CHAINS.png",
    },
    {
      id: 13,
      term: "zwitterion",
      definition: "A dipolar ion that carries both a positive and a negative charge as a result of an internal acid–base reaction in an amino acid molecule.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 14,
      term: "the transfer of a hydrogen ion in a kind of internal acid–base reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/the transfer of a hydrogen ion.png",
    },
    {
      id: 15,
      term: "hydrochloric acid, the carboxylate group (-COO -) of the zwitterion can pick up a proton to form –COOH",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/hydrochloric acid, the carboxylate group.png",
    },
    {
      id: 16,
      term: "When the pH of the solution is increased by adding OH-, the –NH3+ of the zwitterion can lose a proton, and the zwitterion is converted into a negatively charged form",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/When the pH of the solution is increased by adding OH-.png",
    },
    {
      id: 17,
      term: "isoelectric point",
      definition: "The characteristic solution pH at which an amino acid has a net charge of 0.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 18,
      term: "Learning Check 19.1 Draw the structure of the amino acid serine",
      definition: null,
      termImage: "./ch19-images/Learning Check 19.1.png",
      definitionImage: "./ch19-images/Learning Check 19.1 answer.png",
    },
    {
      id: 19,
      term: "Oxidation of Cysteine",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Oxidation of Cysteine.png",
    },
    {
      id: 20,
      term: "Peptide Formation",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Peptide Formation.png",
    },
    {
      id: 21,
      term: "glycine Formation",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/glycine Formation.png",
    },
    {
      id: 22,
      term: "dipeptide",
      definition: "A compound formed when two amino acids are bonded by an amide linkage.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 23,
      term: "peptide linkage or peptide bond ",
      definition: "The amide linkage between amino acids that results when the amino group of one acid reacts with the carboxylate group of another.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 24,
      term: "peptide",
      definition: "An amino acid polymer of short chain length.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 25,
      term: "polypeptide",
      definition: "An amino acid polymer of intermediate chain length containing up to 50 amino acid residues.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 26,
      term: "protein",
      definition: "An amino acid polymer made up of more than 50 amino acids.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 27,
      term: "amino acid residue",
      definition: "An amino acid that is a part of a peptide, polypeptide, or protein chain.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 28,
      term: "N-terminal residue",
      definition: "An amino acid on the end of a chain that has an unreacted or free amino group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 29,
      term: "C-terminal residue",
      definition: "An amino acid on the end of a chain that has an unreacted or free carboxylate group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 30,
      term: "a different dipeptide could also form by linking glycine and alanine the other way",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/a different dipeptide.png",
    },
    {
      id: 31,
      term: "valine could be attached to alanylglycine",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/valine could be attached to alanylglycine.png",
    },
    {
      id: 32,
      term: "alanine is the N-terminal residue and valine is the C-terminal residue in the tripeptide alanylglycylvaline",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/alanine is the N-terminal residue.png",
    },
    {
      id: 33,
      term: "Learning Check 19.2 Use Table 19.1 to draw the full structure of the following tetrapeptide. Label the N-terminal and C-terminal residues. Phe-Cys-Ser-Ile",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Learning Check 19.2 answer.png",
    },
    {
      id: 34,
      term: "disulfide bridge",
      definition: "A bond produced by the oxidation of -SH groups on two cysteine residues. The bond loops or holds two peptide chains together.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 35,
      term: "The structures of vasopressin and oxytocin",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/The structures of vasopressin and oxytocin.png",
    },
    {
      id: 36,
      term: "The amino acid sequence of ACTH",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/The amino acid sequence of ACTH.png",
    },
    {
      id: 37,
      term: "examples of Peptide or Protein Hormones",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/examples of Peptide or Protein Hormones.png",
    },
    {
      id: 38,
      term: "Molecular Weights of Some Common Proteins",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Molecular Weights of Some Common Proteins.png",
    },
    {
      id: 39,
      term: "Catalytic function",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Catalytic function.png",
    },
    {
      id: 40,
      term: "Structural function",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Structural function.png",
    },
    {
      id: 41,
      term: "Storage function",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Storage function.png",
    },
    {
      id: 42,
      term: "Protective function",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Protective function.png",
    },
    {
      id: 43,
      term: "antibody",
      definition: "A substance that helps protect the body from invasion by viruses, bacteria, and other foreign substances.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 44,
      term: "Biological Functions of Proteins",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Biological Functions of Proteins.png",
    },
    {
      id: 45,
      term: "Regulatory function",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Regulatory function.png",
    },
    {
      id: 46,
      term: "Nerve impulse transmission",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Nerve impulse transmission.png",
    },
    {
      id: 47,
      term: "Movement function",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Movement function.png",
    },
    {
      id: 48,
      term: "Transport function",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Transport function.png",
    },
    {
      id: 49,
      term: "fibrous protein",
      definition: "A protein made up of long rod-shaped or stringlike molecules that intertwine to form fibers.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 50,
      term: "globular protein",
      definition: "A spherical protein that usually forms stable suspensions in water or dissolves in water",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 51,
      term: "simple protein",
      definition: "A protein made up entirely of amino acid residues.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 52,
      term: "conjugated protein",
      definition: "A protein made up of amino acid residues and other organic or inorganic components.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 53,
      term: "prosthetic group",
      definition: "The non-amino acid parts of conjugated proteins.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 54,
      term: "Conjugated Proteins",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Conjugated Proteins.png",
    },
    {
      id: 55,
      term: "protein backbone (in color)",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/protein backbone (in color).png",
    },
    {
      id: 56,
      term: "primary protein structure",
      definition: "The linear sequence of amino acid residues in a protein chain.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 57,
      term: "The amino acid sequence (primary structure) of human insulin",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/The amino acid sequence (primary structure) of human insulin.png",
    },
    {
      id: 58,
      term: "Some Proteins Whose Sequence of Amino Acids Is known",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Some Proteins Whose Sequence of Amino Acids Is known.png",
    },
    {
      id: 59,
      term: "Two representations of the alpha-helix, showing hydrogen bonds between amide groups",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Two representations of the alpha-helix, showing hydrogen bonds between amide groups.png",
    },
    {
      id: 60,
      term: "secondary protein structure",
      definition: "The arrangement of protein chains into patterns as a result of hydrogen bonds between amide groups of amino acid residues in the chain. The common secondary structures are the alpha-helix and the beta-pleated sheet.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 61,
      term: "alpha-helix",
      definition: "The helical structure in proteins that is maintained by hydrogen bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 62,
      term: "beta-pleated sheet",
      definition: "A secondary protein structure in which protein chains are aligned side by side in a sheetlike array held together by hydrogen bonds.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 63,
      term: "The beta-pleated sheet. The four dots show hydrogen bonds between adjacent protein chains.",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/The four dots show hydrogen bonds between adjacent protein chains.png",
    },
    {
      id: 64,
      term: "A segment of a protein showing areas of a-helical, b-pleated sheet, and coil molecular structure.",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/A segment of a protein showing areas of a-helical.png",
    },
    {
      id: 65,
      term: "tertiary protein structure",
      definition: "A specific three-dimensional shape of a protein resulting from interactions between R groups of the amino acid residues in the protein.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 66,
      term: "Disulfide bridges",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Disulfide bridges.png",
    },
    {
      id: 67,
      term: "Salt bridges",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Salt bridges.png",
    },
    {
      id: 68,
      term: "Hydrogen bonds",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Hydrogen bonds.png",
    },
    {
      id: 69,
      term: "R-group interactions leading to tertiary protein structure",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/R-group interactions leading to tertiary protein structure.png",
    },
    {
      id: 70,
      term: "A globular protein with a hydrophobic region on the inside and polar groups on the outside extending into the aqueous surroundings.",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/A globular protein with a hydrophobic region.png",
    },
    {
      id: 71,
      term: "Learning Check 19.3",
      definition: null,
      termImage: "./ch19-images/Learning Check 19.3.png",
      definitionImage: "./ch19-images/Learning Check 19.3 answer.png",
    },
    {
      id: 72,
      term: "subunit",
      definition: "A polypeptide chain having primary, secondary, and tertiary structural features that is a part of a larger protein.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 73,
      term: "quaternary protein structure",
      definition: "The arrangement of subunits that form a larger protein.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 74,
      term: "Hemoglobin exhibits quaternary structure with two a-chains and two b-chains. The purple disks are heme groups.",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Hemoglobin exhibits quaternary structure with two a-chains and two b-chains.png",
    },
    {
      id: 75,
      term: "The structure of hemoglobin",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/The structure of hemoglobin.png",
    },
    {
      id: 76,
      term: "Hydrolysis",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Hydrolysis.png",
    },
    {
      id: 77,
      term: "native state",
      definition: "The natural three-dimensional conformation of a functional protein.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 78,
      term: "denaturation",
      definition: "The process by which a protein loses its characteristic native structure and function.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 79,
      term: "Protein denaturation and coagulation of the proteins",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Protein denaturation and coagulation of the proteins.png",
    },
    {
      id: 80,
      term: "Substances and Conditions That Denature Proteins",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Substances and Conditions That Denature Proteins.png",
    },
    {
      id: 81,
      term: "Formation of a zwitterion",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Formation of a zwitterion.png",
    },
    {
      id: 82,
      term: "Conversion of a zwitterion to a cation in an acidic solution",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Conversion of a zwitterion to a cation in an acidic solution.png",
    },
    {
      id: 83,
      term: "Conversion of a zwitterion to an anion in a basic solution",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Conversion of a zwitterion to an anion in a basic solution.png",
    },
    {
      id: 84,
      term: "Oxidation of cysteine to cystine",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Oxidation of cysteine to cystine.png",
    },
    {
      id: 85,
      term: "Formation of a peptide linkage-general reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Formation of a peptide linkage-general reaction.png",
    },
    {
      id: 86,
      term: "Hydrolysis of proteins in acid or base",
      definition: null,
      termImage: null,
      definitionImage: "./ch19-images/Hydrolysis of proteins in acid or base.png",
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
          {index === 0 && <Text style={styles.title}>Chapter 19 FlashCards</Text>}
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
      <h1>Chapter 19 Drag-and-Drop Matching Game</h1>
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
