import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const subjects = [
    "AI", "C", "C++", "COA", "CN", "DSA", "DBMS", "OS", "PYTHON",
    "WEB DEVELOPMENT", "DATA SCIENCE", "MACHINE LEARNING", "NEURAL NETWORKS",
    "JAVA", "JAVASCRIPT"
];

// Duplicate subjects for seamless scrolling
const scrollingSubjects = [...subjects, ...subjects];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Check if user is logged in

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            let scrollAmount = 0;
            const speed = 1; // Adjust speed of scrolling

            const scroll = () => {
                if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                    scrollAmount = 0;
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollAmount += speed;
                    scrollContainer.scrollLeft = scrollAmount;
                }
                requestAnimationFrame(scroll);
            };

            scroll();
        }
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="min-h-30 bg-gray-900 text-white flex flex-col items-center p-6">
            {/* Header Section */}
            <header className="w-full bg-gray-800 p-4 shadow-lg flex justify-between items-center">
                <div className="text-xl font-bold"><Link to="/profilepage" className=" mt-2 hover:text-blue-400">LMS</Link></div>
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className=" mt-2 hover:text-blue-400">Home</Link>
                    <Link to="/quiz" className=" mt-2 hover:text-blue-400">Quiz</Link>
                    <Link to="/feedback" className=" mt-2 hover:text-blue-400">Feedback</Link>
                    {token ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                            Login
                        </Link>
                    )}
                </nav>
                <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                    &#9776;
                </div>
            </header>

            {/* Mobile Menu */}
            {menuOpen && (
                <motion.nav 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3 }}
                    className="w-full bg-gray-800 p-4 flex flex-col items-center space-y-4"
                >
                    <Link to="/" className="hover:text-blue-400">Home</Link>
                    <Link to="/quiz" className="hover:text-blue-400">Quiz</Link>
                    <Link to="/feedback" className="hover:text-blue-400">Feedback</Link>
                    {token ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                            Login
                        </Link>
                    )}
                </motion.nav>
            )}

            {/* Category Scroll Menu */}
            <div className="w-full overflow-hidden bg-gray-700 p-2 mt-4 text-center relative">
                <div ref={scrollRef} className="flex space-x-6 overflow-hidden whitespace-nowrap">
                    {scrollingSubjects.map((category, index) => (
                        <Link 
                            key={index} 
                            to={`/${category.toLowerCase().replace(/ /g, "")}`} 
                            className="inline-block px-4 py-2 text-white bg-gray-800 hover:bg-blue-500 rounded-md mx-1"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
