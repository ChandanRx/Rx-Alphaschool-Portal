import { useEffect, useState } from "react";
import { FaFootballBall, FaBasketballBall, FaTableTennis, FaVolleyballBall, FaSwimmer } from "react-icons/fa";
import { GiCricketBat, GiHockey, GiTennisRacket } from "react-icons/gi";
import { MdSportsGymnastics, MdSportsKabaddi } from "react-icons/md";
import { motion } from "motion/react";

const sportIcons = {
  Football: <FaFootballBall />,
  Cricket: <GiCricketBat />,
  Basketball: <FaBasketballBall />,
  Kabaddi: <MdSportsKabaddi />,
  Hockey: <GiHockey />,
  Volleyball: <FaVolleyballBall />,
  "Table Tennis": <FaTableTennis />,
  Swimming: <FaSwimmer />,
  Badminton: <GiTennisRacket />,
  Athletics: <MdSportsGymnastics />,
};

const Events = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setDarkMode(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setEventsData(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const groupedEvents = eventsData.reduce((acc, event) => {
    const sportName = event.sport.name || event.sport;
    if (!acc[sportName]) acc[sportName] = [];
    acc[sportName].push({ ...event, icon: sportIcons[sportName] || null });
    return acc;
  }, {});

  return (
    <div className="px-4 md:px-6 mt-20 py-20 max-w-[80%] mx-auto font-poppins">
      <div className="mb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E4600] dark:text-[#FFFC30] tracking-tight">
          Sports Events{" "}
          <span className="bg-gradient-to-r from-lime-500 to-emerald-400 bg-clip-text text-transparent dark:from-yellow-400 dark:to-lime-400">
            Schedule 
          </span>
        </h1>
        <div className="w-28 h-1 bg-gradient-to-r from-lime-500 to-emerald-400 dark:from-yellow-400 dark:to-lime-400 rounded-full mt-4 mx-auto"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <svg className="animate-spin h-8 w-8 text-lime-600 dark:text-lime-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-3 text-lg font-semibold text-gray-700 dark:text-gray-300">Loading events...</span>
        </div>
      ) : eventsData.length === 0 ? (
        <div className="text-center py-20 text-gray-700 dark:text-gray-300">
          No events available. Please check back later!
        </div>
      ) : (
        <motion.div
          className="flex flex-col gap-14"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } } 
                    }}
        >
          {Object.keys(groupedEvents).map((sport, index, arr) => (
            <motion.div
              key={sport}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pb-10"
            >
            
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl text-lime-600 dark:text-yellow-400">
                  {groupedEvents[sport][0].icon}
                </div>
                <h2 className="text-2xl font-bold text-[#2E4600] dark:text-lime-300">{sport}</h2>
              </div>

            
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold w-16 text-center">Icon</th>
                      <th className="py-3 px-4 font-semibold min-w-[120px]">Date</th>
                      <th className="py-3 px-4 font-semibold min-w-[140px]">Time</th>
                      <th className="py-3 px-4 font-semibold min-w-[150px]">Venue</th>
                      <th className="py-3 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedEvents[sport].map((event, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="bg-white dark:bg-[#111] hover:shadow-md transition-all duration-300"
                      >
                        <td className="py-4 px-4 text-center text-lime-600 dark:text-yellow-400 text-xl">{event.icon}</td>
                        <td className="py-4 px-4 text-gray-900 dark:text-gray-100 font-medium">
                          {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="py-4 px-4 text-gray-900 dark:text-gray-100">{event.time}</td>
                        <td className="py-4 px-4 text-gray-900 dark:text-gray-100">{event.venue}</td>
                        <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{event.description}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {index !== arr.length - 1 && (
                <div className="mt-12 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 dark:to-transparent"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Events;
