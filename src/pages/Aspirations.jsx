// src/pages/Aspirations.jsx
import React, { useState } from "react";
import aspirationsData from "../data/aspirations.json";
import { motion } from "framer-motion";

export default function Aspirations() {
  const [aspirations, setAspirations] = useState(aspirationsData);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const [filterCategory, setFilterCategory] = useState("Semua");
  const [sortByLikes, setSortByLikes] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState({});
  const [zoomedPhoto, setZoomedPhoto] = useState(null);

  // Upload aspirasi baru
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Judul aspirasi wajib diisi.");
      return;
    }
    if (!category.trim()) {
      setError("Kategori aspirasi wajib dipilih.");
      return;
    }
    if (!description.trim()) {
      setError("Deskripsi aspirasi wajib diisi.");
      return;
    }
    setError("");

    const newAspiration = {
      id: aspirations.length + 1,
      title,
      category,
      description,
      image: image ? URL.createObjectURL(image) : null,
      likes: 0,
    };

    setAspirations([newAspiration, ...aspirations]);
    setTitle("");
    setCategory("");
    setDescription("");
    setImage(null);
  };

  // Toggle dukungan
  const toggleLike = (id) => {
    setAspirations((prev) =>
      prev.map((asp) =>
        asp.id === id
          ? { ...asp, likes: asp.likes + (asp.liked ? -1 : 1), liked: !asp.liked }
          : asp
      )
    );
  };

  // Toggle lihat deskripsi lengkap
  const toggleDescription = (id) => {
    setShowFullDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter & sorting aspirasi
  const filteredAspirations = aspirations
    .filter((asp) =>
      filterCategory === "Semua" ? true : asp.category === filterCategory
    )
    .sort((a, b) => (sortByLikes ? b.likes - a.likes : 0));

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Judul */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-green-900"
        >
          Aspirasi Publik untuk DPR RI
        </motion.h1>

        {/* Deskripsi */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-green-800 mt-2 mb-6"
        >
          Tulis dan dukung aspirasi yang ingin disampaikan ke DPR RI.
        </motion.p>

        {/* Form Upload Aspirasi */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="mb-12 p-6 bg-white shadow rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Tulis Aspirasi Baru
          </h2>

          <input
            type="text"
            placeholder="Judul Aspirasi"
            className="w-full p-3 border rounded-lg mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && !title && (
            <p className="text-red-500 text-sm mb-2">Judul wajib diisi.</p>
          )}

          <select
            className="w-full p-3 border rounded-lg mb-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Pilih Kategori</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Energi">Energi</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Kebudayaan">Kebudayaan</option>
            <option value="Keadilan">Keadilan</option>
            <option value="Ketenagakerjaan">Ketenagakerjaan</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Hukum">Hukum</option>
            <option value="Lingkungan">Lingkungan</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Perumahan">Perumahan</option>
            <option value="Pertanian">Pertanian</option>
            <option value="Politik">Politik</option>
            <option value="Sosial">Sosial</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Transportasi">Transportasi</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Legislasi">Legislasi</option>
          </select>
          {error && !category && (
            <p className="text-red-500 text-sm mb-2">Kategori wajib dipilih.</p>
          )}

          <textarea
            placeholder="Deskripsi Aspirasi"
            className="w-full p-3 border rounded-lg mb-2"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {error && !description && (
            <p className="text-red-500 text-sm mb-2">Deskripsi wajib diisi.</p>
          )}

          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-lg mb-4"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            type="submit"
            className="px-6 py-3 bg-heroGreen text-white rounded-lg font-medium hover:bg-heroGreen/90 transition w-full sm:w-auto"
          >
            Kirim Aspirasi
          </button>
        </motion.form>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-700">Filter Kategori:</label>
            <select
              className="p-2 border rounded-lg"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="Semua">Semua</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Energi">Energi</option>
              <option value="Infrastruktur">Infrastruktur</option>
              <option value="Kebudayaan">Kebudayaan</option>
              <option value="Keadilan">Keadilan</option>
              <option value="Ketenagakerjaan">Ketenagakerjaan</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Hukum">Hukum</option>
              <option value="Lingkungan">Lingkungan</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Perumahan">Perumahan</option>
              <option value="Pertanian">Pertanian</option>
              <option value="Politik">Politik</option>
              <option value="Sosial">Sosial</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Legislasi">Legislasi</option>
            </select>
          </div>

          <button
            onClick={() => setSortByLikes(!sortByLikes)}
            className="mt-4 md:mt-0 px-4 py-2 bg-bravePink text-white rounded-lg font-medium hover:bg-bravePink/90 transition"
          >
            {sortByLikes ? "Urutkan Default" : "Urutkan Dukungan Terbanyak"}
          </button>
        </motion.div>

        {/* Daftar Aspirasi */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAspirations.map((asp, i) => (
            <motion.div
              key={asp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white shadow rounded-lg flex flex-col justify-between overflow-hidden"
            >
              <div>
                <h2 className="font-semibold text-lg text-gray-800 break-words">
                  {asp.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{asp.category}</p>
                <p className="text-gray-600 break-words">
                  {showFullDesc[asp.id] || asp.description.length <= 150
                    ? asp.description
                    : `${asp.description.slice(0, 150)}...`}
                </p>
                {asp.description.length > 150 && (
                  <button
                    onClick={() => toggleDescription(asp.id)}
                    className="text-heroGreen font-medium mt-1 underline"
                  >
                    {showFullDesc[asp.id] ? "Sembunyikan" : "Lihat Selengkapnya"}
                  </button>
                )}

                {asp.image && (
                  <img
                    src={asp.image}
                    alt="Bukti Aspirasi"
                    className="mt-3 rounded-lg max-h-64 w-full object-cover cursor-pointer hover:opacity-90 transition"
                    onClick={() => setZoomedPhoto(asp.image)}
                  />
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => toggleLike(asp.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    asp.liked
                      ? "bg-bravePink text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {asp.liked ? "Batal Dukung" : "Dukung"}
                </button>
                <span className="text-gray-600 text-sm">
                  👍 {asp.likes} Dukungan
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Zoom Foto */}
      {zoomedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setZoomedPhoto(null)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={zoomedPhoto}
            alt="zoomed"
            className="max-h-[90%] max-w-[90%] rounded-lg"
          />
        </motion.div>
      )}
    </main>
  );
}
