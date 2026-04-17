"use client";
import CanvasLoader from "@/components/Loader";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
	const computer = useGLTF("/desktop_pc/scene.gltf");
	return (
		<mesh>
			<hemisphereLight intensity={0.15} groundColor="black" />
			<pointLight intensity={1} />
			<spotLight
				position={[-20, 50, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>
			<primitive
				object={computer.scene}
				scale={isMobile ? 0.7 : 0.75}
				position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
				rotation={[-0.01, -0.2, -0.1]}
			/>
		</mesh>
	);
};

// Preload the model
useGLTF.preload("/desktop_pc/scene.gltf");

// Fallback component when 3D model fails to load
const FallbackDisplay = () => (
	<div className="flex items-center justify-center h-full w-full">
		<div className="text-center space-y-4">
			<div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
				<svg 
					className="w-12 h-12 text-primary" 
					fill="none" 
					stroke="currentColor" 
					viewBox="0 0 24 24"
				>
					<path 
						strokeLinecap="round" 
						strokeLinejoin="round" 
						strokeWidth={1.5} 
						d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
					/>
				</svg>
			</div>
			<p className="text-muted-foreground text-sm">3D Model Loading...</p>
		</div>
	</div>
);

// Error boundary wrapper component
const CanvasErrorBoundary = ({ children }: { children: React.ReactNode }) => {
	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return <FallbackDisplay />;
	}

	return (
		<div 
			onError={() => setHasError(true)}
			className="w-full h-full"
		>
			{children}
		</div>
	);
};

const ComputersCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [loadError, setLoadError] = useState(false);

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

	if (loadError) {
		return <FallbackDisplay />;
	}

	return (
		<Canvas
			frameloop="demand"
			shadows
			camera={{ position: [20, 3, 5], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
			onError={() => setLoadError(true)}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Computers isMobile={isMobile} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

export { ComputersCanvas };
