
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { planets } from '../data/planets';

interface SolarSystemProps {
    currentPlanetIndex: number;
    zoomLevel: number; // 0 to 1
}

export const SolarSystem = ({ currentPlanetIndex, zoomLevel }: SolarSystemProps) => {
    const controlsRef = useRef<any>(null);

    // Refs for planets to access their positions
    const planetRefs = useRef<(THREE.Group | THREE.Mesh | null)[]>([]);

    // Load Sun Model
    const sunGltf = useGLTF('/models/sun.glb') as any;
    const sunScene = sunGltf.scene;

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Animate planets orbiting
        planetRefs.current.forEach((obj, index) => {
            if (obj) {
                const planet = planets[index];
                const angle = time * planet.speed;
                obj.position.x = Math.cos(angle) * planet.distance;
                obj.position.z = Math.sin(angle) * planet.distance;

                // Rotate planet on its axis
                obj.rotation.y += 0.005;
            }
        });

        // Rotate Sun
        if (sunScene) {
            sunScene.rotation.y += 0.002;
        }

        // Camera Logic
        const targetPlanet = planets[currentPlanetIndex];
        const targetObj = planetRefs.current[currentPlanetIndex];

        if (targetObj && controlsRef.current) {
            const planetPos = targetObj.position.clone();

            const closeUpOffset = new THREE.Vector3(0, targetPlanet.size * 1.5, targetPlanet.size * 3);
            const closeUpPos = planetPos.clone().add(closeUpOffset);

            const overviewOffset = new THREE.Vector3(0, 10, 15);
            const overviewPos = planetPos.clone().add(overviewOffset);

            const targetCamPos = new THREE.Vector3().lerpVectors(overviewPos, closeUpPos, zoomLevel);

            state.camera.position.lerp(targetCamPos, 0.05);

            controlsRef.current.target.lerp(planetPos, 0.1);
            controlsRef.current.update();
        }
    });

    return (
        <>
            <ambientLight intensity={1.5} /> {/* Increased from 0.5 to 1.5 for better visibility */}
            <pointLight position={[0, 0, 0]} intensity={3} color="#FFD700" distance={100} decay={1} /> {/* Stronger Sun Light */}

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Sun */}
            <primitive object={sunScene} scale={[0.05, 0.05, 0.05]} position={[0, 0, 0]} />

            {/* Planets */}
            {planets.map((planet, index) => (
                <PlanetMesh
                    key={planet.name}
                    planet={planet}
                    setRef={(el) => { planetRefs.current[index] = el; }}
                />
            ))}

            <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} />
        </>
    );
};

// Sub-component to handle model/texture loading per planet safely
const PlanetMesh = ({ planet, setRef }: { planet: any, setRef: (el: THREE.Group | THREE.Mesh | null) => void }) => {
    // Conditional hook usage is generally bad in React, but here we are inside a component that renders one specific planet.
    // However, hooks must be called in the same order. 
    // Since 'planet' prop doesn't change for a given component instance (key=planet.name), it's "safe-ish" but not ideal.
    // Better to have two components or always call both and ignore one.
    // Let's use a helper that decides.

    if (planet.modelUrl) {
        return <GLBPlanet planet={planet} setRef={setRef} />;
    } else {
        return <TexturePlanet planet={planet} setRef={setRef} />;
    }
};

const GLBPlanet = ({ planet, setRef }: { planet: any, setRef: (el: THREE.Group | null) => void }) => {
    const gltf = useGLTF(planet.modelUrl) as any;
    const scene = gltf.scene;
    const clone = scene.clone();

    // Normalize Scale & Center Logic
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 1 / maxDim : 1;
    const BASE_SCALE = 1.0;
    const finalScale = scaleFactor * planet.size * 2 * BASE_SCALE;

    // Apply Emissive Glow
    clone.traverse((child: any) => {
        if (child.isMesh) {
            // Clone material to avoid shared material issues
            child.material = child.material.clone();

            // Make it self-emissive ONLY if it has a texture map to use
            if (child.material.map) {
                child.material.emissiveMap = child.material.map;
                child.material.emissive = new THREE.Color(0xffffff);
                child.material.emissiveIntensity = 0.2;
            } else {
                // If no texture, try to use the material's own color for emissive, 
                // but be careful not to override vertex colors or other maps.
                // Safest is to just let the lights handle it, or use a very low emissive of the material's color.
                if (child.material.color) {
                    child.material.emissive = child.material.color;
                    child.material.emissiveIntensity = 0.1;
                }
            }
        }
    });

    return (
        <group>
            {/* Orbit path visual */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[planet.distance - 0.05, planet.distance + 0.05, 64]} />
                <meshBasicMaterial color="#333" side={THREE.DoubleSide} transparent opacity={0.3} />
            </mesh>

            {/* Container for the planet that handles Orbit Position & Rotation */}
            {/* We attach the ref here so SolarSystem controls this group */}
            <group ref={setRef} position={[planet.distance, 0, 0]}>
                {/* The Model - Offset to be centered */}
                <primitive
                    object={clone}
                    scale={[finalScale, finalScale, finalScale]}
                    position={[-center.x * finalScale, -center.y * finalScale, -center.z * finalScale]}
                />
            </group>
        </group>
    );
}

const TexturePlanet = ({ planet, setRef }: { planet: any, setRef: (el: THREE.Mesh | null) => void }) => {
    const texture = useLoader(THREE.TextureLoader, planet.textureUrl);

    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[planet.distance - 0.05, planet.distance + 0.05, 64]} />
                <meshBasicMaterial color="#333" side={THREE.DoubleSide} transparent opacity={0.3} />
            </mesh>

            <Sphere
                ref={setRef}
                args={[planet.size, 32, 32]}
                position={[planet.distance, 0, 0]}
            >
                <meshStandardMaterial map={texture as THREE.Texture} />
            </Sphere>
        </group>
    );
}

