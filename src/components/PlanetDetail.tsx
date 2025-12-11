import type { PlanetData } from '../data/planets';

interface PlanetDetailProps {
    planet: PlanetData;
}

export const PlanetDetail = ({ planet }: PlanetDetailProps) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            border: `2px solid ${planet.color}`,
            boxShadow: `0 0 20px ${planet.color}`,
            pointerEvents: 'none',
            zIndex: 100
        }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '2rem', color: planet.color }}>{planet.name}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{planet.description}</p>
        </div>
    );
};
