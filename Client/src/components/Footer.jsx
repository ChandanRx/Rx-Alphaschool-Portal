import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `
      text-base font-medium transition-colors duration-300
      ${isActive
        ? "text-gray-900 dark:text-[#4FE0CB] font-semibold"
        : "text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#4FE0CB]"
      }
    `;
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <footer
      className="font-poppins px-6 py-8 transition-colors duration-300 
        dark:bg-[linear-gradient(to_right,rgba(0,0,0)_70%,rgba(25,123,60,1)_70%)]
        bg-[linear-gradient(to_right,rgba(252,242,145,1)_70%,rgba(176,220,113,1)_70%)]
        text-gray-800 dark:text-gray-300"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-gray-900 dark:text-[#FFFC30]"
          >
            alpha<span className="italic">school</span>
          </Link>
        </motion.div>

        {isLoggedIn && (
          <motion.div
            className="flex justify-center space-x-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {["/", "/teams", "/gallery", "/events", "/register"].map((path) => (
              <motion.div key={path} variants={fadeUp}>
                <Link to={path} className={navLinkClass(path)}>
                  {path === "/"
                    ? "Home"
                    : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="flex justify-center md:justify-end items-center space-x-4 flex-shrink-0"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.a href="#" className="hover:text-gray-900 dark:hover:text-[#4FE0CB]" variants={fadeUp}>
            <FaInstagram className="w-6 h-6" />
          </motion.a>
          <motion.a href="#" className="hover:text-gray-900 dark:hover:text-[#4FE0CB]" variants={fadeUp}>
            <FaTwitter className="w-6 h-6" />
          </motion.a>
          <motion.a href="#" className="hover:text-gray-900 dark:hover:text-[#4FE0CB]" variants={fadeUp}>
            <FaYoutube className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>


      <motion.div
        className="mt-6 text-center text-xs opacity-70 border-t pt-4 border-gray-300 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        © {new Date().getFullYear()} AlphaSchool. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
