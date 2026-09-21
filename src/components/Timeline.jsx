import { motion } from 'framer-motion';
import { CalendarHeart, MessageCircleHeart, PartyPopper } from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    title: "Pertama Ketemu",
    date: "Suatu hari yang indah...",
    desc: "Hari di mana duniaku berubah jadi lebih berwarna karena ada kamu.",
    icon: CalendarHeart,
  },
  {
    id: 2,
    title: "First Date",
    date: "Kencan pertama kita",
    desc: "Aku masih ingat senyum manismu hari itu, bikin aku makin jatuh cinta.",
    icon: MessageCircleHeart,
  },
  {
    id: 3,
    title: "Hari Ini!",
    date: "Ulang Tahun Aisyah",
    desc: "Selamat ulang tahun, sayang! Semoga ke depannya kita terus sama-sama ya.",
    icon: PartyPopper,
  }
];

const Timeline = () => {
  return (
    <div className="w-full max-w-lg mx-auto my-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">Perjalanan Kita 🚀</h2>
        <p className="text-gray-600 mt-2 font-medium">Beberapa momen yang nggak akan pernah aku lupakan.</p>
      </div>

      <div className="relative border-l-4 border-pink-300 ml-6 md:ml-12 pl-6 space-y-10">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative"
          >
            {/* Timeline Dot with Icon */}
            <div className="absolute -left-[46px] bg-white p-2 rounded-full border-4 border-pink-300 shadow-md text-pink-500">
              <event.icon size={24} />
            </div>

            {/* Content Card */}
            <div className="bg-white p-5 rounded-2xl shadow-lg border-2 border-pink-100">
              <span className="text-pink-500 font-bold text-sm bg-pink-100 px-3 py-1 rounded-full">{event.date}</span>
              <h3 className="text-xl font-bold text-gray-800 mt-3">{event.title}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
