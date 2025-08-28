import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setLoading(false);

      if (res.ok) {
        setUser({
          isAuthenticated: true,
          role: result.role,
          token: result.token,
          fullname: result.fullname,
          email: result.email,
        });
        localStorage.setItem("authToken", result.token);
        toast.success("Signed in successfully!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Server error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-poppins bg-gray-50 dark:bg-[rgba(34,197,94,0.6)] text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Toaster position="bottom-right" richColors />

      <motion.div 
        className="w-full md:w-[20%] flex justify-center items-center p-6 md:p-10 bg-[rgba(255,237,74,0.6)] dark:bg-black"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      >
        <h1 className="text-4xl md:text-5xl font-poppins font-extrabold tracking-widest relative inline-block transition-transform duration-300 ease-in-out hover:scale-110 
          [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl] md:rotate-180">
          <span className="bg-gradient-to-b from-[#14532d] via-[#071f0f] to-[#43544b] dark:from-[#FFFC30] dark:via-[#FFD700] dark:to-[#FFB800] text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_2px_4px_rgba(255,255,48,0.6)]">
            Sign
          </span>
          <span className="italic bg-gradient-to-b from-[#43544b] via-[#071f0f] to-[#14532d] dark:from-[#FFB800] dark:via-[#FFD700] dark:to-[#FFFC30] text-transparent bg-clip-text">
            <span> </span> In
          </span>
        </h1>
      </motion.div>

      <div className="flex-grow flex mt-20 items-center justify-center p-6 md:p-10">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-sm md:max-w-[50%] bg-white dark:bg-black rounded-lg shadow-lg p-6 md:p-8 space-y-6"
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center mb-4"
            variants={fadeUp}
          >
            Sign In to <span className="text-lime-600 dark:text-lime-400">Alpha</span>
          </motion.h3>

          <motion.div variants={fadeUp}>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
            />
          </motion.div>

          <motion.div className="text-center" variants={fadeUp}>
            <button
              type="submit"
              className="w-full px-8 py-3 bg-lime-600 dark:bg-lime-400 hover:bg-lime-500 dark:hover:bg-lime-300 text-white dark:text-gray-900 font-semibold rounded-full shadow-lg transition"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </motion.div>

          <motion.p 
            className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4"
            variants={fadeUp}
          >
            Don’t have an account?{" "}
            <Link to="/signup" className="text-lime-600 dark:text-lime-400 font-semibold hover:underline">
              Sign up here
            </Link>
          </motion.p>
        </motion.form>
      </div>
    </div>
  );
};

export default SignIn;
