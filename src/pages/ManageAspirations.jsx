// src/pages/ManageAspirations.jsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import aspirationsDataJson from "../data/aspirations.json";

export default function ManageAspirations() {
  const [search, setSearch] = useState("");
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterLikes, setFilterLikes] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState(aspirationsDataJson);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const categoryOptions = [
    "Ekonomi","Energi","Infrastruktur","Kebudayaan","Keadilan",
    "Ketenagakerjaan","Keamanan","Hukum","Lingkungan","Pendidikan",
    "Perumahan","Pertanian","Politik","Sosial","Teknologi","Transportasi",
    "Kesehatan","Legislasi"
  ];

  const likesOptions = ["All", "Tertinggi", "Terendah"];

  // Scroll ke atas saat page berubah
  useEffect(() => window.scrollTo({ top: 0, behavior: "auto" }), [currentPage]);

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = data.filter((asp) => {
      const matchesSearch =
        asp.title.toLowerCase().includes(search.toLowerCase()) ||
        asp.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        filterCategories.length === 0 ||
        asp.category.some((c) => filterCategories.includes(c));
      return matchesSearch && matchesCategory;
    });

    if (filterLikes === "Tertinggi") filtered.sort((a, b) => b.likes - a.likes);
    else if (filterLikes === "Terendah") filtered.sort((a, b) => a.likes - b.likes);

    return filtered;
  }, [data, search, filterCategories, filterLikes]);

  // Sort
  const sortedData = useMemo(() => {
    if (filterLikes !== "All") return filteredData;
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortOrder, filterLikes]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilterCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const reason = prompt("Masukkan alasan penghapusan aspirasi ini:");
    if (!reason) return;
    if (window.confirm(`Apakah yakin ingin menghapus aspirasi ini?\nAlasan: ${reason}`)) {
      setData((prev) => prev.filter((asp) => asp.id !== id));
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
          className="text-3xl md:text-4xl font-bold text-green-900 mb-6 text-center md:text-left"
        >
          Kelola Aspirasi Rakyat
        </motion.h1>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-start items-start gap-4 mb-4"
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Cari aspirasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900 flex-1 min-w-[180px]"
          />

          {/* Kategori Dropdown */}
          <div className="relative w-full sm:w-64">
            <button
              onClick={() => setCategoryDropdownOpen((prev) => !prev)}
              className="w-full px-4 py-2 border rounded text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-900"
            >
              {filterCategories.length === 0 ? "Pilih Kategori" : filterCategories.join(", ")}
              <span className="ml-2">&#9662;</span>
            </button>
            <AnimatePresence>
              {categoryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-1 w-full bg-white border rounded shadow z-50 max-h-60 overflow-y-auto"
                >
                  {categoryOptions.map((c) => (
                    <label
                      key={c}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={c}
                        checked={filterCategories.includes(c)}
                        onChange={handleCategoryChange}
                      />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Likes */}
          <div className="w-full sm:w-48">
            <select
              value={filterLikes}
              onChange={(e) => setFilterLikes(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-900 w-full"
            >
              {likesOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "All"
                    ? "Urutkan Dukungan"
                    : opt === "Tertinggi"
                    ? "Pendukung Terbanyak"
                    : "Pendukung Paling Sedikit"}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto bg-white shadow rounded-lg"
        >
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-green-900 text-white">
              <tr>
                {["id","title","category","description","likes","aksi"].map((field) => (
                  <th
                    key={field}
                    className="px-4 py-2 text-left text-sm font-semibold cursor-pointer select-none"
                    onClick={() => field !== "aksi" && handleSort(field)}
                  >
                    {field === "id"
                      ? "ID"
                      : field === "title"
                      ? "Judul"
                      : field === "category"
                      ? "Kategori"
                      : field === "description"
                      ? "Deskripsi"
                      : field === "likes"
                      ? "Likes"
                      : "Aksi"}
                    {sortField === field && (sortOrder === "asc" ? " ▲" : " ▼")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    Tidak ada aspirasi
                  </td>
                </tr>
              ) : (
                currentItems.map((asp) => (
                  <tr key={asp.id} className="hover:bg-green-50">
                    <td className="px-4 py-2">{asp.id}</td>
                    <td className="px-4 py-2">{asp.title}</td>
                    <td className="px-4 py-2">{asp.category.join(", ")}</td>
                    <td className="px-4 py-2">{asp.description}</td>
                    <td className="px-4 py-2">{asp.likes.toLocaleString()}</td>
                    <td className="px-4 py-2 align-middle text-center">
                        <button
                            onClick={() => handleDelete(asp.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition inline-block"
                        >
                         Hapus
                        </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 border rounded hover:bg-gray-100 transition ${
                  currentPage === num ? "bg-green-900 text-yellow-100" : ""
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
