// src/App.js
import React, { useState } from "react";

import Ch11MatchingGame from "./components/Ch11MatchingGame";

import Ch11ExerciseMatchingGame from "./components/Ch11ExerciseMatchingGame";

import Ch12MatchingGame from "./components/Ch12MatchingGame";

import Ch12ExerciseMatchingGame from "./components/Ch12ExerciseMatchingGame";

import Ch13MatchingGame from "./components/Ch13MatchingGame";

import Ch13ExerciseMatchingGame from "./components/Ch13ExerciseMatchingGame";

import Ch14MatchingGame from "./components/Ch14MatchingGame";

import Ch14ExerciseMatchingGame from "./components/Ch14ExerciseMatchingGame";

import Ch15MatchingGame from "./components/Ch15MatchingGame";

import Ch15ExerciseMatchingGame from "./components/Ch15ExerciseMatchingGame";

import Ch16MatchingGame from "./components/Ch16MatchingGame";

import Ch16ExerciseMatchingGame from "./components/Ch16ExerciseMatchingGame";

import Ch17MatchingGame from "./components/Ch17MatchingGame";

import Ch17ExerciseMatchingGame from "./components/Ch17ExerciseMatchingGame";

import Ch18MatchingGame from "./components/Ch18MatchingGame";

import Ch18ExerciseMatchingGame from "./components/Ch18ExerciseMatchingGame";

import Ch19MatchingGame from "./components/Ch19MatchingGame";

import Ch19ExerciseMatchingGame from "./components/Ch19ExerciseMatchingGame";

import Ch20MatchingGame from "./components/Ch20MatchingGame";

import Ch20ExerciseMatchingGame from "./components/Ch20ExerciseMatchingGame";

import Ch21MatchingGame from "./components/Ch21MatchingGame";

import Ch21ExerciseMatchingGame from "./components/Ch21ExerciseMatchingGame";

function App() {
  const [activePage, setActivePage] = useState("home");

  const goToPage = (page) => {
    setActivePage(page);
  };

  return (
    <div className="App">
      {activePage === "home" && (
        <div className="home-page">
          <h1>Welcome to the Chemistry Game</h1>
          <div className="pdf-link">
        <a href="./CH1020.Syl.F24.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1020 Fall 2024 syllabus PDF
        </a>

        <br />

        <a href="./CH1021 F24 syllabus.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1021 Fall 2024 syllabus PDF
        </a>

        <br />

         <a href="./Exam1.Review.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1020 Exam 1 Review PDF
        </a>
        
        <br />

        <a href="./Exam2.Review.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1020 Exam 2 Review PDF
        </a>

        <br />

        <a href="./REVIEW FOR EXAM III  Chem 1020.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1020 Exam 3 Review PDF
        </a>

        <br />

         <a href="./Exam4.Review.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1020 Exam 4 Review PDF
        </a>

        <br />

         <a href="./CHEM1020. Review.Exam 5.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1020 Exam 5 Review PDF
        </a>

        <br />

         <a href="./Chem 1020Final Review.pdf" target="_blank" rel="noopener noreferrer">
          CHEM 1020 Final Review PDF
        </a>
        
        <br />

        <a href="./AlkylGroups.pdf" target="_blank" rel="noopener noreferrer">
          Alkyl Groups PDF
        </a>
        
        <br />

         <a href="./Functional.Groups.pdf" target="_blank" rel="noopener noreferrer">
          Functional Groups PDF
        </a>

        <br />

         <a href="./Biomolecules.matching.pdf" target="_blank" rel="noopener noreferrer">
          Biomolecules PDF
        </a>

        <br />

         <a href="./Lipids.Practice.pdf" target="_blank" rel="noopener noreferrer">
          Lipids Practice PDF
        </a>

      </div>
          <p> Select which button to click to study over.</p>
          <div className="chem-buttons">

          <button onClick={() => goToPage("chapter11")}>
              Chapter 11
            </button>

            <button onClick={() => goToPage("exercise-chapter11")}>
              Exercise Chapter 11
            </button>

            <button onClick={() => goToPage("chapter12")}>
              Chapter 12
            </button>

            <button onClick={() => goToPage("exercise-chapter12")}>
              Exercise Chapter 12
            </button>

            <button onClick={() => goToPage("chapter13")}>
              Chapter 13
            </button>

            <button onClick={() => goToPage("exercise-chapter13")}>
              Exercise Chapter 13
            </button>

            <button onClick={() => goToPage("chapter14")}>
              Chapter 14
            </button>

            <button onClick={() => goToPage("exercise-chapter14")}>
              Exercise Chapter 14
            </button>

            <button onClick={() => goToPage("chapter15")}>
              Chapter 15
            </button>

            <button onClick={() => goToPage("exercise-chapter15")}>
              Exercise Chapter 15
            </button>

            <button onClick={() => goToPage("chapter16")}>
              Chapter 16
            </button>

            <button onClick={() => goToPage("exercise-chapter16")}>
              Exercise Chapter 16
            </button>

            <button onClick={() => goToPage("chapter17")}>
              Chapter 17
            </button>

            <button onClick={() => goToPage("exercise-chapter17")}>
              Exercise Chapter 17
            </button>

            <button onClick={() => goToPage("chapter18")}>
              Chapter 18
            </button>

            <button onClick={() => goToPage("exercise-chapter18")}>
              Exercise Chapter 18
            </button>

            <button onClick={() => goToPage("chapter19")}>
              Chapter 19
            </button>

            <button onClick={() => goToPage("exercise-chapter19")}>
              Exercise Chapter 19
            </button>

            <button onClick={() => goToPage("chapter20")}>
              Chapter 20: Enzyme Matching Game
            </button>

            <button onClick={() => goToPage("exercise-chapter20")}>
              Exercise Chapter 20
            </button>

            <button onClick={() => goToPage("chapter21")}>
              Chapter 21
            </button>

            <button onClick={() => goToPage("exercise-chapter21")}>
              Exercise Chapter 21
            </button>

          </div>
        </div>
      )}

      {activePage === "chapter11" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch11MatchingGame />
        </div>
      )}
      
      {activePage === "exercise-chapter11" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch11ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter12" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch12MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter12" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch12ExerciseMatchingGame />
        </div>
      )}

     {activePage === "chapter13" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch13MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter13" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch13ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter14" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch14MatchingGame />
        </div>
      )}
      
      {activePage === "exercise-chapter14" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch14ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter15" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch15MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter15" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch15ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter16" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch16MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter16" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch16ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter17" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch17MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter17" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch17ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter18" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch18MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter18" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch18ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter19" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch19MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter19" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch19ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter20" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch20MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter20" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch20ExerciseMatchingGame />
        </div>
      )}

      {activePage === "chapter21" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch21MatchingGame />
        </div>
      )}

{activePage === "exercise-chapter21" && (
        <div className="chem-page">
          <button className="go-back-button" onClick={() => goToPage("home")}>
            Go Back to the Home Page
          </button>
          <Ch21ExerciseMatchingGame />
        </div>
      )}

    </div>
  );
}

export default App;


