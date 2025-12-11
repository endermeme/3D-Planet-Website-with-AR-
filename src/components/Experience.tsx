import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

interface ExperienceProps {
  zoomLevel: number;
}

export const Experience = ({ zoomLevel }: ExperienceProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <mesh scale={[zoomLevel, zoomLevel, zoomLevel]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  );
};
