// src/pages/AdminDashboard.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { Users, FileText, DollarSign, MessageSquare, Settings, Activity } from "lucide-react";

export default function AdminDashboard() {
  const location = useLocation();

  // scroll ke atas setiap kali route berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  const stats = [
    { number: "575", label: "Total Anggota", color: "bg-green-100" },
    { number: "120", label: "RUU Aktif", color: "bg-blue-100" },
    { number: "Rp 5T", label: "Total Anggaran", color: "bg-yellow-100" },
    { number: "1.500+", label: "Aspirasi Publik", color: "bg-red-100" },
  ];

  const quickLinks = [
    { title: "Kelola Anggota", icon: <Users className="w-6 h-6" />, link: "/admin/members" },
    { title: "Kelola Legislasi", icon: <FileText className="w-6 h-6" />, link: "/admin/legislation" },
    { title: "Kelola Anggaran", icon: <DollarSign className="w-6 h-6" />, link: "/admin/budget" },
    { title: "Kelola Aspirasi", icon: <MessageSquare className="w-6 h-6" />, link: "/admin/aspirations" },
    { title: "Pengaturan", icon: <Settings className="w-6 h-6" />, link: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-green-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-2">
            Selamat datang di panel admin <span className="font-semibold">PantauDPR</span>.
          </p>
        </motion.div>

        {/* Statistik Ringkas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((item, idx) => (
            <StatCard key={idx} number={item.number} label={item.label} color={item.color} />
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-12"
        >
          {quickLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-6 bg-white shadow hover:shadow-lg hover:scale-105 transition transform"
            >
              <div className="text-green-800">{item.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-green-900">{item.title}</h3>
            </Link>
          ))}
        </motion.div>

        {/* Aktivitas Terbaru */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow p-6"
        >
          <div className="flex items-center mb-4">
            <Activity className="text-green-800 w-5 h-5 mr-2" />
            <h2 className="text-xl font-semibold text-green-900">Aktivitas Terbaru</h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li>📌 Legislasi <span className="font-semibold">RUU Kesehatan</span> baru ditambahkan</li>
            <li>📌 Aspirasi publik dari <span className="font-semibold">Mahasiswa UI</span> diterima</li>
            <li>📌 Anggota DPR fraksi X melakukan update data profil</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// Sub-komponen Statistik
function StatCard({ number, label, color }) {
  return (
    <div className={`flex flex-col items-center ${color} rounded-xl p-6 shadow hover:shadow-md transition`}>
      <h3 className="text-2xl md:text-3xl font-bold text-green-900">{number}</h3>
      <p className="text-gray-700 mt-2">{label}</p>
    </div>
  );
}
