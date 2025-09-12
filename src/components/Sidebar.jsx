// src/components/admin/Sidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef();

  const navLinks = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, to: "/admin/dashboard" },
    { label: "Anggota", icon: <Users className="w-5 h-5" />, to: "/admin/members" },
    { label: "Legislasi", icon: <FileText className="w-5 h-5" />, to: "/admin/legislation" },
    { label: "Anggaran", icon: <DollarSign className="w-5 h-5" />, to: "/admin/budget" },
    { label: "Aspirasi", icon: <MessageSquare className="w-5 h-5" />, to: "/admin/aspirations" },
    { label: "Pengaturan", icon: <Settings className="w-5 h-5" />, to: "/admin/settings" },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      navigate("/admin/login");
    }
  };

  // Close mobile menu when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const SidebarContent = (
    <div className="flex flex-col h-full bg-green-900 text-white w-64 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-gray-300">PantauDPR</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((item, idx) => {
            const isActive = location.pathname === item.to;
            return (
              <li key={idx}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-yellow-400 text-green-900"
                      : "hover:bg-green-800 hover:text-yellow-300"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 w-full text-left rounded-md text-sm font-medium hover:bg-green-800 hover:text-yellow-300 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="mt-auto text-sm text-white/80 space-y-1">
        <p>© {new Date().getFullYear()} PantauDPR — Transparansi & Akuntabilitas</p>
        <p className="text-bravePink">Dikembangkan oleh Kelompok 5</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex">{SidebarContent}</aside>

      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-green-900 text-white rounded-md shadow-md"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full">{SidebarContent}</div>
      </div>
    </>
  );
}
