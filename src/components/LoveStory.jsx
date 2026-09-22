import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cat, Gamepad2, Coffee, Heart, Phone, Sparkles, CloudRain, Star, Lock, Cake, MapPin, X } from 'lucide-react';

// Photos 1-80 are actual WebP photos from /foto/
// We distribute ~8-9 photos per chapter (9 chapters)
const chapterPhotos = [
  [1, 2, 4],        // Bulan 1  (Dec 2025)
  [9, 10, 11],      // Bulan 2  (Jan 2026)
  [18, 19, 21],     // Bulan 3  (Feb 2026)
  [26, 27, 28],     // Bulan 4  (Mar 2026)
  [33, 34, 39],     // Bulan 5  (Apr 2026)
  [41, 42, 43],     // Bulan 6  (May 2026)
  [49, 50, 52],     // Bulan 7  (Jun 2026)
  [57, 58, 61],     // Bulan 8  (Jul 2026)
  [65, 68, 70, 75], // Bulan 9 (Aug-Sep 2026)
];

// Landscape IDs (W > H based on ffmpeg analysis)
const LANDSCAPE_IDS = new Set([1,3,4,5,6,7,8,9,14,16,18,19,21,22,23,28,29,31,39,41,42,43,44,45,46,47,49,50,51,52,53,54,55,61,62,63,64,65,66,68,69,70,71,72,73,74,75,76,77,78,79,80]);

const PhotoGrid = ({ chapterIndex, isVisible }) => {
  const ids = chapterPhotos[chapterIndex] || [];
  // Don't render photos at all until the chapter is visible (reduces initial DOM + memory)
  if (!isVisible) {
    return <div className="w-full h-64 rounded-[1.5rem] bg-pink-50/50 animate-pulse" />;
  }

  // Menghitung jumlah kolom (span) yang diambil tiap foto agar tidak ada grid yang bolong
  let currentCol = 0;
  const spans = ids.map((id) => {
    const isLandscape = LANDSCAPE_IDS.has(id);
    let span = 1; // default 1 kolom (portrait)

    if (isLandscape) {
      if (currentCol === 0) {
        // Awal baris, landscape bisa full width (2 kolom)
        span = 2;
      } else {
        // Kalau sisa 1 slot di kanan, jadikan ukuran kecil (1 kolom) agar pas mengisi lubang
        span = 1;
      }
    }
    
    currentCol = (currentCol + span) % 2;
    return span;
  });

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {ids.map((id, i) => {
        const isFullWidth = spans[i] === 2;
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.4) }}
            className={`rounded-[1.5rem] overflow-hidden shadow-lg border-[4px] border-white/70 bg-pink-50 flex items-center justify-center
              ${isFullWidth ? 'col-span-2' : 'col-span-1'}`}
          >
            <img
              src={`/foto/${id}.webp`}
              alt={`Kenangan ${id}`}
              // Menggunakan w-full dan h-auto tanpa object-cover agar gambar tidak terpotong
              className="w-full h-auto max-h-[35vh] md:max-h-[45vh] object-contain hover:scale-110 transition-transform duration-700"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              onError={(e) => { e.target.style.opacity = '0.2'; }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

const FadeText = ({ children, delay = 0 }) => (
  <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className="leading-relaxed text-gray-700 text-[1.05rem] md:text-[1.1rem] font-sans tracking-wide mb-4"
  >
    {children}
  </motion.p>
);


const useInView = (rootMargin = '200px') => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);
  return [ref, isVisible];
};

