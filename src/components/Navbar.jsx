import React, { useRef, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logoDPR.png";

const MENU_ITEMS = [
  { to: "/", label: "Beranda" },
  { to: "/about", label: "Tentang" },
  { to: "/members", label: "Anggota DPR" },
  { to: "/performance", label: "Kinerja DPR" },
  { to: "/legislation", label: "Progres Legislasi" },
  { to: "/budget", label: "Anggaran" },
  { to: "/aspirations", label: "Aspirasi Publik" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const NavItem = ({ to, label, onClick }) => (
    <NavLink
      to={to}
      onClick={() => {
        scrollToTop();
        if (onClick) onClick();
      }}
      className={({ isActive }) =>
        "block px-3 py-2 rounded-md text-sm font-medium transition-colors " +
        (isActive
          ? "bg-bravePink text-white shadow"
          : "text-white hover:text-bravePink hover:bg-white/10")
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-heroGreen text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" onClick={scrollToTop}>
              <img
                src={logo}
                alt="PantauDPR logo"
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="leading-4">
                <div className="text-lg font-semibold">
                  Pantau<span className="text-bravePink">DPR</span>
                </div>
                <div className="text-xs text-white/80">
                  Transparansi & Akuntabilitas
                </div>
              </div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {MENU_ITEMS.map((item) => (
                <NavItem key={item.to} to={item.to} label={item.label} />
              ))}
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M6 18L18 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-heroGreen">
            {MENU_ITEMS.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
