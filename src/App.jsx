// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import Pages
import About from "./pages/About";
import Aspirations from "./pages/Aspirations";
import Budget from "./pages/Budget";
import Home from "./pages/Home";
import Legislation from "./pages/Legislation";
import Members from "./pages/Members";
import Performance from "./pages/Performance";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ManageMembers from "./pages/ManageMembers";
import ManageLegislation from "./pages/ManageLegislation";
import ManageBudget from "./pages/ManageBudget";
import ManageAspirations from "./pages/ManageAspirations";
import AdminSettings from "./pages/AdminSettings";  

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar hanya untuk publik */}
      {!isAdmin && <Navbar />}

      {/* Content */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/aspirations" element={<Aspirations />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/legislation" element={<Legislation />} />
          <Route path="/members" element={<Members />} />
          <Route path="/performance" element={<Performance />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<ManageMembers />} />
          <Route path="/admin/legislation" element={<ManageLegislation />} />
          <Route path="/admin/budget" element={<ManageBudget />} />
          <Route path="/admin/aspirations" element={<ManageAspirations />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

        </Routes>
      </main>

      {/* Footer hanya untuk publik */}
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
