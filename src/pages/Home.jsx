// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logoDPR from "../assets/logoDPR.png";

export default function Home() {
  // fungsi scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-green-900 to-green-700 text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={logoDPR} alt="Pantau DPR" className="w-28 h-28 mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">PantauDPR</h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Platform untuk meningkatkan transparansi dan akuntabilitas DPR RI. 
          Pantau aktivitas legislatif, kehadiran anggota, pembahasan RUU, 
          dan penggunaan anggaran dengan mudah.
        </p>
        <Link
          to="/about"
          onClick={scrollToTop}
          className="mt-6 bg-yellow-400 text-green-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition"
        >
          Pelajari Lebih Lanjut
        </Link>
      </motion.section>

      {/* Statistik Singkat */}
      <motion.section
        className="px-6 py-12 bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          <StatCard number="575" label="Anggota DPR" />
          <StatCard number="120" label="RUU Dibahas" />
          <StatCard number="1.500+" label="Aspirasi Publik" />
          <StatCard number="Rp 5T" label="Anggaran / Tahun" />
        </div>
      </motion.section>

      {/* Fitur Utama */}
      <motion.section
        className="px-6 py-12 bg-gray-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-green-900">
          Fitur Utama
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <FeatureCard
            title="Profil Anggota DPR RI"
            desc="Lihat daftar lengkap anggota DPR RI dan pimpinan tertinggi."
            link="/members"
          />
          <FeatureCard
            title="Kinerja & Inisiatif DPR"
            desc="Ikuti perkembangan kinerja anggota DPR RI melalui postingan dan inisiatif mereka."
            link="/performance"
          />
          <FeatureCard
            title="Legislasi & RUU"
            desc="Pantau perkembangan RUU di DPR RI: dibahas, disahkan, atau ditolak."
            link="/legislation"
          />
          <FeatureCard
            title="Transparansi Anggaran"
            desc="Pantau alokasi anggaran DPR RI per bulan dan tahun dalam bentuk grafik."
            link="/budget"
          />
          <FeatureCard
            title="Aspirasi Publik"
            desc="Tulis, sampaikan, dan dukung aspirasi masyarakat untuk DPR RI."
            link="/aspirations"
          />
          <FeatureCard
            title="Tentang Platform"
            desc="Pelajari lebih lanjut visi, misi, dan tujuan PantauDPR."
            link="/about"
          />
        </div>
      </motion.section>
    </div>
  );
}

// Sub-component untuk kartu fitur
function FeatureCard({ title, desc, link }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      to={link}
      onClick={scrollToTop}
      className="block border border-gray-200 rounded-xl p-6 bg-white shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </Link>
  );
}

// Sub-component untuk statistik
function StatCard({ number, label }) {
  return (
    <motion.div
      className="flex flex-col items-center bg-white rounded-xl p-6 shadow hover:shadow-md transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 className="text-3xl md:text-4xl font-bold text-green-900">{number}</h3>
      <p className="text-gray-600 mt-2">{label}</p>
    </motion.div>
  );
}
