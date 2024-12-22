// src/components/Ch17ExerciseMatchingGame.js
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
      definitionImage: "./images/Catalytic Efficiency.png",
    },
    {
      id: 3,
      term: "The influence of enzymes on the rates of reactions",
      definition: null,
      termImage: null,
      definitionImage: "./images/rates of reactions.png",
    },
    {
      id: 4,
      term: "Enzyme specificity is a second characteristic that is important in life processes",
      definition: null,
      termImage: null,
      definitionImage: "./images/Enzyme specificity.png",
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
      definitionImage: "./images/hydrolysis of urea.png",
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
      definitionImage: "./images/active enzyme.png",
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
  ];


  const [termItems, setTermItems] = useState(shuffleArray([...initialItems]));
  const [definitionItems, setDefinitionItems] = useState(
    shuffleArray([...initialItems])
  );
  const [matches, setMatches] = useState({});
  const [usedTerms, setUsedTerms] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const termListRef = useRef(null);
  const definitionListRef = useRef(null);

  const handleDrop = (e, definitionId) => {
    const termId = e.dataTransfer.getData("termId");

    // Prevent adding another term if the definition card already has a match
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

  const downloadFlashCardsAsPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Chapter 11 Flashcards", 105, 10, { align: "center" });
  
    let yPosition = 40; // Starting position for content on the page
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 80; // Bottom margin to avoid overflow
    const maxWidth = 120; // Maximum width for text wrapping
    const maxWidthImage = 150; // Maximum width for images
    const maxHeightImage = 150; // Maximum height for images
  
    for (const [index, item] of termItems.entries()) {
      if (yPosition + 50 > pageHeight) {
        doc.addPage();
        yPosition = 50;
      }
  
      // Add term text
      const termText = `${index + 1}. Term: ${item.term}`;
      const wrappedTermText = doc.splitTextToSize(termText, maxWidth);
      doc.text(wrappedTermText, 10, yPosition);
      yPosition += wrappedTermText.length * 10 + 10; // Adjust for line height
  
      // Add definition text if available
      if (item.definition) {
        const definitionText = `Definition: ${item.definition}`;
        const wrappedDefinitionText = doc.splitTextToSize(definitionText, maxWidth);
        doc.text(wrappedDefinitionText, 20, yPosition);
        yPosition += wrappedDefinitionText.length * 20 + 50; // Adjust for line height and spacing
      }
  
      // Add image if available
      if (item.termImage || item.definitionImage) {
        const imageUrl = item.termImage || item.definitionImage;
        try {
          const img = await loadImage(imageUrl);
  
          // Calculate aspect ratio to maintain proportions
          const aspectRatio = img.width / img.height;
          let imgWidth = maxWidthImage;
          let imgHeight = maxHeightImage;
  
          if (aspectRatio > 1) {
            imgHeight = maxWidthImage / aspectRatio; // Landscape image
          } else {
            imgWidth = maxHeightImage * aspectRatio; // Portrait image
          }
  
          // Check for overflow before adding the image
          if (yPosition + imgHeight + marginBottom > pageHeight) {
            doc.addPage(); // Add a new page
            yPosition = 20; // Reset yPosition for the new page
          }
  
          // Add the image
          doc.addImage(img, "PNG", 10, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 15; // Add spacing after the image
        } catch (err) {
          console.error("Error loading image:", imageUrl);
        }
      }
    }
  
    // Trigger "Save As" dialog
    const pdfBlob = doc.output("blob");
    const blobUrl = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "FlashCards.pdf";
    link.click();
    window.URL.revokeObjectURL(blobUrl); // Cleanup
  };
  
  // Helper function to load an image as a Promise
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Handle cross-origin images
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };
  
  return (
    <div className="game-container">
      <h1>Chapter 11 Drag-and-Drop Matching Game</h1>
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
                  {item.termImage && (
                    <img src={item.termImage} alt={item.term} />
                  )}
                  <p>{item.term}</p>
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
        <button className="download-button" onClick={downloadFlashCardsAsPDF}>
          Save Flash Cards (PDF)
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
