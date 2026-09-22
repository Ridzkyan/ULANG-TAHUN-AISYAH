import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

// Small sparkle dot (pure CSS, very light)
const Dot = ({ color }) => (
  <div className={`w-2 h-2 rounded-full ${color} opacity-70`} />
);

// Each item is a fixed-position element that floats upward once
// We use CSS animation (not framer-motion) for performance
const ITEMS = [
  // Hearts — 14 items
  { id: 1,  type: 'heart', left: '5%',  dur: 14, delay: 0,   size: 18, color: 'text-pink-400' },
  { id: 2,  type: 'heart', left: '12%', dur: 18, delay: 3,   size: 14, color: 'text-rose-400' },
  { id: 3,  type: 'heart', left: '22%', dur: 16, delay: 7,   size: 22, color: 'text-pink-500' },
  { id: 4,  type: 'heart', left: '33%', dur: 20, delay: 1,   size: 16, color: 'text-red-400' },
  { id: 5,  type: 'heart', left: '44%', dur: 13, delay: 5,   size: 20, color: 'text-pink-300' },
  { id: 6,  type: 'heart', left: '55%', dur: 17, delay: 9,   size: 14, color: 'text-rose-500' },
  { id: 7,  type: 'heart', left: '65%', dur: 15, delay: 2,   size: 24, color: 'text-pink-400' },
  { id: 8,  type: 'heart', left: '73%', dur: 19, delay: 6,   size: 16, color: 'text-fuchsia-400' },
  { id: 9,  type: 'heart', left: '80%', dur: 14, delay: 11,  size: 18, color: 'text-rose-400' },
  { id: 10, type: 'heart', left: '89%', dur: 22, delay: 4,   size: 20, color: 'text-pink-500' },
  { id: 11, type: 'heart', left: '95%', dur: 16, delay: 8,   size: 14, color: 'text-red-300' },
  { id: 12, type: 'heart', left: '38%', dur: 18, delay: 13,  size: 22, color: 'text-pink-400' },
  { id: 13, type: 'heart', left: '58%', dur: 21, delay: 0.5, size: 18, color: 'text-rose-300' },
  { id: 14, type: 'heart', left: '78%', dur: 15, delay: 16,  size: 14, color: 'text-pink-600' },

  // Stars — 8 items
  { id: 15, type: 'star', left: '8%',  dur: 16, delay: 4,  size: 14, color: 'text-yellow-400' },
  { id: 16, type: 'star', left: '25%', dur: 20, delay: 9,  size: 16, color: 'text-amber-400' },
  { id: 17, type: 'star', left: '47%', dur: 14, delay: 2,  size: 12, color: 'text-yellow-300' },
  { id: 18, type: 'star', left: '60%', dur: 18, delay: 7,  size: 18, color: 'text-amber-300' },
  { id: 19, type: 'star', left: '70%', dur: 22, delay: 0,  size: 14, color: 'text-yellow-500' },
  { id: 20, type: 'star', left: '84%', dur: 15, delay: 5,  size: 12, color: 'text-amber-400' },
  { id: 21, type: 'star', left: '92%', dur: 19, delay: 12, size: 16, color: 'text-yellow-400' },
  { id: 22, type: 'star', left: '17%', dur: 17, delay: 15, size: 14, color: 'text-amber-500' },

  // Sparkles — 6 items
  { id: 23, type: 'sparkle', left: '15%', dur: 18, delay: 6,  size: 16, color: 'text-purple-400' },
  { id: 24, type: 'sparkle', left: '35%', dur: 22, delay: 11, size: 18, color: 'text-violet-400' },
  { id: 25, type: 'sparkle', left: '52%', dur: 15, delay: 3,  size: 14, color: 'text-purple-300' },
  { id: 26, type: 'sparkle', left: '68%', dur: 20, delay: 8,  size: 16, color: 'text-fuchsia-300' },
  { id: 27, type: 'sparkle', left: '82%', dur: 17, delay: 1,  size: 18, color: 'text-violet-300' },
  { id: 28, type: 'sparkle', left: '97%', dur: 24, delay: 14, size: 14, color: 'text-purple-500' },
];

const FloatingItem = memo(({ item }) => {
  const icon = {
    heart:   <Heart   size={item.size} className={`${item.color} fill-current`} />,
    star:    <Star    size={item.size} className={`${item.color} fill-current`} />,
    sparkle: <Sparkles size={item.size} className={item.color} />,
  }[item.type];

  return (
    <div
      className="fixed pointer-events-none z-0"
      style={{
        left: item.left,
        bottom: '-80px',
        animation: `floatBg ${item.dur}s linear ${item.delay}s infinite`,
        opacity: 0,
      }}
    >
      {icon}
    </div>
  );
});

FloatingItem.displayName = 'FloatingItem';

const BackgroundDecorations = () => (
  <>
    <style>{`
      @keyframes floatBg {
        0%   { transform: translateY(0)      rotate(0deg);   opacity: 0;   }
        5%   { opacity: 0.55; }
        90%  { opacity: 0.35; }
        100% { transform: translateY(-105vh) rotate(360deg); opacity: 0;   }
      }
    `}</style>
    {ITEMS.map(item => <FloatingItem key={item.id} item={item} />)}
  </>
);

export default BackgroundDecorations;
