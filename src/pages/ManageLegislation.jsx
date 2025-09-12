// src/pages/ManageLegislation.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import legislationData from "../data/legislation.json";

const statusColors = {
  "Disahkan": "bg-green-200 text-green-800",
  "Dalam Pembahasan": "bg-yellow-200 text-yellow-800",
  "Ditolak": "bg-red-200 text-red-800",
  "Dalam Proses": "bg-blue-200 text-blue-800",
};

export default function ManageLegislation() {
  const location = useLocation();

  // Scroll ke atas setiap kali route berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  const [laws, setLaws] = useState(legislationData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLaw, setEditingLaw] = useState(null);
  const [formData, setFormData] = useState({
    judul: "",
    status: "Dalam Pembahasan",
    tanggal: "",
    komisi: "",
  });

  const filteredLaws = laws.filter((law) =>
    [law.judul, law.status, law.tanggal, law.komisi]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openModal = (law = null) => {
    setEditingLaw(law);
    if (law) {
      setFormData({
        judul: law.judul,
        status: law.status,
        tanggal: law.tanggal,
        komisi: law.komisi,
      });
    } else {
      setFormData({
        judul: "",
        status: "Dalam Pembahasan",
        tanggal: "",
        komisi: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLaw(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLaw) {
      setLaws((prev) =>
        prev.map((law) =>
          law.id === editingLaw.id ? { ...law, ...formData } : law
        )
      );
    } else {
      const newLaw = {
        id: laws.length + 1,
        ...formData,
      };
      setLaws((prev) => [newLaw, ...prev]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus RUU ini?")) {
      setLaws((prev) => prev.filter((law) => law.id !== id));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-green-900 mb-6"
        >
          Kelola Legislasi / RUU
        </motion.h1>

        {/* Tambah & Search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"
        >
          <button
            onClick={() => openModal()}
            className="bg-green-900 text-yellow-100 px-4 py-2 rounded hover:bg-green-800 transition w-full sm:w-auto"
          >
            Tambah RUU
          </button>
          <input
            type="text"
            placeholder="Cari judul, status, tanggal, atau komisi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-900"
          />
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
                <th className="px-4 py-2 text-left text-sm font-semibold">Judul RUU</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Tanggal</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Komisi</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredLaws.map((law) => (
                  <motion.tr
                    key={law.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="hover:bg-green-50"
                  >
                    <td className="px-4 py-2">{law.judul}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[law.status] || "bg-gray-200 text-gray-800"}`}>
                        {law.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{law.tanggal}</td>
                    <td className="px-4 py-2">{law.komisi}</td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => openModal(law)}
                        className="bg-green-900 text-yellow-100 px-3 py-1 rounded hover:bg-green-800 transition flex-1 sm:flex-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(law.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition flex-1 sm:flex-none"
                      >
                        Hapus
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredLaws.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                    Tidak ada RUU ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Modal Tambah/Edit */}
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
                  {editingLaw ? "Edit RUU" : "Tambah RUU"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Judul RUU"
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="date"
                    placeholder="Tanggal"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Komisi"
                    value={formData.komisi}
                    onChange={(e) => setFormData({ ...formData, komisi: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                  >
                    <option value="Dalam Pembahasan">Dalam Pembahasan</option>
                    <option value="Disahkan">Disahkan</option>
                    <option value="Ditolak">Ditolak</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                  </select>

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
                      {editingLaw ? "Simpan" : "Tambah"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
