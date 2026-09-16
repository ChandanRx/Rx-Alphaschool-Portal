import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { motion } from "framer-motion";

const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const token = localStorage.getItem("authToken");
  let userId = user?.id;
  if (!userId && token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  }

  useEffect(() => {
    if (!userId || !token) {
      setLoading(false);
      setError("Authentication token not found or invalid. Please log in.");
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://rx-alphaschool-portal.onrender.com/api/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API response error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setProfileData(data);
        setForm(data);
      } catch (err) {
        console.error("Fetching user data failed:", err);
        setError(`Failed to load profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!userId || !token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await fetch(
        `https://rx-alphaschool-portal.onrender.com/api/users/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API save error: ${response.status} - ${errorText}`);
      }

      const updatedUser = await response.json();
      setProfileData(updatedUser);
      setForm(updatedUser);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(`Failed to save profile: ${err.message}`);
    }
  };

  const ProfileDetail = ({ icon, label, value }) => (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-3 bg-gray-50 dark:bg-[#121210] p-4 rounded-xl border border-gray-100 dark:border-gray-800/60 shadow-sm"
    >
      <div className="text-[#4E7031] dark:text-[#FFFC30]">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-base font-bold text-gray-800 dark:text-gray-100 mt-0.5">{value || "Not Specified"}</p>
      </div>
    </motion.div>
  );

  const BuildingIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9.5 16.5v-3m5 3v-3m-5 5V22m5-5V22m0-11V7m-5 5V7" /></svg>;
  const CalendarIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
  const TrophyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2a3 3 0 003-3V2H8v10a3 3 0 003 3z"></path><path d="M16 11l6 6v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3l6-6"></path><path d="M12 15v7"></path><path d="M12 2v3"></path></svg>;
  const PhoneIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2.18A19.95 19.95 0 011.82 2a2 2 0 012.18-2.18h3a2 2 0 012 2v4.5A2 2 0 018.92 9.1l-1.42 1.42a12.42 12.42 0 0010.58 10.58l1.42-1.42a2 2 0 012.18-.36z"></path></svg>;
  const EditIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
  const SaveIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;
  const CancelIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M15 9l-6 6"></path><path d="M9 9l6 6"></path></svg>;

  return (
    <div className="max-w-3xl mt-20 pt-[10vh] pb-16 mx-auto p-4 sm:p-6 font-poppins">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E4600] dark:text-[#FFFC30] tracking-tight">
          My{" "}
          <span className="bg-gradient-to-r from-lime-500 to-emerald-400 bg-clip-text text-transparent dark:from-yellow-400 dark:to-lime-400">
            Profile
          </span>
        </h1>
        <div className="w-28 h-1 bg-gradient-to-r from-lime-500 to-emerald-400 dark:from-lime-400 dark:to-yellow-300 rounded-full mt-4 mx-auto"></div>
      </div>

      <motion.div
        className="bg-white dark:bg-[#141412] rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerParent}
      >
        {/* User Header Info */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-center text-center gap-3 mb-8"
        >
          <img
            src={profileData?.profilePic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#4E7031] dark:border-[#FFFC30] object-cover shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{profileData?.fullname || user?.fullname || "User"}</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{profileData?.email || user?.email}</p>
          </div>
        </motion.div>

        {/* Edit Mode View vs Overview */}
        {editMode ? (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              variants={staggerParent}
              initial="hidden"
              animate="visible"
            >
              {["department", "year", "sport", "contactNumber"].map((field) => (
                <motion.div key={field} variants={fadeUp} className="relative z-0 w-full">
                  <input
                    id={field}
                    name={field}
                    type="text"
                    value={form[field] || ""}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full p-4 pt-6 text-base border border-gray-300 rounded-xl 
                      bg-white text-gray-900 dark:bg-[#1a1a1a] dark:text-gray-100
                      focus:border-[#4E7031] dark:focus:border-[#FFFC30] focus:ring-1 focus:ring-[#4E7031] dark:focus:ring-[#FFFC30]
                      transition-colors duration-200 outline-none"
                  />
                  <label
                    htmlFor={field}
                    className="absolute left-4 top-1 text-gray-500 text-xs pointer-events-none
                      transition-all duration-200 ease-out 
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 
                      peer-placeholder-shown:text-sm 
                      peer-focus:top-1 peer-focus:text-gray-500 peer-focus:text-xs font-medium"
                  >
                    {field === "contactNumber"
                      ? "Contact Number"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons for Edit Mode (Always Visible with Micro-Interactions) */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 
                  bg-[#4E7031] dark:bg-[#FFFC30] text-white dark:text-gray-950 font-semibold p-3.5 rounded-xl shadow-md 
                  hover:bg-[#3d5a25] dark:hover:bg-yellow-300 transition-colors duration-200 cursor-pointer"
              >
                {SaveIcon} <span>Save Changes</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEditMode(false)}
                className="flex-1 flex items-center justify-center gap-2 
                  bg-gray-200 text-gray-900 font-semibold p-3.5 rounded-xl 
                  dark:bg-gray-800 dark:text-gray-100 
                  hover:bg-gray-300 dark:hover:bg-gray-700 
                  transition-colors duration-200 cursor-pointer"
              >
                {CancelIcon} <span>Cancel</span>
              </motion.button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={staggerParent}
              initial="hidden"
              animate="visible"
            >
              <ProfileDetail icon={BuildingIcon} label="Department" value={profileData?.department} />
              <ProfileDetail icon={CalendarIcon} label="Year" value={profileData?.year} />
              <ProfileDetail icon={TrophyIcon} label="Sport" value={profileData?.sport} />
              <ProfileDetail icon={PhoneIcon} label="Contact Number" value={profileData?.contactNumber} />
            </motion.div>

            {/* Edit Details Button (Always Visible & Animated) */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEditMode(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#4E7031] dark:bg-[#FFFC30] text-white dark:text-gray-950 font-semibold p-3.5 rounded-xl shadow-md hover:bg-[#3d5a25] dark:hover:bg-yellow-300 transition-all duration-200 cursor-pointer"
              >
                {EditIcon} <span>Edit Details</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
