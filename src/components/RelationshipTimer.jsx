import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart } from 'lucide-react';

// Setting the date to the "sapaan subuh pertama"
const START_DATE = new Date("2025-12-01T04:49:00").getTime();

const RelationshipTimer = () => {
  const [timeState, setTimeState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - START_DATE;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeState({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Hari", value: timeState.days },
    { label: "Jam", value: timeState.hours },
    { label: "Menit", value: timeState.minutes },
    { label: "Detik", value: timeState.seconds }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-32 px-4 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-sm md:text-base font-extrabold text-rose-500 uppercase tracking-widest mb-2">Detak Waktu Kita</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 font-sans">
          <Clock className="text-rose-500" size={32} /> Kalkulator Jadian <Clock className="text-rose-500" size={32} />
        </h2>
        <p className="text-gray-500 mt-4 font-medium text-lg">Waktu yang telah kita lewati sejak sapaan subuh pertama itu...</p>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-rose-100 flex flex-col items-center">
        
        <Heart size={48} className="text-rose-500 fill-rose-500 mb-8 animate-pulse" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-2xl">
          {timeBlocks.map((block, idx) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-rose-50 to-rose-100 border-2 border-rose-200 rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg"
            >
              <span className="text-4xl md:text-5xl font-extrabold text-rose-600 font-mono mb-2">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-base font-bold text-rose-400 uppercase tracking-wider">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-gray-600 font-medium text-center italic max-w-lg">
          "Dan waktu ini tidak akan pernah berhenti berdetak, sama seperti rasa sayangku ke kamu." ❤️
        </p>
      </div>
    </div>
  );
};

export default RelationshipTimer;
