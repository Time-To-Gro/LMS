import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = ({ subject }) => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 shadow-md fixed w-full top-0 z-50"
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Animated Heading */}
        <motion.h1
          className="text-2xl font-bold"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {subject ? `${subject.toUpperCase()} Quiz` : "Quiz App"}
        </motion.h1>

        <div className="space-x-4 flex">
          {[{ label: "Home", path: "/" }, { label: "Quizzes", path: "/quiz" }, { label: "Dashboard", path: "/dashboard" }].map((item, index) => (
            <motion.button
              key={index}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative px-4 py-2 rounded-md font-medium bg-white text-indigo-600 hover:bg-gray-200 transition cursor-pointer overflow-hidden"
            >
              {item.label}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 scale-x-0"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
