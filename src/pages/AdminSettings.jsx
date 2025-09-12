// src/pages/AdminSettings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

export default function AdminSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Admin DPR",
    email: "admin@pantauDPR.id",
    avatar: "/potoDPR.png", // default avatar dari public
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar: url }));
    }
  };

  const handleSaveProfile = () => {
    if (!profile.name || !profile.email) {
      alert("Nama & email wajib diisi!");
      return;
    }
    alert("Profil berhasil disimpan!");
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Semua kolom password harus diisi!");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert("Password baru & konfirmasi tidak sama!");
      return;
    }
    alert("Password berhasil diganti!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-green-900">Pengaturan Admin</h1>
          <p className="text-gray-600 mt-1">
            Kelola profil, keamanan akun, dan informasi admin di sini.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.5 }}
          className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Avatar Admin"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-900"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute bottom-0 left-0 w-full opacity-0 cursor-pointer"
              />
            )}
          </div>

          <div className="flex-1 w-full">
            {!isEditing ? (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-green-900">{profile.name}</h2>
                <p className="text-gray-700">{profile.email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-3 bg-green-900 text-yellow-100 px-4 py-2 rounded hover:bg-green-800 transition"
                >
                  Edit Profil
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Nama"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-900 text-yellow-100 px-4 py-2 rounded hover:bg-green-800 transition"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5 }}
          className="bg-white rounded-xl shadow p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-green-900 mb-4">Ganti Password</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="password"
              placeholder="Password Saat Ini"
              value={passwords.current}
              onChange={(e)=>setPasswords({...passwords, current:e.target.value})}
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
            />
            <input
              type="password"
              placeholder="Password Baru"
              value={passwords.new}
              onChange={(e)=>setPasswords({...passwords, new:e.target.value})}
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
            />
            <input
              type="password"
              placeholder="Konfirmasi Password Baru"
              value={passwords.confirm}
              onChange={(e)=>setPasswords({...passwords, confirm:e.target.value})}
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="mt-4 bg-green-900 text-yellow-100 px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Ganti Password
          </button>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5 }}
          className="bg-white rounded-xl shadow p-6"
        >
          <h2 className="text-xl font-semibold text-green-900 mb-4">Tentang Admin / Platform</h2>
          <p className="text-gray-700">
            PantauDPR adalah platform transparansi publik yang memudahkan monitoring kinerja DPR, legislasi, aspirasi masyarakat, dan penggunaan anggaran.
          </p>
          <p className="mt-2 text-gray-700">
            Platform ini dikembangkan untuk meningkatkan akuntabilitas dan transparansi legislatif. Admin dapat mengelola anggota, legislasi, anggaran, dan aspirasi publik dengan mudah.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
