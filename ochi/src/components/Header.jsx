import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-gray-800 p-4 shadow-lg flex justify-between items-center">
            <div className="text-xl font-bold">LMS</div>
            <nav className="hidden md:flex space-x-6">
                <Link to="/" className="hover:text-blue-400">Home</Link>
                <Link to="/feedback" className="hover:text-blue-400">Feedback</Link>
            </nav>
            <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                &#9776;
            </div>

            {menuOpen && (
                <nav className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 p-4">
                    <Link to="/" className="hover:text-blue-400">Home</Link>
                    <Link to="/feedback" className="hover:text-blue-400">Feedback</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
