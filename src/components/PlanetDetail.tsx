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
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            border: `2px solid ${planet.color}`,
            boxShadow: `0 0 20px ${planet.color}`,
            pointerEvents: 'none', // Allow clicks to pass through
            zIndex: 100
        }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem', color: planet.color }}>{planet.name}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>{planet.description}</p>

            <div style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#FFD700' }}>💡 Có thể bạn chưa biết:</h4>
                <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>{planet.funFact}</p>
            </div>
        </div>
    );
};
