import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        console.log(formData.name, formData.email, formData.password);
        const res = await signup(formData.name, formData.email, formData.password);
        
        if (res.token) {
            setMessage("✅ Registration successful!");
            setTimeout(() => navigate("/login"), 1500); // Redirect after success
            
        } else {
            setMessage(`❌ ${res.msg || "Signup failed"}`);
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <motion.div 
                className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name Field */}
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full bg-gray-700 p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full bg-gray-700 p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full bg-gray-700 p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                        <span 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {/* Sign Up Button */}
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-500 transition font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </motion.button>
                </form>

                {/* Message Display */}
                {message && <p className="text-center mt-4">{message}</p>}

                {/* Login Redirect */}
                <div className="text-center mt-4">
                    Already have an account? 
                    <Link to="/login" className="text-blue-400 hover:underline ml-1">Login</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
