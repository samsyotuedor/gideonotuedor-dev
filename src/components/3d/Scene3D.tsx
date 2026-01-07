import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingLaptop({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={0.8}>
      {/* Laptop base */}
      <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2, 0.1, 1.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Laptop screen */}
      <mesh position={[0, 0.7, -0.6]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0.7, -0.55]} rotation={[0.3, 0, 0]}>
        <planeGeometry args={[1.8, 1.0]} />
        <meshBasicMaterial color="#3b82f6" opacity={0.8} transparent />
      </mesh>
      {/* Keyboard glow */}
      <pointLight position={[0, 0.5, 0]} color="#3b82f6" intensity={2} distance={3} />
    </group>
  );
}

function FloatingCodeBlock({ position }: { position: [number, number, number] }) {
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
          emissive="#3b82f6"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Code lines simulation */}
      {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
        <mesh key={i} position={[position[0], position[1] + y, position[2] + 0.06]}>
          <boxGeometry args={[0.5 - i * 0.05, 0.05, 0.01]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#3b82f6" : "#22d3ee"} />
        </mesh>
      ))}
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
      <Box ref={meshRef} args={[0.6, 0.6, 0.6]} position={position}>
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
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
    <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, -2]}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        opacity={0.6}
        transparent
      />
    </Sphere>
  );
}

function FloatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Torus ref={meshRef} args={[0.8, 0.2, 16, 32]} position={position}>
        <meshStandardMaterial 
          color="#22d3ee"
          metalness={0.9}
          roughness={0.1}
          emissive="#22d3ee"
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  );
}

function ParticleField() {
  const count = 500;
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
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
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent() {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width, viewport.height) / 10;
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#22d3ee" />
      
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={3000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
      
      {/* Particle field */}
      <ParticleField />
      
      {/* Main glowing sphere */}
      <GlowingSphere />
      
      {/* Floating laptop */}
      <FloatingLaptop position={[3 * scale, 0.5, -1]} />
      
      {/* Code blocks */}
      <FloatingCodeBlock position={[-3 * scale, 1, 0]} />
      <FloatingCodeBlock position={[-2.5 * scale, -1.5, 1]} />
      
      {/* Tech cubes */}
      <TechCube position={[2.5 * scale, 2, 1]} color="#f59e0b" />
      <TechCube position={[-2 * scale, -2, -1]} color="#10b981" />
      <TechCube position={[1.5 * scale, -1.5, 2]} color="#8b5cf6" />
      
      {/* Floating torus */}
      <FloatingTorus position={[0, 2.5, -3]} />
      <FloatingTorus position={[-3 * scale, 0, -2]} />
    </>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
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