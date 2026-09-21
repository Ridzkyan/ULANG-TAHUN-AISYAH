import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, MapPin, X } from 'lucide-react';

const mapLocations = [
  {
    id: 1,
    title: "Kosan Aisyah",
    desc: "Tempat bersejarah di mana Ridho pernah membeku matung selama 30 menit penuh cuma karena nggak ada yang mau pulang duluan habis kencan.",
    position: { top: '30%', left: '15%' },
    emoji: "🧍‍♂️"
  },
  {
    id: 2,
    title: "Server Discord / Kampus",
    desc: "Titik nol perjalanan kita. Dimulai dari perdebatan event sheet game 40 baris subuh-subuh yang berujung jadi baper.",
    position: { top: '60%', left: '40%' },
    emoji: "🎮"
  },
  {
    id: 3,
    title: "Mall Kesayangan",
    desc: "Tempat kejadian perkara di mana Aisyah nantangin Ridho: 'Lucuan aku atau Capybara?'. (Jawabannya sudah pasti Aisyah 1000/10).",
    position: { top: '20%', left: '75%' },
    emoji: "🐋"
  }
];

const LoveMap = () => {
  const [selectedLoc, setSelectedLoc] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto my-32 px-4 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-sm md:text-base font-extrabold text-emerald-500 uppercase tracking-widest mb-2">Jejak Langkah Kita</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 font-sans">
          <Map className="text-emerald-500" size={32} /> Peta Perjalanan Cinta <Map className="text-emerald-500" size={32} />
        </h2>
        <p className="text-gray-500 mt-4 font-medium text-lg">Sentuh pin lokasi di peta untuk melihat kenangan kita di sana!</p>
      </div>

      <div className="relative w-full h-[400px] md:h-[500px] bg-[#fdf5e6] rounded-3xl border-[8px] border-[#d4a373] shadow-2xl overflow-hidden">
        
        {/* Treasure Map Texture & Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-70 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20 pointer-events-none"></div>
        
        {/* Map Decorations (Path lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.1))' }}>
          <path 
            d="M 15% 30% Q 30% 60% 40% 60% T 75% 20%" 
            fill="transparent" 
            stroke="#b38b6d" 
            strokeWidth="4" 
            strokeDasharray="10,10"
            className="animate-[dash_10s_linear_infinite]"
          />
        </svg>

        {/* Map Pins */}
        {mapLocations.map((loc) => (
          <div 
            key={loc.id}
            className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{ top: loc.position.top, left: loc.position.left }}
          >
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedLoc(loc)}
              className="cursor-pointer relative z-10 flex flex-col items-center group"
            >
              <div className="bg-white p-2 rounded-full shadow-lg border-2 border-emerald-500 mb-1">
                <span className="text-2xl block">{loc.emoji}</span>
              </div>
              <MapPin size={28} className="text-red-500 fill-red-500 -mt-3 drop-shadow-md group-hover:animate-bounce" />
              <p className="mt-1 font-bold text-sm text-[#8b5a2b] bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap border border-[#d4a373]">
                {loc.title}
              </p>
            </motion.div>
          </div>
        ))}

        {/* Popup Memory Card */}
        <AnimatePresence>
          {selectedLoc && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
              onClick={() => setSelectedLoc(null)}
            >
              <motion.div 
                className="bg-[#fff9f0] border-4 border-[#d4a373] p-6 md:p-8 rounded-2xl max-w-sm w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedLoc(null)}
                  className="absolute top-4 right-4 text-[#a0522d] hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
                
                <div className="text-6xl text-center mb-4">{selectedLoc.emoji}</div>
                <h4 className="text-xl font-bold text-[#8b5a2b] mb-2 text-center border-b-2 border-[#d4a373] pb-2">
                  📍 {selectedLoc.title}
                </h4>
                <p className="text-[#5c4033] font-medium leading-relaxed mt-4 text-center">
                  {selectedLoc.desc}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default LoveMap;
