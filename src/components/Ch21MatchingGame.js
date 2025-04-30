// src/components/Ch21MatchingGame.js
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./styles.css";

const defaultItems = [
  {
    id: 1,
    term: "nucleic acid",
    definition: "A biomolecule involved in the transfer of genetic information from existing cells to new cells.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 2,
    term: "ribonucleic acid (RNA) ",
    definition: "A nucleic acid found mainly in the cytoplasm of cells.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 3,
    term: "deoxyribonucleic acid (DNA) ",
    definition: "A nucleic acid found primarily in the nuclei of cells.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 4,
    term: "nucleotide",
    definition: "The repeating structural unit or monomer of polymeric nucleic acids.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 5,
    term: "Components of Nucleic Acids",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The composition of nucleic acids.png",
  },
  {
    id: 6,
    term: "pyrimidine",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/pyrimidine.png",
  },
  {
    id: 7,
    term: "purine",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/purine.png",
  },
  {
    id: 8,
    term: "D-ribose",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/D-ribose.png",
  },
  {
    id: 9,
    term: "D-deoxyribose",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/D-deoxyribose.png",
  },
  {
    id: 10,
    term: "Pyrimidines group",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Pyrimidines group.png",
  },
  {
    id: 11,
    term: "Purines group",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Purines group.png",
  },
  {
    id: 12,
    term: "Phosphate",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Phosphate.png",
  },
  {
    id: 13,
    term: "The formation of a nucleotide from the three components",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/formation of a nucleotide.png",
  },
  {
    id: 14,
    term: "The general structure of a nucleotide",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/general structure of a nucleotide.png",
  },
  {
    id: 15,
    term: "nucleic acid backbone ",
    definition: "The sugar–phosphate chain that is common to all nucleic acids.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 16,
    term: "The nucleic acid backbone structure",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The nucleic acid backbone structure.png",
  },
  {
    id: 17,
    term: "Learning Check 21.1 Draw the structural formula for a trinucleotide portion of DNA with the sequence CTG. Point out the 5' and 3' ends of the molecule. Indicate with arrows the phosphodiester linkages. Enclose the nucleotide corresponding to T in a box with dotted lines.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Learning Check 21.1 answer.png",
  },
  {
    id: 18,
    term: "The structure of ACGT, a tetranucleotide segment of DNA",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/structure of ACGT.png",
  },
  {
    id: 19,
    term: "The double helix of DNA",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The double helix of DNA.png",
  },
  {
    id: 20,
    term: "complementary DNA strands",
    definition: "Two strands of DNA in a double-helical form such that adenine and guanine of one strand are matched and hydrogen bonded to thymine and cytosine, respectively, of the second strand.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 21,
    term: "Hydrogen bonding between complementary base pairs holds the two strands of a DNA molecule together.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Hydrogen bonding.png",
  },
  {
    id: 22,
    term: "Learning Check 21.2 Write the complementary base sequence for the DNA strand TTACG.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/learning Check 21.2 answer.png",
  },
  {
    id: 23,
    term: "chromosome",
    definition: "A tightly packed bundle of DNA and protein that is involved in cell division.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 24,
    term: "DNA Replication",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/DNA Replication.png",
  },
  {
    id: 25,
    term: "gene",
    definition: "An individual section of a chromosomal DNA molecule that is the fundamental unit of heredity.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 26,
    term: "replication",
    definition: "The process by which an exact copy of a DNA molecule is produced.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 27,
    term: "semiconservative replication",
    definition: "A replication process that produces DNA molecules containing one strand from the parent and a new strand that is complementary to the strand from the parent.",
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
    term: "A schematic diagram of the replication of DNA",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/the replication of DNA.png",
  },
  {
    id: 30,
    term: "The process of replication step 1",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The process of replication step 1.png",
  },
  {
    id: 31,
    term: "The process of replication step 2",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The process of replication step 2.png",
  },
  {
    id: 32,
    term: "The process of replication step 3",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The process of replication step 3.png",
  },
  {
    id: 33,
    term: "replication fork",
    definition: "A point where the double helix of a DNA molecule unwinds during replication.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 34,
    term: "The replication of DNA. Both new strands are growing in the 5' to 3' direction.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The replication of DNA of 5' and 3'.png",
  },
  {
    id: 35,
    term: "Okazaki fragment",
    definition: "A DNA fragment produced during replication as a result of strand growth in a direction away from the replication fork.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 36,
    term: "A schematic representation of eukaryotic chromosome replication",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/eukaryotic chromosome replication.png",
  },
  {
    id: 37,
    term: "three-step replication cycles",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/three-step replication cycles.png",
  },
  {
    id: 38,
    term: "A portion of RNA that has folded back on itself and formed a double-helical region.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/A portion of RNA.png",
  },
  {
    id: 39,
    term: "messenger RNA (mRNA)",
    definition: "RNA that carries genetic information from the DNA in the cell nucleus to the site of protein synthesis in the cytoplasm.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 40,
    term: "ribosomal RNA (rRNA)",
    definition: "RNA that constitutes about 65% of the material in ribosomes, the sites of protein synthesis.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 41,
    term: "ribosome",
    definition: "A subcellular particle that serves as the site of protein synthesis in all organisms.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 42,
    term: "transfer RNA (tRNA)",
    definition: "A theory of enzyme action proposing that the conformation of an enzyme changes to accommodate an incoming substrate.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 43,
    term: "Different Forms of RNA Molecules in Escherichia coli (E. coli)",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Different Forms of RNA Molecules.png",
  },
  {
    id: 44,
    term: "The typical tRNA cloverleaf structure",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The typical tRNA cloverleaf structure.png",
  },
  {
    id: 45,
    term: "anticodon",
    definition: "A three-base sequence in tRNA that is complementary to one of the codons in mRNA.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 46,
    term: "An activated tRNA: general structure and a schematic representation.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/general structure and a schematic representation.png",
  },
  {
    id: 47,
    term: "central dogma of molecular biology",
    definition: "The well-established process by which genetic information stored in DNA molecules is expressed in the structure of synthesized proteins.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 48,
    term: "transcription",
    definition: "The transfer of genetic information from a DNA molecule to a molecule of messenger RNA.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 49,
    term: "translation",
    definition: "The conversion of the code carried by messenger RNA into an amino acid sequence of a protein.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 50,
    term: "The flow of genetic information in the cell",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The flow of genetic information in the cell.png",
  },
  {
    id: 51,
    term: "The synthesis of mRNA",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The synthesis of mRNA.png",
  },
  {
    id: 52,
    term: "Learning Check 21.3 Write the sequence for the mRNA that could be synthesized on the following DNA template: 5' A–T–T–A–G–C–C–G 3' ",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Learning Check 21.3 answer.png",
  },
  {
    id: 53,
    term: "intron",
    definition: "A segment of a eukaryotic DNA molecule that carries no codes for amino acids.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 54,
    term: "exon",
    definition: "A segment of a eukaryotic DNA molecule that is coded for amino acids.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 55,
    term: "heterogeneous nuclear RNA (hnRNA) ",
    definition: "RNA produced when both introns and exons of eukaryotic cellular DNA are transcribed.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 56,
    term: "Segments of hnRNA formed from introns of eukaryotic cells are removed by special enzymes to produce mRNA.",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Segments of hnRNA.png",
  },
  {
    id: 57,
    term: "codon",
    definition: "A sequence of three nucleotide bases that represents a code word on mRNA molecules.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 58,
    term: "The Genetic Code: mRNA Codons for each of the 20 Amino Acids",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The Genetic Code mRNA Codons.png",
  },
  {
    id: 59,
    term: "General Characteristics of the Genetic Code",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/General Characteristics of the Genetic Code.png",
  },
  {
    id: 60,
    term: "The stages of protein synthesis",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The stages of protein synthesis.png",
  },
  {
    id: 61,
    term: "N-formylmethionine (fMet)",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/N-formylmethionine (fMet).png",
  },
  {
    id: 62,
    term: "Initiation complex formation",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Initiation complex formation.png",
  },
  {
    id: 63,
    term: "stem cell",
    definition: "An unspecialized cell that has the ability to replicate and differentiate, giving rise to a specialized cell.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 64,
    term: "The amino acid at the P site bonds through a peptide bond to the amino acid at the A site",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The amino acid at the P site bonds.png",
  },
  {
    id: 65,
    term: "Polypeptide chain elongation",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Polypeptide chain elongation.png",
  },
  {
    id: 66,
    term: "polyribosome or polysome",
    definition: "A complex of mRNA and several ribosomes.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 67,
    term: "A polyribosome, several ribosomes proceeding simultaneously along mRNA",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/A polyribosome.png",
  },
  {
    id: 68,
    term: "Learning Check 21.4 Write the primary structure of the polypeptide produced during translation of the following mRNA sequence: 5' AUG–CAC–CAU–GUA–UUG–UGU–UAG 3' ",
    definition: "f Met-His-His-Val-Leu-Cys",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 69,
    term: "mutation",
    definition: "Any change resulting in an incorrect base sequence on DNA.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 70,
    term: "mutagen",
    definition: "A chemical that induces mutations by reacting with DNA.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 71,
    term: "recombinant DNA",
    definition: "DNA of an organism that contains genetic material from another organism.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 72,
    term: "Some Substances Produced by Genetic engineering",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/Some Substances Produced by Genetic engineering.png",
  },
  {
    id: 73,
    term: "restriction enzyme",
    definition: "A protective enzyme found in some bacteria that catalyzes the cleaving of all but a few specific types of DNA.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 74,
    term: "DNA have methyl groups attached",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/DNA have methyl groups attached.png",
  },
  {
    id: 75,
    term: "For double-stranded DNA, a palindrome is a section in which the two strands have the same sequence but run in opposite directions",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/a palindrome is a section.png",
  },
  {
    id: 76,
    term: "vector",
    definition: "A carrier of foreign DNA into a cell.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 77,
    term: "plasmid",
    definition: "Circular, double-stranded DNA found in the cytoplasm of bacterial cells.",
    termImage: null,
    definitionImage: null,
  },
  {
    id: 78,
    term: "A restriction enzyme is added to the plasmid",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/A restriction enzyme.png",
  },
  {
    id: 79,
    term: "The formation of recombinant DNA",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/The formation of recombinant DNA.png",
  },
  {
    id: 80,
    term: "the human DNA is cleaved such that the same sticky ends result",
    definition: null,
    termImage: null,
    definitionImage: "./ch21-images/the human DNA.png",
  },
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MatchingGame = () => {
  const chapterKey = "ch20-flashcards";
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
          {index === 0 && <Text style={styles.title}>Chapter 20 FlashCards</Text>}
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
      <h1>Chapter 20 Drag-and-Drop Matching Game</h1>

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