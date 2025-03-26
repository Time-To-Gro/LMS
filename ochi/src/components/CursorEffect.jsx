import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CursorEffect = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Add sparkle trails
            setTrail((prevTrail) => [
                ...prevTrail,
                { x: e.clientX, y: e.clientY, id: Math.random() },
            ]);

            // Limit the trail length
            if (trail.length > 10) {
                setTrail((prev) => prev.slice(1));
            }
        };

        window.addEventListener("mousemove", updatePosition);
        return () => window.removeEventListener("mousemove", updatePosition);
    }, [trail]);

    return (
        <>
            {/* Main Stone Pointer */}
    

            {/* Sparkles Effect */}
            {trail.map((t) => (
                <motion.div
                    key={t.id}
                    className="fixed w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                        top: t.y,
                        left: t.x,
                        position: "fixed",
                        boxShadow: "0px 0px 8px 2px rgba(0, 162, 255, 0.8)",
                    }}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4 }}
                />
            ))}
        </>
    );
};

export default CursorEffect;
