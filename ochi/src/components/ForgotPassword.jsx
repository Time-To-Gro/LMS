import { useState } from "react";
import { motion } from "framer-motion";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(`🔗 A reset link has been sent to ${email}`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <motion.div 
                className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full bg-gray-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-500 transition font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Reset Link
                    </motion.button>
                </form>

                {message && <p className="text-center mt-4">{message}</p>}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
