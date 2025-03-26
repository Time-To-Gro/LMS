import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const subjects = [
  { id: 1, name: "DBMS", key: "dbms" },
  { id: 2, name: "Computer Networks", key: "cn" },
  { id: 3, name: "Object-Oriented Programming", key: "oops" },
  { id: 4, name: "Data Structures & Algorithms", key: "dsa" },
  { id: 5, name: "Aptitude", key: "aptitude" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleSubjectClick = (subjectKey) => {
    navigate(`/subject/${subjectKey}`);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 shadow-md fixed w-full top-0 z-10"
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quiz App</h1>
          <div className="space-x-4">
            {["Home", "Quiz", "Dashboard"].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition cursor-pointer"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-violet-100 p-6 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-indigo-600 mb-6"
        >
          Select a Subject
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {subjects.map((subject, index) => (
            <motion.button
              key={subject.id}
              onClick={() => handleSubjectClick(subject.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 cursor-pointer text-white px-6 py-4 rounded-xl shadow-md hover:bg-blue-700 transition-all text-lg font-medium"
            >
              {subject.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Home;
