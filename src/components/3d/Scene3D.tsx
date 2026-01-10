import { Suspense, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Text, Stars, RoundedBox, Trail, Environment } from "@react-three/drei";
import * as THREE from "three";

// Interactive Mouse Tracking
function MouseTracker({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * viewport.width) / 20;
      const targetY = (state.pointer.y * viewport.height) / 20;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY * 0.1,
        0.05
      );
    }
  });
  
  return <group ref={groupRef}>{children}</group>;
}

// Floating Laptop with Code Screen
function FloatingLaptop({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  // Create code line pattern texture
  const codeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Dark background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 512);
    
    // Code lines
    const colors = ['#3b82f6', '#22d3ee', '#a855f7', '#10b981', '#f59e0b', '#f97316'];
    for (let i = 0; i < 25; i++) {
      ctx.fillStyle = colors[i % colors.length];
      const width = 80 + Math.random() * 200;
      const indent = 20 + (i % 4) * 20;
      ctx.fillRect(indent, 20 + i * 19, width, 6);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={0.8}>
        {/* Laptop Base */}
        <mesh position={[0, -0.05, 0.4]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[2.4, 0.08, 1.6]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Keyboard area */}
        <mesh position={[0, 0, 0.4]}>
          <boxGeometry args={[2.2, 0.02, 1.4]} />
          <meshStandardMaterial color="#0f0f1a" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Keyboard keys grid */}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <mesh key={`${row}-${col}`} position={[-0.9 + col * 0.2, 0.03, 0.1 + row * 0.25]}>
              <boxGeometry args={[0.14, 0.03, 0.18]} />
              <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.4} />
            </mesh>
          ))
        )}
        
        {/* Screen Frame (hinged open) */}
        <group position={[0, 0.9, -0.35]} rotation={[0.3, 0, 0]}>
          {/* Screen bezel */}
          <mesh>
            <boxGeometry args={[2.5, 1.7, 0.06]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
          </mesh>
          
          {/* Screen Display */}
          <mesh ref={screenRef} position={[0, 0, 0.04]}>
            <planeGeometry args={[2.2, 1.45]} />
            <meshBasicMaterial map={codeTexture} />
          </mesh>
          
          {/* Animated scan line effect */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[2.2, 0.02]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
          </mesh>
          
          {/* Screen glow */}
          <pointLight position={[0, 0, 0.5]} color="#3b82f6" intensity={2} distance={3} />
        </group>
        
        {/* Trackpad */}
        <mesh position={[0, 0.02, 0.8]}>
          <boxGeometry args={[0.8, 0.01, 0.5]} />
          <meshStandardMaterial color="#252538" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Apple logo / glow accent */}
        <mesh position={[0, 0.04, -0.1]}>
          <circleGeometry args={[0.08, 32]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
      </group>
    </Float>
  );
}

// Orbiting Code Symbol
function OrbitingSymbol({ 
  symbol, 
  radius, 
  speed, 
  color,
  initialAngle = 0
}: { 
  symbol: string; 
  radius: number; 
  speed: number; 
  color: string;
  initialAngle?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(initialAngle);
  
  useFrame((state) => {
    if (meshRef.current) {
      angleRef.current += speed * 0.01;
      meshRef.current.position.x = Math.cos(angleRef.current) * radius;
      meshRef.current.position.z = Math.sin(angleRef.current) * radius;
      meshRef.current.position.y = Math.sin(angleRef.current * 2) * 0.5;
      meshRef.current.rotation.y = -angleRef.current;
    }
  });

  return (
    <mesh ref={meshRef}>
      <RoundedBox args={[0.6, 0.3, 0.08]} radius={0.04}>
        <meshStandardMaterial 
          color="#0f172a"
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </RoundedBox>
      <pointLight color={color} intensity={1} distance={2} />
    </mesh>
  );
}

// Glowing Tech Cube with Trail
function GlowingCube({ position, color, size = 0.4 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;
      meshRef.current.rotation.z += 0.004;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
      <Trail
        width={1}
        length={8}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh 
          ref={meshRef} 
          position={position}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.95}
            roughness={0.05}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.4}
          />
        </mesh>
      </Trail>
      <pointLight position={position} color={color} intensity={1.5} distance={3} />
    </Float>
  );
}

// Floating Code Bracket with 3D Text effect
function CodeBracket({ position, symbol, color, scale = 1 }: { position: [number, number, number]; symbol: string; color: string; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0] * 2) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Background pill */}
        <mesh>
          <RoundedBox args={[0.8, 0.4, 0.1]} radius={0.05}>
            <meshStandardMaterial 
              color="#0f172a"
              metalness={0.6}
              roughness={0.3}
              transparent
              opacity={0.9}
            />
          </RoundedBox>
        </mesh>
        
        {/* Glow ring */}
        <mesh>
          <torusGeometry args={[0.5, 0.02, 16, 32]} />
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        <pointLight color={color} intensity={1} distance={2.5} />
      </group>
    </Float>
  );
}

// Glowing Torus Ring
function GlowingTorus({ position, color, size = 0.5 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.2, 16, 48]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.95}
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
      <pointLight position={position} color={color} intensity={1} distance={3} />
    </Float>
  );
}

// Animated Sphere with distortion
function AnimatedSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[0.4, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
      <pointLight position={position} color={color} intensity={0.8} distance={2} />
    </Float>
  );
}

// Floating Particles
function FloatingParticles() {
  const count = 300;
  const particlesRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorOptions = [
      new THREE.Color('#3b82f6'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#10b981'),
    ];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// React Logo
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
      <group ref={groupRef} position={position} scale={0.6}>
        {/* Center sphere */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.8} />
        </mesh>
        {/* Orbital rings */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3].map((rotation, i) => (
          <mesh key={i} rotation={[Math.PI / 2, rotation, 0]}>
            <torusGeometry args={[0.6, 0.03, 16, 64]} />
            <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.5} />
          </mesh>
        ))}
        <pointLight color="#61dafb" intensity={2} distance={4} />
      </group>
    </Float>
  );
}

// Main Scene Content
function SceneContent() {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width, viewport.height) / 12;
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#22d3ee" />
      
      {/* Stars background */}
      <Stars 
        radius={80} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={0.3} 
      />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Mouse-tracked group */}
      <MouseTracker>
        {/* Main Floating Laptop */}
        <FloatingLaptop position={[2 * scale, 0, 0]} />
        
        {/* React Logo */}
        <ReactLogo position={[-2.5 * scale, 1, -1]} />
        
        {/* Single small rotating cube - Tech Studio setup */}
        <GlowingCube position={[3 * scale, 1.5, -1]} color="#3b82f6" size={0.25} />
        
        {/* Code Brackets */}
        <CodeBracket position={[-3.5 * scale, 2, 0]} symbol="{}" color="#f97316" scale={1.2} />
        <CodeBracket position={[3.5 * scale, -1, 0.5]} symbol="</>" color="#22d3ee" scale={1} />
      </MouseTracker>
    </>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        dpr={[1, 2]}
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
