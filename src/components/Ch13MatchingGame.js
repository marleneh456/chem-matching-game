// src/components/Ch13MatchingGame.js
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
      term: "ethanol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/ethanol.png",
    },
    {
      id: 2,
      term: "menthol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/menthol.png",
    },
    {
      id: 3,
      term: "alcohol",
      definition: "A compound in which an -OH group is connected to an aliphatic carbon atom.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 4,
      term: "hydroxy group",
      definition: "The -OH functional group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 5,
      term: "phenol",
      definition: "A compound in which an -OH group is connected to a benzene ring. The parent compound is also called phenol.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 6,
      term: "alcohol formula",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/alcohol formula.png",
    },
    {
      id: 7,
      term: "phenol formula",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/phenol formula.png",
    },
    {
      id: 8,
      term: "replacement of one of its hydrogen atoms with an alkyl group or an aromatic ring",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/replacement of one of its hydrogen atoms with an alkyl group or an aromatic ring.png",
    },
    {
      id: 9,
      term: "ether",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/ether.png",
    },
    {
      id: 10,
      term: "both hydrogen atoms of water are replaced by alkyl groups",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/both hydrogen atoms of water are replaced by alkyl groups.png",
    },
    {
      id: 11,
      term: "methyl alcohol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/methyl alcohol.png",
    },
    {
      id: 12,
      term: "ethyl alcohol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/ethyl alcohol.png",
    },
    {
      id: 13,
      term: "isopropyl alcohol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/isopropyl alcohol.png",
    },
    {
      id: 14,
      term: "propyl alcohol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/propyl alcohol.png",
    },
    {
      id: 15,
      term: "IUPAC rules for naming alcohols",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/IUPAC rules for naming alcohols.png",
    },
    {
      id: 16,
      term: "Learning Check 13.1 Provide IUPAC names for the following alcohols:",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.1.png",
      definitionImage: "./ch13-images/Learning Check 13.1 answer.png",
    },
    {
      id: 17,
      term: "Learning Check 13.2 Give IUPAC names to the following diols:",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.2.png",
      definitionImage: "./ch13-images/Learning Check 13.2 answer.png",
    },
    {
      id: 18,
      term: "Learning Check 13.3 Name this compound as a phenol:",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.3.png",
      definitionImage: "./ch13-images/Learning Check 13.3 answer.png",
    },
    {
      id: 19,
      term: "primary alcohol",
      definition: "An alcohol in which the OH group is attached to CH3 or to a carbon attached to one other carbon atom.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 20,
      term: "secondary alcohol",
      definition: "An alcohol in which the carbon bearing the OH group is attached to two other carbon atoms.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 21,
      term: "tertiary alcohol",
      definition: "An alcohol in which the carbon bearing the OH group is attached to three other carbon atoms.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 22,
      term: "Primary formula and example",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Primary formula and example.png",
    },
    {
      id: 23,
      term: "Secondary formula and example",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Secondary formula and example.png",
    },
    {
      id: 24,
      term: "Tertiary formula and example",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Tertiary formula and example.png",
    },
    {
      id: 25,
      term: "Learning Check 13.4 Classify the following alcohols as primary, secondary, or tertiary:",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.4.png",
      definitionImage: "./ch13-images/Learning Check 13.4 answer.png",
    },
    {
      id: 26,
      term: "The solubility of alcohols and linear alkanes in water.",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/The solubility of alcohols and linear alkanes in water.png",
    },
    {
      id: 27,
      term: "Hydrogen bonding in a water–methanol solution",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Hydrogen bonding in a water–methanol solution.png",
    },
    {
      id: 28,
      term: "Water interacts only with the -OH group of 1-heptanol.",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Water interacts only with the -OH group of 1-heptanol.png",
    },
    {
      id: 29,
      term: "Learning Check 13.5 Arrange the following compounds in order of increasing solubility in water (least soluble first, most soluble last):",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.5.png",
      definitionImage: "./ch13-images/Learning Check 13.5 answer.png",
    },
    {
      id: 30,
      term: "Hydrogen bonding in pure ethanol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Hydrogen bonding in pure ethanol.png",
    },
    {
      id: 31,
      term: "The boiling points of alcohols",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/The boiling points of alcohols.png",
    },
    {
      id: 32,
      term: "Learning Check 13.6",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.6.png",
      definitionImage: "./ch13-images/Learning Check 13.6 answer.png",
    },
    {
      id: 33,
      term: "dehydration reaction",
      definition: "A reaction in which water is chemically removed from a compound.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 34,
      term: "elimination reaction",
      definition: "A reaction in which two or more covalent bonds are broken and a new multiple bond is formed.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 35,
      term: "Dehydration to Produce an Alkene",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Dehydration to Produce an Alkene.png",
    },
    {
      id: 36,
      term: "citrate to cis-aconitate",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/citrate to cis-aconitate.png",
    },
    {
      id: 37,
      term: "Learning Check 13.7 Predict the major products of the following reactions:",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.7.png",
      definitionImage: "./ch13-images/Learning Check 13.7 answer.png",
    },
    {
      id: 38,
      term: "The Dehydration of an Alcohol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/The Dehydration of an Alcohol.png",
    },
    {
      id: 39,
      term: "Dehydration to Produce an Ether",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Dehydration to Produce an Ether.png",
    },
    {
      id: 40,
      term: "Learning Check 13.8 What catalyst and reaction temperature would you use to accomplish each of the following reactions?",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.8.png",
      definitionImage: "./ch13-images/Learning Check 13.8 answer.png",
    },
    {
      id: 41,
      term: "Oxidation",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Oxidation.png",
    },
    {
      id: 42,
      term: "Primary Alcohols reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Primary Alcohols reaction.png",
    },
    {
      id: 43,
      term: "Oxidation of ethanol by K2Cr2O",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Oxidation of ethanol by K2Cr2O.png",
    },
    {
      id: 44,
      term: "Learning Check 13.9 Draw the structural formulas of the first and second products of the following reaction",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.9.png",
      definitionImage: "./ch13-images/Learning Check 13.9 answer.png",
    },
    {
      id: 45,
      term: "Secondary Alcohols reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Secondary Alcohols reaction.png",
    },
    {
      id: 46,
      term: "Learning Check 13.10 Complete the following oxidation reaction",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.10.png",
      definitionImage: "./ch13-images/Learning Check 13.10 answer.png",
    },
    {
      id: 47,
      term: "Tertiary Alcohols reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Tertiary Alcohols reaction.png",
    },
    {
      id: 48,
      term: "Learning Check 13.11 Which of the following alcohols will react with an oxidizing agent?",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.11.png",
      definitionImage: "./ch13-images/Learning Check 13.11 answer.png",
    },
    {
      id: 49,
      term: "Learning Check 13.12 Show the reactions necessary to carry out the following conversion.",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.12.png",
      definitionImage: "./ch13-images/Learning Check 13.12 answer.png",
    },
    {
      id: 50,
      term: "reacting hydrogen gas with carbon monoxide",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/reacting hydrogen gas with carbon monoxide.png",
    },
    {
      id: 51,
      term: "hydration of ethylene",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/hydration of ethylene.png",
    },
    {
      id: 52,
      term: "fermentation",
      definition: "A reaction of sugars, starch, or cellulose to produce ethanol and carbon dioxide.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 53,
      term: "fermentation of glucose",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/fermentation of glucose.png",
    },
    {
      id: 54,
      term: "A Reaction Map for Alcohols",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/A Reaction Map for Alcohols.png",
    },
    {
      id: 55,
      term: "1,2,3-propanetriol (glycerol)",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/1,2,3-propanetriol (glycerol).png",
    },
    {
      id: 56,
      term: "1,2-ethanediol (ethylene glycol)",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/1,2-ethanediol (ethylene glycol).png",
    },
    {
      id: 57,
      term: "1,2-propanediol (propylene glycol)",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/1,2-propanediol (propylene glycol).png",
    },
    {
      id: 58,
      term: "Examples of Alcohols",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Examples of Alcohols.png",
    },
    {
      id: 59,
      term: "Learning Check 13.13 What is an important use for each of the following alcohols?",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.13.png",
      definitionImage: "./ch13-images/Learning Check 13.13 answer.png",
    },
    {
      id: 60,
      term: "phenols weak acid reactions",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/phenols weak acid reactions.png",
    },
    {
      id: 61,
      term: "phenol, 4-chloro-3,5-dimethylphenol and 4-hexylresorcinol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/phenol, 4-chloro-3,5-dimethylphenol and 4-hexylresorcinol.png",
    },
    {
      id: 62,
      term: "o-phenylphenol and 2-benzyl-4-chlorophenol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/o-phenylphenol and 2-benzyl-4-chlorophenol.png",
    },
    {
      id: 63,
      term: "antioxidant",
      definition: "A substance that prevents another substance from being oxidized.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 64,
      term: "2-t-butyl-4-methoxyphenol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/2-t-butyl-4-methoxyphenol.png",
    },
    {
      id: 65,
      term: "2, 6-di-t-butyl-4-methylphenol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/2, 6-di-t-butyl-4-methylphenol.png",
    },
    {
      id: 66,
      term: "Learning Check 13.14 What is an important use for each of the following phenols?",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.14.png",
      definitionImage: "./ch13-images/Learning Check 13.14 answer.png",
    },
    {
      id: 67,
      term: "ethyl methyl ether",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/ethyl methyl ether.png",
    },
    {
      id: 68,
      term: "isopropyl phenyl ether",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/isopropyl phenyl ether.png",
    },
    {
      id: 69,
      term: "dimethyl ether (methyl ether)",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/dimethyl ether (methyl ether).png",
    },
    {
      id: 70,
      term: "diethyl ether (ethyl ether)",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/diethyl ether (ethyl ether).png",
    },
    {
      id: 71,
      term: "Learning Check 13.15 Assign a common name to the following:",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.15.png",
      definitionImage: "./ch13-images/Learning Check 13.15 answer.png",
    },
    {
      id: 72,
      term: "alkoxy group",
      definition: "The -O-R functional group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 73,
      term: "methoxymethane",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/methoxymethane.png",
    },
    {
      id: 74,
      term: "2-ethoxybutane",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/2-ethoxybutane.png",
    },
    {
      id: 75,
      term: "p-methoxybenzoic acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/p-methoxybenzoic acid.png",
    },
    {
      id: 76,
      term: "Learning Check 13.16 Give IUPAC names for the following",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.16.png",
      definitionImage: "./ch13-images/Learning Check 13.16 answer.png",
    },
    {
      id: 77,
      term: "heterocyclic ring",
      definition: "A ring in which one or more atoms are an atom other than carbon.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 78,
      term: "furan",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/furan.png",
    },
    {
      id: 79,
      term: "pyran",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/pyran.png",
    },
    {
      id: 80,
      term: "Hydrogen bonding of dimethyl ether: with water and no hydrogen bonding in the pure state.",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Hydrogen bonding of dimethyl ether.png",
    },
    {
      id: 81,
      term: "Learning Check 13.17",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.17.png",
      definitionImage: "./ch13-images/Learning Check 13.17 answer.png",
    },
    {
      id: 82,
      term: "thiol",
      definition: "A compound containing an -SH group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 83,
      term: "sulfhydryl group",
      definition: "The -SH functional group.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 84,
      term: "trans-2-butene-1-thiol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/trans-2-butene-1-thiol.png",
    },
    {
      id: 85,
      term: "3-methyl-1-butanethiol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/3-methyl-1-butanethiol.png",
    },
    {
      id: 86,
      term: "methyl-1-(trans-2-butenyl)disulfide",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/methyl-1-(trans-2-butenyl)disulfide.png",
    },
    {
      id: 87,
      term: "propanethiol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/propanethiol.png",
    },
    {
      id: 88,
      term: "1-propene-3-thiol",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/1-propene-3-thiol.png",
    },
    {
      id: 89,
      term: "3,3-di-(1-propenyl)disulfide",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/3,3-di-(1-propenyl)disulfide.png",
    },
    {
      id: 90,
      term: "disulfide",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/disulfide.png",
    },
    {
      id: 91,
      term: "disulfide reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/disulfide reaction.png",
    },
    {
      id: 92,
      term: "Learning Check 13.18 Complete the following reaction:",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.18.png",
      definitionImage: "./ch13-images/Learning Check 13.18 answer.png",
    },
    {
      id: 93,
      term: "Disulfide linkages",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/Disulfide linkages.png",
    },
    {
      id: 94,
      term: "Learning Check 13.19 What products result from the reduction of the following disulfides?",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.19.png",
      definitionImage: "./ch13-images/Learning Check 13.19 answer.png",
    },
    {
      id: 95,
      term: "Learning Check 13.20 Complete the following reaction",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.20.png",
      definitionImage: "./ch13-images/Learning Check 13.20 answer.png",
    },
    {
      id: 96,
      term: "polyfunctional compound",
      definition: "A compound with two or more functional groups.",
      termImage: null,
      definitionImage: null,
    },
    {
      id: 97,
      term: "glucose",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/glucose.png",
    },
    {
      id: 98,
      term: "cholesterol structures",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/cholesterol structures.png",
    },
    {
      id: 99,
      term: "Learning Check 13.21 Identify the functional groups in vitamin E",
      definition: null,
      termImage: "./ch13-images/Learning Check 13.21.png",
      definitionImage: "./ch13-images/Learning Check 13.21 answer.png",
    },
    {
      id: 100,
      term: "1. Dehydration of alcohols to give alkenes",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/1. Dehydration of alcohols to give alkenes.png",
    },
    {
      id: 101,
      term: "2. Dehydration of alcohols to give ethers",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/2. Dehydration of alcohols to give ethers.png",
    },
    {
      id: 102,
      term: "3. Oxidation of a primary alcohol to give an aldehyde and then a carboxylic acid",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/3. Oxidation of a primary alcohol to give an aldehyde and then a carboxylic acid.png",
    },
    {
      id: 103,
      term: "4. Oxidation of a secondary alcohol to give a ketone",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/4. Oxidation of a secondary alcohol to give a ketone.png",
    },
    {
      id: 104,
      term: "5. Attempted oxidation of a tertiary alcohol gives no reaction",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/5. Attempted oxidation of a tertiary alcohol gives no reaction.png",
    },
    {
      id: 105,
      term: "6. Oxidation of a thiol to give a disulfide",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/6. Oxidation of a thiol to give a disulfide.png",
    },
    {
      id: 106,
      term: "6. Oxidation of a thiol to give a disulfide",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/6. Oxidation of a thiol to give a disulfide.png",
    },
    {
      id: 107,
      term: "7. Reduction of a disulfide to give thiols",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/7. Reduction of a disulfide to give thiols.png",
    },
    {
      id: 108,
      term: "8. Reaction of thiols with heavy metals",
      definition: null,
      termImage: null,
      definitionImage: "./ch13-images/8. Reaction of thiols with heavy metals.png",
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
          {index === 0 && <Text style={styles.title}>Chapter 13 FlashCards</Text>}
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
      <h1>Chapter 13 Drag-and-Drop Matching Game</h1>
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
