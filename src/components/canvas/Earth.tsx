import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

// Grid lines for latitude (outer wireframe)
function LatitudeLines({ radius = 1.8 }: { radius?: number }) {
  const lines = [];
  for (let i = -75; i <= 75; i += 15) {
    const phi = (90 - i) * (Math.PI / 180);
    const r = radius * Math.sin(phi);
    const y = radius * Math.cos(phi);
    
    lines.push(
      <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r - 0.006, r + 0.006, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    );
  }
  return <>{lines}</>;
}

// Grid lines for longitude (outer wireframe)
function LongitudeLines({ radius = 1.8 }: { radius?: number }) {
  const lines = [];
  for (let i = 0; i < 180; i += 15) {
    lines.push(
      <mesh key={`long-${i}`} rotation={[0, (i * Math.PI) / 180, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>
    );
  }
  return <>{lines}</>;
}

// Location pin marker with glow
function LocationPin({ position }: { position: [number, number, number] }) {
  const pinRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (pinRef.current) {
      pinRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.15);
    }
  });

  return (
    <group position={position} ref={pinRef}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.1, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Connection arcs between points
function ConnectionArc({ start, end, color = "#60a5fa" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2 * 1.4,
      (start[1] + end[1]) / 2 * 1.4 + 0.6,
      (start[2] + end[2]) / 2 * 1.4
    ),
    new THREE.Vector3(...end)
  );
  
  const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.012, 8, false);
  
  return (
    <mesh geometry={tubeGeometry}>
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

// Inner Earth with continent-like patterns
function InnerEarth() {
  const earthRef = useRef<THREE.Group>(null);

  // Create simple continent shapes using displaced geometry
  const continentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#22c55e",
      metalness: 0.2,
      roughness: 0.8,
      transparent: true,
      opacity: 0.9,
    });
  }, []);

  return (
    <group ref={earthRef}>
      {/* Ocean layer */}
      <mesh>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshStandardMaterial
          color="#1e3a5f"
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* Continent patches - stylized land masses */}
      {/* North America */}
      <mesh position={[-0.8, 0.7, 0.8]} rotation={[0.3, -0.5, 0.2]}>
        <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 0.8, 0, Math.PI * 0.6]} />
        <primitive object={continentMaterial} attach="material" />
      </mesh>
      
      {/* South America */}
      <mesh position={[-0.5, -0.3, 1.1]} rotation={[0.5, -0.3, 0.1]}>
        <sphereGeometry args={[0.35, 16, 16, 0, Math.PI * 0.5, 0, Math.PI * 0.8]} />
        <primitive object={continentMaterial} attach="material" />
      </mesh>
      
      {/* Europe/Africa */}
      <mesh position={[0.5, 0.4, 1.1]} rotation={[-0.2, 0.3, 0]}>
        <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 0.6, 0, Math.PI * 0.9]} />
        <primitive object={continentMaterial} attach="material" />
      </mesh>
      
      {/* Asia */}
      <mesh position={[1.0, 0.6, 0.4]} rotation={[0.1, 0.8, 0.1]}>
        <sphereGeometry args={[0.55, 16, 16, 0, Math.PI * 0.9, 0, Math.PI * 0.6]} />
        <primitive object={continentMaterial} attach="material" />
      </mesh>
      
      {/* Australia */}
      <mesh position={[1.0, -0.6, 0.6]} rotation={[0.4, 0.5, 0.2]}>
        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 0.7, 0, Math.PI * 0.5]} />
        <primitive object={continentMaterial} attach="material" />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.42, 64, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Inner atmosphere */}
      <mesh>
        <sphereGeometry args={[1.38, 64, 64]} />
        <meshBasicMaterial
          color="#93c5fd"
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

function Globe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  // Convert lat/long to 3D position
  const latLongToPosition = (lat: number, long: number, radius: number = 1.85): [number, number, number] => {
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
      {/* Inner Earth with continents */}
      <InnerEarth />

      {/* Outer wireframe globe */}
      <LatitudeLines radius={1.8} />
      <LongitudeLines radius={1.8} />

      {/* Location pins */}
      {locations.map((loc, i) => (
        <LocationPin key={i} position={latLongToPosition(loc[0], loc[1], 1.85)} />
      ))}

      {/* Connection arcs */}
      <ConnectionArc 
        start={latLongToPosition(locations[0][0], locations[0][1], 1.85)} 
        end={latLongToPosition(locations[1][0], locations[1][1], 1.85)} 
      />
      <ConnectionArc 
        start={latLongToPosition(locations[1][0], locations[1][1], 1.85)} 
        end={latLongToPosition(locations[2][0], locations[2][1], 1.85)} 
        color="#818cf8"
      />
      <ConnectionArc 
        start={latLongToPosition(locations[4][0], locations[4][1], 1.85)} 
        end={latLongToPosition(locations[0][0], locations[0][1], 1.85)} 
        color="#a78bfa"
      />
      <ConnectionArc 
        start={latLongToPosition(locations[2][0], locations[2][1], 1.85)} 
        end={latLongToPosition(locations[3][0], locations[3][1], 1.85)} 
        color="#34d399"
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
        
        {/* Enhanced lighting for 3D effect */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#3b82f6" />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[4, -2, 4]} intensity={0.3} color="#22c55e" />
        
        <Globe />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
