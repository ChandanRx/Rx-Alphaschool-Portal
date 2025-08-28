import React from "react";
import { Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const images = [
  {
    src: "https://easternmirror-assets.s3.ap-south-1.amazonaws.com/images/2024/09/GHSS-Medziphema-King-David-win-in-inter-school-football-tourney.jpg",
    date: "March 15, 2024",
    event: "Inter-University Football Finals",
    description: "An unforgettable showdown of skill and determination on the grand stage."
  },
  {
    src: "https://media.istockphoto.com/id/508353741/photo/cricket-batsman-shot-from-behind-heading-out-to-bat.jpg?s=612x612&w=0&k=20&c=nwv2x-nin3fJAbn3wFTIn5cCsMBL1wBGp9O0--aAHW4=",
    date: "April 10, 2024",
    event: "State-Level Cricket Tournament",
    description: "Our players brought their A-game to secure a dominating victory."
  },
  {
    src: "https://thesportsschool.com/wp-content/uploads/2021/12/BB-Top-image-866x487-1.jpg",
    date: "May 22, 2024",
    event: "Annual Sports Meet – Basketball Finals",
    description: "Fast-paced, high-energy matches that kept the crowd on their feet."
  },
];

const Gallery = () => {
  return (
    <section className="min-h-screen px-6 mt-20 pt-[10vh] py-8 font-poppins bg-gray-100 dark:bg-[#101010] text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-[80%] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900 shadow-md mb-5">
            <Camera className="w-8 h-8 text-lime-700 dark:text-lime-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E4600] dark:text-[#FFFC30] tracking-tight">
            Gall
            <span className="bg-gradient-to-r from-lime-500 to-emerald-400 bg-clip-text text-transparent dark:from-yellow-400 dark:to-lime-400">
              ery
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
            Experience iconic memories from our university, school, and club events.<br />
            Every snapshot tells a story of passion, grit, and glory.
          </p>
          <div className="w-24 h-1 bg-lime-500 dark:bg-lime-400 rounded-full mt-6"></div>
        </div>


        <motion.div
          className="flex flex-col gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } } 
          }}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""} items-stretch rounded-2xl overflow-hidden shadow-xl bg-gray-50 dark:bg-black transition hover:shadow-2xl`}
            >
             
              <div className="md:w-1/2 relative">
                <img
                  src={img.src}
                  alt={img.event}
                  className="w-full h-72 md:h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-lime-600 text-white dark:bg-lime-400 dark:text-gray-900 px-4 py-2 rounded-tr-lg rounded-bl-lg shadow-lg font-bold">
                  {img.date}
                </div>
              </div>

          
              <div className="md:w-1/2 p-8 flex flex-col justify-center border-t-4 md:border-t-0 md:border-l-4 border-lime-500 dark:border-lime-400">
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-lime-400 mb-3">
                  {img.event}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {img.description || "This thrilling event captured unforgettable moments of teamwork, competition, and glory."}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
