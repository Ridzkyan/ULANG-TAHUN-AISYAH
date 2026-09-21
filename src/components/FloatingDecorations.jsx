import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

// Cute cat SVG component (no emoji!)
const CatFace = ({ size = 40, color = "#f9a8d4" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <polygon points="10,35 25,5 35,35" fill={color} />
    <polygon points="65,35 75,5 90,35" fill={color} />
    <polygon points="15,33 25,12 32,33" fill="#fce7f3" />
    <polygon points="68,33 75,12 85,33" fill="#fce7f3" />
    {/* Head */}
    <circle cx="50" cy="58" r="38" fill={color} />
    {/* Eyes */}
    <ellipse cx="37" cy="52" rx="6" ry="7" fill="#1e293b" />
    <ellipse cx="63" cy="52" rx="6" ry="7" fill="#1e293b" />
    {/* Eye shine */}
    <circle cx="39" cy="49" r="2" fill="white" />
    <circle cx="65" cy="49" r="2" fill="white" />
    {/* Nose */}
    <ellipse cx="50" cy="63" rx="4" ry="3" fill="#fb7185" />
    {/* Mouth */}
    <path d="M46 66 Q50 71 54 66" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* Whiskers */}
    <line x1="10" y1="62" x2="44" y2="65" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10" y1="67" x2="44" y2="67" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="56" y1="65" x2="90" y2="62" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="56" y1="67" x2="90" y2="67" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Blush */}
    <ellipse cx="32" cy="68" rx="7" ry="4" fill="#fda4af" opacity="0.5"/>
    <ellipse cx="68" cy="68" rx="7" ry="4" fill="#fda4af" opacity="0.5"/>
  </svg>
);

// Star/Diamond shape SVG
const SparkStar = ({ size = 24, color = "#f472b6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L13.5 9H21L15 13.5L17.5 21L12 16.5L6.5 21L9 13.5L3 9H10.5L12 2Z"/>
  </svg>
);

// Balloon SVG
const Balloon = ({ color = "#f472b6", size = 50 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="32" rx="24" ry="28" fill={color} opacity="0.85"/>
    <ellipse cx="22" cy="22" rx="6" ry="8" fill="white" opacity="0.25" transform="rotate(-20 22 22)"/>
    <path d="M30 60 Q28 70 32 75 Q30 80 28 85" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <polygon points="28,60 32,60 30,65" fill={color} opacity="0.85"/>
  </svg>
);

const FLOATING_ITEMS = [
  // 20 hearts at various positions/sizes/speeds
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `heart-${i}`,
    type: 'heart',
    left: `${Math.random() * 95}%`,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
    size: 16 + Math.floor(Math.random() * 28),
    color: ['#f43f5e', '#ec4899', '#db2777', '#f9a8d4', '#fda4af'][Math.floor(Math.random() * 5)]
  })),
  // 10 cats
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `cat-${i}`,
    type: 'cat',
    left: `${Math.random() * 90}%`,
    delay: Math.random() * 15,
    duration: 12 + Math.random() * 8,
    size: 36 + Math.floor(Math.random() * 30),
    color: ['#f9a8d4', '#c4b5fd', '#93c5fd', '#fbbf24', '#fb923c'][Math.floor(Math.random() * 5)]
  })),
  // 10 stars
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `star-${i}`,
    type: 'star',
    left: `${Math.random() * 95}%`,
    delay: Math.random() * 10,
    duration: 9 + Math.random() * 8,
    size: 14 + Math.floor(Math.random() * 20),
    color: ['#facc15', '#fbbf24', '#fb7185', '#a78bfa', '#34d399'][Math.floor(Math.random() * 5)]
  })),
  // 8 balloons
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `balloon-${i}`,
    type: 'balloon',
    left: `${Math.random() * 90}%`,
    delay: Math.random() * 15,
    duration: 14 + Math.random() * 10,
    size: 40 + Math.floor(Math.random() * 30),
    color: ['#f472b6', '#a78bfa', '#38bdf8', '#4ade80', '#fb923c'][Math.floor(Math.random() * 5)]
  })),
];

const FloatingDecoration = ({ item }) => {
  const renderItem = () => {
    switch (item.type) {
      case 'heart':
        return <Heart size={item.size} style={{ color: item.color, fill: item.color }} />;
      case 'cat':
        return <CatFace size={item.size} color={item.color} />;
      case 'star':
        return <SparkStar size={item.size} color={item.color} />;
      case 'balloon':
        return <Balloon color={item.color} size={item.size} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed pointer-events-none z-0 animate-float-up opacity-0"
      style={{
        left: item.left,
        bottom: '-15%',
        animationDuration: `${item.duration}s`,
        animationDelay: `${item.delay}s`,
        animationFillMode: 'both',
      }}
    >
      <motion.div
        animate={{ x: [0, 15, -15, 10, -10, 0] }}
        transition={{ duration: item.duration * 0.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {renderItem()}
      </motion.div>
    </div>
  );
};

// Party confetti ribbons at top
const PartyBanner = () => (
  <div className="fixed top-0 left-0 w-full pointer-events-none z-0 overflow-hidden">
    {Array.from({ length: 30 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute top-0 w-2 rounded-full"
        style={{
          left: `${(i / 30) * 100}%`,
          height: `${20 + Math.random() * 60}px`,
          backgroundColor: ['#f43f5e','#ec4899','#a78bfa','#38bdf8','#4ade80','#facc15','#fb923c'][i % 7],
          opacity: 0.6,
        }}
        animate={{ y: [0, 10, 0], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: 'easeInOut'
        }}
      />
    ))}
  </div>
);

const FloatingDecorations = () => {
  return (
    <>
      <PartyBanner />
      {FLOATING_ITEMS.map((item) => (
        <FloatingDecoration key={item.id} item={item} />
      ))}
    </>
  );
};

export { CatFace, SparkStar, Balloon };
export default FloatingDecorations;
