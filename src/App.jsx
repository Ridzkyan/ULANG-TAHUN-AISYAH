import { motion } from 'framer-motion';
import { Heart, Cake, Cloud } from 'lucide-react';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import BackgroundDecorations from './components/BackgroundDecorations';

import IntroLoader from './components/IntroLoader';
import PolaroidGallery from './components/PolaroidGallery';
import LoveStory from './components/LoveStory';
import LoveLock from './components/LoveLock';
import FingerprintScanner from './components/FingerprintScanner';
import InteractivePinboard from './components/InteractivePinboard';
import SecretEnvelopes from './components/SecretEnvelopes';
import LoveMeter from './components/LoveMeter';
import LoveQuiz from './components/LoveQuiz';
import DateCoupons from './components/DateCoupons';
import MusicPlayer from './components/MusicPlayer';
import MidnightSurprise from './components/MidnightSurprise';
import RelationshipTimer from './components/RelationshipTimer';

const FloatingElement = ({ children, delay = 0, yOffset = 20, duration = 3, className = "" }) => (
  <motion.div
    className={className}
    animate={{ y: [0, -yOffset, 0] }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    {children}
  </motion.div>
);

function App() {
  const [mounted, setMounted] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fireConfetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleIntroComplete = () => {
    setIntroFinished(true);
    setTimeout(fireConfetti, 500); // Fire confetti right after intro closes
  };

  if (!mounted) return null;

  return (
    <>
      {!introFinished && <IntroLoader onComplete={handleIntroComplete} />}
      
      {introFinished && (
        <div className="min-h-screen mesh-gradient-bg overflow-x-hidden font-sans relative pb-32">
          
          {/* All floating hearts, stars, sparkles */}
          <BackgroundDecorations />

          <MusicPlayer />

          {/* Decorative background clouds */}
          <FloatingElement delay={0} yOffset={15} duration={6} className="absolute top-20 left-4 md:left-10 text-white/50 z-0 pointer-events-none">
            <Cloud size={80} fill="currentColor" />
          </FloatingElement>
          <FloatingElement delay={2} yOffset={20} duration={8} className="absolute top-[600px] right-4 md:right-10 text-white/40 z-0 pointer-events-none">
            <Cloud size={100} fill="currentColor" />
          </FloatingElement>
          <FloatingElement delay={1} yOffset={10} duration={5} className="absolute top-[1200px] left-10 text-white/30 z-0 pointer-events-none">
            <Cloud size={60} fill="currentColor" />
          </FloatingElement>

          <main className="container mx-auto px-4 pt-16 flex flex-col items-center justify-center relative z-10">
            
            {/* Hero Section */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-center w-full max-w-3xl flex flex-col items-center z-10"
            >
              <div className="bg-white/90 p-8 md:p-14 rounded-[3rem] shadow-2xl backdrop-blur-md border-[6px] border-white mb-20 relative w-full flex flex-col items-center">
                <motion.div 
                  className="absolute -top-12 bg-gradient-to-r from-pink-300 to-purple-300 p-1 rounded-full shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white p-4 md:p-5 rounded-full border-4 border-transparent flex items-center justify-center">
                    <Cake size={48} className="text-pink-500 md:w-16 md:h-16" />
                  </div>
                </motion.div>
                
                <div className="mt-12 md:mt-16 text-center w-full">
                  <motion.h1 
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6 leading-tight break-words"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Selamat Ulang Tahun,<br/> Aisyah! 🎂
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg md:text-2xl text-gray-600 font-medium max-w-xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Hari ini adalah harimu! Semoga harimu dipenuhi dengan tawa dan hal-hal semanis dirimu. ✨
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Sequence of Epic Features */}
            <PolaroidGallery />
            <LoveStory />
            <RelationshipTimer />
            <FingerprintScanner />
            <LoveLock />
            <InteractivePinboard />
            <SecretEnvelopes />
            <LoveMeter />
            <LoveQuiz />
            <DateCoupons />
            <MidnightSurprise />

            {/* Footer */}
            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 font-medium flex items-center justify-center gap-2">
                Dibuat dengan <Heart size={16} className="text-red-500 fill-red-500" /> khusus untuk Aisyah tercinta.
              </p>
            </motion.div>

          </main>
        </div>
      )}
    </>
  );
}

export default App;
