import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  X, 
  LayoutGrid, 
  Trophy 
} from "lucide-react";
import { FaFootballBall, FaBasketballBall, FaVolleyballBall } from "react-icons/fa";
import { GiCricketBat, GiHockey, GiTennisRacket } from "react-icons/gi";
import { MdSportsGymnastics } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

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

const defaultEvents = [
  {
    id: "e1",
    sport: "Hockey",
    tagline: "Speed. Skill. Teamwork.",
    date: "31 Aug 2025",
    time: "10:00 AM",
    venue: "Hockey ground",
    description: "a friendly match between faculty in our hockey ground",
    watermark: "HOCKEY",
    icon: <GiHockey className="w-6 h-6 text-[#4E7031] dark:text-[#FFFC30]" />
  },
  {
    id: "e2",
    sport: "Cricket",
    tagline: "Strategy. Patience. Glory.",
    date: "29 Aug 2025",
    time: "12:00 AM",
    venue: "Gymkhana Ground",
    description: "a t20 match between two rival of our uni.",
    watermark: "CRICKET",
    icon: <GiCricketBat className="w-6 h-6 text-[#4E7031] dark:text-[#FFFC30]" />
  },
  {
    id: "e3",
    sport: "Football",
    tagline: "Play Hard. Dream Bigger.",
    date: "05 Sep 2025",
    time: "4:00 PM",
    venue: "Main Ground",
    description: "Inter-department football tournament",
    watermark: "FOOTBALL",
    icon: <FaFootballBall className="w-6 h-6 text-[#4E7031] dark:text-[#FFFC30]" />
  },
  {
    id: "e4",
    sport: "Basketball",
    tagline: "Fast. Furious. High-Flying.",
    date: "10 Sep 2025",
    time: "2:30 PM",
    venue: "Indoor Sports Complex",
    description: "Annual inter-college basketball championship knockout stage",
    watermark: "BASKETBALL",
    icon: <FaBasketballBall className="w-6 h-6 text-[#4E7031] dark:text-[#FFFC30]" />
  },
  {
    id: "e5",
    sport: "Volleyball",
    tagline: "Spike. Serve. Succeed.",
    date: "15 Sep 2025",
    time: "11:00 AM",
    venue: "Outdoor Court 2",
    description: "Women's league volleyball friendly matches",
    watermark: "VOLLEYBALL",
    icon: <FaVolleyballBall className="w-6 h-6 text-[#4E7031] dark:text-[#FFFC30]" />
  }
];

