import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pin } from 'lucide-react';

const baseReasons = [
  "Karena senyummu manis banget.",
  "Karena kamu selalu bisa bikin aku ketawa.",
  "Karena suara manjanya selalu bikin kangen.",
  "Karena kamu selalu sabar ngadepin aku.",
  "Karena pipimu menggemaskan banget.",
  "Karena nggak ada capybara yang bisa ngalahin lucunya kamu.",
  "Karena tiap chat dari kamu bikin senyum-senyum sendiri.",
  "Karena kamu selalu mau dengerin cerita absurdku.",
  "Karena cemburumu itu ngangenin banget.",
  "Karena kamu nerima aku apa adanya.",
  "Karena jago banget bikin cowok salting.",
  "Karena aku nyaman banget kalau di deket kamu.",
  "Karena kamu adalah separuh jiwaku.",
  "Karena kamu selalu peduli kalau aku belum makan.",
  "Karena kamu support system terbaik.",
  "Karena marahmu aja kelihatan lucu.",
  "Karena tiap lihat fotomu bawaannya pengen peluk.",
  "Karena kamu tau gimana bikin aku semangat lagi.",
  "Karena cuma kamu yang bisa bikin aku matung 30 menit di depan kos.",
  "Karena bau parfummu selalu bikin candu.",
  "Karena kalau kamu ketawa matamu ikutan senyum.",
  "Karena kamu nggak pernah nyerah sama kita.",
  "Karena kamu suka tiba-tiba ngambek lucu.",
  "Karena aku suka cara kamu manggil namaku.",
  "Karena pelukanmu tempat paling nyaman.",
  "Karena kamu gampang banget disayang.",
  "Karena kamu sumber bahagiaku.",
  "Karena kamu selalu nemenin nugas sampai subuh.",
  "Karena kita bisa bahas apa aja dari yang penting sampai hal random.",
  "Karena kamu nggak pernah lupa ngabarin.",
  "Karena caramu ngambek pengen gigit tangan.",
  "Karena aku sayang banget sama kamu.",
  "Karena kamu lucu kalau lagi makan es krim.",
  "Karena nggak ada yang seindah kamu.",
  "Karena cuma kamu yang ada di hatiku.",
  "Karena aku suka dengar kamu nyanyi.",
  "Karena kamu suka godain aku sampai salting.",
  "Karena kamu tahu rahasia kecilku.",
  "Karena kamu adalah rumah buat aku pulang.",
  "Karena ngelihat kamu sedih bikin aku ikut sedih.",
  "Karena aku selalu kangen kamu tiap menit.",
  "Karena kamu malaikat tanpa sayapku.",
  "Karena kamu pemaaf.",
  "Karena kebaikan hatimu nggak ada ujungnya.",
  "Karena kamu selalu bilang I Love You duluan.",
  "Karena kamu imut banget pas baru bangun tidur.",
  "Karena kamu rela ngantuk buat nemenin aku.",
  "Karena cuma kamu yang bisa bikin aku gugup.",
  "Karena kamu mengerti kekuranganku.",
  "Karena kita bisa nonton film bareng seharian.",
  "Karena senyummu mencerahkan hariku.",
  "Karena kamu cantik luar dan dalam.",
  "Karena kamu adalah hadiah terindah dari Tuhan.",
  "Karena kamu penyemangat hidupku.",
  "Karena aku nggak bisa bayangin hidup tanpa kamu.",
  "Karena aku suka pegang tanganmu.",
  "Karena kamu bawel soal kesehatanku.",
  "Karena kamu selalu bilang kangen padahal baru ketemu.",
  "Karena kamu nggak pernah perhitungan soal waktu.",
  "Karena kamu adalah satu-satunya ratu di hatiku.",
  "Karena kamu lucu pas marah-marah nggak jelas.",
  "Karena kamu selalu bisa bikin aku bangga.",
  "Karena kamu selalu ada di saat aku butuh.",
  "Karena suara nafasmu pas tidur itu tenang banget.",
  "Karena cintamu ke aku tulus banget.",
  "Karena tatapan matamu bikin aku meleleh.",
  "Karena kamu ngangenin setengah mati.",
  "Karena aku suka elus-elus kepalamu.",
  "Karena aku suka nyium pipimu.",
  "Karena kamu adalah versi terbaik dari dirimu.",
  "Karena kamu jago banget merebut hati aku.",
  "Karena kamu bawelnya ngalahin alarm subuh.",
  "Karena aku suka denger omelanmu.",
  "Karena kamu partner main game terseru.",
  "Karena kamu selalu jadi alasan senyum pagi hariku.",
  "Karena kamu bikin dunia ini jadi lebih indah.",
  "Karena setiap ngeliat kamu rasanya kayak jatuh cinta lagi.",
  "Karena kamu menggemaskan setiap saat.",
  "Karena kamu nggak gampang menyerah.",
  "Karena kita punya sejuta kenangan lucu.",
  "Karena kamu selalu bikin jantungku berdebar kencang.",
  "Karena kamu memprioritaskan aku.",
  "Karena kamu selalu minta ditemenin walau cuma lewat telpon.",
  "Karena kamu pintar bikin kejutan kecil.",
  "Karena hari-hariku hampa tanpa kamu.",
  "Karena kamu nggak pernah bosen denger ceritaku.",
  "Karena aku nggak pernah bosen natap wajahmu.",
  "Karena kamu selalu ingetin aku ibadah.",
  "Karena doa-doamu selalu menyertaiku.",
  "Karena kita adalah satu.",
  "Karena kamu adalah kepingan puzzle yang melengkapiku.",
  "Karena kamu berani jujur apa adanya.",
  "Karena cintaku padamu takkan pernah habis.",
  "Karena aku janji akan selalu jagain kamu.",
  "Karena kamu selalu wangi.",
  "Karena kamu selalu manja dan minta dielus.",
  "Karena Aisyah adalah segalanya buat Ridho.",
  "Karena kamu lucu kalau lagi kepedesan.",
  "Karena kita akan menua bersama.",
  "Karena 100 alasan ini nggak akan cukup buat ngegambarin sayangnya aku ke kamu!"
];

