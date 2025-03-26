import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

    
    const moveButton = () => {
        if (!formData.email || !formData.password) {
            const x = Math.random() * (window.innerWidth - 200) - window.innerWidth / 4;
            const y = Math.random() * (window.innerHeight - 200) - window.innerHeight / 4;
            setButtonPosition({ x, y });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        console.log(formData.email, formData.password);
        const res = await login(formData.email, formData.password);
        console.log(res);
        localStorage.setItem("token",JSON.stringify(res.user.token));
        localStorage.setItem("userId",JSON.stringify(res.user._id))
        if (res.user.token) {
            setMessage("✅ Login successful!");
            navigate("/"); // Redirect after success
        } else {
            setMessage(`❌ ${res.msg || "Login failed"}`);
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
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
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

                    {/* Login Button */}
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-500 transition font-semibold"
                        whileHover={!formData.email || !formData.password ? { x: buttonPosition.x, y: buttonPosition.y } : {}}
                        onMouseOver={moveButton}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </form>

                {/* Message Display */}
                {message && <p className="text-center mt-4">{message}</p>}

                {/* Forgot Password & Register */}
                <div className="text-center mt-4">
                    <Link to="/forgot-password" className="text-blue-400 hover:underline">Forgot Password?</Link>
                </div>
                <div className="text-center mt-2">
                    Don't have an account? 
                    <Link to="/signup" className="text-blue-400 hover:underline ml-1">Sign Up</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
