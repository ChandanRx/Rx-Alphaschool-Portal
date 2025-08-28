import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const sportsOptions = [
  "Football",
  "Cricket",
  "Basketball",
  "Volleyball",
  "Kabaddi",
  "Athletics",
  "Table Tennis",
  "Badminton",
  "Hockey",
  "Swimming",
];

const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const branchOptions = ["Computer Science", "Mechanical", "Electrical", "Civil", "Chemical"];
const genderOptions = ["Male", "Female", "Other"];

const Register = () => {
  const navigate = useNavigate();
  const loggedInUserEmail = "user@example.com";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    year: "",
    branch: "",
    age: "",
    address: "",
    gender: "",
    profile: null,
    email: loggedInUserEmail,
    contact: "",
    sport: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setFormData({ ...formData, profile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data, 
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Registration successful!");
        setFormData({
          fullName: "",
          year: "",
          branch: "",
          age: "",
          address: "",
          gender: "",
          profile: null,
          email: loggedInUserEmail,
          contact: "",
          sport: "",
        });

        setTimeout(() => navigate("/teams"), 1200);
      } else {
        toast.error(result.message || "Registration failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex min-h-screen font-poppins bg-gray-50 dark:bg-[rgba(34,197,94,0.6)] text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <motion.div
        className="w-[20%] hidden md:flex flex-col justify-center items-center p-10 bg-[rgba(255,237,74,0.6)] dark:bg-black"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-5xl font-extrabold tracking-widest relative inline-block 
               [writing-mode:vertical-rl] rotate-180 
               font-poppins hover:scale-105 hover:tracking-[0.2em] transition-all duration-300 ease-in-out"
        >
          <span
            className="
              bg-gradient-to-b from-[#14532d] via-[#071f0f] to-[#43544b] 
              dark:from-[#FFFC30] dark:via-[#FFD700] dark:to-[#FFB800] 
              text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] 
              dark:drop-shadow-[0_2px_4px_rgba(255,255,48,0.6)]
            "
          >
            Regi
          </span>
          <span
            className="
              italic 
              bg-gradient-to-b from-[#43544b] via-[#071f0f] to-[#14532d] 
              dark:from-[#FFB800] dark:via-[#FFD700] dark:to-[#FFFC30] 
              text-transparent bg-clip-text 
            "
          >
            stration
          </span>
        </h1>
      </motion.div>

      <div className="flex-grow md:p-10 mt-28 pt-[10vh] max-w-[90%] md:max-w-[80%] mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-black rounded-lg shadow-lg p-8 space-y-6"
          initial="hidden"
          animate="visible"
        >
          {[
            <div>
              <label htmlFor="fullName" className="block mb-1 font-semibold">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
              />
            </div>,

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="year" className="block mb-1 font-semibold">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
                >
                  <option value="" disabled>Select Year</option>
                  {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="branch" className="block mb-1 font-semibold">
                  Branch <span className="text-red-500">*</span>
                </label>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
                >
                  <option value="" disabled>Select Branch</option>
                  {branchOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>,

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="age" className="block mb-1 font-semibold">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="10"
                  max="60"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="Your age"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="gender" className="block mb-1 font-semibold">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
                >
                  <option value="" disabled>Select Gender</option>
                  {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>,

            <div>
              <label htmlFor="address" className="block mb-1 font-semibold">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Enter your address"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400 resize-none"
              />
            </div>,

            <div>
              <label htmlFor="profile" className="block mb-1 font-semibold">
                Profile Picture
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-gray-700 dark:text-gray-300"
              />
            </div>,

            <div>
              <label htmlFor="email" className="block mb-1 font-semibold">
                Email (logged in)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-100 dark:bg-[#101010] text-gray-600 dark:text-gray-300 cursor-not-allowed"
              />
            </div>,

            <div>
              <label htmlFor="contact" className="block mb-1 font-semibold">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter contact number"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
              />
            </div>,

            <div>
              <label htmlFor="sport" className="block mb-1 font-semibold">
                Select Sport <span className="text-red-500">*</span>
              </label>
              <select
                id="sport"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-none bg-gray-50 dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400"
              >
                <option value="" disabled>Choose a sport</option>
                {sportsOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>,

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-lime-600 dark:bg-lime-400 hover:bg-lime-500 dark:hover:bg-lime-300 text-white dark:text-gray-900 font-semibold rounded-full shadow-lg transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          ].map((field, i) => (
            <motion.div key={i} custom={i} variants={formItemVariants}>
              {field}
            </motion.div>
          ))}
        </motion.form>
      </div>
    </div>
  );
};

export default Register;
