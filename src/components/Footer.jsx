// src/components/Footer.jsx
import React from "react";
import logo from "../assets/logoDPR.png";

export default function Footer() {
  return (
    <footer className="bg-heroGreen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo & Deskripsi */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Logo PantauDPR"
              className="w-16 h-16 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-xl">PantauDPR</h3>
              <p className="text-sm text-white/80 mt-1 leading-relaxed">
                Platform web untuk memantau kinerja DPR RI dan transparansi legislatif demi masa depan pemerintahan yang berkelanjutan.
              </p>
            </div>
          </div>

          {/* Tautan Cepat */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-bravePink transition-colors" href="/">Beranda</a></li>
              <li><a className="hover:text-bravePink transition-colors" href="/about">Tentang</a></li>
              <li><a className="hover:text-bravePink transition-colors" href="/members">Anggota DPR</a></li>
              <li><a className="hover:text-bravePink transition-colors" href="/legislation">Progres RUU</a></li>
              <li><a className="hover:text-bravePink transition-colors" href="/budget">Anggaran</a></li>
            </ul>
          </div>

          {/* Kontak & Media Sosial */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Kontak & Media Sosial</h4>
            <p className="text-sm text-white/80 mb-3">
              Sampaikan masukan atau aspirasi melalui halaman Aspirasi Publik.
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon
                href="#"
                ariaLabel="Twitter"
                svgPath="M22 5.92c-.66.3-1.37.52-2.12.62.76-.45 1.34-1.17 1.61-2.02-.71.42-1.49.72-2.32.88A3.68 3.68 0 0 0 12.8 8.2c0 .29.03.58.1.85-3.06-.15-5.77-1.62-7.59-3.84-.31.53-.48 1.15-.48 1.81 0 1.25.64 2.35 1.62 3-.6-.02-1.17-.18-1.66-.46v.05c0 1.75 1.25 3.22 2.9 3.55-.3.08-.6.12-.92.12-.22 0-.44-.02-.65-.06.44 1.37 1.72 2.37 3.23 2.4A7.39 7.39 0 0 1 3 19.54 10.44 10.44 0 0 0 8.99 21c6.08 0 9.41-5.04 9.41-9.41v-.43c.64-.46 1.2-1.03 1.64-1.68-.59.26-1.23.44-1.9.52.69-.41 1.22-1.06 1.48-1.83z"
              />
              <SocialIcon
                href="#"
                ariaLabel="YouTube"
                svgPath="M23.5 6.2a2.9 2.9 0 0 0-2.05-2.05C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.45.65A2.9 2.9 0 0 0 .5 6.2 29.1 29.1 0 0 0 0 12a29.1 29.1 0 0 0 .5 5.8 2.9 2.9 0 0 0 2.05 2.05c1.96.65 9.45.65 9.45.65s7.5 0 9.45-.65A2.9 2.9 0 0 0 23.5 17.8 29.1 29.1 0 0 0 24 12a29.1 29.1 0 0 0-.5-5.8zM10 15.5v-7l6 3.5-6 3.5z"
              />
              <SocialIcon
                href="#"
                ariaLabel="GitHub"
                svgPath="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.72 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.53.11-3.18 0 0 .98-.31 3.21 1.18a11.2 11.2 0 0 1 5.84 0c2.23-1.5 3.21-1.18 3.21-1.18.63 1.65.23 2.88.11 3.18.75.8 1.2 1.82 1.2 3.08 0 4.45-2.69 5.43-5.25 5.72.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.11 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
              />
            </div>
          </div>
        </div>

        {/* Footer Bawah */}
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/80 space-y-1">
          <div>© {new Date().getFullYear()} PantauDPR — Tech for Sustainable Future</div>
          <div className="text-bravePink">Get Investor oleh Kelompok 5</div>
        </div>
      </div>
    </footer>
  );
}

// Sub-komponen Social Icon
function SocialIcon({ href, ariaLabel, svgPath }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="p-3 rounded-md bg-white/10 hover:bg-white/25 transition-colors"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d={svgPath} />
      </svg>
    </a>
  );
}
