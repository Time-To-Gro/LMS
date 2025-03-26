import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../assets/d";
import { motion } from "framer-motion";
import { updateScore } from "../api/auth";  // Import the function

const Quiz = ({ subjectKey }) => {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId");
  const questions = quizData[subjectKey] || [];
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  if (questions.length === 0) {
    return <div className="text-center text-red-500">No questions available for this subject.</div>;
  }

  const question = questions[index];

  const checkAns = (e, answer) => {
    if (!lock) {
      if (question.answer === answer) {
        e.target.classList.add("bg-green-500", "text-white", "border-green-700");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("bg-red-500", "text-white", "border-red-700");
        optionRefs[question.answer].current.classList.add("bg-green-500", "text-white", "border-green-700");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setLock(false);
      optionRefs.forEach((ref) => {
        ref.current.classList.remove("bg-green-500", "bg-red-500", "text-white", "border-green-700", "border-red-700");
      });
    }
  };

  const saveScore = async () => {
    console.log(subjectKey, score);
    const result = await updateScore(userId, subjectKey, score);
    alert(result.message);
    navigate("/dashboard");
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <motion.div
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-bold text-indigo-700 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {subjectKey.toUpperCase()} Quiz
        </motion.h1>
        <hr className="mb-6" />

        {result ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-semibold text-green-600">You scored {score} out of {questions.length}</h2>
            <motion.button
              onClick={reset}
              className="mt-6 bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-800 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Restart
            </motion.button>
            <motion.button
              onClick={saveScore}
              className="mt-6 ml-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Save Score
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.p
              className="text-xl font-medium mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {index + 1}. {question.question}
            </motion.p>
            <ul className="space-y-3">
              {question.options.map((option, i) => (
                <motion.li
                  key={i}
                  ref={optionRefs[i]}
                  onClick={(e) => checkAns(e, i)}
                  className="cursor-pointer bg-gray-100 px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-200 transition-all text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option}
                </motion.li>
              ))}
            </ul>
            <motion.button
              onClick={next}
              className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition-all text-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Next
            </motion.button>
            <motion.div
              className="mt-3 text-gray-700 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {index + 1} of {questions.length} Questions
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
