import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";


const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full mt-28 md:mt-0 pt-[12vh] min-h-[80vh] font-poppins transition-colors duration-500 bg-[#fdfdf0] dark:bg-[#090908] text-gray-900 dark:text-white overflow-hidden">
   
      <div className="max-w-7xl mx-auto md:my-[80px] flex flex-col md:grid md:grid-cols-2">


        <motion.div 
          className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-10 md:py-0 relative z-10 text-center md:text-left order-1 md:order-none"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="font-extrabold leading-tight text-[#4E7031] dark:text-[#FFFC30] drop-shadow-lg text-[clamp(2rem,4vw,3.5rem)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Welcome to <span className="text-[#89F336] dark:text-[#FFFC30]">Alpha Sports</span>
            <br className="hidden sm:block" />
            Your University’s Winning Edge
          </motion.h1>

          <motion.p 
            className="mt-4 sm:mt-6 text-[clamp(1rem,1.8vw,1.25rem)] leading-relaxed text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Step into a world where <span className="font-semibold">passion meets performance</span>.  
            At Alpha Sports, we nurture talent, build champions, and create 
            unforgettable memories — on and off the field.
          </motion.p>

          <motion.div 
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button 
              className="px-6 py-3 bg-[#89F336] dark:bg-[#FFFC30] hover:bg-[#6ED12B] dark:hover:bg-yellow-300 text-black dark:text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-[#89F336]/50 transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=> navigate("/register")}
            >
              Join Your University Team
            </motion.button>
            <motion.button 
              className="px-6 py-3 border-2 border-[#89F336] dark:border-[#FFFC30] text-[#4E7031] dark:text-[#FFFC30] hover:bg-[#89F336] dark:hover:bg-[#4c4c49] hover:text-black dark:hover:text-gray-950 font-semibold rounded-full transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/events")}
            >
              Upcoming Events
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src="/hero.avif"
            alt="University Sports"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Home;
