export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'mansion' | 'penthouse' | 'chalet' | 'villa' | 'loft';
  beds: number;
  baths: number;
  area: number; // in sq ft
  image: string;
  description: string;
  amenities: string[];
  yearBuilt: number;
  energyClass: string;
  agentId: string;
  style: string;
  featured: boolean;
  stagingColors: { name: string; hex: string }[];
  stagingFloors: { name: string; type: string }[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  whatsapp: string;
  bio: string;
  rating: number;
  testimonials: {
    author: string;
    role: string;
    text: string;
    rating: number;
  }[];
}

export const mockAgents: Agent[] = [
  {
    id: 'agent-alex',
    name: 'Alex Vance',
    role: 'Managing Partner & Luxury Broker',
    image: '/images/agent_alex.png',
    phone: '+1 (310) 555-0199',
    email: 'alex@eliteestates.com',
    whatsapp: 'https://wa.me/13105550199?text=I%20am%20interested%20in%20an%20Elite%20Estates%20property.',
    bio: 'With over 15 years in high-end residential sales, Alex specializes in architectural masterpieces along the Southern California coast. His white-glove approach caters directly to global executives and HNWIs.',
    rating: 4.9,
    testimonials: [
      {
        author: 'Marcus Sterling',
        role: 'Tech Founder & Investor',
        text: 'Alex secured our Malibu estate off-market in less than a week. His understanding of design and absolute discretion made all the difference.',
        rating: 5,
      },
      {
        author: 'Lady Genevieve',
        role: 'International Investor',
        text: 'A flawless transactional experience. Alex coordinates every detail with absolute professionalism. Highly recommended.',
        rating: 5,
      }
    ]
  },
  {
    id: 'agent-sarah',
    name: 'Sarah Sterling',
    role: 'Senior Director of Estates',
    image: '/images/agent_sarah.png',
    phone: '+1 (212) 555-0145',
    email: 'sarah@eliteestates.com',
    whatsapp: 'https://wa.me/12125550145?text=I%20am%20interested%20in%20an%20Elite%20Estates%20listing.',
    bio: 'Sarah represents some of the most exclusive properties in Manhattan and Aspen. A former architectural consultant, she provides clients with rich valuation insights and bespoke portfolio guidance.',
    rating: 5.0,
    testimonials: [
      {
        author: 'Dr. Helen Chen',
        role: 'Philanthropist',
        text: 'Sarah is an expert in luxury markets. She helped us compare three penthouses side-by-side and negotiated a phenomenal closing value.',
        rating: 5,
      },
      {
        author: 'Christian Laurent',
        role: 'Fashion Director',
        text: 'Her taste is impeccable. She didn’t just show us properties; she curated options that matched our lifestyle and architectural appreciation.',
        rating: 5,
      }
    ]
  }
];

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'The Edge (Malibu Coastline)',
    price: 18500000,
    location: 'Malibu, California',
    type: 'mansion',
    beds: 6,
    baths: 8,
    area: 9200,
    image: '/images/malibu_mansion.png',
    description: 'Hovering over the Pacific, The Edge is a masterclass in organic modernism. Crafted by renowned architect Ryan Martinez, this glass-and-concrete monolithic villa blends indoor and outdoor living with floor-to-ceiling retractable glass walls, custom bronze hardware, a 75-foot heated infinity pool, and a private path descending to a pristine sandy beach cove.',
    amenities: ['Oceanfront Vista', '75ft Infinity Pool', 'Private Beach Path', 'Wellness Spa', 'Smart Automation', 'Wine Room (800 Bottles)'],
    yearBuilt: 2024,
    energyClass: 'A+',
    agentId: 'agent-alex',
    style: 'Modern Concrete & Glass',
    featured: true,
    stagingColors: [
      { name: 'Warm Alabaster', hex: '#FAF6EF' },
      { name: 'Desert Khaki', hex: '#D2C7B4' },
      { name: 'Obsidian Velvet', hex: '#1E1E1E' }
    ],
    stagingFloors: [
      { name: 'Light Oak Wood', type: 'wood' },
      { name: 'Polished Travertine Marble', type: 'marble' }
    ]
  },
  {
    id: 'prop-2',
    title: 'Aether Penthouse (Upper East Side)',
    price: 12400000,
    location: 'Manhattan, New York',
    type: 'penthouse',
    beds: 4,
    baths: 4.5,
    area: 5600,
    image: '/images/manhattan_penthouse.png',
    description: 'Occupying the top two levels of a landmark highrise, the Aether Penthouse provides unobstructed views of Central Park and the Manhattan skyline. Highlights include an double-height living salon, a custom floating spiral staircase, Italian Calacatta marble kitchens, and a 1,200 sq ft wrap-around sky terrace featuring an outdoor fireplace and private plunge pool.',
    amenities: ['Central Park Views', 'Private Elevator Lobby', 'Sky Terrace', 'Plunge Pool', 'Chef Kitchen', '24/7 Concierge Service'],
    yearBuilt: 2023,
    energyClass: 'A',
    agentId: 'agent-sarah',
    style: 'Minimalist Penthouse',
    featured: true,
    stagingColors: [
      { name: 'Manhattan Mist', hex: '#E2E5E6' },
      { name: 'Champagne Satin', hex: '#EBE5DA' },
      { name: 'Midnight Charcoal', hex: '#2C2D30' }
    ],
    stagingFloors: [
      { name: 'Ebonized Walnut Wood', type: 'wood' },
      { name: 'White Carrara Marble', type: 'marble' }
    ]
  },
  {
    id: 'prop-3',
    title: 'The Summit Chalet',
    price: 9800000,
    location: 'Aspen, Colorado',
    type: 'chalet',
    beds: 5,
    baths: 6,
    area: 7100,
    image: '/images/aspen_chalet.png',
    description: 'Positioned high on the Red Mountain ridge, The Summit Chalet redefines alpine luxury. It features soaring Douglas Fir timbers, hand-cut stone walls, and high-efficiency glazed glass panels that capture mountain panoramas. Fully automated smart heating, dry sauna, steam room, heated outdoor deck with hot tub, and direct ski-in/ski-out access.',
    amenities: ['Ski-in / Ski-out Access', 'Heated Deck & Hot Tub', 'Wellness Thermal Suite', 'Home Cinema', 'Three-story Stone Fireplace', 'Ski Lounge'],
    yearBuilt: 2022,
    energyClass: 'B',
    agentId: 'agent-sarah',
    style: 'Luxury Alpine Timber',
    featured: true,
    stagingColors: [
      { name: 'Snow Cream', hex: '#FAF9F6' },
      { name: 'Rustic Clay', hex: '#C2B29E' },
      { name: 'Spruce Forest', hex: '#2A3C36' }
    ],
    stagingFloors: [
      { name: 'Reclaimed Chestnut Planks', type: 'wood' },
      { name: 'Honed Slate Stone', type: 'slate' }
    ]
  },
  {
    id: 'prop-4',
    title: 'Villa Bellissima',
    price: 14200000,
    location: 'Tuscany, Italy',
    type: 'villa',
    beds: 7,
    baths: 8,
    area: 11500,
    image: '/images/tuscany_villa.png',
    description: 'Surrounded by historic cypress paths and rolling vineyards, Villa Bellissima is a restored 16th-century Tuscan estate combined with state-of-the-art luxuries. The property spans a main estate, separate guest house, a professional vineyard producing private label wines, an olive press facility, a stone pool, and outdoor dining patios under pergola canopies.',
    amenities: ['Private Vineyard & Cellar', 'Olive Grove', 'Helipad', 'Restored 16C Courtyard', 'Alfresco Kitchen', 'Heated Stone Pool'],
    yearBuilt: 2021, // Restored 2021
    energyClass: 'A',
    agentId: 'agent-alex',
    style: 'Classic Tuscan Estate',
    featured: false,
    stagingColors: [
      { name: 'Warm Terracotta', hex: '#DFCCB7' },
      { name: 'Olive Leaf', hex: '#A8B097' },
      { name: 'Siena Sand', hex: '#EFECE6' }
    ],
    stagingFloors: [
      { name: 'Antiqued Cotto Tiles', type: 'tile' },
      { name: 'Aged Oak Planks', type: 'wood' }
    ]
  },
  {
    id: 'prop-5',
    title: 'Kyoto Bamboo Sanctuary',
    price: 6500000,
    location: 'Kyoto, Japan',
    type: 'loft',
    beds: 4,
    baths: 4,
    area: 4800,
    image: '/images/aspen_chalet.png', // Reusing quality landscape placeholders
    description: 'Nestled along the quiet edges of Arashiyama, this retreat is a seamless blend of traditional Japanese Sukiya-zukuri styling and Scandinavian minimalism. Built using native cedar and paper screens, it offers a private indoor/outdoor natural spring Onsen bath, an authentic tea ceremony tearoom, and a moss-and-stone Zen garden with a flowing stream.',
    amenities: ['Natural Spring Onsen', 'Tea Ceremony Room', 'Zen Garden', 'Cedar Plunge Bath', 'Heated Tatami Mats', 'Security gates'],
    yearBuilt: 2023,
    energyClass: 'A+',
    agentId: 'agent-alex',
    style: 'Japandi Harmony',
    featured: false,
    stagingColors: [
      { name: 'Soft Tatami Straw', hex: '#EAE6D5' },
      { name: 'Bamboo Shoot', hex: '#C7CEB9' },
      { name: 'Charcoal Sumi', hex: '#1C1C1D' }
    ],
    stagingFloors: [
      { name: 'Hinoki Cedar Wood', type: 'wood' },
      { name: 'Polished Basalt Stone', type: 'stone' }
    ]
  },
  {
    id: 'prop-6',
    title: 'Shibuya Skyloft',
    price: 8900000,
    location: 'Tokyo, Japan',
    type: 'loft',
    beds: 3,
    baths: 3.5,
    area: 4200,
    image: '/images/manhattan_penthouse.png', // Reusing placeholder
    description: 'Perched in the sky overlooking Tokyo, this high-tech smart loft provides futuristic urban living. Featuring custom robotics cabinetry, integrated ambient air filters, a soundproof music production studio, and glass floors looking down into a miniature vertical atrium garden.',
    amenities: ['Robot Cabinetry', 'Soundproof Music Studio', 'Vertical Garden Atrium', 'Air Purification System', 'Voice Control Smart House', 'Sky Lounge Access'],
    yearBuilt: 2025,
    energyClass: 'A++',
    agentId: 'agent-sarah',
    style: 'Futuristic High-Tech',
    featured: false,
    stagingColors: [
      { name: 'Neon Platinum', hex: '#ECEFF1' },
      { name: 'Kyoto Washi', hex: '#F5F5F0' },
      { name: 'Akihabara Cyber', hex: '#263238' }
    ],
    stagingFloors: [
      { name: 'Seamless Micro-cement', type: 'cement' },
      { name: 'Dark Oak Panels', type: 'wood' }
    ]
  }
];
