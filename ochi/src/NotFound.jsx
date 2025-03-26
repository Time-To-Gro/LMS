import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <motion.h1 
                className="text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                404
            </motion.h1>
            <motion.p 
                className="text-xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Oops! The page you're looking for doesn't exist.
            </motion.p>
            <Link 
                to="/" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition text-white"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
