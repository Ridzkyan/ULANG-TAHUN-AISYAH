import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cat, Gamepad2, Coffee, Heart, Phone, Sparkles, CloudRain, Star, Lock, Cake, MapPin } from 'lucide-react';

// Photos 1-80 are actual WebP photos from /foto/
// We distribute ~8-9 photos per chapter (9 chapters)
const chapterPhotos = [
  [1,2,3,4,5,6,7,8],          // Bulan 1  (Dec 2025)
  [9,10,11,12,13,14,15,16],   // Bulan 2  (Jan 2026)
  [17,18,19,20,21,22,23,24],  // Bulan 3  (Feb 2026)
  [25,26,27,28,29,30,31,32],  // Bulan 4  (Mar 2026)
  [33,34,35,36,37,38,39,40],  // Bulan 5  (Apr 2026)
  [41,42,43,44,45,46,47,48],  // Bulan 6  (May 2026)
  [49,50,51,52,53,54,55,56],  // Bulan 7  (Jun 2026)
  [57,58,59,60,61,62,63,64],  // Bulan 8  (Jul 2026)
  [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80], // Bulan 9 (Aug-Sep 2026)
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
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
  }, []);

  // Use a selection of photos, duplicated for infinite scroll seamless effect
  const allPhotos = Array.from({length: 80}, (_, i) => i + 1);
  // Randomly shuffle photos for this gallery so it's a fun mix
  const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
  const displayPhotos = [...shuffled, ...shuffled];

  return (
    <div className="w-full mt-10 mb-10 overflow-hidden relative">
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
            <div key={`${id}-${index}`} className="w-48 h-64 md:w-64 md:h-80 flex-shrink-0 rounded-[2rem] overflow-hidden shadow-lg border-[6px] border-white/90 bg-pink-50 relative group">
              <img
                src={`/foto/${id}.webp`}
                alt={`Kenangan acak ${id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              {/* Optional overlay effect on hover */}
              <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
        title="Dari Kang Joki ke Kang Bucin"
        icon={Gamepad2}
        chapterIndex={0}
        isReversed={false}
      >
        <FadeText>
          Semuanya dimulai dari sebuah chat di subuh hari, jam 04.49. Ridho yang baru kenal Aisyah lewat teman, iseng nge-chat buat nanya soal game Construct yang lagi dikerjain bersama. Siapa sangka, dari pertanyaan soal batas 40 event sheet, berujung chat marathon sampai dini hari.
        </FadeText>
        <FadeText delay={0.15}>
          Ridho dengan gagahnya menawarkan diri jadi "kang joki VIP" gratis. Aisyah yang awalnya malu-malu, pelan-pelan mulai nyaman berbagi cerita. Dari urusan game yang ribet, nyambung ke candaan, sampai Ridho bilang dia "rugi" bantuin tapi sebenernya dia yang paling semangat.
        </FadeText>
        <FadeText delay={0.3}>
          Satu bulan penuh ngerjain game bareng, ketawa-ketawa soal event sheet yang penuh batas, dan tanpa sadar Ridho sudah mulai nungguin chat dari Aisyah. Awal yang sederhana banget, tapi dari sinilah semuanya dimulai.
        </FadeText>
      </StoryContainer>

      {/* BULAN 2 - Januari 2026 */}
      <StoryContainer
        subtitle="Bulan 2 • Januari 2026"
        title="PDKT Subuh & Candaan yang Baper"
        icon={Coffee}
        chapterIndex={1}
        isReversed={true}
      >
        <FadeText>
          Memasuki Januari, frekuensi chatnya makin sering dan makin ga nyambung sama game. Mulai ngomongin kehidupan sehari-hari, bahas soal nikah muda yang tiba-tiba muncul di obrolan tengah malam, sampai Ridho yang mulai berani kirim sticker sayang-sayangan.
        </FadeText>
        <FadeText delay={0.15}>
          Ada satu momen lucu — Ridho yang biasanya sok cool malah jadi yang paling nunggu balesan. Kalau Aisyah telat balas, dia langsung kirim tanda tanya berderet. Dan kalau Aisyah balas panjang, dia makin semangat ngebalesnya sampai subuh.
        </FadeText>
        <FadeText delay={0.3}>
          Di bulan ini Ridho mulai sadar — ini bukan lagi sekadar teman ngerjain tugas. Perasaan yang tumbuh pelan-pelan tapi susah dibendung, dan setiap chat Aisyah jadi hal pertama yang dicari setiap pagi.
        </FadeText>
      </StoryContainer>

      {/* BULAN 3 - Februari 2026 */}
      <StoryContainer
        subtitle="Bulan 3 • Februari 2026"
        title="Resmi Jadi Milik Satu Sama Lain"
        icon={Heart}
        chapterIndex={2}
        isReversed={false}
      >
        <FadeText>
          Februari adalah bulan bersejarah. Setelah hampir dua bulan jadi teman yang "lebih dari teman", akhirnya Ridho resmi meminta Aisyah jadi pacarnya. Kata-kata "sayang" yang tadinya masih canggung, kini keluar alami seperti sudah terbiasa sejak lama.
        </FadeText>
        <FadeText delay={0.15}>
          Di awal bulan ini, mereka sudah saling manggil "sayang" dan "beb" dengan santainya. Malam-malam begadang bareng via telpon jadi ritual wajib. Aisyah yang lagi istirahat dari nugas malah jadi curhat session sama Ridho, dari nonton TikTok bareng sampai cerita nggak penting yang justru paling diinget.
        </FadeText>
        <FadeText delay={0.3}>
          Bulan ini Ridho resmi jadi pacar Aisyah — dan sejak saat itu, tidak ada hari tanpa "lopyu sayang" sebelum tidur.
        </FadeText>
      </StoryContainer>

      {/* BULAN 4 - Maret 2026 */}
      <StoryContainer
        subtitle="Bulan 4 • Maret 2026"
        title="30 Menit Matung di Depan Kos"
        icon={MapPin}
        chapterIndex={3}
        isReversed={true}
      >
        <FadeText>
          Maret datang bersama momen yang sampai sekarang masih sering jadi bahan ketawa — momen legendaris "30 menit matung di depan kosan." Setelah kencan pertama, Ridho dan Aisyah sama-sama gamau pulang duluan. Akhirnya Ridho berdiri di depan kos hampir setengah jam, kaki pegal, tapi tetap ga mau gerak.
        </FadeText>
        <FadeText delay={0.15}>
          Aisyah yang cuci muka dulu baru bobo pun masih sempat kirim chat, "30 menit kita di depan yang," dengan nada manja yang langsung bikin Ridho klepek-klepek. Ridho cuma bisa balas, "lebih itu yakin aku," sambil ngaku pipi Aisyah ciumable banget dan gamau beranjak.
        </FadeText>
        <FadeText delay={0.3}>
          Dari momen ini juga lahir candaan soal "pelukan di kasur" yang langsung dibalas Aisyah dengan deretan emoji nangis. Bulan penuh momen lucu yang selalu dikenang.
        </FadeText>
      </StoryContainer>

      {/* BULAN 5 - April 2026 */}
      <StoryContainer
        subtitle="Bulan 5 • April 2026"
        title="I Love You di Jalanan Malam"
        icon={Sparkles}
        chapterIndex={4}
        isReversed={false}
      >
        <FadeText>
          April adalah bulan romantis versi Ridho dan Aisyah — versi yang nyata, bukan dari film. Ridho yang lagi otw ke tempat teman malam-malam tiba-tiba kirim, "aku otw tempat padil sayang, I LOVE YOUUU!" dengan deretan emoji hati.
        </FadeText>
        <FadeText delay={0.15}>
          Aisyah yang tahu Ridho biasanya cool dan malu-maluan, langsung balas "LOVE YOU TOO" dengan semangat. Teman-teman Ridho yang udah nunggu dari tadi langsung nyosor, nanya kenapa telat. Ridho ngaku dengan polos, "deg-degan," sampai temannya ketawa.
        </FadeText>
        <FadeText delay={0.3}>
          Bulan ini penuh momen kecil yang hangat — dari chat "hati-hati" di malam hari, sampai tawa bareng soal hal-hal random yang cuma mereka yang ngerti. Cinta yang sudah makin nyaman, makin dalam.
        </FadeText>
      </StoryContainer>

      {/* BULAN 6 - Mei 2026 */}
      <StoryContainer
        subtitle="Bulan 6 • Mei 2026"
        title="Imut Itu Aisyah, Bukan Adek!"
        icon={Star}
        chapterIndex={5}
        isReversed={true}
      >
        <FadeText>
          Mei penuh dengan candaan segar khas mereka. Di satu momen malam, Ridho iseng nyeletuk soal adiknya yang imut dan lucu. Aisyah yang mendengar langsung protes keras, "gaa anjay aku ga amit amit, aku IMUT IMUTTT!" dengan huruf kapital penuh semangat.
        </FadeText>
        <FadeText delay={0.15}>
          Ridho tentu saja langsung ketawa dan ngaku kalau Aisyah tetap yang paling dia sayang. Di bulan yang sama, kebiasaan mandi malam dan telponan sampai jam 1 pagi sudah jadi rutinitas tetap — Aisyah cerita soal hari-harinya, Ridho dengerin sambil senyum-senyum sendiri.
        </FadeText>
        <FadeText delay={0.3}>
          Ada juga candaan soal Ridho yang "pengen nongkrong tapi harus pulang cepat" karena Aisyah sudah nunggu kabar. Enam bulan bersama, dan rasanya makin sulit untuk tidak saling kangen.
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
          Di bulan ketujuh, ada momen yang bikin hati hangat banget. Jam 12 malam, Aisyah tiba-tiba kebangun karena suara hujan deras yang ribut di atap kos. Langsung chat Ridho, "hujan deras sayang." Dan Ridho yang dari tadi sudah bilang "kalau kebangun, telpon aja kamar ku sepi," langsung angkat telpon.
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
