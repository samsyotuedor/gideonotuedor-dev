import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

// Create flowing organic ribbon curve with wave variations
function FlowingRibbon({ 
  radius = 2, 
  thickness = 0.2, 
  segments = 80, 
  color = "#f5d5d5",
  yOffset = 0,
  phase = 0,
  amplitude = 0.4,
  waveFrequency = 4,
  tilt = 0.15
}: {
  radius?: number;
  thickness?: number;
  segments?: number;
  color?: string;
  yOffset?: number;
  phase?: number;
  amplitude?: number;
  waveFrequency?: number;
  tilt?: number;
}) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 + phase;
      
      // Create organic wave pattern
      const wave1 = Math.sin(angle * waveFrequency + phase) * amplitude;
      const wave2 = Math.sin(angle * 2 + phase * 0.5) * (amplitude * 0.3);
      const y = yOffset + wave1 + wave2;
      
      // Radius variation for organic feel
      const radiusVariation = Math.sin(angle * 3 + phase) * 0.15 + Math.cos(angle * 5) * 0.08;
      const r = radius + radiusVariation;
      
      // Add slight tilt
      const tiltOffset = Math.sin(angle) * tilt;
      
      points.push(new THREE.Vector3(
        Math.cos(angle) * r,
        y + tiltOffset,
        Math.sin(angle) * r
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.TubeGeometry(curve, segments * 2, thickness, 12, true);
  }, [radius, thickness, segments, yOffset, phase, amplitude, waveFrequency, tilt]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.15}
        roughness={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Group>(null);
  const ribbonsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
    if (ribbonsRef.current) {
      ribbonsRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      {/* Main Earth sphere - dark blue ocean */}
      <group ref={earthRef}>
        <mesh>
          <sphereGeometry args={[1.6, 64, 64]} />
          <meshStandardMaterial
            color="#0a1628"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Green continents layer */}
        <mesh>
          <sphereGeometry args={[1.62, 64, 64]} />
          <meshStandardMaterial
            color="#1a5a3a"
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Highlight layer for depth */}
        <mesh>
          <sphereGeometry args={[1.64, 64, 64]} />
          <meshStandardMaterial
            color="#2d8a5f"
            metalness={0.6}
            roughness={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* Flowing organic ribbons wrapping around the globe - thicker and more organic */}
      <group ref={ribbonsRef}>
        {/* Main thick ribbons - pink/cream colored flowing bands */}
        <FlowingRibbon radius={1.85} thickness={0.22} color="#f5d5d8" yOffset={-0.9} phase={0} amplitude={0.45} waveFrequency={4} tilt={0.2} />
        <FlowingRibbon radius={1.92} thickness={0.25} color="#e8c8c5" yOffset={-0.5} phase={0.6} amplitude={0.4} waveFrequency={3} tilt={0.15} />
        <FlowingRibbon radius={2.0} thickness={0.28} color="#f0d0cc" yOffset={-0.1} phase={1.2} amplitude={0.42} waveFrequency={4} tilt={0.18} />
        <FlowingRibbon radius={1.95} thickness={0.24} color="#e5c0bc" yOffset={0.3} phase={1.8} amplitude={0.38} waveFrequency={3} tilt={0.22} />
        <FlowingRibbon radius={1.88} thickness={0.26} color="#f8d8d4" yOffset={0.7} phase={2.4} amplitude={0.44} waveFrequency={4} tilt={0.16} />
        
        {/* Additional overlapping ribbons for density and depth */}
        <FlowingRibbon radius={1.8} thickness={0.2} color="#ddb8b4" yOffset={-0.7} phase={0.9} amplitude={0.35} waveFrequency={5} tilt={0.12} />
        <FlowingRibbon radius={2.05} thickness={0.18} color="#f0c8c4" yOffset={0.1} phase={2.0} amplitude={0.36} waveFrequency={3} tilt={0.2} />
        <FlowingRibbon radius={1.9} thickness={0.22} color="#e8d0cc" yOffset={0.5} phase={2.8} amplitude={0.4} waveFrequency={4} tilt={0.14} />
        
        {/* Top and bottom accent ribbons - slightly thinner */}
        <FlowingRibbon radius={1.75} thickness={0.16} color="#d0b0ac" yOffset={1.0} phase={0.4} amplitude={0.3} waveFrequency={5} tilt={0.1} />
        <FlowingRibbon radius={1.78} thickness={0.18} color="#c8a8a4" yOffset={-1.1} phase={3.2} amplitude={0.32} waveFrequency={4} tilt={0.12} />
        
        {/* Extra ribbons for more coverage like reference */}
        <FlowingRibbon radius={1.82} thickness={0.2} color="#f2d4d0" yOffset={-0.3} phase={1.5} amplitude={0.38} waveFrequency={3} tilt={0.18} />
        <FlowingRibbon radius={1.98} thickness={0.22} color="#e0c0bc" yOffset={0.9} phase={0.2} amplitude={0.42} waveFrequency={4} tilt={0.2} />
      </group>

      {/* Small floating particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.8 + Math.random() * 0.3;
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              (Math.random() - 0.5) * 2,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#f0d0c8"
              emissive="#f0d0c8"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function EarthCanvas() {
  return (
    <Canvas
      shadows
      frameloop="always"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Lighting for the organic look */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, 3, -5]} intensity={0.6} color="#f5d5d0" />
        <pointLight position={[3, -3, 5]} intensity={0.4} color="#8ab4f8" />
        
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
