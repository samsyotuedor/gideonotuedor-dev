import { useRef, useState } from "react";
import { motion } from "framer-motion";
import profileImage from "@/assets/profile-3d.png";

interface Rotating3DImageProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-48 h-48 md:w-64 md:h-64",
  md: "w-64 h-64 md:w-80 md:h-80",
  lg: "w-80 h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]",
};

export const Rotating3DImage = ({ 
  src = profileImage, 
  alt = "3D Profile", 
  className = "",
  size = "md"
}: Rotating3DImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate rotation based on mouse position relative to center
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 45;
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
      className={`relative perspective-1000 ${sizeClasses[size]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      {/* Glow effect behind image */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/40 blur-3xl"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 3D rotating image container */}
      <motion.div
        className="relative z-10"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main image */}
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        />

        {/* Reflection/shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0.3,
            backgroundPosition: isHovered
              ? `${50 + rotation.y}% ${50 + rotation.x}%`
              : "50% 50%",
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Border glow */}
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 blur-sm -z-10"
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Floating particles around image */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/60"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 6) * 120,
                y: Math.sin((i * Math.PI * 2) / 6) * 120,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};
