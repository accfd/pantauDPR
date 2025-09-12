// src/pages/ManageMembers.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar"; // Path sudah diperbaiki
import membersData from "../data/members.json";

export default function ManageMembers() {
  const [members, setMembers] = useState(membersData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    fraksi: "",
    dapil: "",
  });
  const [fotoPreview, setFotoPreview] = useState("/potoDPR.png");

  const filteredMembers = members.filter((member) =>
    [member.nama, member.fraksi, member.dapil]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openModal = (member = null) => {
    setEditingMember(member);
    if (member) {
      setFormData({
        nama: member.nama,
        jabatan: member.jabatan,
        fraksi: member.fraksi,
        dapil: member.dapil,
      });
      setFotoPreview(member.foto || "/potoDPR.png");
    } else {
      setFormData({ nama: "", jabatan: "", fraksi: "", dapil: "" });
      setFotoPreview("/potoDPR.png");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFotoPreview("/potoDPR.png");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id
            ? { ...m, ...formData, foto: fotoPreview }
            : m
        )
      );
    } else {
      const newMember = {
        id: members.length + 1,
        ...formData,
        foto: fotoPreview,
      };
      setMembers((prev) => [newMember, ...prev]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
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
          Kelola Anggota DPR
        </motion.h1>

        {/* Aksi Tambah & Search */}
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
            Tambah Anggota
          </button>
          <input
            type="text"
            placeholder="Cari anggota, fraksi, atau dapil..."
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
                <th className="px-4 py-2 text-left text-sm font-semibold">Foto</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Nama</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Jabatan</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Fraksi</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Dapil</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredMembers.map((member) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="hover:bg-green-50"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={member.foto || "/potoDPR.png"}
                        alt={member.nama}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{member.nama}</td>
                    <td className="px-4 py-2">{member.jabatan}</td>
                    <td className="px-4 py-2">{member.fraksi}</td>
                    <td className="px-4 py-2">{member.dapil}</td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => openModal(member)}
                        className="bg-green-900 text-yellow-100 px-3 py-1 rounded hover:bg-green-800 transition flex-1 sm:flex-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition flex-1 sm:flex-none"
                      >
                        Hapus
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    Tidak ada anggota ditemukan.
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
                  {editingMember ? "Edit Anggota" : "Tambah Anggota"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {/* Drag & Drop Foto */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-dashed border-2 border-gray-300 rounded p-4 flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <img
                      src={fotoPreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full mb-2 object-cover"
                    />
                    <p className="text-gray-500 text-sm">
                      Drag & drop foto di sini atau klik untuk upload
                    </p>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Jabatan"
                    value={formData.jabatan}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Fraksi"
                    value={formData.fraksi}
                    onChange={(e) => setFormData({ ...formData, fraksi: e.target.value })}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dapil"
                    value={formData.dapil}
                    onChange={(e) => setFormData({ ...formData, dapil: e.target.value })}
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
                      {editingMember ? "Simpan" : "Tambah"}
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
