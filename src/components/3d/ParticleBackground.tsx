import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 800;
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a spherical pattern
      const radius = Math.random() * 15 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color gradient from blue to cyan
      const mixRatio = Math.random();
      colors[i3] = 0.23 * (1 - mixRatio) + 0.13 * mixRatio; // R
      colors[i3 + 1] = 0.51 * (1 - mixRatio) + 0.83 * mixRatio; // G
      colors[i3 + 2] = 0.96 * (1 - mixRatio) + 0.93 * mixRatio; // B
    }
    
    return [positions, colors];
  }, []);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      vel[i] = (Math.random() - 0.5) * 0.01;
    }
    return vel;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positionsArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle wave motion
      positionsArray[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.002;
      positionsArray[i3 + 1] += Math.cos(time * 0.3 + i * 0.1) * 0.002;
      positionsArray[i3 + 2] += Math.sin(time * 0.4 + i * 0.05) * 0.001;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const count = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 6); // 2 points per line
    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      const radius1 = Math.random() * 8 + 3;
      const radius2 = Math.random() * 8 + 3;
      const theta1 = Math.random() * Math.PI * 2;
      const theta2 = theta1 + (Math.random() - 0.5) * 0.5;
      const phi1 = Math.random() * Math.PI;
      const phi2 = phi1 + (Math.random() - 0.5) * 0.5;
      
      pos[i6] = radius1 * Math.sin(phi1) * Math.cos(theta1);
      pos[i6 + 1] = radius1 * Math.sin(phi1) * Math.sin(theta1);
      pos[i6 + 2] = radius1 * Math.cos(phi1);
      pos[i6 + 3] = radius2 * Math.sin(phi2) * Math.cos(theta2);
      pos[i6 + 4] = radius2 * Math.sin(phi2) * Math.sin(theta2);
      pos[i6 + 5] = radius2 * Math.cos(phi2);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      lineRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * 2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color="#3b82f6" 
        transparent 
        opacity={0.15} 
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
      >
        <Particles />
        <ConnectionLines />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}