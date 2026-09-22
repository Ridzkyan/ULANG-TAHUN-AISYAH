import { motion } from 'framer-motion';

const photos = [
  {
    id: 12,
    url: '/foto/12.webp',
    caption: 'Tersenyum Manis!',
    rotation: -4,
  },
  {
    id: 34,
    url: '/foto/34.webp',
    caption: 'Kita Berdua',
    rotation: 3,
  },
  {
    id: 42,
    url: '/foto/59.webp',
    caption: 'Paling Lucu!',
    rotation: -2,
  },
];

// Landscape IDs (W > H based on ffmpeg analysis)
const LANDSCAPE_IDS = new Set([1,3,4,5,6,7,8,9,14,16,18,19,21,22,23,28,29,31,39,41,42,43,44,45,46,47,49,50,51,52,53,54,55,61,62,63,64,65,66,68,69,70,71,72,73,74,75,76,77,78,79,80]);

const PolaroidGallery = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 my-16 px-4">
      {photos.map((photo, index) => {
        const isLandscape = LANDSCAPE_IDS.has(parseInt(photo.url.match(/\/foto\/(\d+)\.webp/)[1]));
        return (
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
          className={`bg-white p-4 pb-12 rounded-lg shadow-2xl relative flex-shrink-0 cursor-pointer border border-gray-100 ${
            isLandscape ? 'w-80 h-64' : 'w-64 h-80'
          }`}
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
      )})}
    </div>
  );
};

export default PolaroidGallery;
