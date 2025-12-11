export interface PlanetData {
    name: string;
    color: string;
    size: number;
    distance: number;
    speed: number;
    description: string;
    modelUrl?: string;
    textureUrl?: string;
}

export const planets: PlanetData[] = [
    {
        name: 'Sao Thủy (Mercury)',
        color: '#A5A5A5',
        size: 0.4,
        distance: 6,
        speed: 0.04,
        description: 'Hành tinh nhỏ nhất và gần Mặt Trời nhất trong Hệ Mặt Trời (Một năm trên Sao Thủy chỉ dài 88 ngày Trái Đất, nhưng một ngày lại kéo dài tới 176 ngày Trái Đất).',
        modelUrl: '/models/mercury.glb',
    },
    {
        name: 'Sao Kim (Venus)',
        color: '#E3BB76',
        size: 0.9,
        distance: 8,
        speed: 0.015,
        description: 'Hành tinh thứ hai từ Mặt Trời và là hành tinh nóng nhất trong Hệ Mặt Trời (Sao Kim quay ngược chiều so với hầu hết các hành tinh khác, Mặt Trời mọc ở phía Tây).',
        modelUrl: '/models/venus.glb',
    },
    {
        name: 'Trái Đất (Earth)',
        color: '#2233FF',
        size: 1,
        distance: 11,
        speed: 0.01,
        description: 'Ngôi nhà của chúng ta, hành tinh thứ ba từ Mặt Trời và là nơi duy nhất được biết đến có sự sống (Trái Đất không phải hình cầu hoàn hảo, nó hơi phình ra ở xích đạo do lực quay).',
        modelUrl: '/models/earth.glb',
    },
    {
        name: 'Sao Hỏa (Mars)',
        color: '#FF3300',
        size: 0.5,
        distance: 14,
        speed: 0.008,
        description: 'Hành tinh thứ tư từ Mặt Trời, thường được gọi là "Hành tinh Đỏ" (Sao Hỏa có ngọn núi cao nhất Hệ Mặt Trời - Olympus Mons, cao gấp 3 lần đỉnh Everest).',
        modelUrl: '/models/mars.glb',
    },
    {
        name: 'Sao Mộc (Jupiter)',
        color: '#D8CA9D',
        size: 2.5,
        distance: 20,
        speed: 0.002,
        description: 'Hành tinh lớn nhất trong Hệ Mặt Trời, một hành tinh khí khổng lồ với Vết Đỏ Lớn (Sao Mộc lớn đến mức có thể chứa được 1.300 Trái Đất bên trong).',
        modelUrl: '/models/giove_jupiter.glb',
    },
    {
        name: 'Sao Thổ (Saturn)',
        color: '#F4D03F',
        size: 2.1,
        distance: 28,
        speed: 0.0009,
        description: 'Hành tinh thứ sáu từ Mặt Trời, nổi tiếng với hệ thống vành đai tráng lệ (Sao Thổ nhẹ đến mức nếu có bồn nước đủ lớn, nó sẽ nổi lềnh bềnh trên mặt nước).',
        modelUrl: '/models/saturn.glb',
    },
    {
        name: 'Sao Thiên Vương (Uranus)',
        color: '#73ACAC',
        size: 1.8,
        distance: 36,
        speed: 0.0004,
        description: 'Hành tinh thứ bảy từ Mặt Trời với bầu khí quyển lạnh nhất (Sao Thiên Vương quay "nằm ngang" trên quỹ đạo, giống như một quả bóng đang lăn).',
        modelUrl: '/models/uranus.glb',
    },
    {
        name: 'Sao Hải Vương (Neptune)',
        color: '#3456FF',
        size: 1.7,
        distance: 42,
        speed: 0.0001,
        description: 'Hành tinh thứ tám và xa nhất trong Hệ Mặt Trời (Gió trên Sao Hải Vương có thể đạt tốc độ 2.100 km/h, nhanh hơn cả tốc độ âm thanh).',
        modelUrl: '/models/neptune_v2.glb',
    },
    {
        name: 'Sao Diêm Vương (Pluto)',
        color: '#D3D3D3',
        size: 0.3,
        distance: 48,
        speed: 0.00005,
        description: 'Hành tinh lùn trong vành đai Kuiper, vành đai các thiên thể bên ngoài quỹ đạo Sao Hải Vương (Sao Diêm Vương nhỏ hơn cả Mặt Trăng của Trái Đất).',
        modelUrl: '/models/pluto.glb',
    },
];
