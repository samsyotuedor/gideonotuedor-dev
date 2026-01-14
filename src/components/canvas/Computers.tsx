"use client";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";

const Computers = ({ isMobile, isHovered }: { isMobile: boolean; isHovered: boolean }) => {
  const computer = useGLTF("https://threejs.org/examples/models/gltf/LittlestTokyo.glb");
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef}>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.005 : 0.008}
        position={isMobile ? [0, -1.5, 0] : [0, -1.5, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
};

// Fallback 3D Computer using basic Three.js shapes
const FallbackComputer = ({ isMobile, isHovered }: { isMobile: boolean; isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isHovered) {
        groupRef.current.rotation.y += delta * 0.8;
      } else {
        // Gentle idle rotation
        groupRef.current.rotation.y += delta * 0.1;
      }
    }
  });

  const scale = isMobile ? 0.7 : 1;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Monitor */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.4, 1.5, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0.8, 0.06]}>
        <boxGeometry args={[2.2, 1.3, 0.02]} />
        <meshStandardMaterial color="#0f0f23" emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Screen content - code lines */}
      {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
        <mesh key={i} position={[-0.3 + i * 0.1, 0.8 + y, 0.08]}>
          <boxGeometry args={[1 - i * 0.2, 0.08, 0.01]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#60a5fa" : "#34d399"} 
            emissive={i % 2 === 0 ? "#60a5fa" : "#34d399"} 
            emissiveIntensity={0.5} 
          />
        </mesh>
      ))}
      
      {/* Monitor Stand */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Monitor Base */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1, 0.05, 0.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, -0.5, 0.8]}>
        <boxGeometry args={[1.8, 0.08, 0.6]} />
        <meshStandardMaterial color="#2d2d44" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Keyboard keys */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <mesh 
            key={`key-${row}-${col}`} 
            position={[-0.7 + col * 0.15, -0.45, 0.55 + row * 0.12]}
          >
            <boxGeometry args={[0.1, 0.03, 0.08]} />
            <meshStandardMaterial color="#3b3b5c" />
          </mesh>
        ))
      )}
      
      {/* Mouse */}
      <mesh position={[1.2, -0.48, 0.8]}>
        <capsuleGeometry args={[0.08, 0.15, 4, 8]} />
        <meshStandardMaterial color="#2d2d44" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Coffee mug */}
      <mesh position={[-1.3, -0.35, 0.5]}>
        <cylinderGeometry args={[0.12, 0.1, 0.25, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Desk lamp */}
      <group position={[1.5, 0.2, -0.3]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.05, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} />
        </mesh>
        <mesh position={[0.15, 0.25, 0]}>
          <coneGeometry args={[0.15, 0.2, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
        </mesh>
        <pointLight position={[0.15, 0.15, 0]} intensity={0.5} color="#fbbf24" distance={2} />
      </group>
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div 
      className="w-full h-[350px] md:h-[450px] lg:h-[500px] cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        frameloop="always"
        shadows
        dpr={[1, 2]}
        camera={{ position: [4, 2, 5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            enablePan={false}
          />
          <FallbackComputer isMobile={isMobile} isHovered={isHovered} />
        </Suspense>
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <Preload all />
      </Canvas>
    </div>
  );
};

export { ComputersCanvas };
