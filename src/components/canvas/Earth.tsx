import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

// Create flowing ribbon curve
function FlowingRibbon({ 
  radius = 2, 
  thickness = 0.12, 
  segments = 64, 
  color = "#f0d0c0",
  yOffset = 0,
  phase = 0,
  amplitude = 0.3
}: {
  radius?: number;
  thickness?: number;
  segments?: number;
  color?: string;
  yOffset?: number;
  phase?: number;
  amplitude?: number;
}) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2 + phase;
      const y = yOffset + Math.sin(angle * 3 + phase) * amplitude;
      const r = radius + Math.sin(angle * 2 + phase) * 0.2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * r,
        y,
        Math.sin(angle) * r
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.TubeGeometry(curve, segments * 2, thickness, 8, true);
  }, [radius, thickness, segments, yOffset, phase, amplitude]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.4}
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

      {/* Flowing organic ribbons wrapping around the globe */}
      <group ref={ribbonsRef}>
        {/* Main ribbons - pink/cream colored flowing bands */}
        <FlowingRibbon radius={1.9} thickness={0.15} color="#f5d5d0" yOffset={-0.8} phase={0} amplitude={0.4} />
        <FlowingRibbon radius={2.0} thickness={0.13} color="#e8c5c0" yOffset={-0.4} phase={0.5} amplitude={0.35} />
        <FlowingRibbon radius={2.1} thickness={0.14} color="#f0d0c8" yOffset={0} phase={1} amplitude={0.38} />
        <FlowingRibbon radius={2.0} thickness={0.12} color="#e5c0b8" yOffset={0.4} phase={1.5} amplitude={0.32} />
        <FlowingRibbon radius={1.95} thickness={0.13} color="#f8d8d0" yOffset={0.8} phase={2} amplitude={0.36} />
        
        {/* Additional overlapping ribbons for density */}
        <FlowingRibbon radius={1.85} thickness={0.11} color="#ddb8b0" yOffset={-0.6} phase={0.8} amplitude={0.28} />
        <FlowingRibbon radius={2.05} thickness={0.10} color="#f0c8c0" yOffset={0.2} phase={1.8} amplitude={0.30} />
        <FlowingRibbon radius={1.92} thickness={0.12} color="#e8d0c8" yOffset={0.6} phase={2.5} amplitude={0.34} />
        
        {/* Top and bottom accent ribbons */}
        <FlowingRibbon radius={1.8} thickness={0.10} color="#c8a8a0" yOffset={1.0} phase={0.3} amplitude={0.25} />
        <FlowingRibbon radius={1.85} thickness={0.11} color="#d0b0a8" yOffset={-1.0} phase={2.8} amplitude={0.28} />
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
