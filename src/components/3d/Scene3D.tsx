import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Text, Stars } from "@react-three/drei";
import * as THREE from "three";

// Developer Desk with Monitor Setup
function DeveloperDesk({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + 0.3;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={0.6}>
      {/* Desk */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 0.15, 2]} />
        <meshStandardMaterial color="#2d1f1f" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Desk legs */}
      {[[-1.7, -1.5, 0.7], [1.7, -1.5, 0.7], [-1.7, -1.5, -0.7], [1.7, -1.5, -0.7]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.1, 2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      
      {/* Main Monitor */}
      <group position={[0, 0.6, -0.5]}>
        {/* Monitor frame */}
        <mesh>
          <boxGeometry args={[2.2, 1.4, 0.08]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Monitor screen - glowing */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2, 1.2]} />
          <meshBasicMaterial color="#3b82f6" opacity={0.9} transparent />
        </mesh>
        {/* Code lines on screen */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((y, i) => (
          <mesh key={i} position={[-0.3 + (i % 2) * 0.2, y, 0.06]}>
            <boxGeometry args={[0.8 - (i % 3) * 0.1, 0.06, 0.01]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#22d3ee" : "#a855f7"} />
          </mesh>
        ))}
        {/* Monitor stand */}
        <mesh position={[0, -0.85, 0.3]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1, 0.3]}>
          <boxGeometry args={[0.8, 0.05, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Secondary Monitor */}
      <group position={[1.5, 0.5, -0.3]} rotation={[0, -0.4, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.06]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.05, 0.75]} />
          <meshBasicMaterial color="#22d3ee" opacity={0.8} transparent />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, -0.35, 0.4]}>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[0.9, -0.35, 0.4]}>
        <boxGeometry args={[0.15, 0.04, 0.25]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Coffee mug */}
      <mesh position={[-1.3, -0.25, 0.3]}>
        <cylinderGeometry args={[0.1, 0.08, 0.2, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Monitor glow */}
      <pointLight position={[0, 0.5, 0.5]} color="#3b82f6" intensity={3} distance={4} />
      <pointLight position={[1.5, 0.4, 0]} color="#22d3ee" intensity={1.5} distance={3} />
    </group>
  );
}

