import { motion } from 'framer-motion';
import { Heart, Cake, Cloud, Star, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import IntroLoader from './components/IntroLoader';
import FloatingDecorations, { CatFace } from './components/FloatingDecorations';
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

// Gentle floating clouds
const FloatingCloud = ({ delay = 0, yOffset = 20, duration = 6, className = "" }) => (
  <motion.div
    className={className}
    animate={{ y: [0, -yOffset, 0] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <Cloud size={80} className="fill-current" />
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
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleIntroComplete = () => {
    setIntroFinished(true);
    setTimeout(fireConfetti, 500);
  };

  if (!mounted) return null;

  return (
    <>
      {!introFinished && <IntroLoader onComplete={handleIntroComplete} />}
      
      {introFinished && (
        <div className="min-h-screen mesh-gradient-bg overflow-x-hidden font-sans relative pb-32">
          
          {/* All floating hearts, cats, stars, balloons */}
          <FloatingDecorations />
          
          <MusicPlayer />

          {/* Static background cloud decorations */}
          <FloatingCloud delay={0} yOffset={15} duration={6} className="absolute top-20 left-4 md:left-10 text-white/40 z-0 pointer-events-none" />
          <FloatingCloud delay={2} yOffset={20} duration={8} className="absolute top-[600px] right-4 md:right-10 text-white/30 z-0 pointer-events-none" />
          <FloatingCloud delay={1} yOffset={10} duration={5} className="absolute top-[1200px] left-10 text-white/20 z-0 pointer-events-none" />

          <main className="container mx-auto px-4 pt-16 flex flex-col items-center justify-center relative z-10">
            
            {/* Hero Section */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-center w-full max-w-3xl flex flex-col items-center z-10"
            >
              <div className="bg-white/90 p-8 md:p-14 rounded-[3rem] shadow-2xl backdrop-blur-md border-[6px] border-white mb-20 relative w-full flex flex-col items-center overflow-visible">
                
                {/* Cake icon badge at the top */}
                <motion.div 
                  className="absolute -top-12 bg-gradient-to-r from-pink-300 to-purple-300 p-1 rounded-full shadow-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="bg-white p-4 md:p-5 rounded-full flex items-center justify-center">
                    <Cake size={48} className="text-pink-500" />
                  </div>
                </motion.div>

                {/* Cute cats sitting on the card corners */}
                <div className="absolute -top-6 -left-6 opacity-80 hidden md:block">
                  <motion.div 
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <CatFace size={64} color="#f9a8d4" />
                  </motion.div>
                </div>
                <div className="absolute -top-6 -right-6 opacity-80 hidden md:block">
                  <motion.div 
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <CatFace size={64} color="#c4b5fd" />
                  </motion.div>
                </div>

                {/* Floating stars around the title */}
                <motion.div className="absolute top-8 right-8 text-yellow-400" animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                  <Star size={20} className="fill-yellow-400" />
                </motion.div>
                <motion.div className="absolute top-16 left-8 text-pink-400" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Star size={14} className="fill-pink-400" />
                </motion.div>
                <motion.div className="absolute bottom-8 right-12 text-purple-400" animate={{ rotate: [360, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                  <Sparkles size={22} className="fill-purple-300" />
                </motion.div>
                
                <div className="mt-12 md:mt-16 text-center w-full">
                  <motion.h1 
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6 leading-tight break-words"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Selamat Ulang Tahun,
                    <br />
                    <span className="inline-flex items-center gap-3">
                      Aisyah
                      <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <Cake size={56} className="text-pink-500 inline" />
                      </motion.span>
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg md:text-2xl text-gray-600 font-medium max-w-xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Hari ini adalah harimu! Semoga harimu dipenuhi dengan tawa dan hal-hal semanis dirimu.
                    <motion.span className="inline-block ml-2" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                      <Sparkles size={20} className="text-yellow-400 inline fill-yellow-300" />
                    </motion.span>
                  </motion.p>

                  {/* Three bouncing hearts below subtitle */}
                  <div className="flex justify-center gap-4 mt-6">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
                      >
                        <Heart size={24 + i * 4} className={`fill-current ${['text-pink-400','text-rose-500','text-purple-400'][i]}`} />
                      </motion.div>
                    ))}
                  </div>
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
              className="mt-20 mb-8 text-center flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {/* Cat in the footer */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <CatFace size={60} color="#f9a8d4" />
              </motion.div>
              <p className="text-gray-600 font-medium flex items-center justify-center gap-2 text-lg">
                Dibuat dengan
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                  <Heart size={18} className="text-red-500 fill-red-500 inline" />
                </motion.span>
                khusus untuk Aisyah tercinta.
              </p>
            </motion.div>

          </main>
        </div>
      )}
    </>
  );
}

export default App;
