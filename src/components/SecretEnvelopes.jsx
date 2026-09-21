import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, X } from 'lucide-react';

const messages = [
  "Tahu nggak, kamu itu 1000/10 lucunya! Boneka Capybara aja kalah jauh! 🫣",
  "Kata orang anak pertama itu galak, tapi kok yang ini imut-imut banget sih? 🐋🤍",
  "Jangan keseringan tidur habis makan, nanti pipinya makin ciumable lho! 😚",
  "Kamu ngomel-ngomel bawel nyuruh aku sholat aja keliatan gemesin banget.",
  "Aku sayang kamu hari ini, besok, dan setiap hari tanpa batas! 💞",
  "Aku rela jadi kang joki nugas selamanya asalkan yang dijokiin itu kamu. ✨"
];

const SecretEnvelopes = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto my-24 px-4 relative z-10">
      
      <div className="absolute -top-10 left-10 text-pink-300 opacity-50 animate-pulse"><Sparkles size={40} /></div>
      <div className="absolute top-20 right-10 text-pink-300 opacity-50 animate-bounce"><Heart size={30} /></div>

      <div className="text-center mb-16">
        <h3 className="text-sm md:text-base font-extrabold text-pink-400 uppercase tracking-widest mb-2">Pesan Untukmu</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 font-serif italic">
          <Mail className="text-pink-500" size={36} /> Surat Rahasia Ridho <Mail className="text-pink-500" size={36} />
        </h2>
        <p className="text-gray-500 mt-4 font-medium text-lg">Sentuh amplopnya untuk membuka pesan manis dariku! 💌</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-items-center mt-10">
        {messages.map((msg, idx) => (
          <div key={idx} className="w-full max-w-[280px] relative">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenIndex(idx)}
              className="bg-gradient-to-br from-pink-300 to-pink-400 w-full h-32 rounded-xl shadow-xl cursor-pointer relative z-10 flex items-center justify-center border-b-[12px] border-pink-500 overflow-hidden"
            >
              {/* Envelope Flap Triangle */}
              <div 
                className="absolute top-0 w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-t-[75px] border-t-pink-200 drop-shadow-md origin-top transition-transform duration-500 ease-in-out" 
              ></div>
              
              {/* Decorative Envelope Lines */}
              <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[80px] border-b-pink-400 border-r-[140px] border-r-transparent opacity-50 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[80px] border-b-pink-400 border-l-[140px] border-l-transparent opacity-50 pointer-events-none"></div>

              <div className="absolute bg-white p-2 rounded-full shadow-md z-20">
                <Heart className="text-red-500 fill-red-500 animate-pulse" size={28} />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL FOR OPENED ENVELOPE */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotateX: 45 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-amber-50 w-full max-w-md p-8 md:p-12 rounded-sm shadow-2xl relative border-2 border-amber-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setOpenIndex(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                <Heart className="text-red-400 opacity-60" size={32} />
                <p className="text-gray-800 font-serif leading-relaxed text-lg md:text-xl italic">
                  "{messages[openIndex]}"
                </p>
                <div className="w-16 h-[1px] bg-red-200 mt-4"></div>
                <p className="text-sm text-gray-500 font-serif mt-4">Dari Ridho, untuk Aisyah.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretEnvelopes;
