import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, MapPin, Film, UtensilsCrossed, IceCream, ShoppingBag, Moon, Heart } from 'lucide-react';

const couponsData = [
  { id: 1, title: "Jalan Keliling Samarinda", desc: "Klaim kupon ini buat muter-muter Samarinda sepuasnya bareng aku tanpa tujuan pasti!", icon: MapPin, color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: 2, title: "Nonton Bioskop", desc: "Aisyah bebas pilih film apa aja! Horor, romantis, atau action, aku temenin sampai selesai.", icon: Film, color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: 3, title: "Makan Sate", desc: "Lapar tengah malam? Pakai kupon ini buat diculik makan sate enak kesukaan kita.", icon: UtensilsCrossed, color: "bg-orange-50 text-orange-600 border-orange-200" },
  { id: 4, title: "Makan Es Krim", desc: "Klaim untuk 1 porsi es krim rasa apa saja! Biar mood Aisyah manis lagi seharian.", icon: IceCream, color: "bg-pink-50 text-pink-600 border-pink-200" },
  { id: 5, title: "Keliling Mall", desc: "Siap jadi *bodyguard* dan nemenin keliling mall seharian, mau belanja atau cuma *window shopping*.", icon: ShoppingBag, color: "bg-teal-50 text-teal-600 border-teal-200" },
  { id: 6, title: "Bobo Sama Aku", desc: "Kupon spesial buat dipeluk erat-erat sampai ketiduran dengan nyenyak. ❤️", icon: Moon, color: "bg-red-50 text-red-600 border-red-200" },
];

const DateCoupons = () => {
  const handleClaim = (title) => {
    const phoneNumber = "6282251409098";
    const message = encodeURIComponent(`Halo Sayang! Aku mau klaim kupon *${title}* nih! 🥰🎟️`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-32 px-4 relative z-10">
      <div className="absolute top-1/2 left-0 text-pink-200 opacity-30 -translate-x-10"><Ticket size={120} /></div>
      <div className="absolute top-1/4 right-0 text-pink-200 opacity-30 translate-x-10 rotate-45"><Heart size={80} /></div>

      <div className="text-center mb-16 relative z-10">
        <h3 className="text-sm md:text-base font-extrabold text-pink-400 uppercase tracking-widest mb-2">Spesial Untukmu</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 font-sans">
          <Ticket className="text-pink-500" size={36} /> Buku Kupon Bucin <Ticket className="text-pink-500" size={36} />
        </h2>
        <p className="text-gray-500 mt-4 font-medium text-lg">Sentuh kuponnya untuk otomatis klaim hadiahmu ke WhatsApp-ku!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 relative z-10">
        {couponsData.map((coupon, index) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (index % 2) * 0.15, type: "spring", stiffness: 100, damping: 12 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClaim(coupon.title)}
            className={`p-0 rounded-[2rem] border-2 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-stretch cursor-pointer relative overflow-hidden bg-white group ${coupon.color.split(' ')[2]}`}
          >
            {/* Left side (Icon) */}
            <div className={`w-28 flex flex-col items-center justify-center border-r-2 border-dashed ${coupon.color}`}>
              <div className="bg-white p-4 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                <coupon.icon size={32} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">TICKET</span>
            </div>
            
            {/* Right side (Text) */}
            <div className="flex-1 py-6 px-6 relative bg-white">
              <h4 className={`font-extrabold text-xl md:text-2xl mb-2 font-sans ${coupon.color.split(' ')[1]}`}>{coupon.title}</h4>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">{coupon.desc}</p>
              
              {/* Fake barcode at the bottom */}
              <div className="mt-4 flex gap-1 items-end h-8 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="bg-gray-800" style={{ width: `${Math.random() * 4 + 1}px`, height: `${Math.random() * 60 + 40}%` }}></div>
                ))}
              </div>
            </div>

            {/* Ticket edge effect (The cutouts) */}
            <div className="absolute left-[7rem] top-0 -translate-y-1/2 w-8 h-8 bg-[var(--color-bg,white)] rounded-full border-b-2 border-dashed border-[inherit]"></div>
            <div className="absolute left-[7rem] bottom-0 translate-y-1/2 w-8 h-8 bg-[var(--color-bg,white)] rounded-full border-t-2 border-dashed border-[inherit]"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DateCoupons;
