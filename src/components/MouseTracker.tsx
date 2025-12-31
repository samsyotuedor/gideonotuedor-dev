import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const MouseTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border-2 border-purple-500"
        style={{
          width: 40,
          height: 40,
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full bg-emerald-400"
        style={{
          width: 12,
          height: 12,
        }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.1,
        }}
      />
    </>
  );
};
