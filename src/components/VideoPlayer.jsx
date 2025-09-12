// src/components/VideoPlayer.jsx
import React, { useState } from "react";

export default function VideoPlayer({
  title = "PantauDPR Intro",
  youtubeId = "-yvrkDr75as", // ID video kamu
  thumbnail = `https://img.youtube.com/vi/-yvrkDr75as/maxresdefault.jpg`, // thumbnail otomatis
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-full h-56 object-cover md:h-72"
            loading="lazy"
          />
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 flex items-center justify-center focus:outline-none"
            aria-label={`Play ${title}`}
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              {/* Play icon */}
              <svg
                className="w-8 h-8 text-heroGreen"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="text-sm font-semibold text-gray-800">{title}</div>
          <div className="text-xs text-gray-500 mt-1">
            Video perkenalan singkat tentang PantauDPR (≥ 30s).
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl bg-transparent">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-6 right-0 bg-white rounded-full p-2 shadow focus:outline-none"
              aria-label="Close video"
            >
              {/* Close */}
              <svg
                className="w-5 h-5 text-heroGreen"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title={title}
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[56vw] md:h-[36vw] rounded"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
