import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Feedback = () => {
    const navigate = useNavigate();
    const [feedbackResponses] = useState([
        {
            "Name": "Rahul",
            "Profession": "Software Engineer",
            "Course Name": "Data Structures and Algorithms",
            "YouTube Channel Name": "freeCodeCamp.org",
            "Playlist Name (or Video Title)": "Data Structures and Algorithms Full Course",
            "Why Recommend": "Covers all fundamental concepts with practical examples.",
            "Have You Watched the Course": "Yes"
        },
        {
            "Name": "Meera",
            "Profession": "Student",
            "Course Name": "Machine Learning",
            "YouTube Channel Name": "Simplilearn",
            "Playlist Name (or Video Title)": "Machine Learning Full Course",
            "Why Recommend": "Great real-world applications and easy-to-follow tutorials.",
            "Have You Watched the Course": "Yes"
        },
        {
            "Name": "Arjun",
            "Profession": "Data Scientist",
            "Course Name": "Deep Learning",
            "YouTube Channel Name": "Sentdex",
            "Playlist Name (or Video Title)": "Deep Learning with Python and TensorFlow",
            "Why Recommend": "Hands-on coding approach with well-explained concepts.",
            "Have You Watched the Course": "Yes"
        },
        {
            "Name": "Pooja",
            "Profession": "Frontend Developer",
            "Course Name": "React.js",
            "YouTube Channel Name": "The Net Ninja",
            "Playlist Name (or Video Title)": "React.js Full Tutorial",
            "Why Recommend": "Covers React basics to advanced topics with practical projects.",
            "Have You Watched the Course": "Yes"
        }
    ]);


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-500 flex flex-col items-center py-12 px-4">
                <motion.h1 
                    className="text-4xl font-extrabold text-gray-900 mb-6 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Give Your Feedback Here
                </motion.h1>

                <motion.button
                    onClick={() => navigate("/feedback-form")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium shadow-md hover:bg-indigo-700 transition-all"
                    >
                    Give Feedback
                </motion.button>

                <motion.div 
                    className="mt-10 w-full max-w-4xl bg-white shadow-xl rounded-xl p-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">User Feedback</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {feedbackResponses.length > 0 ? (
                            feedbackResponses.map((feedback, index) => (
                                <motion.div 
                                    key={index} 
                                    className="border border-gray-300 p-4 rounded-lg bg-gray-100 shadow-md hover:bg-gray-200 transition duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {Object.entries(feedback).map(([key, value]) => (
                                        <div key={key} className="flex flex-col">
                                            <span className="font-semibold text-gray-700">{key}:</span>
                                            <span className="text-gray-600">{value}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center col-span-full">No feedback available.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Feedback;