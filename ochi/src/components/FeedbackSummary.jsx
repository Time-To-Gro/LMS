import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FeedbackSummary = ({ feedbackData }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Feedback Summary</h1>
        <div className="space-y-2">
          {Object.entries(feedbackData).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b pb-2">
              <span className="font-semibold">{key}:</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-all"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FeedbackSummary;
