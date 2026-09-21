import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, KeyRound, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const LoveLock = () => {
  const [initials, setInitials] = useState({ left: '', right: '' });
  const [isLocked, setIsLocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLock = () => {
    if (initials.left.toLowerCase() !== 'r' || initials.right.toLowerCase() !== 'a') {
      if (initials.left.toLowerCase() === 'a' && initials.right.toLowerCase() === 'r') {
        setErrorMsg("Kebalik sayang! R di kiri, A di kanan ya.");
      } else {
        setErrorMsg("Harus pakai inisial nama kita! (R & A)");
      }
      return;
    }
    
    setErrorMsg("");
    setIsLocked(true);
    
    // Slight delay for the visual "snap" effect
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d97706'] // Gold colors
      });
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-32 px-4 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-sm md:text-base font-extrabold text-amber-500 uppercase tracking-widest mb-2">Gembok Cinta Paris</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 font-sans">
          <KeyRound className="text-amber-500" size={32} /> Love Lock <KeyRound className="text-amber-500" size={32} />
        </h2>
        <p className="text-gray-500 mt-4 font-medium text-lg">Ketik inisial nama kita (R & A) lalu kunci selamanya!</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* The Lock Graphic */}
        <motion.div 
          animate={isLocked ? { y: [0, -10, 0], scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="relative w-48 h-64 flex flex-col items-center mb-8"
        >
          {/* Lock Shackle (The U-shape bar) */}
          <motion.div 
            initial={{ y: -30 }} // Open state
            animate={{ y: isLocked ? 0 : -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-24 h-32 border-[16px] border-gray-400 rounded-t-[3rem] border-b-0 absolute top-0 z-0"
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          ></motion.div>

          {/* Lock Body (The Gold box) */}
          <div className="w-full h-40 bg-gradient-to-br from-amber-300 to-amber-500 rounded-xl shadow-2xl absolute bottom-0 z-10 border-4 border-amber-600 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Shines and textures */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
            
            <div className="flex items-center gap-4 z-20">
              {/* Inputs */}
              <input 
                type="text" 
                maxLength={1}
                disabled={isLocked}
                value={initials.left}
                onChange={(e) => setInitials({...initials, left: e.target.value.toUpperCase()})}
                className="w-12 h-16 bg-amber-100/50 border-2 border-amber-700/50 rounded text-center text-3xl font-extrabold text-amber-900 focus:outline-none focus:bg-white disabled:bg-transparent disabled:border-transparent transition-all"
              />
              <Heart size={24} className="text-red-500 fill-red-500 animate-pulse" />
              <input 
                type="text" 
                maxLength={1}
                disabled={isLocked}
                value={initials.right}
                onChange={(e) => setInitials({...initials, right: e.target.value.toUpperCase()})}
                className="w-12 h-16 bg-amber-100/50 border-2 border-amber-700/50 rounded text-center text-3xl font-extrabold text-amber-900 focus:outline-none focus:bg-white disabled:bg-transparent disabled:border-transparent transition-all"
              />
            </div>
            
            {/* Keyhole */}
            <div className="mt-4 flex flex-col items-center z-20">
              <div className="w-4 h-4 bg-amber-900 rounded-full"></div>
              <div className="w-2 h-4 bg-amber-900 -mt-1"></div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <div className="h-8 mb-4">
          {errorMsg && <p className="text-red-500 font-bold">{errorMsg}</p>}
        </div>

        {/* Action Button */}
        {!isLocked ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLock}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 text-lg transition-colors border-2 border-amber-300"
          >
            <Lock size={20} /> Kunci Cinta Kita!
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl text-center shadow-sm"
          >
            <h4 className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
              <Lock size={20} /> Terkunci Untuk Selamanya
            </h4>
            <p className="font-medium text-sm">Gembok cinta kita sudah terpasang dan kuncinya sudah dibuang ke laut! 🌊</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoveLock;
