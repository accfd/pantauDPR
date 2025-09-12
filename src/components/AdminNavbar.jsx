// src/components/admin/AdminNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import logoDPR from "../../assets/logoDPR.png";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // nanti bisa sambungkan dengan auth
    alert("Anda telah logout.");
    navigate("/admin"); // redirect ke login
  };

  const navLinks = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, to: "/admin/dashboard" },
    { label: "Anggota", icon: <Users className="w-5 h-5" />, to: "/admin/members" },
    { label: "Legislasi", icon: <FileText className="w-5 h-5" />, to: "/admin/legislation" },
    { label: "Anggaran", icon: <DollarSign className="w-5 h-5" />, to: "/admin/budget" },
    { label: "Aspirasi", icon: <MessageSquare className="w-5 h-5" />, to: "/admin/aspirations" },
    { label: "Pengaturan", icon: <Settings className="w-5 h-5" />, to: "/admin/settings" },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-green-900 text-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <img src={logoDPR} alt="PantauDPR Admin" className="w-8 h-8" />
          <span className="font-bold text-lg">PantauDPR Admin</span>
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="flex items-center gap-1 text-sm font-medium hover:text-yellow-400 transition"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-md text-sm font-semibold transition"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </motion.nav>
  );
}
