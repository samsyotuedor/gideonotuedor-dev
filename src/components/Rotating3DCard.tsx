import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Rotating3DCardProps {
  children: React.ReactNode;
  className?: string;
}

export const Rotating3DCard = ({ children, className = "" }: Rotating3DCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 25;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 25;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {children}

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Border glow */}
        <motion.div
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 blur-sm -z-10"
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};
