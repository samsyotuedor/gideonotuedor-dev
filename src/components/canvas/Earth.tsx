import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  const earthRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.002;
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Main Earth sphere with metallic look */}
      <group ref={earthRef}>
        <mesh>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial
            color="#1a4a3a"
            metalness={0.9}
            roughness={0.2}
            envMapIntensity={1}
          />
        </mesh>
        {/* Continents overlay */}
        <mesh>
          <sphereGeometry args={[1.82, 64, 64]} />
          <meshStandardMaterial
            color="#2d6a4f"
            metalness={0.8}
            roughness={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>

      {/* Orbital rings */}
      <group ref={ringsRef} rotation={[0.5, 0.2, 0]}>
        {/* Ring 1 - Outer */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <mesh key={`ring1-${i}`} rotation={[0, (i * Math.PI * 2) / 8, 0]}>
              <torusGeometry args={[2.8, 0.08, 8, 48, Math.PI * 0.6]} />
              <meshStandardMaterial
                color="#e8d5c4"
                metalness={0.3}
                roughness={0.5}
              />
            </mesh>
          ))}
        </group>

        {/* Ring 2 - Middle */}
        <group rotation={[Math.PI / 2.5, 0.3, 0.2]}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={`ring2-${i}`} rotation={[0, (i * Math.PI * 2) / 6, 0]}>
              <torusGeometry args={[2.4, 0.06, 8, 48, Math.PI * 0.5]} />
              <meshStandardMaterial
                color="#c4b5a8"
                metalness={0.3}
                roughness={0.5}
              />
            </mesh>
          ))}
        </group>

        {/* Ring 3 - Inner tilted */}
        <group rotation={[Math.PI / 3, -0.2, 0.4]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={`ring3-${i}`} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
              <torusGeometry args={[2.2, 0.05, 8, 48, Math.PI * 0.55]} />
              <meshStandardMaterial
                color="#9a8c7a"
                metalness={0.4}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Small floating particles/dots around */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3 + Math.random() * 0.5;
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              (Math.random() - 0.5) * 2,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#e8d5c4"
              emissive="#e8d5c4"
              emissiveIntensity={0.5}
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
          autoRotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4ade80" />
        <pointLight position={[5, 0, -5]} intensity={0.3} color="#60a5fa" />
        
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
