import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const topics = [
    "AI", "C", "C++", "COA", "CN", "DSA", "DBMS", "OS", 
    "Python", "Web Development", "Data Science", "Machine Learning", 
    "Neural Networks", "Java", "JavaScript"
];

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const navigate = useNavigate();
    const handleSearch = (topic) => {
        if (topic) {
            const formattedSearch = topic.toLowerCase().replace(/\s+/g, "");
            navigate(`/${formattedSearch}`);
            setSearchTerm("");  // Clear search after navigation
            setFilteredTopics([]); // Close dropdown
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim()) {
            setFilteredTopics(
                topics.filter((topic) =>
                    topic.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setFilteredTopics([]);
        }
        setSelectedIndex(-1); // Reset selection
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown" && selectedIndex < filteredTopics.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        } else if (e.key === "ArrowUp" && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0) {
                handleSearch(filteredTopics[selectedIndex]);
            } else {
                handleSearch(searchTerm);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
                
                {/* Tagline */}
                <motion.div 
                    className="text-center text-xl md:text-2xl font-semibold mt-10 max-w-2xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    "Unleash your potential with YouTube’s wealth of free knowledge and master new skills effortlessly."
                </motion.div>

                {/* Search Box */}
                <motion.div 
                    className="mt-8 w-full max-w-md relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center bg-gray-800 rounded-lg p-2 shadow-lg">
                        <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Search for a topic..." 
                            className="flex-1 bg-transparent outline-none p-2 text-white placeholder-gray-400"
                        />
                        <button 
                            onClick={() => handleSearch(searchTerm)} 
                            className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                        >
                            <FaSearch size={20} />
                        </button>
                    </div>

                    {/* Auto-suggestion dropdown */}
                    {filteredTopics.length > 0 && (
                        <div className="absolute left-0 right-0 bg-gray-800 mt-2 rounded-lg shadow-lg z-10">
                            {filteredTopics.map((topic, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => handleSearch(topic)}
                                    className={`p-2 cursor-pointer hover:bg-blue-500 ${selectedIndex === index ? "bg-blue-500" : ""}`}
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default HomePage;
