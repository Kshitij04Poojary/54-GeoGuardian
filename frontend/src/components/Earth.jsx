import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");

  return (
    <primitive 
      object={earth.scene} 
      scale={10} // Increased scale
      position-y={-2} // Moved down
      rotation-y={0}
    />
  );
};

const EarthCanvas = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', bottom: 0 }}>
      <Canvas
        shadows
        // frameloop='demand'
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [-12, 8, 18], // Adjusted camera position for better view
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={1} />
          <OrbitControls
            autoRotate
            enableZoom={true}
            maxPolarAngle={Math.PI / 1.4} // Restricted vertical rotation
            minPolarAngle={Math.PI / 3} // Restricted vertical rotation
            minDistance={8}
            maxDistance={25}
          />
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;