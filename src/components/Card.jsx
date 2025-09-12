// src/components/Card.jsx
import React from "react";

export default function Card({
  title,
  subtitle,
  children,
  footer,
  className = "",
  stat,
  accent = "heroGreen", // not a Tailwind class, used for inline style fallback
}) {
  // allow className overrides but keep default layout
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          {title && <div className="text-sm font-semibold text-gray-800">{title}</div>}
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        </div>

        {stat !== undefined && (
          <div className="ml-4 text-right">
            <div className="text-lg font-bold text-gray-800">{stat}</div>
            <div className="text-xs text-gray-500">value</div>
          </div>
        )}
      </div>

      <div className="p-4">
        {children ? children : <div className="text-sm text-gray-600">No content</div>}
      </div>

      {footer && <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500">{footer}</div>}
    </div>
  );
}
