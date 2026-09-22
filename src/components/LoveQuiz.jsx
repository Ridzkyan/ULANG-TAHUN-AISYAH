import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Check, X, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const allQuestions = [
  {
    question: "Jam berapa Ridho nge-chat pertama kali ke Aisyah waktu subuh? ⏰",
    options: ["03:00", "04:00", "04:49", "05:30"],
    correct: 2,
    wrongMsg: "Aduh, lupa ya momen bersejarah kita dimulai jam berapa? 🥺"
  },
  {
    question: "Awalnya Ridho nge-chat Aisyah subuh-subuh karena urusan apa? 🎮",
    options: ["Minta nomor WA", "Nanya soal event sheet game Construct", "Mau kenalan doang", "Salah kirim pesan"],
    correct: 1,
    wrongMsg: "Hayooo lupa asal muasalnya kita gimana? Dari nugas game lho! 😄"
  },
  {
    question: "Berapa batas maksimal event sheet di Construct versi gratis yang jadi topik pertama kita? 🔢",
    options: ["20", "30", "40", "50"],
    correct: 2,
    wrongMsg: "Itu yang bikin Ridho nge-chat subuh-subuh lho, masa lupa! 😂"
  },
  {
    question: "Di mana Ridho matung hampir 30 menit karena gamau pisah sama Aisyah? 📍",
    options: ["Di Parkiran Mall", "Di Depan Kosan Aisyah", "Di Kampus", "Di Cafe"],
    correct: 1,
    wrongMsg: "Kaki Ridho sampai pegal lho berdiri di sana! 😩"
  },
  {
    question: "Apa yang Aisyah lakukan saat dengar suara motor Ridho pergi? 💔",
    options: ["Langsung tidur", "Dengerin sampai suaranya hilang baru masuk kos", "Langsung nelpon balik", "Nangis di kamar"],
    correct: 1,
    wrongMsg: "Momen ini bikin Ridho terharu banget lho! 😭❤️"
  },
  {
    question: "Aisyah pernah protes keras soal apa di bulan ke-6? 😤",
    options: ["Ridho jarang nelpon", "Ridho bilang adeknya lebih imut dari Aisyah", "Ridho lupa anniversary", "Ridho telat balas chat"],
    correct: 1,
    wrongMsg: "Aisyah langsung ngetik 'AKU IMUT IMUTTT' pake huruf kapital semua lho! 😂"
  },
  {
    question: "Kenapa Aisyah telpon Ridho di subuh hari di bulan ke-9? ⏰",
    options: ["Kangen aja", "Mau bangunin Ridho biar ga kesiangan", "Ada kabar penting", "Ridho yang minta dibangunin"],
    correct: 1,
    wrongMsg: "Aisyah ini alarm paling setia yang pernah ada! 😄"
  },
  {
    question: "Di bulan ke-7, Aisyah kebangun tengah malam karena apa? 🌧️",
    options: ["Mimpi buruk", "Alarm berbunyi", "Hujan deras di atap kos", "Ada yang nelpon"],
    correct: 2,
    wrongMsg: "Waktu itu hujan derasnya ribut banget di atap kos lho! 🌧️"
  },
  {
    question: "Berapa skor keimutan Aisyah menurut Ridho dibanding Capybara? 🐋",
    options: ["10/10", "100/10", "1000/10", "9999/10"],
    correct: 2,
    wrongMsg: "Masa lupa sih seberapa imutnya dirimu sendiri?! 🥺"
  },
  {
    question: "Lagu favorit Ridho dan Aisyah yang dipakai di website ini adalah? 🎵",
    options: ["Kangen - Dewa 19", "Bola Mata Sayu - DNanda", "Satu Dalam Hatiku", "Tak Ingin Usai"],
    correct: 1,
    wrongMsg: "Itu lagunya yang menemani website kita dari awal lho sayang! 🎶"
  }
];

const LoveQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    generateRandomQuiz();
  }, []);

  const generateRandomQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuizData(shuffled);
    setCurrentQ(0);
    setShowResult(false);
    setFeedback("");
  };

  const handleAnswer = (idx) => {
    if (idx === quizData[currentQ].correct) {
      setFeedback("Pintar banget kesayanganku! 💖");
      
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#f472b6', '#fb7185', '#e879f9']
      });

      setTimeout(() => {
        setFeedback("");
        if (currentQ < quizData.length - 1) {
          setCurrentQ(currentQ + 1);
        } else {
          setShowResult(true);
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#f472b6', '#fb7185', '#e879f9', '#38bdf8']
          });
        }
      }, 1500);
    } else {
      setFeedback(quizData[currentQ].wrongMsg);
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
  };

  if (quizData.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto my-32 px-4 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-sm md:text-base font-extrabold text-pink-400 uppercase tracking-widest mb-2">Mini Game Spesial</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 font-sans">
          <Gamepad2 className="text-pink-500" size={32} /> Seberapa Kenal Pacarmu? <Gamepad2 className="text-pink-500" size={32} />
        </h2>
      </div>

      <motion.div 
        animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 md:p-10 shadow-2xl border-4 border-pink-100 relative min-h-[400px] flex flex-col justify-center items-center text-center"
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="mb-8">
                <span className="text-pink-500 font-bold tracking-widest text-sm uppercase bg-pink-50 px-4 py-1 rounded-full">
                  Pertanyaan {currentQ + 1} / {quizData.length}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-6 font-sans leading-relaxed">
                  {quizData[currentQ].question}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizData[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="bg-gray-50 hover:bg-pink-50 border-2 border-gray-200 hover:border-pink-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="h-12 mt-6 flex items-center justify-center">
                {feedback && (
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`font-bold text-lg ${feedback.includes('salah') || feedback.includes('lupa') || feedback.includes('curang') || feedback.includes('ketahuan') || feedback.includes('Bukan') ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {feedback.includes('Pintar') ? <Check className="inline mr-2" /> : <X className="inline mr-2" />}
                    {feedback}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <Trophy size={80} className="text-yellow-400 mb-6 drop-shadow-lg" />
              <h3 className="text-3xl font-extrabold text-gray-800 mb-4">Lulus Ujian Ayang! 🏆</h3>
              <p className="text-gray-600 font-medium mb-8">
                Selamat! Kamu emang beneran sayang dan merhatiin Ridho. Hadiahnya adalah pelukan virtual tak terbatas! ❤️
              </p>
              <button
                onClick={generateRandomQuiz}
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Main Lagi (Soal Acak)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LoveQuiz;
