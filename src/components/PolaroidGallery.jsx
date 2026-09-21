import { motion } from 'framer-motion';

const photos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1514050566906-8fb539d020d5?auto=format&fit=crop&q=80&w=400&h=400',
    caption: 'Tersenyum Manis!',
    rotation: -4,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400&h=400',
    caption: 'Waktu Main...',
    rotation: 3,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1498453472095-2c8c2270914c?auto=format&fit=crop&q=80&w=400&h=400',
    caption: 'Lucu Sekali!',
    rotation: -2,
  },
];

const PolaroidGallery = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 my-16 px-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: photo.rotation }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: index * 0.2,
            type: "spring",
          }}
          whileHover={{
            scale: 1.15,
            rotate: 0,
            zIndex: 50,
            transition: { type: "spring", stiffness: 300 }
          }}
          className="bg-white p-4 pb-12 rounded-lg shadow-2xl relative w-64 h-80 flex-shrink-0 cursor-pointer border border-gray-100"
        >
          {/* Photo area */}
          <div className="w-full h-full bg-gray-200 rounded overflow-hidden relative">
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Caption */}
          <div className="absolute bottom-4 w-full left-0 text-center">
            <p className="font-sans font-medium text-gray-700 text-lg">
              {photo.caption}
            </p>
          </div>
          {/* Pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-md shadow-red-400/50">
            <div className="w-2 h-2 rounded-full bg-red-300 absolute top-[2px] left-[2px]"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PolaroidGallery;
