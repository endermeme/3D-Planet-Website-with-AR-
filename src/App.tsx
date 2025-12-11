import { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { HandTracker } from './components/HandTracker';
import { SolarSystem } from './components/SolarSystem';
import { PlanetDetail } from './components/PlanetDetail';
import { planets } from './data/planets';
import './App.css';

function App() {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(2); // Start at Earth
  const [zoomLevel, setZoomLevel] = useState(0); // 0 = Overview, 1 = Detail

  const handleSwipeLeft = useCallback(() => {
    setCurrentPlanetIndex((prev) => (prev + 1) % planets.length);
  }, []);

  const handleSwipeRight = useCallback(() => {
    setCurrentPlanetIndex((prev) => (prev - 1 + planets.length) % planets.length);
  }, []);

  const handleZoomDelta = useCallback((delta: number) => {
    setZoomLevel((prev) => Math.max(0, Math.min(1, prev + delta)));
  }, []);

  const currentPlanet = planets[currentPlanetIndex];
  const showDetail = zoomLevel > 0.8;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: 'black' }}>

      <HandTracker
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onZoomDelta={handleZoomDelta}
      />

      <Canvas camera={{ position: [0, 20, 30], fov: 60 }}>
        <SolarSystem
          currentPlanetIndex={currentPlanetIndex}
          zoomLevel={zoomLevel}
        />
      </Canvas>

      {zoomLevel > 0.8 && <PlanetDetail planet={planets[currentPlanetIndex]} />}

      {/* HUD */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '10px 20px',
        borderRadius: '20px',
        pointerEvents: 'none',
        textAlign: 'center',
        fontFamily: 'monospace'
      }}>
        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{currentPlanet.name}</div>
        <div style={{ fontSize: '0.8em', color: '#aaa' }}>
          {showDetail ? 'Detail View' : 'Orbit View'} (Zoom: {(zoomLevel * 100).toFixed(0)}%)
        </div>
        <div style={{ marginTop: '5px', fontSize: '0.7em', color: '#888' }}>
          Open Hand Swipe: Switch Planet | Pinch & Drag Up/Down: Zoom
        </div>
      </div>
    </div>
  );
}

export default App;
