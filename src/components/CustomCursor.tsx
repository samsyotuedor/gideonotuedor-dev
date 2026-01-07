import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CursorState {
  x: number;
  y: number;
  isVisible: boolean;
  isHovering: boolean;
  isClicking: boolean;
}

export function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isHovering: false,
    isClicking: false,
  });

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setCursor(prev => ({ ...prev, x: e.clientX, y: e.clientY, isVisible: true }));
  }, [cursorX, cursorY]);

  const handleMouseEnter = useCallback(() => {
    setCursor(prev => ({ ...prev, isVisible: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursor(prev => ({ ...prev, isVisible: false }));
  }, []);

  const handleMouseDown = useCallback(() => {
    setCursor(prev => ({ ...prev, isClicking: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursor(prev => ({ ...prev, isClicking: false }));
  }, []);

  useEffect(() => {
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursor(prev => ({ ...prev, isHovering: true }));
      }
    };

    const handleHoverEnd = () => {
      setCursor(prev => ({ ...prev, isHovering: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Outer ring with glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursor.isHovering ? 60 : cursor.isClicking ? 30 : 40,
          height: cursor.isHovering ? 60 : cursor.isClicking ? 30 : 40,
          opacity: cursor.isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 400, damping: 25 },
          height: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 0.15 },
        }}
      >
        <div 
          className="w-full h-full rounded-full border-2 transition-colors duration-200"
          style={{
            borderColor: cursor.isHovering ? 'hsl(210 100% 60%)' : 'hsl(210 20% 95%)',
            boxShadow: cursor.isHovering 
              ? '0 0 20px hsl(210 100% 60% / 0.5), 0 0 40px hsl(210 100% 60% / 0.3)' 
              : 'none',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, hsl(210 100% 60%), hsl(200 80% 55%))",
        }}
        animate={{
          width: cursor.isHovering ? 8 : cursor.isClicking ? 16 : 10,
          height: cursor.isHovering ? 8 : cursor.isClicking ? 16 : 10,
          opacity: cursor.isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trailing particles */}
      {cursor.isHovering && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed pointer-events-none z-[9998] rounded-full bg-primary/30"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                width: 4,
                height: 4,
                opacity: cursor.isVisible ? 0.5 - i * 0.15 : 0,
                scale: 1 - i * 0.2,
              }}
              transition={{
                type: "spring",
                stiffness: 200 - i * 40,
                damping: 20 + i * 5,
              }}
            />
          ))}
        </>
      )}
    </>
  );
}