const StoryContainer = ({ title, subtitle, children, icon: Icon = Cat, chapterIndex, isReversed = false }) => {
  const [containerRef, isVisible] = useInView('300px');
  return (
    <div ref={containerRef} className="mb-32 relative">
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-[120%] bg-gradient-to-b from-transparent via-pink-200 to-transparent -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-start`}
      >
        {/* Text Card */}
        <div className="w-full md:w-1/2 relative">
          <div className="bg-white/90 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-[6px] border-white/80 backdrop-blur-md relative z-10">
            <div className={`absolute -top-10 ${isReversed ? 'md:-right-6 right-1/2 translate-x-1/2 md:translate-x-0' : 'md:-left-6 left-1/2 -translate-x-1/2 md:translate-x-0'} bg-gradient-to-br from-pink-100 to-pink-300 p-5 rounded-full shadow-xl border-4 border-white text-pink-500`}>
              <Icon size={36} />
            </div>
            <div className="mt-8 mb-8 text-center md:text-left">
              <h3 className="text-sm font-bold text-pink-400 uppercase tracking-[0.3em] mb-2">{subtitle}</h3>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-snug">{title}</h2>
            </div>
            <div className="space-y-2">{children}</div>
          </div>
        </div>

        {/* Photo Grid — only renders when chapter is near viewport */}
        <div className="w-full md:w-1/2">
          <PhotoGrid chapterIndex={chapterIndex} isVisible={isVisible} />
        </div>
      </motion.div>
    </div>
  );
};

const AutoScrollGallery = () => {
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isModalOpen) return; // Pause scrolling if modal is open
    
    let animationId;
    let scrollPos = 0;
    
    const scroll = () => {
      if (!el) return;
      scrollPos += 0.8; // scroll speed
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0; // reset for infinite effect
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => animationId = requestAnimationFrame(scroll);

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, [isModalOpen]);

  // Use a selection of photos, duplicated for infinite scroll seamless effect
  const allPhotos = Array.from({length: 80}, (_, i) => i + 1);
  // Randomly shuffle photos for this gallery so it's a fun mix
  const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
  const displayPhotos = [...shuffled, ...shuffled];

  return (
    <>
      <div className="w-full mt-10 mb-10 overflow-hidden relative flex flex-col items-center">
        <div className="text-center mb-8">
          <h3 className="text-sm md:text-base font-extrabold text-pink-400 uppercase tracking-[0.3em] mb-2">GALERI MEMORI KITA</h3>
          <p className="text-gray-500 font-medium text-sm md:text-base">Momen-momen lucu yang selalu bikin senyum ✨</p>
        </div>
        
        <div className="relative w-full">
          {/* Gradient overlays to hide the edges smoothly */}
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[rgba(255,245,248,1)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[rgba(255,245,248,1)] to-transparent z-10 pointer-events-none"></div>
          
          <div 
            ref={scrollRef} 
            className="flex gap-4 md:gap-6 overflow-x-auto whitespace-nowrap px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch' }}
          >
            {displayPhotos.map((id, index) => (
              <div key={`${id}-${index}`} className="w-48 h-64 md:w-64 md:h-80 flex-shrink-0 rounded-[2rem] overflow-hidden shadow-lg border-[6px] border-white/90 bg-pink-50 relative group" onClick={() => setIsModalOpen(true)}>
                <img
                  src={`/foto/${id}.webp`}
                  alt={`Kenangan acak ${id}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Buka Galeri */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-pink-400/50 hover:scale-105 active:scale-95 transition-all duration-300 z-20 flex items-center gap-2"
        >
          <Star size={18} className="animate-pulse" />
          Lihat Semua 80 Foto
          <Star size={18} className="animate-pulse" />
        </button>
      </div>

      {/* Modal Popup Galeri Penuh */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Overlay Background */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl h-[85vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border-[4px] border-pink-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-pink-100 bg-pink-50/50">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-pink-500">Galeri Spesial 80 Kenangan</h3>
                <p className="text-gray-500 text-sm md:text-base font-medium">Banyak banget foto lucunya! 💖</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 bg-white border-2 border-pink-200 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-400 hover:text-white transition-colors shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content - Scrollable Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {allPhotos.map((id) => (
                  <div key={id} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm border-2 border-white bg-pink-50 hover:shadow-lg hover:border-pink-300 transition-all duration-300">
                    <img
                      src={`/foto/${id}.webp`}
                      alt={`Foto ke ${id}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const LoveStory = () => {
  return (
    <section className="w-full max-w-6xl mx-auto my-20 px-4 relative z-10">
      <div className="text-center mb-20">
        <h3 className="text-sm font-extrabold text-pink-400 uppercase tracking-widest mb-2">Perjalanan Kita</h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 font-sans">Kisah Cinta 9 Bulan</h2>
        <p className="text-gray-500 mt-4 font-medium text-lg max-w-xl mx-auto">Dari teman ngerjain game subuh-subuh, sampai jadi orang paling Ridho sayang di dunia.</p>
      </div>

      {/* BULAN 1 - Desember 2025 */}
      <StoryContainer
        subtitle="Bulan 1 • Desember 2025"
        title="Dari Teman Belajar ke Seseorang yang Spesial"
        icon={Gamepad2}
        chapterIndex={0}
        isReversed={false}
      >
        <FadeText>
          Semuanya dimulai dari sebuah pesan di subuh hari, jam 04.49. Ridho yang baru mengenal Aisyah lewat teman, memberanikan diri untuk menyapa dan bertanya soal tugas game Construct. Siapa sangka, dari obrolan teknis soal event sheet, obrolan itu mengalir manis hingga dini hari.
        </FadeText>
        <FadeText delay={0.15}>
          Ridho dengan semangat menawarkan diri menjadi "tutor pribadi VIP" secara cuma-cuma. Aisyah yang awalnya malu-malu, perlahan mulai nyaman berbagi cerita. Dari urusan tugas yang rumit, menyambung ke candaan ringan, sampai Ridho merasa sangat beruntung bisa membantunya.
        </FadeText>
        <FadeText delay={0.3}>
          Satu bulan penuh mengerjakan tugas bersama, tertawa tentang hal-hal kecil, dan tanpa sadar Ridho sudah mulai menantikan pesan dari Aisyah setiap harinya. Sebuah awal yang sederhana, namun menjadi awal dari segalanya.
        </FadeText>
      </StoryContainer>

      {/* BULAN 2 - Januari 2026 */}
      <StoryContainer
        subtitle="Bulan 2 • Januari 2026"
        title="Obrolan Subuh & Candaan yang Menghangatkan Hati"
        icon={Coffee}
        chapterIndex={1}
        isReversed={true}
      >
        <FadeText>
          Memasuki Januari, frekuensi obrolan semakin intens. Mulai membahas kehidupan sehari-hari, membicarakan impian masa depan di tengah malam, hingga Ridho yang mulai memberanikan diri mengirim stiker manis.
        </FadeText>
        <FadeText delay={0.15}>
          Ada momen lucu yang selalu dikenang — Ridho yang biasanya terlihat cuek malah menjadi pihak yang paling menantikan balasan. Kalau Aisyah terlambat membalas, ia akan penasaran. Dan kalau Aisyah membalas panjang, ia semakin antusias membalasnya hingga subuh.
        </FadeText>
        <FadeText delay={0.3}>
          Di bulan ini Ridho mulai menyadari — ini bukan lagi sekadar teman bertukar cerita. Ada perasaan yang tumbuh secara perlahan, dan setiap sapaan Aisyah menjadi hal pertama yang selalu dicari setiap pagi.
        </FadeText>
      </StoryContainer>

      {/* BULAN 3 - Februari 2026 */}
      <StoryContainer
        subtitle="Bulan 3 • Februari 2026"
        title="Resmi Menjadi Milik Satu Sama Lain"
        icon={Heart}
        chapterIndex={2}
        isReversed={false}
      >
        <FadeText>
          Februari adalah bulan bersejarah. Setelah hampir dua bulan menjadi "lebih dari teman", akhirnya Ridho secara resmi mengungkapkan perasaannya. Kata-kata manis yang tadinya masih terasa canggung, kini terucap begitu alami.
        </FadeText>
        <FadeText delay={0.15}>
          Di awal bulan ini, panggilan sayang sudah menjadi hal yang biasa. Menghabiskan waktu bersama melalui telepon di malam hari menjadi rutinitas wajib. Aisyah yang sedang lelah mengerjakan tugas selalu menemukan tempat ternyaman untuk bercerita pada Ridho, dari hal-hal seru hingga cerita sederhana yang paling berkesan.
        </FadeText>
        <FadeText delay={0.3}>
          Bulan ini Ridho resmi menjadi kekasih Aisyah — dan sejak saat itu, tak ada hari yang terlewat tanpa ucapan sayang sebelum tidur.
        </FadeText>
      </StoryContainer>

      {/* BULAN 4 - Maret 2026 */}
      <StoryContainer
        subtitle="Bulan 4 • Maret 2026"
        title="30 Menit Berdiri Setia di Depan Kos"
        icon={MapPin}
        chapterIndex={3}
        isReversed={true}
      >
        <FadeText>
          Maret datang bersama momen manis yang tak terlupakan — momen legendaris "30 menit menunggu di depan kosan." Setelah menghabiskan waktu bersama, Ridho dan Aisyah sama-sama enggan untuk berpisah. Akhirnya Ridho rela berdiri di depan kos hampir setengah jam, tak ingin momen itu cepat berlalu.
        </FadeText>
        <FadeText delay={0.15}>
          Aisyah yang baru saja bersiap untuk tidur pun masih menyempatkan diri mengirim pesan, "30 menit kita di depan ya sayang," dengan nada manja yang langsung membuat Ridho tersenyum salah tingkah. Ridho merespon bahwa Aisyah sangat manis hari itu sehingga ia enggan beranjak pergi.
        </FadeText>
        <FadeText delay={0.3}>
          Dari momen ini lahir candaan lucu di mana Ridho berpura-pura kedinginan di luar, yang dibalas Aisyah dengan tawa hangat. Sebuah bulan yang penuh dengan momen manis dan kelucuan yang selalu dikenang.
        </FadeText>
      </StoryContainer>

      {/* BULAN 5 - April 2026 */}
      <StoryContainer
        subtitle="Bulan 5 • April 2026"
        title="Kata Cinta di Tengah Jalan Malam"
        icon={Sparkles}
        chapterIndex={4}
        isReversed={false}
      >
        <FadeText>
          April adalah bulan paling romantis bagi mereka. Ridho yang sedang dalam perjalanan di malam hari tiba-tiba mengirimkan pesan, "Aku sedang di jalan sayang, I LOVE YOUUU!" yang dipenuhi dengan emoji hati.
        </FadeText>
        <FadeText delay={0.15}>
          Aisyah yang mengetahui bahwa Ridho biasanya pemalu, langsung membalas "LOVE YOU TOO" dengan sangat antusias. Teman-teman Ridho yang sudah menunggu langsung heboh menggoda, penasaran mengapa ia datang dengan senyuman lebar. Ridho pun mengaku dengan jujur bahwa ia sedang salah tingkah membaca balasan Aisyah.
        </FadeText>
        <FadeText delay={0.3}>
          Bulan ini dipenuhi oleh kehangatan-kehangatan kecil — dari pesan pengingat untuk berhati-hati, hingga tawa bahagia tentang hal-hal yang hanya dimengerti oleh mereka berdua. Cinta yang terasa semakin nyaman dan semakin dalam.
        </FadeText>
      </StoryContainer>

      {/* BULAN 6 - Mei 2026 */}
      <StoryContainer
        subtitle="Bulan 6 • Mei 2026"
        title="Yang Paling Menggemaskan Hanya Aisyah"
        icon={Star}
        chapterIndex={5}
        isReversed={true}
      >
        <FadeText>
          Mei diisi dengan banyak candaan menyegarkan. Di suatu malam, Ridho tak sengaja bercerita tentang betapa lucunya sang adik. Aisyah yang mendengarnya langsung merespon dengan sangat menggemaskan, mengklaim bahwa dirinya lah yang paling imut dengan nada cemburu yang lucu.
        </FadeText>
        <FadeText delay={0.15}>
          Melihat respon manis itu, Ridho tentu saja tertawa dan meyakinkan bahwa Aisyah akan selalu menjadi yang paling disayanginya. Di bulan yang sama, saling bertukar kabar hingga larut malam sudah menjadi kebiasaan tak terpisahkan — Aisyah membagikan kesehariannya, dan Ridho selalu mendengarkan dengan penuh senyuman.
        </FadeText>
        <FadeText delay={0.3}>
          Bahkan saat sedang berkumpul bersama teman, Ridho selalu memastikan untuk lekas pulang karena tahu ada seseorang yang dengan setia menunggunya. Setengah tahun bersama, membuktikan bahwa rasa kangen itu tak pernah pudar.
        </FadeText>
      </StoryContainer>

      {/* BULAN 7 - Juni 2026 */}
      <StoryContainer
        subtitle="Bulan 7 • Juni 2026"
        title="Kebangun Tengah Malam Karena Hujan"
        icon={CloudRain}
        chapterIndex={6}
        isReversed={false}
      >
        <FadeText>
          Di bulan ketujuh, ada momen yang bikin hati hangat banget. Jam 12 malam, Aisyah tiba-tiba kebangun karena suara hujan deras yang ribut di atap kos. Langsung chat Ridho, "hujan deras sayang." Dan Ridho yang dari tadi sudah berpesan "kalau kebangun, telpon aku aja ya," langsung merespon dengan sigap.
        </FadeText>
        <FadeText delay={0.15}>
          Mereka telponan sambil dengerin hujan bersama. Aisyah bilang, "pacar ais," dengan nada yang manja banget. Ridho balas, "lopyuuu." Sesederhana itu, tapi rasanya seperti dunia cuma milik berdua. Setelah Aisyah ngantuk, Ridho tetap menemani sampai dia ketiduran.
        </FadeText>
        <FadeText delay={0.3}>
          Dari momen ini, "nemenin sampai ketiduran" jadi ritual cinta mereka yang paling romantis. Tidak perlu kata-kata besar — cukup suara hujan dan suara satu sama lain.
        </FadeText>
      </StoryContainer>

      {/* BULAN 8 - Juli 2026 */}
      <StoryContainer
        subtitle="Bulan 8 • Juli 2026"
        title="Dengerin Suara Motor Sampai Hilang"
        icon={Phone}
        chapterIndex={7}
        isReversed={true}
      >
        <FadeText>
          Agustus membawa momen yang diam-diam paling menyentuh hati. Setelah kencan malam, Aisyah mengantarkan Ridho sampai depan kos lalu berdiri mendengarkan suara motor Ridho yang makin lama makin jauh, sampai benar-benar hilang. Baru setelah itu dia masuk ke dalam.
        </FadeText>
        <FadeText delay={0.15}>
          Aisyah chat, "sedihnya nahh, aku dengerin suara motormu sampee hilang baru aku masuk kos." Ridho yang baca pesan itu langsung terdiam sebentar, terharu. Dia balas, "ya allah beb, sedih banget, maaf ya malah aku becandain tadi."
        </FadeText>
        <FadeText delay={0.3}>
          Di bulan ini pula ada kelucuan soal foto berdua yang kurang memuaskan — Ridho niat ganti momen foto dengan "aku cubit pipi kamu aja." Delapan bulan bersama, setiap perpisahan selalu terasa terlalu cepat.
        </FadeText>
      </StoryContainer>

      {/* BULAN 9 - Agustus-September 2026 */}
      <StoryContainer
        subtitle="Bulan 9 • September 2026"
        title="Alarm Cinta & Ulang Tahun Sayang"
        icon={Cake}
        chapterIndex={8}
        isReversed={false}
      >
        <FadeText>
          Memasuki bulan kesembilan, Aisyah sudah resmi jadi "alarm hidup" Ridho yang paling reliable. Di pagi hari, Aisyah nelpon diam-diam buat bangunin Ridho sambil dirinya sendiri hampir ketiduran lagi. Lucu, tapi tulus banget.
        </FadeText>
        <FadeText delay={0.15}>
          Sesibuk apapun jadwal KKN masing-masing, selalu ada waktu untuk bilang "sayang kamu hari ini dan setiap hari." Dari urusan nugas, persiapan KKN, sampai hal-hal kecil seperti kabar "udah makan belum" — semua terasa hangat karena ada satu orang yang selalu diprioritaskan.
        </FadeText>
        <FadeText delay={0.3}>
          Dan hari ini, di hari ulang tahunmu, Ridho cuma mau bilang satu hal: Terima kasih sudah ada. Terima kasih sudah mau jadi bagian dari hidup yang berantakan ini. Kamu adalah alasan terbaik untuk tetap semangat setiap harinya. Happy Birthday, sayang.
        </FadeText>
      </StoryContainer>

      {/* AUTO-SCROLLING MARQUEE GALLERY */}
      <AutoScrollGallery />

    </section>
  );
};

export default LoveStory;
