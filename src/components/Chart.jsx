// src/components/Chart.jsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const DEFAULT_DATA = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 48 },
  { name: "Apr", value: 70 },
  { name: "May", value: 65 },
  { name: "Jun", value: 80 },
];

const COLORS = ["#1B602F", "#F784C5", "#6B7280", "#F59E0B", "#10B981"];

export default function Chart({
  type = "line", // 'line' | 'bar' | 'pie'
  data = DEFAULT_DATA,
  dataKey = "value",
  nameKey = "name",
  height = 300,
}) {
  if (type === "pie") {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey={dataKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "bar") {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={nameKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#F784C5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // default: line
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#1B602F" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
