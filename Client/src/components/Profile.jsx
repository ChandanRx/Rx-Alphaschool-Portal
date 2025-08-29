import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { motion } from "motion/react";


const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
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
      className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-sm"
    >
      <div className="text-lime-600 dark:text-yellow-400">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{value}</p>
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
    <div className="max-w-3xl mt-20 pt-[10vh] mx-auto p-6 font-poppins">
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
        className="bg-white dark:bg-[#080808] rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerParent}
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-center text-center gap-4 mb-8"
        >
          <img
            src={profileData?.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-lime-500 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <div>
            <p className="text-2xl">{profileData?.fullname}</p>
            <p className="text-sm">{profileData?.email}</p>
          </div>
        </motion.div>

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
      focus:border-lime-500 focus:ring-1 dark:border-none focus:ring-lime-500
      transition-colors duration-200 outline-none"
                  />
                  <label
                    htmlFor={field}
                    className="absolute left-4 top-1 text-gray-500 text-sm pointer-events-none
      transition-all duration-200 ease-out 
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 
      peer-placeholder-shown:text-base 
      peer-focus:top-1 peer-focus:text-gray-500 peer-focus:text-sm"
                  >
                    {field === "contactNumber"
                      ? "Contact Number"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </motion.div>

              ))}
            </motion.div>

            <motion.div
              className="flex gap-4 mt-4"
              variants={staggerParent}
              animate="visible"
            >
              <motion.button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 
               bg-lime-600 text-white p-3 rounded-xl 
               hover:bg-lime-700 transition-colors duration-200"
              >
                {SaveIcon} Save
              </motion.button>

              <motion.button
                variants={fadeUp}
                onClick={() => setEditMode(false)}
                className="flex-1 flex items-center justify-center gap-2 
               bg-gray-200 text-gray-900 p-3 rounded-xl 
               dark:bg-gray-800 dark:text-gray-100 
               hover:bg-gray-300 dark:hover:bg-gray-700 
               transition-colors duration-200"
              >
                {CancelIcon} Cancel
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
              {profileData?.department && (
                <ProfileDetail icon={BuildingIcon} label="Department" value={profileData?.department} />
              )}
              {profileData?.year && (
                <ProfileDetail icon={CalendarIcon} label="Year" value={profileData?.year} />
              )}
              {profileData?.sport && (
                <ProfileDetail icon={TrophyIcon} label="Sport" value={profileData?.sport} />
              )}
              {profileData?.contactNumber && (
                <ProfileDetail icon={PhoneIcon} label="Contact Number" value={profileData?.contactNumber} />
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <button
                onClick={() => setEditMode(true)}
                className="w-full flex items-center justify-center gap-2 bg-lime-600 text-white p-3 rounded-xl"
              >
                {EditIcon} Edit Details
              </button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