// Office Chair
function OfficeChair({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2 - 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={0.5}>
      {/* Seat */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.15, 1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.6} />
      </mesh>
      
      {/* Backrest */}
      <mesh position={[0, 0.7, -0.4]}>
        <boxGeometry args={[1, 1.2, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.6} />
      </mesh>
      
      {/* Chair base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Chair wheel base */}
      <mesh position={[0, -0.9, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 6]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Floating Code Block with syntax highlighting effect
function FloatingCodeBlock({ position, color = "#3b82f6" }: { position: [number, number, number]; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial 
          color="#0f172a"
          metalness={0.5}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Code lines simulation */}
      {[0.35, 0.15, -0.05, -0.25, -0.45].map((y, i) => (
        <mesh key={i} position={[position[0], position[1] + y, position[2] + 0.06]}>
          <boxGeometry args={[0.55 - (i % 3) * 0.1, 0.05, 0.01]} />
          <meshBasicMaterial color={["#3b82f6", "#22d3ee", "#a855f7", "#10b981", "#f59e0b"][i % 5]} />
        </mesh>
      ))}
    </Float>
  );
}

// Terminal/Console Window
function FloatingTerminal({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef} position={position}>
        {/* Terminal window */}
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.08]} />
          <meshStandardMaterial color="#1e1e2e" metalness={0.4} roughness={0.3} />
        </mesh>
        {/* Terminal header */}
        <mesh position={[0, 0.38, 0.045]}>
          <boxGeometry args={[1.15, 0.1, 0.01]} />
          <meshBasicMaterial color="#374151" />
        </mesh>
        {/* Terminal buttons */}
        {[[-0.45, "#ef4444"], [-0.38, "#fbbf24"], [-0.31, "#22c55e"]].map(([x, color], i) => (
          <mesh key={i} position={[x as number, 0.38, 0.05]}>
            <circleGeometry args={[0.02, 16]} />
            <meshBasicMaterial color={color as string} />
          </mesh>
        ))}
        {/* Terminal text lines */}
        {[0.2, 0.05, -0.1, -0.25].map((y, i) => (
          <mesh key={i} position={[-0.2 + (i % 2) * 0.1, y, 0.05]}>
            <boxGeometry args={[0.6 - (i % 3) * 0.15, 0.04, 0.01]} />
            <meshBasicMaterial color={i === 0 ? "#10b981" : "#64748b"} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// React Logo Spinning
function ReactLogo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={position} scale={0.5}>
        {/* Center sphere */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.5} />
        </mesh>
        {/* Orbital rings */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3].map((rotation, i) => (
          <mesh key={i} rotation={[Math.PI / 2, rotation, 0]}>
            <torusGeometry args={[0.6, 0.03, 16, 64]} />
            <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.3} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Git Branch Visualization
function GitBranch({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
      <group ref={groupRef} position={position} scale={0.4}>
        {/* Main branch line */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} />
        </mesh>
        {/* Branch commits */}
        {[-0.5, 0, 0.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.4} />
          </mesh>
        ))}
        {/* Side branch */}
        <mesh position={[0.3, 0.15, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.5, 0.35, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// HTML/JSX Tag
function CodeTag({ position, tag, color }: { position: [number, number, number]; tag: string; color: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={meshRef} position={position}>
        <mesh>
          <boxGeometry args={[0.6, 0.25, 0.05]} />
          <meshStandardMaterial 
            color="#1e1e2e" 
            metalness={0.5} 
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function TechCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <Box ref={meshRef} args={[0.5, 0.5, 0.5]} position={position}>
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Box>
    </Float>
  );
}

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[0, 0, -3]}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.25}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        opacity={0.5}
        transparent
      />
    </Sphere>
  );
}

function ParticleField() {
  const count = 400;
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent() {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width, viewport.height) / 12;
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[0, 5, 5]} intensity={0.9} color="#22d3ee" />
      <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={0.5} color="#a855f7" />
      
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={2500} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.4} 
      />
      
      {/* Particle field */}
      <ParticleField />
      
      {/* Main glowing sphere */}
      <GlowingSphere />
      
      {/* Developer Workspace - Main feature */}
      <DeveloperDesk position={[2.5 * scale, -0.5, 0]} />
      
      {/* Office Chair */}
      <OfficeChair position={[2.5 * scale, -0.8, 1.5]} />
      
      {/* Floating Code Elements */}
      <FloatingCodeBlock position={[-3 * scale, 1.5, 0]} color="#3b82f6" />
      <FloatingCodeBlock position={[-2 * scale, -1, 1]} color="#22d3ee" />
      
      {/* Terminal Window */}
      <FloatingTerminal position={[-2.5 * scale, 0.5, -1]} />
      
      {/* React Logo */}
      <ReactLogo position={[0, 2.5, -2]} />
      
      {/* Git Branch */}
      <GitBranch position={[-1.5 * scale, -1.5, 0.5]} />
      
      {/* Code Tags */}
      <CodeTag position={[3 * scale, 2, -1]} tag="<div>" color="#f97316" />
      <CodeTag position={[-3 * scale, -0.5, 1]} tag="</>" color="#22d3ee" />
      
      {/* Tech cubes */}
      <TechCube position={[1 * scale, 2.5, 1]} color="#f59e0b" />
      <TechCube position={[-1 * scale, -2, -1]} color="#10b981" />
      <TechCube position={[3.5 * scale, 1, 2]} color="#8b5cf6" />
      
      {/* Floating Torus rings */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Torus args={[0.7, 0.15, 16, 32]} position={[0, 2, -4]}>
          <meshStandardMaterial 
            color="#22d3ee"
            metalness={0.9}
            roughness={0.1}
            emissive="#22d3ee"
            emissiveIntensity={0.3}
          />
        </Torus>
      </Float>
    </>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
