import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

const IntroLoader = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Speed up the transition to the landing page so it doesn't feel buggy
    setTimeout(() => {
      onComplete();
    }, 600); // Wait 600ms instead of 1.5s
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

      {!isOpen ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [0, -15, 0], opacity: 1 }}
          transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          className="flex flex-col items-center cursor-pointer z-10"
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative mb-6">
            <Mail size={120} className="text-pink-500 drop-shadow-2xl" strokeWidth={1} />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2"
            >
              <Heart size={24} className="text-white fill-white" />
            </motion.div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 font-sans mb-2 text-center">
            Ada Paket Spesial<br/>Untuk Aisyah! 💌
          </h2>
          <p className="text-pink-600 font-medium animate-pulse text-lg">Sentuh amplop untuk membuka...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 0.8, 15], opacity: [1, 1, 0] }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="z-10 flex flex-col items-center"
        >
          <Heart size={150} className="text-pink-500 fill-pink-500" />
        </motion.div>
      )}
      
      {/* Floating background hearts */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 opacity-20 pointer-events-none"
          initial={{ y: "100vh", x: `${Math.random() * 100}vw`, scale: Math.random() * 2 + 1 }}
          animate={{ y: "-10vh", rotate: 360 }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        >
          <Heart size={20} className="fill-current" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default IntroLoader;
