"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TambahJurnalPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase
      .from("journals")
      .insert({
        title: title,
        description: description,
        status: "Selesai",
      });

   if (error) {
  setMessage(
    `Gagal: ${error.message} | Code: ${error.code} | Detail: ${error.details || "-"}`
  );

  setLoading(false);
  return;
}

    setMessage("Jurnal berhasil disimpan!");

    setTitle("");
    setDescription("");
    setLoading(false);
  };

  return (
    <main className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <span className="logo-icon">S</span>
          <span>SIMMAG</span>
        </div>

        <nav className="sidebar-menu">

          <Link href="/dashboard" className="menu-item">
            <span>📊</span>
            Dashboard
          </Link>

          <Link
            href="/dashboard/jurnal"
            className="menu-item active"
          >
            <span>📖</span>
            Jurnal Harian
          </Link>

          <Link
            href="/dashboard/absensi"
            className="menu-item"
          >
            <span>📅</span>
            Absensi
          </Link>

          <Link
            href="/dashboard/pengajuan"
            className="menu-item"
          >
            <span>📋</span>
            Pengajuan Magang
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link href="/" className="menu-item">
            <span>🏠</span>
            Halaman Utama
          </Link>

          <Link href="/login" className="menu-item logout">
            <span>↪</span>
            Keluar
          </Link>

        </div>

      </aside>


      {/* CONTENT */}
      <section className="dashboard-content">

        {/* HEADER */}
        <header className="dashboard-header">

          <div>

            <p className="dashboard-label">
              JURNAL HARIAN
            </p>

            <h1>
              Tambah Jurnal
            </h1>

            <p className="header-description">
              Catat kegiatan magang yang kamu lakukan hari ini.
            </p>

          </div>

          <div className="profile">

            <div className="profile-avatar">
              A
            </div>

            <div>
              <strong>Abyan</strong>
              <span>Siswa</span>
            </div>

          </div>

        </header>


        {/* FORM */}
        <div className="journal-form-card">

          <div className="journal-form-heading">

            <span className="small-title">
              JURNAL KEGIATAN
            </span>

            <h2>
              Tambahkan Kegiatan
            </h2>

            <p>
              Isi informasi kegiatan magang kamu.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Judul Kegiatan
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Membuat desain dashboard"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Deskripsi Kegiatan
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan kegiatan yang kamu lakukan..."
                rows={7}
                required
              />

            </div>


            {message && (
              <div className="journal-message">
                {message}
              </div>
            )}


            <div className="journal-form-actions">

              <Link
                href="/dashboard/jurnal"
                className="cancel-button"
              >
                Batal
              </Link>

              <button
                type="submit"
                className="submit-application-button"
                disabled={loading}
              >
                {loading
                  ? "Menyimpan..."
                  : "Simpan Jurnal →"}
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}