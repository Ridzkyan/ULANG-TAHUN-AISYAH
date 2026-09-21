import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Check, X, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const allQuestions = [
  {
    question: "Berapa skor keimutan Aisyah kalau dibandingin sama Capybara? 🐋",
    options: ["10/10", "100/10", "1000/10", "100000/10"],
    correct: 2,
    wrongMsg: "Masa lupa sih seberapa imutnya dirimu?! Coba lagi sayang! 🥺"
  },
  {
    question: "Di mana letak tempat Ridho matung kedinginan selama 30 menit? 🧍‍♂️",
    options: ["Di Mall", "Di depan Kosan Aisyah", "Di Kampus", "Di Cafe"],
    correct: 1,
    wrongMsg: "Salah dong! Padahal waktu itu kakiku sampai pegal lho. 😩"
  },
  {
    question: "Jam berapa Ridho nge-chat 'Sapaan Subuh' pertama kali waktu kita PDKT? ⏰",
    options: ["03:00", "04:15", "04:49", "05:30"],
    correct: 2,
    wrongMsg: "Hayoo lupa ya awal mula kita dekat jam berapa? 🤨"
  },
  {
    question: "Kebiasaan lucu Aisyah yang paling sering dilakuin kalau habis makan? 😴",
    options: ["Nyuci piring", "Ketiduran nyenyak", "Main HP", "Nonton Drakor"],
    correct: 1,
    wrongMsg: "Tukang tidur kok nggak ngaku! 😂"
  },
  {
    question: "Emoji apa yang jadi ciri khas kebesaran Aisyah Cantik Blubub Blubub? ✨",
    options: ["🐋🤍", "🐶❤️", "🐸💚", "🐱💛"],
    correct: 0,
    wrongMsg: "Masa lupa sama emoji kebesaran kita sendiri! 🐋"
  },
  {
    question: "Hobi utama Ridho kalau lagi nggak dilarang sama Aisyah? ♟️",
    options: ["Tidur Seharian", "Main Catur", "Main Mobile Legends", "Nonton Anime"],
    correct: 1,
    wrongMsg: "Salah! Padahal Ridho sering banget pengen main catur. 🥺"
  },
  {
    question: "Waktu nugas bareng subuh-subuh, software game apa yang kita debatin? 🎮",
    options: ["Roblox", "Construct", "Unity", "Unreal Engine"],
    correct: 1,
    wrongMsg: "Loh kok salah? Itu kan sejarah awal kita kenalan. 😂"
  },
  {
    question: "Kalau Ridho udah manggil 'Sayang bangunnn! Isya lohhh!', artinya apa? 🕌",
    options: ["Ridho laper", "Ridho kangen", "Aisyah telat sholat gara-gara ketiduran", "Ngajak main game"],
    correct: 2,
    wrongMsg: "Tuh kan ketahuan sering telat bangun sholat! 😂"
  },
  {
    question: "Siapa pasangan paling bucin dan gemesin se-Samarinda? 💑",
    options: ["Ridho & Aisyah", "Romeo & Juliet", "Habibie & Ainun", "Capybara & Kucing"],
    correct: 0,
    wrongMsg: "Bukan! Jawabannya pasti kita berdua lah! 😍"
  },
  {
    question: "Sikap Ridho yang paling Aisyah butuhkan pas lagi banyak modul/tugas? 📚",
    options: ["Bantuin doa", "Nyuruh tidur", "Jadi Kang Joki VIP", "Diem aja"],
    correct: 2,
    wrongMsg: "Masa pacarnya yang kang joki rela berkorban ini dilupain! 😤"
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
