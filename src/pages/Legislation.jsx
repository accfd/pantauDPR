// src/pages/Legislation.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Tambahan animasi
import legislationData from "../data/legislation.json";

const statusColors = {
  "Disahkan": "bg-green-200 text-green-800",
  "Dalam Pembahasan": "bg-yellow-200 text-yellow-800",
  "Ditolak": "bg-red-200 text-red-800",
  "Dalam Proses": "bg-blue-200 text-blue-800",
};

const Legislation = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  const years = Array.from(
    new Set(legislationData.map((item) => new Date(item.tanggal).getFullYear()))
  ).sort((a, b) => b - a);

  const filteredData = legislationData.filter((item) => {
    const itemYear = new Date(item.tanggal).getFullYear();
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    const matchesYear = filterYear === "All" || itemYear === parseInt(filterYear);
    const matchesSearch = item.judul.toLowerCase().includes(searchTitle.toLowerCase());
    return matchesSearch && matchesStatus && matchesYear;
  });

  const downloadCSV = () => {
    const header = ["No", "Judul RUU", "Status", "Tanggal", "Komisi"];
    const rows = filteredData.map((item, idx) => [
      idx + 1,
      item.judul,
      item.status,
      item.tanggal,
      item.komisi,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "legislation_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center text-green-900">
          Daftar RUU & Status Legislasi
        </h1>
        <p className="text-center text-green-800 mt-2 mb-6">
          Pantau perkembangan RUU di DPR RI
        </p>

        {/* Filter & Search Sejajar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-start gap-4 mb-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 text-sm font-medium text-[#2e5339]">Cari Judul RUU:</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-1 w-full text-sm sm:text-base"
              placeholder="Ketik judul RUU..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="min-w-[150px]">
            <label className="block mb-1 text-sm font-medium text-[#2e5339]">Filter Status:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1 w-full text-sm sm:text-base"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Disahkan">Disahkan</option>
              <option value="Dalam Pembahasan">Dalam Pembahasan</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Dalam Proses">Dalam Proses</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="min-w-[120px]">
            <label className="block mb-1 text-sm font-medium text-[#2e5339]">Filter Tahun:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1 w-full text-sm sm:text-base"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="All">Semua</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
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
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-[#2e5339] text-white">
              <tr>
                <th className="px-4 py-2 text-left text-sm sm:text-base">No</th>
                <th className="px-4 py-2 text-left text-sm sm:text-base">Judul RUU</th>
                <th className="px-4 py-2 text-left text-sm sm:text-base">Status</th>
                <th className="px-4 py-2 text-left text-sm sm:text-base">Tanggal</th>
                <th className="px-4 py-2 text-left text-sm sm:text-base">Komisi</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredData.length === 0 ? (
                  <motion.tr
                    key="nodata"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td
                      colSpan={5}
                      className="text-center px-4 py-6 text-sm sm:text-base text-gray-500"
                    >
                      Tidak ada data.
                    </td>
                  </motion.tr>
                ) : (
                  filteredData.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <td className="px-4 py-2 text-sm sm:text-base">{idx + 1}</td>
                      <td className="px-4 py-2 text-sm sm:text-base">{item.judul}</td>
                      <td className="px-4 py-2 text-sm sm:text-base">
                        <span
                          className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${statusColors[item.status]}`}
                          title={`Status: ${item.status}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base">{item.tanggal}</td>
                      <td className="px-4 py-2 text-sm sm:text-base">{item.komisi}</td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  );
};

export default Legislation;
