// src/pages/Performance.jsx
import React, { useState } from "react";
import performanceDataRaw from "../data/performance.json";
import membersData from "../data/members.json";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Performance() {
  const navigate = useNavigate();

  // state postingan
  const [posts, setPosts] = useState(
    performanceDataRaw.map((p) => ({
      ...p,
      liked: false,
      comments: p.comments ? [...p.comments] : []
    }))
  );
  const [openImage, setOpenImage] = useState(null);
  const [openCommentsFor, setOpenCommentsFor] = useState(null);
  const [commentInputs, setCommentInputs] = useState({}); 

  // state filter & search
  const [search, setSearch] = useState("");
  const [filterFraksi, setFilterFraksi] = useState("All");
  const [filterJabatan, setFilterJabatan] = useState("All");

  // ambil opsi fraksi & jabatan dari members.json
  const fraksiOptions = Array.from(new Set(membersData.map((m) => m.fraksi)));
  const jabatanOptions = Array.from(new Set(membersData.map((m) => m.jabatan)));

  // toggle like
  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  // tambah komentar
  const addComment = (postId) => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: Date.now(), author: "Warga (Anonim)", text }
              ]
            }
          : p
      )
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    setOpenCommentsFor(postId);
  };

  const onMemberClick = (memberId) => {
    navigate(`/performance/${memberId}`);
  };

  const getMember = (memberId) =>
    membersData.find((m) => m.id === memberId) || null;

  // filter postingan
  const filteredPosts = posts.filter((post) => {
    const member = getMember(post.memberId);
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      (member && member.nama.toLowerCase().includes(search.toLowerCase()));
    const matchesFraksi =
      filterFraksi === "All" || (member && member.fraksi === filterFraksi);
    const matchesJabatan =
      filterJabatan === "All" || (member && member.jabatan === filterJabatan);
    return matchesSearch && matchesFraksi && matchesJabatan;
  });

  // animasi reusable
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-3xl font-bold text-center text-green-900"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Kinerja & Inisiatif Anggota DPR RI
        </motion.h1>

        <motion.p
          className="text-center text-green-800 mt-2 mb-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ikuti perkembangan kinerja anggota DPR RI melalui postingan dan inisiatif mereka.
        </motion.p>

        {/* Filter & Search */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-start gap-4 mb-6 flex-wrap"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 text-sm font-medium text-[#2e5339]">
              Cari Judul / Nama / Konten:
            </label>
            <input
              type="text"
              placeholder="Ketik kata kunci..."
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
        </motion.div>

        {/* Feed */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada postingan ditemukan.</p>
          ) : (
            filteredPosts.map((post, idx) => {
              const member = getMember(post.memberId);
              return (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-xl shadow p-4 overflow-hidden"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onMemberClick(member?.id)}
                      className="flex items-center gap-3 focus:outline-none"
                      title={member ? `Lihat profil ${member.nama}` : "Profil tidak ditemukan"}
                    >
                      <div className="w-12 h-9 md:w-14 md:h-10 overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
                        <img
                          src={member ? member.foto : "src/assets/potoDPR.png"}
                          alt={member ? member.nama : "Foto anggota"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="text-sm md:text-base font-semibold text-gray-800">
                          {member ? member.nama : "Anggota DPR"}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          {member ? `${member.jabatan} • ${member.fraksi}` : post.date}
                        </div>
                      </div>
                    </button>
                    <div className="ml-auto text-xs text-gray-400">{post.date}</div>
                  </div>

                  {/* Content */}
                  <div className="mt-3">
                    <h3 className="font-semibold text-gray-800 text-lg">{post.title}</h3>
                    <p className="text-gray-700 mt-2 text-sm md:text-base break-words">
                      {post.content.length > 220 ? (
                        <>
                          {post.content.slice(0, 220)}...
                          <span className="text-heroGreen font-medium ml-2">
                            Lihat selengkapnya
                          </span>
                        </>
                      ) : (
                        post.content
                      )}
                    </p>
                  </div>

                  {/* Image */}
                  {post.image && (
                    <div className="mt-3">
                      <button
                        onClick={() => setOpenImage(post.image)}
                        className="block w-full rounded-md overflow-hidden focus:outline-none"
                      >
                        <div className="w-full aspect-[4/3] bg-gray-100">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </button>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`px-3 py-2 rounded-md flex items-center gap-2 transition ${
                          post.liked
                            ? "bg-bravePink text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill={post.liked ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 010-6.364z"
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          {post.likes.toLocaleString()}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          setOpenCommentsFor(
                            openCommentsFor === post.id ? null : post.id
                          )
                        }
                        className="px-3 py-2 rounded-md bg-gray-100 text-gray-700"
                      >
                        Komentar ({post.comments.length})
                      </button>
                    </div>

                    <div className="text-sm text-gray-500">Bagikan</div>
                  </div>

                  {/* Comments */}
                  {openCommentsFor === post.id && (
                    <div className="mt-3 border-t pt-3">
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {post.comments.length === 0 ? (
                          <div className="text-sm text-gray-500">
                            Belum ada komentar.
                          </div>
                        ) : (
                          post.comments.map((c) => (
                            <div key={c.id} className="text-sm">
                              <span className="font-semibold text-gray-800">
                                {c.author}:
                              </span>{" "}
                              <span className="text-gray-700">{c.text}</span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <input
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))
                          }
                          placeholder="Tulis komentar..."
                          className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none"
                        />
                        <button
                          onClick={() => addComment(post.id)}
                          className="px-4 py-2 bg-heroGreen text-white rounded-md text-sm"
                        >
                          Kirim
                        </button>
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })
          )}
        </div>
      </div>

      {/* Image Modal */}
      {openImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setOpenImage(null)}
        >
          <div className="max-w-full max-h-full">
            <img
              src={openImage}
              alt="zoom"
              className="max-h-[90vh] max-w-[90vw] rounded-md object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
