import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Lazily create audio ONLY when user first clicks play.
  // This prevents music from starting when the intro envelope is clicked,
  // and also satisfies browser autoplay policies.
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/lagu/lagu.webm');
      audioRef.current.loop = true;
    }
    return audioRef.current;
  }, []);

  const togglePlay = () => {
    const audio = getAudio();
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log('Play prevented by browser:', e);
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/80 p-2 md:p-3 rounded-full shadow-2xl backdrop-blur-md border-2 border-pink-200"
    >
      <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 cursor-pointer" onClick={togglePlay}>
        {/* Vinyl Record */}
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full bg-gray-900 border-[4px] border-gray-800 flex items-center justify-center shadow-inner"
        >
          {/* Inner Vinyl Label */}
          <div className="w-5 h-5 bg-pink-400 rounded-full border-2 border-pink-300 flex items-center justify-center">
            {/* Center Hole */}
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
          </div>
          {/* Vinyl Grooves effect */}
          <div className="absolute inset-1 rounded-full border-[0.5px] border-gray-700 opacity-50"></div>
          <div className="absolute inset-2 rounded-full border-[0.5px] border-gray-700 opacity-50"></div>
        </motion.div>

        {/* Play/Pause overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 rounded-full">
          {isPlaying ? <Pause size={20} className="text-white fill-white" /> : <Play size={20} className="text-white fill-white ml-1" />}
        </div>
      </div>

      <div className="pr-4 hidden sm:block">
        <p className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-0.5 flex items-center gap-1">
          <Music size={10} /> Now Playing
        </p>
        <p className="text-sm font-semibold text-gray-700 truncate max-w-[120px]">
          Lagu Kesukaan Kita
        </p>
      </div>

      {/* Mini floating notes animation when playing */}
      {isPlaying && (
        <div className="absolute -top-4 -left-2 text-pink-400 animate-bounce">
          <Music size={14} />
        </div>
      )}
      {isPlaying && (
        <div className="absolute -top-6 right-4 text-pink-300 animate-pulse delay-75">
          <Music size={10} />
        </div>
      )}
    </motion.div>
  );
};

export default MusicPlayer;
