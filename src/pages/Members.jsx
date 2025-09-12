// src/pages/Members.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import membersData from "../data/members.json";

const Members = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterFraksi, setFilterFraksi] = useState("All");
  const [filterJabatan, setFilterJabatan] = useState("All");

  const fraksiOptions = Array.from(new Set(membersData.map((m) => m.fraksi)));
  const jabatanOptions = Array.from(new Set(membersData.map((m) => m.jabatan)));

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch = member.nama
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFraksi =
      filterFraksi === "All" || member.fraksi === filterFraksi;
    const matchesJabatan =
      filterJabatan === "All" || member.jabatan === filterJabatan;
    return matchesSearch && matchesFraksi && matchesJabatan;
  });

  const pimpinan = filteredMembers.filter((m) => m.isPimpinan);
  const anggota = filteredMembers.filter((m) => !m.isPimpinan);

  const downloadCSV = () => {
    const header = ["No", "Nama", "Jabatan", "Fraksi"];
    const rows = filteredMembers.map((m, idx) => [
      idx + 1,
      m.nama,
      m.jabatan,
      m.fraksi,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "anggota_dpr.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Judul */}
        <motion.h1
          className="text-3xl font-bold text-center text-green-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Profil Anggota DPR RI
        </motion.h1>
        <motion.p
          className="text-center text-green-800 mt-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Berikut daftar anggota dan pimpinan tertinggi.
        </motion.p>

        {/* Filter & Search */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-start gap-4 mb-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 text-sm font-medium text-[#2e5339]">
              Cari Nama:
            </label>
            <input
              type="text"
              placeholder="Ketik nama anggota..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-full text-sm sm:text-base"
            />
          </div>

          {/* Filter Fraksi */}
          <div className="min-w-[150px]">
            <label className="block mb-1 text-sm font-medium text-[#2e5339]">
              Filter Fraksi:
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-1 w-full text-sm sm:text-base"
              value={filterFraksi}
              onChange={(e) => setFilterFraksi(e.target.value)}
            >
              <option value="All">Semua</option>
              {fraksiOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Jabatan */}
          <div className="min-w-[150px]">
            <label className="block mb-1 text-sm font-medium text-[#2e5339]">
              Filter Jabatan:
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-1 w-full text-sm sm:text-base"
              value={filterJabatan}
              onChange={(e) => setFilterJabatan(e.target.value)}
            >
              <option value="All">Semua</option>
              {jabatanOptions.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>

          {/* Download CSV */}
          <div className="min-w-[120px]">
            <button
              onClick={downloadCSV}
              className="bg-[#2e5339] text-white px-4 py-2 rounded hover:bg-[#24432b] w-full text-sm sm:text-base"
            >
              Download CSV
            </button>
          </div>
        </motion.div>

        {/* Pimpinan DPR */}
        {pimpinan.length > 0 && (
          <motion.div
            className="mb-10 mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-5 text-center">
              Pimpinan DPR
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pimpinan.map((member, idx) => (
                <motion.div
                  key={member.id}
                  onClick={() => navigate(`/members/${member.id}`)}
                  className="cursor-pointer bg-green-100 p-4 rounded-xl shadow hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-3">
                    <img
                      src={member.foto}
                      alt={member.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-green-900">
                    {member.nama}
                  </h3>
                  <p className="text-green-800 text-sm">{member.jabatan}</p>
                  <p className="text-green-700 text-sm">{member.fraksi}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Anggota DPR */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {anggota.map((member, idx) => (
            <motion.div
              key={member.id}
              onClick={() => navigate(`/members/${member.id}`)}
              className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-3">
                <img
                  src={member.foto}
                  alt={member.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-800">
                {member.nama}
              </h3>
              <p className="text-gray-700 text-sm">{member.jabatan}</p>
              <p className="text-gray-600 text-sm">{member.fraksi}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Members;
