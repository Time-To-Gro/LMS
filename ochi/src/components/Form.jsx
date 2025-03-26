import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Form = ({ setFeedbackData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Profession: "",
    "Course Name": "",
    "YouTube Channel Name": "",
    "Playlist Name (or Video Title)": "",
    "Why Recommend": "",
    "Have You Watched the Course": "Yes",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackData(formData);
    navigate("/feedback-summary");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Feedback Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium">{field}</label>
              {field === "Have You Watched the Course" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              )}
            </div>
          ))}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-all"
          >
            Submit Feedback
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Form;