const generate100Notes = () => {
  const notes = [];
  const colors = ["bg-yellow-200", "bg-pink-200", "bg-blue-200", "bg-green-200", "bg-purple-200", "bg-orange-200", "bg-teal-200", "bg-rose-200"];
  
  for (let i = 0; i < 100; i++) {
    const text = baseReasons[i];
    const isLast = i === 99;

    const color = isLast ? "bg-red-200 border-2 border-red-400" : colors[Math.floor(Math.random() * colors.length)];
    const rotate = isLast ? 0 : Math.floor(Math.random() * 40) - 20;
    
    // 100th note is exactly centered
    const top = isLast ? 'calc(50% - 70px)' : `${Math.floor(Math.random() * 85) + 2}%`; 
    const left = isLast ? 'calc(50% - 70px)' : `${Math.floor(Math.random() * 80) + 2}%`; 
    
    notes.push({
      id: i + 1,
      text: `${i + 1}. ${text}`,
      color,
      rotate: `${rotate}deg`,
      top,
      left,
      zIndex: isLast ? 50 : Math.floor(Math.random() * 20) + 1
    });
  }
  return notes;
};

const notesData = generate100Notes();

const InteractivePinboard = () => {
  const constraintsRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "100px" });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (isInView && visibleCount < notesData.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 4, notesData.length));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, visibleCount]);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto my-32 px-4 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-sm md:text-base font-extrabold text-pink-400 uppercase tracking-widest mb-2">Kenapa Ridho Sayang Kamu?</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 font-sans">
          <Pin className="text-pink-500" size={32} /> Papan 100 Alasan <Pin className="text-pink-500" size={32} />
        </h2>
        <p className="text-gray-500 mt-4 font-medium text-lg">Ada BENAR-BENAR 100 kertas di sini! Aduk dan temukan semuanya! 😱</p>
      </div>

      <div 
        ref={constraintsRef}
        className="w-full h-[600px] md:h-[800px] rounded-[3rem] shadow-2xl relative overflow-hidden border-[12px] border-[#8b5a2b]"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/cork-board.png")`,
          backgroundColor: "#cd853f"
        }}
      >
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

        {notesData.slice(0, visibleCount).map((note) => (
          <motion.div
            key={note.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0, cursor: 'grabbing' }}
            whileHover={{ scale: 1.05, zIndex: 90, cursor: 'grab' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: note.rotate }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`absolute ${note.color} p-2 md:p-3 w-[110px] md:w-[140px] min-h-[110px] md:min-h-[140px] flex flex-col justify-center items-center text-center select-none ${note.id === 100 ? 'ring-4 ring-pink-500/50' : ''}`}
            style={{
              top: note.top,
              left: note.left,
              zIndex: note.zIndex,
              boxShadow: note.id === 100 ? "0px 15px 30px rgba(0,0,0,0.6)" : "2px 3px 5px rgba(0,0,0,0.3)"
            }}
          >
            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-md z-10 border ${note.id === 100 ? 'bg-pink-500 border-pink-700 w-4 h-4 -top-3' : 'bg-red-500 border-red-700'}`}>
              <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
            </div>
            
            <p className="font-sans font-bold text-gray-800 text-[10px] md:text-[11px] leading-snug">
              {note.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InteractivePinboard;
