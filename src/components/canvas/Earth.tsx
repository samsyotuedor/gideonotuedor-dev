import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

// Grid lines for latitude
function LatitudeLines() {
  const lines = [];
  for (let i = -60; i <= 60; i += 30) {
    const phi = (90 - i) * (Math.PI / 180);
    const radius = 1.5 * Math.sin(phi);
    const y = 1.5 * Math.cos(phi);
    
    lines.push(
      <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.008, radius + 0.008, 64]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    );
  }
  return <>{lines}</>;
}

// Grid lines for longitude
function LongitudeLines() {
  const lines = [];
  for (let i = 0; i < 180; i += 30) {
    lines.push(
      <mesh key={`long-${i}`} rotation={[0, (i * Math.PI) / 180, 0]}>
        <torusGeometry args={[1.5, 0.008, 8, 64]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.6} />
      </mesh>
    );
  }
  return <>{lines}</>;
}

// Location pin marker
function LocationPin({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5} />
      </mesh>
      <pointLight color="#ff6b6b" intensity={0.3} distance={0.5} />
    </group>
  );
}

// Connection arcs between points
function ConnectionArc({ start, end, color = "#4a9eff" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2 * 1.5,
      (start[1] + end[1]) / 2 * 1.5 + 0.5,
      (start[2] + end[2]) / 2 * 1.5
    ),
    new THREE.Vector3(...end)
  );
  
  const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.015, 8, false);
  
  return (
    <mesh geometry={tubeGeometry}>
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

function Globe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003;
    }
  });

  // Convert lat/long to 3D position
  const latLongToPosition = (lat: number, long: number, radius: number = 1.5): [number, number, number] => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);
    return [
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    ];
  };

  // Key locations
  const locations: [number, number][] = [
    [40.7128, -74.006],   // New York
    [51.5074, -0.1278],   // London
    [35.6762, 139.6503],  // Tokyo
    [-33.8688, 151.2093], // Sydney
    [6.5244, 3.3792],     // Lagos
  ];

  return (
    <group ref={globeRef}>
      {/* Main globe sphere - dark with subtle gradient */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#0f1729"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Globe glow rim */}
      <mesh>
        <sphereGeometry args={[1.52, 64, 64]} />
        <meshBasicMaterial
          color="#1e40af"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Grid lines */}
      <LatitudeLines />
      <LongitudeLines />

      {/* Location pins */}
      {locations.map((loc, i) => (
        <LocationPin key={i} position={latLongToPosition(loc[0], loc[1], 1.55)} />
      ))}

      {/* Connection arcs */}
      <ConnectionArc 
        start={latLongToPosition(locations[0][0], locations[0][1], 1.55)} 
        end={latLongToPosition(locations[1][0], locations[1][1], 1.55)} 
      />
      <ConnectionArc 
        start={latLongToPosition(locations[1][0], locations[1][1], 1.55)} 
        end={latLongToPosition(locations[2][0], locations[2][1], 1.55)} 
        color="#60a5fa"
      />
      <ConnectionArc 
        start={latLongToPosition(locations[4][0], locations[4][1], 1.55)} 
        end={latLongToPosition(locations[0][0], locations[0][1], 1.55)} 
        color="#818cf8"
      />
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
        position: [-3, 2, 5],
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 3, -5]} intensity={0.4} color="#4a9eff" />
        
        <Globe />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
