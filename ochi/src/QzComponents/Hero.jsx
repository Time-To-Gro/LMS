import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./Navbar";
import Quiz from "./Quiz"; // Import Quiz component

const Hero = () => {
  const { subjectKey } = useParams();
  const navigate = useNavigate();
  const [viewQuiz, setViewQuiz] = useState(false);

  const handleQuizStart = () => {
    setViewQuiz(true); // Show Quiz Component instead of navigating
  };

  // If viewQuiz is true, render the Quiz component for the selected subject
  if (viewQuiz) {
    return <Quiz subjectKey={subjectKey} />;
  }

  return (
    <>
      {/* Pass the subjectKey to Navbar and handle view change */}
      <NavBar subject={subjectKey} setView={setViewQuiz} />
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          {subjectKey.replace("-", " ").toUpperCase()}
        </h1>
        <button
          onClick={handleQuizStart}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          Start Quiz
        </button>
      </div>
    </>
  );
};

export default Hero;
