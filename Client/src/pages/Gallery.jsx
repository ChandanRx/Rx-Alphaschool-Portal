import React, { useState } from "react";
import { 
  Calendar, 
  Images, 
  Trophy, 
  MapPin, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Sports", "Cultural", "Academic", "Events", "Clubs"];

const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

const featuredMoment = {
  id: "featured-1",
  category: "Sports",
  date: "March 15, 2024",
  title: "Inter-University Football Finals",
  description: "An unforgettable showdown of skill, teamwork and determination on the grand stage.",
  location: "Main Ground",
  photoCount: 24,
  coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
  photos: [
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80"
  ]
};

const momentsData = [
  {
    id: 1,
    title: "Annual Cultural Fest",
    category: "Cultural",
    date: "Jan 28, 2024",
    photoCount: 42,
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 2,
    title: "Science Exhibition",
    category: "Academic",
    date: "Feb 10, 2024",
    photoCount: 18,
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 3,
    title: "Inter-School Basketball",
    category: "Sports",
    date: "Dec 12, 2023",
    photoCount: 32,
    coverImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 4,
    title: "Clubs & Communities",
    category: "Clubs",
    date: "Nov 5, 2023",
    photoCount: 26,
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 5,
    title: "Foundation Day",
    category: "Events",
    date: "Oct 2, 2023",
    photoCount: 38,
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 6,
    title: "Achievements",
    category: "Events",
    date: "Sep 18, 2023",
    photoCount: 15,
    isTall: true,
    coverImage: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 7,
    title: "Sports Day",
    category: "Sports",
    date: "Aug 20, 2023",
    photoCount: 28,
    coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 8,
    title: "Academic Activities",
    category: "Academic",
    date: "Jul 14, 2023",
    photoCount: 20,
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const filteredMoments = activeCategory === "All"
    ? momentsData
    : momentsData.filter(item => item.category === activeCategory);

  const openLightbox = (album, index = 0) => {
    setSelectedAlbum(album);
    setPhotoIndex(index);
  };

  const nextPhoto = () => {
    if (selectedAlbum) {
      setPhotoIndex((prev) => (prev + 1) % selectedAlbum.photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedAlbum) {
      setPhotoIndex((prev) => (prev - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length);
    }
  };

  return (
    <section className="min-h-screen pt-[14vh] pb-16 px-4 sm:px-6 md:px-12 font-poppins bg-[#f9faf7] dark:bg-[#090908] text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <motion.div 
        className="max-w-7xl mx-auto space-y-10"
        variants={staggerParent}
        initial="hidden"
        animate="visible"
      >

        {/* Subtitle & Header with Fade Up */}
        <motion.div className="text-center space-y-4" variants={fadeUp}>
          <p className="text-xs sm:text-sm font-medium tracking-wide text-gray-600 dark:text-gray-400">
            Moments, memories & milestones from AlphaSchool
          </p>

          {/* Category Filter Pills with Navbar Hover & Spring Animations */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className={`px-5 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
                    isActive
                      ? "bg-[#65b32e] dark:bg-[#FFFC30] text-white dark:text-gray-950 shadow-md font-bold"
                      : "bg-white dark:bg-[#181816] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#242420] border border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Featured Moment Hero Card */}
        {(activeCategory === "All" || activeCategory === "Sports") && (
          <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-[#141412] rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800/80 p-4 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Left Image Section */}
            <motion.div 
              className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => openLightbox(featuredMoment)}
            >
              <img
                src={featuredMoment.coverImage}
                alt={featuredMoment.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

              {/* Date Badge Top Left */}
              <div className="absolute top-4 left-4 bg-[#65b32e] dark:bg-[#FFFC30] text-white dark:text-gray-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                <Calendar className="w-3.5 h-3.5" />
                <span>{featuredMoment.date}</span>
              </div>

              {/* Photo Count Badge Bottom Left */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10">
                <Images className="w-3.5 h-3.5" />
                <span>{featuredMoment.photoCount} Photos</span>
              </div>
            </motion.div>

            {/* Right Content Section */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 px-2 sm:px-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#65b32e] dark:text-[#FFFC30]">
                FEATURED MOMENT
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {featuredMoment.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {featuredMoment.description}
              </p>

              {/* Metadata Icons Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-600 dark:text-gray-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#65b32e] dark:text-[#FFFC30]" />
                  <span>{featuredMoment.category}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#65b32e] dark:text-[#FFFC30]" />
                  <span>{featuredMoment.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Images className="w-4 h-4 text-[#65b32e] dark:text-[#FFFC30]" />
                  <span>{featuredMoment.photoCount} Photos</span>
                </div>
              </div>

              {/* CTA Button with Form Button Micro-Interactions */}
              <div className="pt-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  onClick={() => openLightbox(featuredMoment)}
                  className="bg-[#1c3311] dark:bg-[#FFFC30] hover:bg-[#2b4c1b] dark:hover:bg-yellow-300 text-white dark:text-gray-950 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow-md hover:gap-3"
                >
                  <span>View Event Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Our Moments Section */}
        <motion.div className="space-y-6 pt-4" variants={fadeUp}>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Our <span className="text-[#65b32e] dark:text-[#FFFC30]">Moments</span>
            </h3>

            <motion.a 
              href="#moments-grid" 
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Relive the memories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Bento Grid Layout */}
          <div id="moments-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredMoments.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={fadeUp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  onClick={() => openLightbox(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800/80 ${
                    item.isTall ? "lg:row-span-2 min-h-[360px] sm:min-h-[420px]" : "h-60 sm:h-64"
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                  {/* Top-Left Date Badge */}
                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                    <Calendar className="w-3 h-3 text-[#65b32e] dark:text-[#FFFC30]" />
                    <span>{item.date}</span>
                  </div>

                  {/* Bottom Text & Photo Count */}
                  <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-2">
                    <h4 className="text-white font-bold text-base sm:text-lg leading-snug drop-shadow-md group-hover:text-[#FFFC30] transition-colors">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-1 text-white/90 text-xs font-medium whitespace-nowrap bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                      <Images className="w-3.5 h-3.5" />
                      <span>{item.photoCount} Photos</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Modal Header */}
            <div className="w-full max-w-5xl flex items-center justify-between text-white pt-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold">{selectedAlbum.title}</h3>
                <p className="text-xs text-gray-400">{selectedAlbum.date} • Photo {photoIndex + 1} of {selectedAlbum.photos.length}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedAlbum(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Modal Main Image & Nav Controls */}
            <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden">
              <motion.img
                key={photoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                src={selectedAlbum.photos[photoIndex]}
                alt={selectedAlbum.title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Prev Button */}
              {selectedAlbum.photos.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevPhoto}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              )}

              {/* Next Button */}
              {selectedAlbum.photos.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextPhoto}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all border border-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              )}
            </div>

            {/* Modal Footer Thumbnails */}
            {selectedAlbum.photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-md pb-2">
                {selectedAlbum.photos.map((photo, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPhotoIndex(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      idx === photoIndex ? "border-[#FFFC30] scale-110" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
