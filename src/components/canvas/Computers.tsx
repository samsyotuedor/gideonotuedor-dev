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

// Gaming/Developer Desktop Setup
const FallbackComputer = ({ isMobile, isHovered }: { isMobile: boolean; isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isHovered) {
        groupRef.current.rotation.y += delta * 0.8;
      } else {
        groupRef.current.rotation.y += delta * 0.1;
      }
    }
  });

  const scale = isMobile ? 0.6 : 0.85;
  const time = Date.now() * 0.001;

  return (
    <group ref={groupRef} scale={scale} position={[0, -0.3, 0]}>
      {/* Desk Surface */}
      <mesh position={[0, -0.6, 0.3]} receiveShadow>
        <boxGeometry args={[5, 0.12, 2.2]} />
        <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Desk Front Edge */}
      <mesh position={[0, -0.66, 1.35]}>
        <boxGeometry args={[5, 0.12, 0.08]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Monitor */}
      <group position={[0, 0.5, -0.2]}>
        {/* Monitor Frame */}
        <mesh castShadow>
          <boxGeometry args={[2.2, 1.4, 0.08]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[2.0, 1.2, 0.01]} />
          <meshStandardMaterial color="#0d1117" emissive="#1a1a2e" emissiveIntensity={0.2} />
        </mesh>
        
        {/* Code on screen - file explorer sidebar */}
        <mesh position={[-0.75, 0, 0.05]}>
          <boxGeometry args={[0.4, 1.15, 0.005]} />
          <meshStandardMaterial color="#161b22" />
        </mesh>
        
        {/* Code lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`code-${i}`} position={[-0.1 + (i % 3) * 0.05, 0.45 - i * 0.08, 0.055]}>
            <boxGeometry args={[0.6 + Math.random() * 0.4, 0.035, 0.002]} />
            <meshStandardMaterial 
              color={i % 4 === 0 ? "#c678dd" : i % 4 === 1 ? "#61afef" : i % 4 === 2 ? "#98c379" : "#e5c07b"} 
              emissive={i % 4 === 0 ? "#c678dd" : i % 4 === 1 ? "#61afef" : i % 4 === 2 ? "#98c379" : "#e5c07b"}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
        
        {/* Monitor Stand Neck */}
        <mesh position={[0, -0.85, -0.1]}>
          <boxGeometry args={[0.15, 0.35, 0.1]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Monitor Stand Base */}
        <mesh position={[0, -1.0, 0.1]}>
          <boxGeometry args={[0.6, 0.04, 0.4]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Left Speaker */}
      <group position={[-1.5, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.8, 0.25]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Speaker cone */}
        <mesh position={[0, 0.1, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.05, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} />
        </mesh>
        {/* RGB Ring */}
        <mesh position={[0, 0.1, 0.14]}>
          <torusGeometry args={[0.09, 0.015, 8, 32]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
        </mesh>
        <pointLight position={[0, 0.1, 0.2]} intensity={0.3} color="#ff00ff" distance={1} />
      </group>

      {/* Right Speaker */}
      <group position={[1.5, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.8, 0.25]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.1, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.05, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.1, 0.14]}>
          <torusGeometry args={[0.09, 0.015, 8, 32]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
        </mesh>
        <pointLight position={[0, 0.1, 0.2]} intensity={0.3} color="#00ffff" distance={1} />
      </group>

      {/* Gaming PC Case */}
      <group position={[2.1, 0.15, -0.3]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 1.1, 0.5]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Glass panel */}
        <mesh position={[-0.27, 0, 0]}>
          <boxGeometry args={[0.02, 1.0, 0.45]} />
          <meshStandardMaterial color="#1a1a2e" transparent opacity={0.3} metalness={0.9} />
        </mesh>
        {/* RGB Fan 1 */}
        <mesh position={[-0.25, 0.25, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 32]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.5} />
        </mesh>
        {/* RGB Fan 2 */}
        <mesh position={[-0.25, -0.2, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 32]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} />
        </mesh>
        {/* Power button */}
        <mesh position={[0.28, 0.45, 0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} />
        </mesh>
        <pointLight position={[-0.3, 0, 0]} intensity={0.5} color="#8b5cf6" distance={1.5} />
      </group>

      {/* Mechanical Keyboard */}
      <group position={[0, -0.5, 0.7]}>
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.06, 0.5]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Keyboard RGB strip */}
        <mesh position={[0, 0.035, 0]}>
          <boxGeometry args={[1.55, 0.01, 0.45]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} />
        </mesh>
        {/* Keys */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => (
            <mesh key={`key-${row}-${col}`} position={[-0.65 + col * 0.1, 0.05, -0.15 + row * 0.09]}>
              <boxGeometry args={[0.07, 0.025, 0.065]} />
              <meshStandardMaterial 
                color="#1a1a2e" 
                emissive={col % 3 === 0 ? "#ff0080" : col % 3 === 1 ? "#00ff80" : "#0080ff"}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))
        )}
      </group>

      {/* RGB Mousepad */}
      <group position={[1.1, -0.53, 0.7]}>
        <mesh>
          <boxGeometry args={[0.7, 0.02, 0.5]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.8} />
        </mesh>
        {/* RGB edge glow */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.68, 0.005, 0.48]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>
        <pointLight position={[0, 0.1, 0]} intensity={0.2} color="#a855f7" distance={0.8} />
      </group>

      {/* Gaming Mouse */}
      <group position={[1.1, -0.45, 0.7]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.04, 0.08, 8, 16]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Mouse RGB */}
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.025, 0.008, 8, 16]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.2} />
        </mesh>
        {/* Mouse cable */}
        <mesh position={[0, 0, -0.15]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.25, 8]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </group>

      {/* Monitor Cable */}
      <mesh position={[0, -0.55, -0.35]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        <meshStandardMaterial color="#0a0a12" />
      </mesh>
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
