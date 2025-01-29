import CanvasLoader from "./Loader";
import React, { useRef, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Preload } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

// const Earth = () => {
//   const earth = useGLTF("/planet/scene.gltf");

//   return (
//     <primitive
//       object={earth.scene}
//       scale={10} // Increased scale
//       position-y={-2} // Moved down
//       rotation-y={-45}
//     />
//   );
// };

// textures
import tx1 from "../assets/textures/earthmap1k.jpg";
import tx2 from "../assets/textures/earthbump.jpg";
import tx3 from "../assets/textures/earthCloud.png";
import tx4 from "../assets/textures/galaxy.png";

const Earth = () => {
  const earthRef = useRef();
  const cloudRef = useRef();

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.0015;
    if (cloudRef.current) cloudRef.current.rotation.y += 0.0012;
  });

  // Load textures
  const [earthMap, bumpMap, cloudMap, starsMap] = useLoader(THREE.TextureLoader, [
    tx1, tx2, tx3, tx4
  ]);

  return (
    <group>
      {/* Earth - Bigger size */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} /> {/* Increased Size */}
        <meshStandardMaterial map={earthMap} bumpMap={bumpMap} bumpScale={0.3} />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.24, 64, 64]} /> {/* Slightly Bigger */}
        <meshStandardMaterial map={cloudMap} transparent opacity={0.5} />
      </mesh>

      {/* Stars */}
      <mesh>
        <sphereGeometry args={[50, 64, 64]} />
        <meshBasicMaterial map={starsMap} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

// const EarthCanvas = () => {
//   return (
//     <div style={{ width: '100%', height: '100vh', position: 'absolute', bottom: 0 }}>
//       <Canvas
//         shadows
//         dpr={[1, 2]}
//         gl={{ preserveDrawingBuffer: true }}
//         camera={{
//           fov: 45,
//           near: 0.1,
//           far: 1000,
//           position: [-12, 8, 18],
//         }}
//         className="pointer-events-auto"
//       >
//         <Suspense fallback={<CanvasLoader />}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[1, 1, 1]} intensity={1} />
//           <OrbitControls
//             autoRotate
//             enableZoom={false} // Disables zooming
//             enablePan={false} // Prevents moving the camera
//             enableRotate={true} // Allows rotation
//             maxPolarAngle={Math.PI / 1.4}
//             minPolarAngle={Math.PI / 3}
//           />
//           <Earth />
//           <Preload all />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

// export default EarthCanvas;


const EarthCanvas = () => {
  return (
    <div style={{ width: "100%", height: "80%", position: "absolute", bottom: 0 }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 3.2] }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={1} />

          <OrbitControls
            autoRotate={false}
            enableZoom={false}
            enablePan={false}
            // minAzimuthAngle={-Math.PI}
            // maxAzimuthAngle={Math.PI}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 1.8}
          />

          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;