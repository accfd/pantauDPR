// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logoDPR.png";
import VideoPlayer from "../components/VideoPlayer";

export default function About() {
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={logo}
            alt="PantauDPR Logo"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h1 className="text-4xl font-bold text-green-900">Tentang PantauDPR</h1>
          <p className="mt-3 text-lg text-green-800 max-w-2xl mx-auto">
            PantauDPR adalah platform digital yang memudahkan masyarakat
            mengawasi kinerja DPR RI dengan data yang transparan, interaktif,
            dan mudah diakses.
          </p>
        </motion.div>

        {/* Intro section */}
        <motion.section
          className="bg-white shadow rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-green-900 mb-4">
            Kenapa Ada PantauDPR?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            DPR RI adalah lembaga perwakilan rakyat yang seharusnya bekerja
            untuk kepentingan bangsa. Namun, masyarakat seringkali kesulitan
            memantau aktivitas mereka secara transparan.{" "}
            <span className="font-medium">PantauDPR</span> hadir untuk membuka
            akses informasi penting seputar anggota DPR, kinerja, legislasi,
            penggunaan anggaran, hingga ruang aspirasi publik.
          </p>
        </motion.section>

        {/* Features section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-green-900 text-center mb-10">
            Fitur Utama PantauDPR
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {f.icon} {f.title}
                </h3>
                <p className="text-gray-700 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Video Section */}
        <motion.section
          className="mt-16 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-green-900 text-center mb-6">
            Video Perkenalan PantauDPR
          </h2>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <VideoPlayer youtubeId="-yvrkDr75as" />
          </div>
        </motion.section>

        {/* Closing */}
        <motion.section
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-green-900 mb-3">
            Bersama Kawal Demokrasi
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Dengan <span className="font-medium">PantauDPR</span>, Anda tidak
            hanya menjadi penonton, tapi juga pengawas aktif dalam jalannya
            demokrasi Indonesia. Mari kita wujudkan DPR yang transparan,
            akuntabel, dan bekerja untuk rakyat.
          </p>
        </motion.section>
      </div>
    </main>
  );
}

const features = [
  {
    icon: "👤",
    title: "Profil Anggota DPR RI",
    desc: "Lihat daftar anggota dan pimpinan DPR RI lengkap dengan informasi fraksi, komisi, jabatan, dan riwayat kehadiran mereka.",
  },
  {
    icon: "📢",
    title: "Kinerja & Inisiatif",
    desc: "Ikuti perkembangan aktivitas dan postingan anggota DPR RI melalui feed interaktif yang dapat diberi like dan komentar.",
  },
  {
    icon: "📜",
    title: "Daftar RUU & Status Legislasi",
    desc: "Pantau setiap RUU yang dibahas di DPR RI, mulai dari tahap pembahasan, persetujuan, hingga disahkan menjadi undang-undang.",
  },
  {
    icon: "💰",
    title: "Transparansi Anggaran",
    desc: "Akses data visual alokasi dan penggunaan anggaran DPR RI per bulan maupun per tahun secara terbuka.",
  },
  {
    icon: "🗣️",
    title: "Aspirasi Publik",
    desc: "Sampaikan aspirasi Anda untuk DPR RI, dukung ide-ide terbaik, dan jadilah bagian dari suara rakyat yang mengawal kebijakan publik.",
  },
];
