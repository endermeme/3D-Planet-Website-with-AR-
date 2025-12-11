export interface PlanetData {
    name: string;
    color: string;
    size: number;
    distance: number;
    speed: number;
    description: string;
    modelUrl?: string;
    textureUrl?: string; // Fallback
}

export const planets: PlanetData[] = [
    {
        name: 'Mercury',
        color: '#A5A5A5',
        size: 0.4,
        distance: 6,
        speed: 0.04,
        description: 'The smallest planet in the Solar System and the closest to the Sun.',
        modelUrl: '/models/mercury.glb',
    },
    {
        name: 'Venus',
        color: '#E3BB76',
        size: 0.9,
        distance: 8,
        speed: 0.015,
        description: 'The second planet from the Sun. It is the hottest planet in the Solar System.',
        modelUrl: '/models/venus.glb',
    },
    {
        name: 'Earth',
        color: '#2233FF',
        size: 1,
        distance: 11,
        speed: 0.01,
        description: 'Our home, the third planet from the Sun and the only known planet to harbor life.',
        modelUrl: '/models/earth.glb',
    },
    {
        name: 'Mars',
        color: '#FF3300',
        size: 0.5,
        distance: 14,
        speed: 0.008,
        description: 'The fourth planet from the Sun, often referred to as the "Red Planet".',
        modelUrl: '/models/mars.glb',
    },
    {
        name: 'Jupiter',
        color: '#D8CA9D',
        size: 2.5,
        distance: 20,
        speed: 0.002,
        description: 'The largest planet in the Solar System, a gas giant with a Great Red Spot.',
        modelUrl: '/models/giove_jupiter.glb',
    },
    {
        name: 'Saturn',
        color: '#F4D03F',
        size: 2.1,
        distance: 28,
        speed: 0.0009,
        description: 'The sixth planet from the Sun, famous for its prominent ring system.',
        modelUrl: '/models/saturn.glb',
    },
    {
        name: 'Uranus',
        color: '#73ACAC',
        size: 1.8,
        distance: 36,
        speed: 0.0004,
        description: 'The seventh planet from the Sun. It has the coldest planetary atmosphere.',
        modelUrl: '/models/uranus.glb',
    },
    {
        name: 'Neptune',
        color: '#3456FF',
        size: 1.7,
        distance: 42,
        speed: 0.0001,
        description: 'The eighth and farthest-known Solar planet from the Sun.',
        modelUrl: '/models/neptune_v2.glb',
    },
    {
        name: 'Pluto',
        color: '#D3D3D3',
        size: 0.3,
        distance: 48,
        speed: 0.00005,
        description: 'A dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune.',
        modelUrl: '/models/pluto.glb',
    },
];
