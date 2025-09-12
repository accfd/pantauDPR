// src/pages/Budget.jsx
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import budgetData from "../data/budget.json";
import { CSVLink } from "react-csv";
import { motion, AnimatePresence } from "framer-motion"; // ✅ animasi

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Budget = () => {
  const [tahun, setTahun] = useState("2024");
  const [bulan, setBulan] = useState("Semua");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!budgetData[tahun]) return;

    let filtered = budgetData[tahun];
    if (bulan !== "Semua") {
      filtered = filtered.filter((d) => d.bulan === bulan);
    }

    const labels = filtered.map((d) => d.bulan);
    const datasets = [
      {
        label: "Gaji & Tunjangan",
        data: filtered.map((d) => d.gaji_tunjangan),
        backgroundColor: "rgba(46,83,57,0.8)",
      },
      {
        label: "Dana Legislasi",
        data: filtered.map((d) => d.dana_legislasi),
        backgroundColor: "rgba(244,180,0,0.8)",
      },
      {
        label: "Dana Reses & Kunjungan",
        data: filtered.map((d) => d.dana_reses_kunjungan),
        backgroundColor: "rgba(220,38,38,0.8)",
      },
      {
        label: "Operasional Staf",
        data: filtered.map((d) => d.operasional_staf),
        backgroundColor: "rgba(37,99,235,0.8)",
      },
      {
        label: "Biaya Badan",
        data: filtered.map((d) => d.biaya_badan),
        backgroundColor: "rgba(168,85,247,0.8)",
      },
    ];

    setChartData({ labels, datasets });
    setTableData(filtered);
  }, [tahun, bulan]);

  const totalBulanan = tableData.reduce(
    (sum, d) =>
      sum +
      d.gaji_tunjangan +
      d.dana_legislasi +
      d.dana_reses_kunjungan +
      d.operasional_staf +
      d.biaya_badan,
    0
  );
  const totalTahunan =
    budgetData[tahun]?.reduce(
      (sum, d) =>
        sum +
        d.gaji_tunjangan +
        d.dana_legislasi +
        d.dana_reses_kunjungan +
        d.operasional_staf +
        d.biaya_badan,
      0
    ) || 0;

  const bulanOptions = [
    "Semua",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const tahunOptions = Object.keys(budgetData);

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center text-green-900">
          Transparansi Anggaran DPR RI
        </h1>
        <p className="text-center text-green-800 mt-2 mb-6">
          Pantau alokasi anggaran DPR RI per bulan & tahun.
        </p>

        {/* Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <select
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="border p-2 rounded"
          >
            {tahunOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={bulan}
            onChange={(e) => setBulan(e.target.value)}
            className="border p-2 rounded"
          >
            {bulanOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <CSVLink
            data={tableData}
            filename={`anggaran_dpr_${tahun}.csv`}
            className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download CSV
          </CSVLink>
        </motion.div>

        {/* Chart */}
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: { mode: "index", intersect: false },
                legend: { position: "top" },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => "Rp " + value.toLocaleString(),
                  },
                },
              },
            }}
            height={400}
          />
        </motion.div>

        {/* Tabel */}
        <motion.div
          className="overflow-x-auto mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <table className="min-w-full border border-green-900">
            <thead className="bg-green-100">
              <tr>
                <th className="border px-4 py-2">Bulan</th>
                <th className="border px-4 py-2">Gaji & Tunjangan</th>
                <th className="border px-4 py-2">Dana Legislasi</th>
                <th className="border px-4 py-2">Dana Reses & Kunjungan</th>
                <th className="border px-4 py-2">Operasional Staf</th>
                <th className="border px-4 py-2">Biaya Badan</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {tableData.map((d, idx) => (
                  <motion.tr
                    key={idx}
                    className="hover:bg-green-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <td className="border px-4 py-2">{d.bulan}</td>
                    <td className="border px-4 py-2">
                      {d.gaji_tunjangan.toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {d.dana_legislasi.toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {d.dana_reses_kunjungan.toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {d.operasional_staf.toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {d.biaya_badan.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}

                {/* Total Bulanan */}
                {bulan !== "Semua" && (
                  <motion.tr
                    key="totalBulanan"
                    className="bg-green-200 font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="border px-4 py-2">Total Bulanan</td>
                    <td className="border px-4 py-2" colSpan={5}>
                      {totalBulanan.toLocaleString()}
                    </td>
                  </motion.tr>
                )}

                {/* Total Tahunan */}
                <motion.tr
                  key="totalTahunan"
                  className="bg-green-300 font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="border px-4 py-2">Total Tahunan</td>
                  <td className="border px-4 py-2" colSpan={5}>
                    {totalTahunan.toLocaleString()}
                  </td>
                </motion.tr>
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Budget;
