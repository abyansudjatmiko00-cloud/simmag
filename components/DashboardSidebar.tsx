"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(path);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="mobile-dashboard-header">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
        >
          ☰
        </button>

        <div className="mobile-dashboard-logo">
          <span className="logo-icon">S</span>
          <span>SIMMAG</span>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <button
          type="button"
          className="mobile-sidebar-overlay"
          onClick={closeMenu}
          aria-label="Tutup menu"
        />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-logo">
          <span className="logo-icon">S</span>
          <span>SIMMAG</span>

          {/* CLOSE BUTTON MOBILE */}
          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={closeMenu}
            aria-label="Tutup menu"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-menu">
          <Link
            href="/dashboard"
            className={`menu-item ${
              isActive("/dashboard") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <span>📊</span>
            Dashboard
          </Link>

          <Link
            href="/dashboard/jurnal"
            className={`menu-item ${
              isActive("/dashboard/jurnal") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <span>📖</span>
            Jurnal Harian
          </Link>

          <Link
            href="/dashboard/absensi"
            className={`menu-item ${
              isActive("/dashboard/absensi") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <span>📅</span>
            Absensi
          </Link>

          <Link
            href="/dashboard/pengajuan"
            className={`menu-item ${
              isActive("/dashboard/pengajuan") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <span>📋</span>
            Pengajuan Magang
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <Link
            href="/"
            className="menu-item"
            onClick={closeMenu}
          >
            <span>🏠</span>
            Halaman Utama
          </Link>

          <Link
            href="/login"
            className="menu-item logout"
            onClick={closeMenu}
          >
            <span>↪</span>
            Keluar
          </Link>
        </div>
      </aside>
    </>
  );
}