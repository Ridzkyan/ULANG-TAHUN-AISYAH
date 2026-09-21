import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Heart, Cat, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const LoveMeter = () => {
  const [value, setValue] = useState(0);
  const [maxReached, setMaxReached] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (value >= 100 && !maxReached) {
      setMaxReached(true);
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5, repeat: Infinity }
      });
      fireHeartConfetti();
    } else if (value < 100 && maxReached) {
      setMaxReached(false);
      controls.stop();
    }
  }, [value, maxReached, controls]);

  const fireHeartConfetti = () => {
    const defaults = { spread: 360, ticks: 100, gravity: 0, decay: 0.94, startVelocity: 30, shapes: ['heart'], colors: ['#FFC0CB', '#FF69B4', '#FF1493'] };
    
    confetti({ ...defaults, particleCount: 50, scalar: 2 });
    confetti({ ...defaults, particleCount: 25, scalar: 3 });
    confetti({ ...defaults, particleCount: 10, scalar: 4 });
  };

  const getMessage = () => {
    if (value === 0) return "Coba geser ke kanan, ayo jangan gengsi! 😏";
    if (value <= 25) return "Masa cuma segini? Lebih kangen Capybara nih ceritanya?";
    if (value <= 50) return "Tarik terusss! Ciumable banget sih pipimu kalo lagi nurut 😚";
    if (value <= 80) return "Nah gitu dong pacar Ais... Buktikan kalo kamu 1000/10 lucunya!";
    if (value < 100) return "Dikiitt lagiii... Ayo dong Aisyah Cantik Blubub Blubub 🐋🤍!";
    return "YAAAY! Aku juga kangen! Sayang kamu hari ini dan setiap hari! ❤️";
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/90 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,192,203,0.3)] border-[6px] border-white backdrop-blur-md mt-12 mb-20 relative overflow-hidden">
      
      {/* Decorative gradient header */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"></div>
      
      {/* Corner cute icons */}
      <div className="absolute -top-4 -left-4 text-pink-200 rotate-[-15deg] opacity-50"><Sparkles size={60} /></div>
      <div className="absolute -bottom-4 -right-4 text-pink-200 rotate-[15deg] opacity-50"><Cat size={80} /></div>

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-center mb-8 font-serif italic">
          Seberapa Kangen Aisyah? 🥺
        </h3>
        
        <div className="flex flex-col items-center gap-8">
          <motion.div animate={controls} className="text-pink-500 relative">
            <Heart 
              size={100} 
              fill={value >= 100 ? "#ec4899" : (value > 50 ? "#fbcfe8" : "transparent")} 
              strokeWidth={value >= 100 ? 0 : 2} 
              className="transition-colors duration-300 drop-shadow-lg"
            />
            {value >= 100 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl"
              >
                100%
              </motion.div>
            )}
          </motion.div>
          
          {value < 100 && (
            <div className="text-4xl font-extrabold text-pink-500 drop-shadow-sm">
              {value}%
            </div>
          )}
          
          <div className="w-full relative py-4">
            {/* Custom styled range slider */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full h-6 bg-pink-100 rounded-full appearance-none cursor-pointer outline-none relative z-10"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${value}%, #fce7f3 ${value}%, #fce7f3 100%)`
              }}
            />
            <style jsx>{`
              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: white;
                border: 4px solid #ec4899;
                cursor: pointer;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                transition: transform 0.1s;
              }
              input[type=range]::-webkit-slider-thumb:hover {
                transform: scale(1.1);
              }
            `}</style>
          </div>
          
          <motion.div 
            key={getMessage()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-pink-50 py-3 px-6 rounded-2xl border-2 border-pink-100 w-full"
          >
            <p className="text-gray-700 font-medium text-center text-base md:text-lg">
              {getMessage()}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoveMeter;
