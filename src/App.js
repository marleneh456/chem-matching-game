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
  const [chapters, setChapters] = useState([
    { id: 11, name: "Chapter 11" },
    { id: 12, name: "Chapter 12" },
    { id: 13, name: "Chapter 13" },
    { id: 14, name: "Chapter 14" },
    { id: 15, name: "Chapter 15" },
    { id: 16, name: "Chapter 16" },
    { id: 17, name: "Chapter 17" },
    { id: 18, name: "Chapter 18" },
    { id: 19, name: "Chapter 19" },
    { id: 20, name: "Chapter 20" },
    { id: 21, name: "Chapter 21" },
  ]);
  const [chapterInput, setChapterInput] = useState("");

  const goToPage = (page) => {
    setActivePage(page);
  };

  const handleAddChapter = () => {
    const id = parseInt(chapterInput);
    if (!isNaN(id) && !chapters.find((ch) => ch.id === id)) {
      setChapters([...chapters, { id, name: `Chapter ${id}` }]);
      setChapterInput("");
    }
  };

  const handleDeleteChapter = () => {
    const id = parseInt(chapterInput);
    if (!isNaN(id)) {
      setChapters(chapters.filter((ch) => ch.id !== id));
      setChapterInput("");
    }
  };

  const renderMatchingGame = (id) => {
    switch (id) {
      case 11:
        return <Ch11MatchingGame />;
      case 12:
        return <Ch12MatchingGame />;
      case 13:
        return <Ch13MatchingGame />;
      case 14:
        return <Ch14MatchingGame />;
      case 15:
        return <Ch15MatchingGame />;
      case 16:
        return <Ch16MatchingGame />;
      case 17:
        return <Ch17MatchingGame />;
      case 18:
        return <Ch18MatchingGame />;
      case 19:
        return <Ch19MatchingGame />;
      case 20:
        return <Ch20MatchingGame />;
      case 21:
        return <Ch21MatchingGame />;
      default:
        return <p>Matching Game Not Available</p>;
    }
  };

  const renderExerciseMatchingGame = (id) => {
    switch (id) {
      case 11:
        return <Ch11ExerciseMatchingGame />;
      case 12:
        return <Ch12ExerciseMatchingGame />;
      case 13:
        return <Ch13ExerciseMatchingGame />;
      case 14:
        return <Ch14ExerciseMatchingGame />;
      case 15:
        return <Ch15ExerciseMatchingGame />;
      case 16:
        return <Ch16ExerciseMatchingGame />;
      case 17:
        return <Ch17ExerciseMatchingGame />;
      case 18:
        return <Ch18ExerciseMatchingGame />;
      case 19:
        return <Ch19ExerciseMatchingGame />;
      case 20:
        return <Ch20ExerciseMatchingGame />;
      case 21:
        return <Ch21ExerciseMatchingGame />;
      default:
        return <p>Exercise Matching Game Not Available</p>;
    }
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

          <p>Select which button to click to study over:</p>

          <div className="chem-buttons">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="button-row">
              <button onClick={() => goToPage(`chapter${chapter.id}`)}>
                {chapter.name}
              </button>
              <button onClick={() => goToPage(`exercise-chapter${chapter.id}`)}>
                Exercise {chapter.name}
              </button>
            </div>
            
            ))}
          </div>

          <div className="chapter-controls" style={{ marginTop: "30px" }}>
            <input
              type="number"
              value={chapterInput}
              onChange={(e) => setChapterInput(e.target.value)}
              placeholder="Enter Chapter Number"
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <button onClick={handleAddChapter}>➕ Add Chapter</button>
            <button onClick={handleDeleteChapter} style={{ marginLeft: "10px" }}>
              ➖ Delete Chapter
            </button>
          </div>
        </div>
      )}

      {chapters.map((chapter) => (
        <React.Fragment key={chapter.id}>
          {activePage === `chapter${chapter.id}` && (
            <div className="chem-page">
              <button className="go-back-button" onClick={() => goToPage("home")}>
                Go Back to the Home Page
              </button>
              {renderMatchingGame(chapter.id)}
            </div>
          )}
          {activePage === `exercise-chapter${chapter.id}` && (
            <div className="chem-page">
              <button className="go-back-button" onClick={() => goToPage("home")}>
                Go Back to the Home Page
              </button>
              {renderExerciseMatchingGame(chapter.id)}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
