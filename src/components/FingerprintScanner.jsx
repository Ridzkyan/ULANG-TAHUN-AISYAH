import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, ScanFace, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

const FingerprintScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const scanIntervalRef = useRef(null);

  // The cool technology typewriter effect text
  const fullText = "> ANALISIS DNA SELESAI...\n> DEKRIPSI KODE BUCIN: BERHASIL\n> MENGHITUNG KECOCOKAN...\n> \n> KECOCOKAN RIDHO & AISYAH: 99.99%\n> STATUS: PASANGAN PALING IDEAL DI BUMI!";

  useEffect(() => {
    if (isScanning && !isComplete) {
      scanIntervalRef.current = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(scanIntervalRef.current);
            setIsComplete(true);
            setIsScanning(false);
            
            // Pop confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#0ea5e9', '#38bdf8', '#7dd3fc']
            });
            
            return 100; // Cap it at 100
          }
          return prev + 3; // Faster scan
        });
      }, 50);
    } else if (!isScanning && !isComplete) {
      setScanProgress(0); // Reset if finger lifted too early
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    }
    
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, [isScanning, isComplete]);

  // Typewriter effect when complete
  useEffect(() => {
    if (isComplete) {
      let i = 0;
      setTerminalText("");
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setTerminalText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [isComplete]);

  const handleStartScan = (e) => {
    if (e.cancelable) e.preventDefault();
    if (!isComplete) setIsScanning(true);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const resetScanner = () => {
    setIsComplete(false);
    setScanProgress(0);
    setIsScanning(false);
    setTerminalText("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-32 px-4 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-sm md:text-base font-extrabold text-blue-400 uppercase tracking-widest mb-2">A.I. Teknologi Masa Depan</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 font-sans">
          <ScanFace className="text-blue-500" size={32} /> Kalkulator Jodoh Halu <ScanFace className="text-blue-500" size={32} />
        </h2>
        <p className="text-gray-500 mt-4 font-medium text-lg">Tempelkan dan tahan sidik jarimu di layar untuk mengecek kecocokan kita!</p>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-6 md:p-12 shadow-[0_0_40px_rgba(14,165,233,0.3)] border-4 border-slate-700 relative overflow-hidden max-w-lg mx-auto flex flex-col items-center justify-center min-h-[450px]">
        
        {/* Techy background grids */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center z-10 w-full"
            >
              {/* Fingerprint Button */}
              <div className="relative w-40 h-40 flex items-center justify-center mb-8 select-none">
                {/* Scanning rings */}
                <motion.div 
                  animate={isScanning ? { scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] } : { scale: 1, opacity: 0.1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-blue-500 pointer-events-none"
                ></motion.div>
                <motion.div 
                  animate={isScanning ? { scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] } : { scale: 1, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="absolute inset-[-10px] rounded-full border-2 border-cyan-400 pointer-events-none"
                ></motion.div>

                {/* Fingerprint Icon (Hold to scan) */}
                <motion.div
                  onMouseDown={handleStartScan}
                  onMouseUp={handleStopScan}
                  onMouseLeave={handleStopScan}
                  onTouchStart={handleStartScan}
                  onTouchEnd={handleStopScan}
                  onTouchCancel={handleStopScan}
                  className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${isScanning ? 'bg-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'bg-slate-800'}`}
                  style={{ 
                    touchAction: 'none', 
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                >
                  <Fingerprint size={80} className={`${isScanning ? 'text-blue-400' : 'text-slate-500'} transition-colors duration-300 pointer-events-none`} />
                  
                  {/* Scan line effect */}
                  {isScanning && (
                    <motion.div
                      animate={{ y: [-40, 40, -40] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute w-24 h-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee] z-20 pointer-events-none"
                    ></motion.div>
                  )}
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-[200px] h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-75 ease-linear"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <p className="text-cyan-400 font-mono mt-4 tracking-widest uppercase text-sm font-bold">
                {isScanning ? `Memindai DNA... ${scanProgress}%` : "Tahan untuk memindai"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center z-10 w-full"
            >
              <div className="w-full bg-black/50 border-2 border-cyan-500/50 rounded-xl p-4 md:p-6 mb-6 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                <Terminal className="text-cyan-400 mb-2" size={24} />
                <p className="text-green-400 font-mono text-sm md:text-base whitespace-pre-line text-left leading-relaxed">
                  {terminalText}
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-green-400 ml-1 align-middle"
                  ></motion.span>
                </p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: terminalText.length === fullText.length ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onClick={resetScanner}
                disabled={terminalText.length !== fullText.length}
                className="text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400/20 font-mono uppercase tracking-widest text-xs md:text-sm px-6 py-2 rounded-full transition-colors mt-2"
              >
                Scan Ulang
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FingerprintScanner;
