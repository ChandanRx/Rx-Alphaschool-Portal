import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import { motion } from "motion/react"; // Motion.dev
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const userRole = user?.role;
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `
      relative px-2 py-1 cursor-pointer transition-colors duration-300
      ${darkMode ? "text-[#4FE0CB]" : "text-black"}
      after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0
      after:h-[2px] after:bg-gradient-to-r after:from-[#89F336] after:to-[#FFFC30]
      after:transition-all after:duration-300
      ${isActive ? "after:w-full font-semibold" : "after:w-0 hover:after:w-full"}
    `;
  };

  const navLinks = ["/", "/teams", "/gallery", "/events", "/register"];
  const navNames = ["Home", "Teams", "Gallery", "Events", "Register"];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 font-poppins px-6 py-4 shadow-lg transition-colors duration-300
        ${darkMode 
          ? "bg-[linear-gradient(to_right,rgba(25,123,60,1)_20%,rgba(0,0,0)_20%)]"
          : "bg-[linear-gradient(to_right,rgba(176,220,113,1)_20%,rgba(252,242,145,1)_20%)]"
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[8vh]">
        
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
          <Link to="/" className={`font-extrabold text-3xl tracking-wider relative inline-block 
              ${darkMode
                ? "bg-gradient-to-r from-[#FFFC30] via-[#FFD700] to-[#FFB800] text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(255,255,48,0.6)]"
                : "bg-gradient-to-r from-[#14532d] via-[#071f0f] to-[#43544b] text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
              }
              hover:scale-105 hover:tracking-[0.2em] transition-all duration-300 ease-in-out`}>
            alpha<span className="italic">school</span>
          </Link>
        </motion.div>


        <motion.div 
          className="hidden md:flex space-x-6 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {userRole && navLinks.map((path, idx) => (
            <motion.div 
              key={path}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link to={path} className={navLinkClass(path)}>
                {navNames[idx]}
              </Link>
            </motion.div>
          ))}

          {userRole ? (
            <>
              {userRole === "admin" ? (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
                </motion.div>
              ) : (
                <Link to="/profile" className="p-2 rounded-full bg-[#FFFC30] hover:bg-[#89F336]">
                  <User size={20} className="text-gray-900" />
                </Link>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/signin"
                className={`px-5 py-2 rounded-full font-semibold transition
                  ${darkMode
                    ? "bg-gradient-to-r from-[#89F336] to-[#FFFC30] text-gray-950"
                    : "bg-[#FFFC30] text-[#1B263B] hover:bg-gradient-to-r from-[#89F336] to-[#FFFC30] hover:text-gray-950"
                  }`}
              >
                Sign In
              </Link>
            </motion.div>
          )}

          <motion.button
            whileHover={{ rotate: 20 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition
              ${darkMode ? "bg-[#4FE0CB]/20 text-[#4FE0CB]" : "bg-white/20 text-white"}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.div>


        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded ${darkMode ? "bg-[#4FE0CB]/20" : "bg-white/20"} text-white`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {menuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className={`md:hidden mt-2 space-y-3 p-4 rounded-lg backdrop-blur-lg transition-colors duration-300
            ${darkMode ? "bg-gray-900 text-[#4FE0CB]" : "bg-[#89F336]/90 text-white"}`}
        >
          {userRole && navLinks.map((path, idx) => (
            <motion.div 
              key={path}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={path} className={navLinkClass(path)} onClick={() => setMenuOpen(false)}>
                {navNames[idx]}
              </Link>
            </motion.div>
          ))}

          {userRole ? (
            <>
              {userRole === "admin" ? (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/dashboard" className={navLinkClass("/dashboard")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/profile" className="flex items-center space-x-2 p-2 rounded bg-[#FFFC30] text-gray-900" onClick={() => setMenuOpen(false)}>
                    <User size={20}/> <span>Profile</span>
                  </Link>
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="block w-full px-5 py-2 font-semibold rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/signin"
                className={`block px-5 py-2 font-semibold rounded-full transition
                  ${darkMode
                    ? "bg-gradient-to-r from-[#89F336] to-[#FFFC30] text-gray-950"
                    : "bg-[#FFFC30] text-[#1B263B] hover:bg-[#4FE0CB]"
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            </motion.div>
          )}

          <motion.button
            whileHover={{ rotate: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`w-full p-2 rounded-full transition
              ${darkMode ? "bg-[#4FE0CB]/20 text-[#4FE0CB]" : "bg-white/20 text-white"}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Header;

