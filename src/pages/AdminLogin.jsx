// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoDPR from "../assets/logoDPR.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "admin" && formData.password === "1234") {
      setError("");
      navigate("/admin/dashboard");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-green-700 px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logoDPR} alt="Pantau DPR" className="w-24 h-24 mb-4" />
          <h2 className="text-3xl font-bold text-green-900 mb-1">Admin Login</h2>
          <p className="text-gray-600 text-sm text-center">Masuk untuk mengelola PantauDPR</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-medium">{error}</p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-green-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-green-700 transition-all"
          >
            Login
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
