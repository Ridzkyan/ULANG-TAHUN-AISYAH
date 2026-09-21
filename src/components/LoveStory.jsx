import { motion } from 'framer-motion';
import { Cat, Gamepad2, Baby, Coffee, Heart, Phone, Sparkles, CloudRain, Star, Cake } from 'lucide-react';

const storyPhotos = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  url: `https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=300&h=${300 + (i % 3) * 50}`, 
}));

const PhotoGrid = ({ startIndex, endIndex }) => {
  const photos = storyPhotos.slice(startIndex, endIndex);
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {photos.map((photo, i) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`rounded-[2rem] overflow-hidden shadow-lg border-[4px] border-white/70 bg-gray-200 ${i === 0 ? 'row-span-2 col-span-2 h-48 md:h-64' : 'h-24 md:h-32'}`}
        >
          <img src={photo.url} alt={`Kenangan ${photo.id}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
        </motion.div>
      ))}
    </div>
  );
};

const FadeText = ({ children, delay = 0, className = "" }) => (
  <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className={`leading-relaxed text-gray-700 text-[1.05rem] md:text-[1.1rem] font-sans tracking-wide mb-4 ${className}`}
  >
    {children}
  </motion.p>
);

const StoryContainer = ({ title, subtitle, children, icon: Icon = Cat, photos, isReversed = false }) => (
  <div className="mb-32 relative">
    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-[120%] bg-gradient-to-b from-transparent via-pink-200 to-transparent -z-10" />

    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
    >
      <div className="w-full md:w-1/2 relative">
        <div className="bg-white/90 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-[6px] border-white/80 backdrop-blur-md relative z-10">
          
          <div className={`absolute -top-10 ${isReversed ? 'md:-right-6 right-1/2 translate-x-1/2 md:translate-x-0' : 'md:-left-6 left-1/2 -translate-x-1/2 md:translate-x-0'} bg-gradient-to-br from-pink-100 to-pink-300 p-5 rounded-full shadow-xl border-4 border-white text-pink-500`}>
            <Icon size={36} />
          </div>
          
          <div className="mt-8 mb-8 text-center md:text-left">
            <h3 className="text-sm md:text-sm font-bold text-pink-400 uppercase tracking-[0.3em] mb-2">{subtitle}</h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-sans leading-tight">
              {title}
            </h2>
          </div>
          
          <div className="text-justify md:text-left">
            {children}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className={`${isReversed ? 'md:pr-8' : 'md:pl-8'}`}>
          {photos}
        </div>
      </div>
    </motion.div>
  </div>
);

const LoveStory = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-24 px-4 relative z-10">
      
      {/* BULAN 1 */}
      <StoryContainer subtitle="Bulan 1 • Desember 2025" title="Sapaan Subuh Bikin Baper" icon={Gamepad2} photos={<PhotoGrid startIndex={0} endIndex={5} />} isReversed={false}>
        <FadeText>
          Lucu ya kalau dipikir-pikir lagi. Cerita kita nggak dimulai dari adegan tabrakan di perpus atau tatap-tatapan romantis di kafe kayak di film-film. Semuanya berawal dari chat super kepagian di jam 04:49 subuh!
        </FadeText>
        <FadeText delay={0.2}>
          "Assalamu'alaikum, ini Ridho temannya Sepa..." ketikku pagi itu, sambil nahan ngantuk berat. Niatku waktu itu polos banget, sumpah. Cuma mau nanya tugas bikin game dan pusing ngurusin kode gratisan yang mentok cuma 40 baris. 
        </FadeText>
        <FadeText delay={0.4}>
          Tapi ternyata, takdir punya rencananya sendiri. Kode aplikasinya boleh aja mentok di 40 baris, tapi rasa penasaranku ke kamu malah jalan terus tanpa henti. Dari sekadar ngobrolin tugas, malah keterusan ngobrolin keseharian.
        </FadeText>
      </StoryContainer>

      {/* BULAN 2 */}
      <StoryContainer subtitle="Bulan 2 • Januari 2026" title="Kang Joki & Calon Anak Kita" icon={Baby} photos={<PhotoGrid startIndex={5} endIndex={10} />} isReversed={true}>
        <FadeText>
          Masuk ke bulan kedua, kita makin akrab. Kamu mulai nggak canggung buat curhat. Terutama soal betapa capeknya kamu ngajar anak-anak kecil. 
        </FadeText>
        <FadeText delay={0.2}>
          "Susahnya ngajarin anak tuh, kek apa coba umiku ngajarin aku sampai bisa kek sekarang," keluhmu malam itu. Karena aku ini cowok yang sigap, aku langsung kasih jurus maut: "Banyakin belajar sayang, nanti buat anak-anak kita kelak... aku juga ikut belajar jadinya nih."
        </FadeText>
        <FadeText delay={0.4}>
          Kamu cuma balas pakai emoji nangis bombay. Tapi aku yakin seratus persen, di balik layar HP kamu pasti lagi senyum-senyum salah tingkah kan? Ngaku aja deh! Sejak saat itu, panggilan sayang dan candaan soal masa depan jadi obrolan favorit kita berdua.
        </FadeText>
      </StoryContainer>

      {/* BULAN 3 */}
      <StoryContainer subtitle="Bulan 3 • Februari 2026" title="Sahur & Cemburu Sama Capybara" icon={Coffee} photos={<PhotoGrid startIndex={10} endIndex={15} />} isReversed={false}>
        <FadeText>
          Di bulan ketiga, kita makin nggak bisa lepas dari telponan. Main Roblox atau sekadar main catur jadi andalanku buat nemenin kamu begadang. Aku masih ingat pas aku harus pamit tidur duluan jam 12 malam karena mau siap-siap sahur sama ibu kos.
        </FadeText>
        <FadeText delay={0.2}>
          Nah, momen paling epik terjadi waktu kamu ke mal. Tiba-tiba kamu kirim foto lagi meluk boneka gede banget. Terus dengan pedenya kamu nanya, "Lucuan mana, aku atau boneka Capybara?"
        </FadeText>
        <FadeText delay={0.4}>
          Sebagai pacar yang peka, aku langsung jawab tegas: "Ribuan Capybara nggak bakal bisa ngalahin imutnya kamu, kamu mah 1000/10 lucunya!" Walau di chat kamu sok-sokan biasa aja, aku tahu hati kamu pasti lagi meleyot berjamaah!
        </FadeText>
      </StoryContainer>

      {/* BULAN 4 */}
      <StoryContainer subtitle="Bulan 4 • Maret 2026" title="Tiga Puluh Menit yang Bikin Meleyot" icon={Heart} photos={<PhotoGrid startIndex={15} endIndex={20} />} isReversed={true}>
        <FadeText>
          Akhirnya kita bisa sering ketemu juga. Jarak bukan lagi masalah buat kita. Malam itu, sehabis nganterin kamu pulang, tiba-tiba kamu nge-chat, "Sayang udah sampai kos?" 
        </FadeText>
        <FadeText delay={0.2}>
          Pertanyaan itu bikin aku sadar, kita berdua baru aja berdiri matung di depan kosanmu selama 30 menit penuh! Cuma karena nggak ada yang mau pulang duluan. "Lebih itu yakin aku," balasku sambil senyum-senyum sendiri.
        </FadeText>
        <FadeText delay={0.4}>
          Pegal di kaki nggak ada rasanya dibanding senengnya habis meluk kamu. Saking gemasnya, aku sampai ngetik, "Ciumable banget pipimu." Terus kamu protes, "Emang kamu aja yang suka cium-cium!" Hahaha, ya mau gimana lagi? Kan pipimu emang gemesin maksimal!
        </FadeText>
      </StoryContainer>

      {/* BULAN 5 */}
      <StoryContainer subtitle="Bulan 5 • April 2026" title="Kejutan Tiba-Tiba di Depan Kos" icon={Cat} photos={<PhotoGrid startIndex={20} endIndex={25} />} isReversed={false}>
        <FadeText>
          Bulan April dipenuhi hal-hal spontan yang seru. Waktu itu maghrib mau habis, dan kamu bawel banget nge-chat nyuruh aku sholat. "Sayang bangunnn! Isya lohhh!" spam chat-mu bertubi-tubi.
        </FadeText>
        <FadeText delay={0.2}>
          Setelah sholat, aku iseng ngetik, "Otw sayang." Nggak lama setelah itu, aku ketik lagi, "Di depan sayang."
        </FadeText>
        <FadeText delay={0.4}>
          "Makk tiba-tiba di depan! Bentar aku pake baju dulu," panikmu lucu banget. Mengagetkanmu dan muncul tiba-tiba di depan kosanmu tuh udah jadi hobi baruku. Ekspresi kagetmu selalu bikin aku ketawa dan makin sayang.
        </FadeText>
      </StoryContainer>

      {/* BULAN 6 */}
      <StoryContainer subtitle="Bulan 6 • Mei 2026" title="Drama Telepon & Cemburu Tipis" icon={Phone} photos={<PhotoGrid startIndex={25} endIndex={30} />} isReversed={true}>
        <FadeText>
          Ternyata seorang Ridho bisa cemburu juga lho. Ada momen pas kita lagi asyik, tiba-tiba ada nomor nelpon kamu. Jiwa overthinking-ku langsung meronta. 
        </FadeText>
        <FadeText delay={0.2}>
          "Ngapain lagi orang ini nelpon? Angkat, urgent itu," ketikku, sok-sokan cuek padahal aslinya ketar-ketir nunggu jawaban.
        </FadeText>
        <FadeText delay={0.4}>
          Tapi emang dasar Aisyah, kamu selalu punya cara buat bikin aku lega. "Ga mauuu, aku ga suka dia nelpon-nelpon aku. Ga ku angkattt. Udah bobo aja sayang," balasmu. Wah, detik itu juga, egoku sebagai cowok langsung terselamatkan. Kamu paling jago deh bikin aku merasa jadi satu-satunya cowok di duniamu.
        </FadeText>
      </StoryContainer>

      {/* BULAN 7 */}
      <StoryContainer subtitle="Bulan 7 • Juni 2026" title="Si Imut dan Si Penurut" icon={Sparkles} photos={<PhotoGrid startIndex={30} endIndex={35} />} isReversed={false}>
        <FadeText>
          Makin kesini candaan kita makin absurd. Pernah suatu malam aku ngeledek, "Adeknya imut-imut, kakaknya amit-amit." Kamu nggak terima dan langsung ngegas, "Gak anjay aku ga amit-amit, aku IMUT IMUTTT!" 
        </FadeText>
        <FadeText delay={0.2}>
          Di bulan Juni ini juga kamu makin berani ngatur-ngatur lucu. "Kalau kamu ga nurut aku semisal aku kasi tau apapun itu..." ancammu sok galak.
        </FadeText>
        <FadeText delay={0.4}>
          Iya, sayangku. Aku bakal selalu nurut kok. Habisnya, tiap kali kamu manggil aku "pacar Ais", semua kata-kata bantahanku mendadak hilang terbang ke langit. Siap laksanakan perintah Bos Aisyah!
        </FadeText>
      </StoryContainer>

      {/* BULAN 8 */}
      <StoryContainer subtitle="Bulan 8 • Juli 2026" title="Hujan Deras & Jamu Bima" icon={CloudRain} photos={<PhotoGrid startIndex={35} endIndex={40} />} isReversed={true}>
        <FadeText>
          Juli sering banget hujan deras. Waktu itu jam setengah dua pagi, kamu kebangun karena suara hujan yang ribut banget di atap kos. "Hujan derasss sayang," lapor-mu pakai nada manja andalan.
        </FadeText>
        <FadeText delay={0.2}>
          Sebagai pacar yang siaga 24/7, aku langsung nemenin kamu telponan. Dari mulai bahas kamu yang minum jamu Bima buat begadang, sampai cerita takut pulang ke kosan gara-gara malam. 
          Meski jauh, aku selalu pengen mastiin kamu aman dan ngerasa ditemenin. Nemenin malam hujanmu sampai kamu ketiduran, lalu ngucapin "Good night sayangku cintaku, i love you", udah jadi rutinitas wajib yang nggak bakal pernah aku lewatin sehari pun.
        </FadeText>
      </StoryContainer>

      {/* BULAN 9 */}
      <StoryContainer subtitle="Bulan 9 • Agustus 2026" title="Sibuk KKN Tapi Tetep Bucin" icon={Star} photos={<PhotoGrid startIndex={40} endIndex={45} />} isReversed={false}>
        <FadeText>
          Masuk bulan kesembilan, kita mulai sama-sama sibuk ngurusin persiapan KKN. Walaupun kita makin sering ngerasain kangen karena sibuk nugas masing-masing.
          Tapi setiap ada waktu kosong, kita selalu usahain buat ngabarin dan ketawa bareng lagi. Masa-masa sibuk ini malah bikin kita makin sadar kalau kita beneran butuh satu sama lain.
        </FadeText>
        <FadeText delay={0.2}>
          Tapi sesibuk apa pun jadwal kita, selalu ada waktu luang buat bilang, "Aku sayang kamu hari ini dan setiap hari." 
        </FadeText>
        <FadeText delay={0.4}>
          Perlahan tapi pasti, nama kamu di HP-ku berevolusi jadi "Aisyah Cantik Blubub Blubub 🐋🤍". Sembilan bulan itu waktu yang lumayan lama, tapi kerasa cepet banget kilat kalau dilewati bareng kamu.
        </FadeText>
      </StoryContainer>

      {/* BULAN 10 */}
      <StoryContainer subtitle="Bulan 10 • September 2026" title="Selamat Ulang Tahun, Semestaku" icon={Cake} photos={<PhotoGrid startIndex={45} endIndex={50} />} isReversed={true}>
        <FadeText>
          Akhirnya kita sampai di hari yang paling spesial. September 2026. Bulan di mana perempuan paling cantik dan bawel kesayanganku ini berulang tahun.
        </FadeText>
        <FadeText delay={0.2}>
          Kalau aku inget-inget lagi semua chat dan obrolan kita dari awal kenal, aku sadar satu hal: jatuh cinta sama kamu tuh gampang banget, senatural napas aja. Dan bertahan sama kamu adalah pilihan terbaik yang pernah aku buat.
        </FadeText>
        <FadeText delay={0.4}>
          Selamat ulang tahun, Aisyah Nadilla. Perjalanan yang dimulai dari nugas bikin game ini, nggak bakal pernah ada kata Game Over-nya. Kita bakal terus nambah level baru, bulan demi bulan, sampai waktu capek ngitungnya.
        </FadeText>
        <FadeText delay={0.6} className="text-center md:text-left font-bold text-2xl text-pink-500 mt-10 font-sans">
          Aku sayang kamu banget. ❤️<br/>
          <span className="text-lg text-gray-500 mt-2 block font-normal italic">- Pacarmu, Ridho -</span>
        </FadeText>
      </StoryContainer>

    </div>
  );
};

export default LoveStory;
