// src/pages/ManageBudget.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import budgetDataJson from "../data/budget.json";

export default function ManageBudget() {
  const location = useLocation();

  // Scroll ke atas saat navigasi berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  const [budgetData, setBudgetData] = useState(budgetDataJson);
  const [selectedYear, setSelectedYear] = useState(Object.keys(budgetData)[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMonth, setEditingMonth] = useState(null);
  const [formData, setFormData] = useState({
    bulan: "",
    tahun: "",
    gaji_tunjangan: 0,
    dana_legislasi: 0,
    dana_reses_kunjungan: 0,
    operasional_staf: 0,
    biaya_badan: 0,
  });
  const [notification, setNotification] = useState("");

  const monthList = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];

  const yearList = Array.from({ length: 7 }, (_, i) => 2024 + i); // 2024–2030

  const openModal = (month = null) => {
    setEditingMonth(month);
    if (month) {
      setFormData({ ...month, tahun: selectedYear });
    } else {
      setFormData({
        bulan: "",
        tahun: yearList[0],
        gaji_tunjangan: 0,
        dana_legislasi: 0,
        dana_reses_kunjungan: 0,
        operasional_staf: 0,
        biaya_badan: 0,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMonth(null);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { bulan, tahun } = formData;

    const yearBudget = budgetData[tahun] || [];
    const exists = yearBudget.some(
      (m) =>
        m.bulan.toLowerCase() === bulan.trim().toLowerCase() &&
        (!editingMonth || m.bulan !== editingMonth.bulan)
    );

    if (exists) {
      showNotification(`Bulan "${bulan}" sudah ada di tahun ${tahun}.`);
      return;
    }

    const updatedMonths = editingMonth
      ? yearBudget.map((m) => (m.bulan === editingMonth.bulan ? { ...formData } : m))
      : [formData, ...yearBudget];

    setBudgetData({ ...budgetData, [tahun]: updatedMonths });
    setSelectedYear(tahun);
    showNotification(editingMonth ? `Bulan "${bulan}" berhasil diupdate.` : `Bulan "${bulan}" berhasil ditambahkan.`);
    closeModal();
  };

  const handleDelete = (bulan) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus bulan ${bulan}?`)) {
      const updatedMonths = budgetData[selectedYear].filter((m) => m.bulan !== bulan);
      setBudgetData({ ...budgetData, [selectedYear]: updatedMonths });
      showNotification(`Bulan "${bulan}" berhasil dihapus.`);
    }
  };

  const years = Object.keys(budgetData);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-green-900 mb-6"
        >
          Kelola Anggaran DPR
        </motion.h1>

        {/* Tambah & Tahun */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch">
            <button
              onClick={() => openModal()}
              className="bg-green-900 text-yellow-100 px-4 py-2 rounded hover:bg-green-800 transition w-full sm:w-auto"
            >
              Tambah Anggaran DPR
            </button>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900 w-full sm:w-auto"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tabel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto bg-white shadow rounded-lg"
        >
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-green-900 text-white">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">Bulan</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Gaji & Tunjangan</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Dana Legislasi</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Dana Reses & Kunjungan</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Operasional Staf</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Biaya Badan</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {(budgetData[selectedYear] || []).map((month) => (
                  <motion.tr
                    key={month.bulan}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="hover:bg-green-50"
                  >
                    <td className="px-4 py-2">{month.bulan}</td>
                    <td className="px-4 py-2">{month.gaji_tunjangan.toLocaleString()}</td>
                    <td className="px-4 py-2">{month.dana_legislasi.toLocaleString()}</td>
                    <td className="px-4 py-2">{month.dana_reses_kunjungan.toLocaleString()}</td>
                    <td className="px-4 py-2">{month.operasional_staf.toLocaleString()}</td>
                    <td className="px-4 py-2">{month.biaya_badan.toLocaleString()}</td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => openModal(month)}
                        className="bg-green-900 text-yellow-100 px-3 py-1 rounded hover:bg-green-800 transition flex-1 sm:flex-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(month.bulan)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition flex-1 sm:flex-none"
                      >
                        Hapus
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {(budgetData[selectedYear] || []).length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                    Tidak ada data bulan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
              >
                <h2 className="text-xl font-bold text-green-900 mb-4">
                  {editingMonth ? "Edit Anggaran" : "Tambah Anggaran DPR"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <select
                    value={formData.bulan}
                    onChange={(e) => setFormData({ ...formData, bulan: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  >
                    <option value="" disabled>Pilih Bulan</option>
                    {monthList.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select
                    value={formData.tahun}
                    onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  >
                    <option value="" disabled>Pilih Tahun</option>
                    {yearList.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Gaji & Tunjangan"
                    value={formData.gaji_tunjangan}
                    onChange={(e) => setFormData({ ...formData, gaji_tunjangan: Number(e.target.value) })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Dana Legislasi"
                    value={formData.dana_legislasi}
                    onChange={(e) => setFormData({ ...formData, dana_legislasi: Number(e.target.value) })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Dana Reses & Kunjungan"
                    value={formData.dana_reses_kunjungan}
                    onChange={(e) => setFormData({ ...formData, dana_reses_kunjungan: Number(e.target.value) })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Operasional Staf"
                    value={formData.operasional_staf}
                    onChange={(e) => setFormData({ ...formData, operasional_staf: Number(e.target.value) })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Biaya Badan"
                    value={formData.biaya_badan}
                    onChange={(e) => setFormData({ ...formData, biaya_badan: Number(e.target.value) })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />

                  <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition flex-1 sm:flex-none"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-green-900 text-yellow-100 px-4 py-2 rounded hover:bg-green-800 transition flex-1 sm:flex-none"
                    >
                      {editingMonth ? "Simpan" : "Tambah"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-green-900 text-yellow-100 px-4 py-2 rounded shadow-lg z-50"
          >
            {notification}
          </motion.div>
        )}
      </div>
    </div>
  );
}