const categories = [
  { id: "All Sports", label: "All Sports", icon: <LayoutGrid className="w-4 h-4" /> },
  { id: "Football", label: "Football", icon: <FaFootballBall className="w-4 h-4" /> },
  { id: "Cricket", label: "Cricket", icon: <GiCricketBat className="w-4 h-4" /> },
  { id: "Basketball", label: "Basketball", icon: <FaBasketballBall className="w-4 h-4" /> },
  { id: "Hockey", label: "Hockey", icon: <GiHockey className="w-4 h-4" /> },
  { id: "Volleyball", label: "Volleyball", icon: <FaVolleyballBall className="w-4 h-4" /> },
  { id: "Badminton", label: "Badminton", icon: <GiTennisRacket className="w-4 h-4" /> },
  { id: "Athletics", label: "Athletics", icon: <MdSportsGymnastics className="w-4 h-4" /> }
];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("All Sports");
  const [eventsList, setEventsList] = useState(defaultEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchApiEvents = async () => {
      try {
        const res = await fetch("https://rx-alphaschool-portal.onrender.com/api/events");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((evt, idx) => {
            const sportName = evt.sport?.name || evt.sport || "Football";
            return {
              id: evt._id || `api-${idx}`,
              sport: sportName,
              tagline: evt.tagline || "Passion. Performance. Victory.",
              date: evt.date ? new Date(evt.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "TBA",
              time: evt.time || "10:00 AM",
              venue: evt.venue || "University Ground",
              description: evt.description || "Official tournament match.",
              watermark: sportName.toUpperCase(),
              icon: <Trophy className="w-6 h-6 text-[#4E7031] dark:text-[#FFFC30]" />
            };
          });
          setEventsList([...formatted, ...defaultEvents]);
        }
      } catch (err) {
        console.log("Using default events layout data:", err);
      }
    };
    fetchApiEvents();
  }, []);

  const filteredEvents = activeCategory === "All Sports"
    ? eventsList
    : eventsList.filter(item => item.sport.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="min-h-screen pt-[14vh] pb-16 px-4 sm:px-6 md:px-12 font-poppins bg-[#fdfdf0] dark:bg-[#090908] text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <motion.div 
        className="max-w-6xl mx-auto space-y-8"
        variants={staggerParent}
        initial="hidden"
        animate="visible"
      >

        {/* Top Sports Filter Tabs with Spring Micro-Interactions */}
        <motion.div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" variants={fadeUp}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap shadow-sm ${
                  isActive
                    ? "bg-[#4E7031] dark:bg-[#FFFC30] text-white dark:text-gray-950 shadow-md font-bold"
                    : "bg-white dark:bg-[#181816] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#242420] border border-gray-200/80 dark:border-gray-800"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Events Cards List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                variants={fadeUp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-white dark:bg-[#141412] rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800/90 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Top Banner Section */}
                <div className="p-5 sm:p-6 flex items-center justify-between relative overflow-hidden bg-[#f4f9ef] dark:bg-[#131d10]">
                  <div className="flex items-center gap-4 z-10">
                    {/* Transparent Icon Logo */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      {event.icon}
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E4600] dark:text-[#FFFC30]">
                        {event.sport}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-0.5">
                        {event.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Watermark Graphic Text */}
                  <div className="select-none font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-lime-900/10 dark:text-lime-300/10 uppercase z-0 font-poppins pr-4 pointer-events-none">
                    {event.watermark}
                  </div>
                </div>

                {/* Bottom Details Row */}
                <div className="p-5 sm:p-6 bg-white dark:bg-[#141412]">
                  {/* Desktop Table Headers */}
                  <div className="hidden md:grid grid-cols-12 gap-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-1">
                    <span className="col-span-2">DATE</span>
                    <span className="col-span-2">TIME</span>
                    <span className="col-span-3">VENUE</span>
                    <span className="col-span-3">DESCRIPTION</span>
                    <span className="col-span-2 text-right">ACTION</span>
                  </div>

                  {/* Details Row Data */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Date */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>

                    {/* Time */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    {/* Venue */}
                    <div className="col-span-1 md:col-span-3 flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <span>{event.venue}</span>
                    </div>

                    {/* Description */}
                    <div className="col-span-1 md:col-span-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-snug">
                      {event.description}
                    </div>

                    {/* Action Button with Form Button Micro-Interactions */}
                    <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end pt-2 md:pt-0">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 250, damping: 20 }}
                        onClick={() => setSelectedEvent(event)}
                        className="border border-[#4E7031] dark:border-[#FFFC30] text-[#2E4600] dark:text-[#FFFC30] hover:bg-[#4E7031] hover:text-white dark:hover:bg-[#FFFC30] dark:hover:text-gray-950 font-semibold rounded-full px-5 py-2 text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-300 shadow-sm"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              No events found for {activeCategory}. Check back soon!
            </div>
          )}
        </div>

      </motion.div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="bg-white dark:bg-[#181816] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-gray-200 dark:border-gray-800"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Modal Header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  {selectedEvent.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#2E4600] dark:text-[#FFFC30]">
                    {selectedEvent.sport} Tournament
                  </h3>
                  <p className="text-xs text-[#4E7031] dark:text-lime-400 font-semibold uppercase tracking-wider">
                    {selectedEvent.tagline}
                  </p>
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="space-y-3 bg-gray-50 dark:bg-[#121210] p-4 rounded-2xl border border-gray-100 dark:border-gray-800/60 text-sm">
                <div className="flex items-center justify-between py-1 border-b border-gray-200/60 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#4E7031]" /> Date
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedEvent.date}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-200/60 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#4E7031]" /> Time
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedEvent.time}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-200/60 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#4E7031]" /> Venue
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedEvent.venue}</span>
                </div>

                <div className="pt-2">
                  <span className="text-gray-500 dark:text-gray-400 block mb-1">Description</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xs sm:text-sm">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 py-3 px-4 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  onClick={() => {
                    alert(`Registered interest for ${selectedEvent.sport} match!`);
                    setSelectedEvent(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#4E7031] dark:bg-[#FFFC30] text-white dark:text-gray-950 font-semibold text-xs sm:text-sm hover:bg-[#3d5a25] dark:hover:bg-yellow-300 transition-colors shadow-md"
                >
                  RSVP / Register
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
