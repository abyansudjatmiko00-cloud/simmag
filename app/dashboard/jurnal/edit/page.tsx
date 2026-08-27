"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function EditJurnalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getJournal() {
      if (!id) {
        setMessage("ID jurnal tidak ditemukan.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("journals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("SUPABASE ERROR:", error);

        setMessage(
          `Gagal mengambil data jurnal. ${error.message || ""}`
        );

        setLoading(false);
        return;
      }

      setTitle(data.title || "");
      setDescription(data.description || "");

      setLoading(false);
    }

    getJournal();
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!id) {
      setMessage("ID jurnal tidak ditemukan.");
      return;
    }

    if (!title.trim()) {
      setMessage("Judul kegiatan wajib diisi.");
      return;
    }

    if (!description.trim()) {
      setMessage("Deskripsi kegiatan wajib diisi.");
      return;
    }

    if (saving) {
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("journals")
      .update({
        title: title.trim(),
        description: description.trim(),
      })
      .eq("id", id);

    if (error) {
      console.error("SUPABASE ERROR:", error);

      setMessage(
        `Gagal mengubah jurnal. ${error.message || ""}`
      );

      setSaving(false);
      return;
    }

    setMessage("Jurnal berhasil diperbarui!");

    setTimeout(() => {
      router.push("/dashboard/jurnal");
    }, 1000);
  }

  if (loading) {
    return (
      <main className="dashboard">
        <section className="dashboard-content">
          <h1>Memuat jurnal...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">S</span>
          <span>SIMMAG</span>
        </div>

        <nav className="sidebar-menu">
          <Link
            href="/dashboard"
            className="menu-item"
          >
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
          <Link
            href="/"
            className="menu-item"
          >
            <span>🏠</span>
            Halaman Utama
          </Link>

          <Link
            href="/login"
            className="menu-item logout"
          >
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

            <h1>Edit Jurnal</h1>

            <p className="header-description">
              Ubah informasi kegiatan magang kamu.
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
        <div className="dashboard-card journal-form-card">
          <div className="journal-form-header">
            <span className="small-title">
              EDIT JURNAL
            </span>

            <h2>Ubah Kegiatan</h2>

            <p>
              Perbarui informasi kegiatan magang kamu.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* JUDUL */}
            <div className="form-group">
              <label htmlFor="title">
                Judul Kegiatan
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Masukkan judul kegiatan"
                required
                disabled={saving}
              />
            </div>

            {/* DESKRIPSI */}
            <div className="form-group">
              <label htmlFor="description">
                Deskripsi Kegiatan
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Masukkan deskripsi kegiatan"
                rows={7}
                required
                disabled={saving}
              />
            </div>

            {/* MESSAGE */}
            {message && (
              <div className="journal-message">
                {message}
              </div>
            )}

            {/* ACTIONS */}
            <div className="journal-form-actions">
              <Link
                href="/dashboard/jurnal"
                className="cancel-button"
              >
                Batal
              </Link>

              <button
                type="submit"
                className="submit-journal-button"
                disabled={saving}
              >
                {saving
                  ? "Menyimpan..."
                  : "Simpan Perubahan →"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default function EditJurnalPage() {
  return (
    <Suspense
      fallback={
        <main className="dashboard">
          <section className="dashboard-content">
            <div className="journal-empty">
              Memuat halaman edit jurnal...
            </div>
          </section>
        </main>
      }
    >
      <EditJurnalContent />
    </Suspense>
  );
}