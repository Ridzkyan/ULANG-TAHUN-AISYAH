import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const MidnightSurprise = () => {
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null);

  const triggerFireworks = useCallback(() => {
    setIsActive(true);
    
    // Just a few simple bursts to avoid GPU overload and completely eliminate lag
    const defaults = { startVelocity: 45, spread: 360, ticks: 60, zIndex: 100 };
    
    // Burst 1 (center)
    setTimeout(() => confetti(Object.assign({}, defaults, { particleCount: 100, origin: { x: 0.5, y: 0.5 } })), 100);
    // Burst 2 (left & right)
    setTimeout(() => {
      confetti(Object.assign({}, defaults, { particleCount: 75, origin: { x: 0.2, y: 0.4 } }));
      confetti(Object.assign({}, defaults, { particleCount: 75, origin: { x: 0.8, y: 0.4 } }));
    }, 700);
    // Burst 3 (center)
    setTimeout(() => confetti(Object.assign({}, defaults, { particleCount: 100, origin: { x: 0.5, y: 0.3 } })), 1300);
  }, []);

  const closeSurprise = () => {
    setIsActive(false);
  };

  return (
    <div className="w-full text-center my-20 relative z-10 flex flex-col items-center">
      
      {/* The Mystery Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(239, 68, 68, 0.8)" }}
        whileTap={{ scale: 0.95 }}
        onClick={triggerFireworks}
        className="bg-red-600 border-4 border-red-800 text-white px-8 py-4 rounded-full font-bold text-xl uppercase tracking-widest shadow-[0_10px_0_#991b1b] active:shadow-[0_0px_0_#991b1b] active:translate-y-2 transition-all flex items-center gap-3 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
        <Sparkles size={24} className="animate-pulse" />
        Jangan Ditekan BAHAYA SAYANG!!!
      </motion.button>

      <p className="text-gray-400 font-medium text-sm mt-6">Peringatan: Tombol ini sangat berbahaya jika ditekan sembarangan. ⚠️</p>

      {/* The Fullscreen Surprise Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[90] bg-black/95 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Stars background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 pointer-events-none"></div>
            
            <button 
              onClick={closeSurprise}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[101]"
            >
              <X size={32} />
            </button>

            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.1, 1], opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-5xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 text-center uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] z-[100]"
            >
              HAPPY BIRTHDAY
              <br />
              <span className="text-4xl md:text-7xl lg:text-8xl">SAYANGKU! ❤️</span>
            </motion.h1>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MidnightSurprise;
