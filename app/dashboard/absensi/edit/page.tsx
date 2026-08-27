"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function EditAbsensiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [attendanceDate, setAttendanceDate] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [checkIn, setCheckIn] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadAttendance() {
      if (!id) {
        setMessage("ID absensi tidak ditemukan.");
        setLoading(false);
        return;
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil absensi:", error);
        setMessage("Data absensi tidak ditemukan.");
        setLoading(false);
        return;
      }

      setAttendanceDate(data.attendance_date || "");
      setStatus(data.status || "Hadir");
      setCheckIn(data.check_in || "");

      setLoading(false);
    }

    loadAttendance();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");

    if (!id) {
      setMessage("ID absensi tidak ditemukan.");
      return;
    }

    if (!attendanceDate) {
      setMessage("Tanggal absensi wajib diisi.");
      return;
    }

    if (saving) {
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const { error } = await supabase
      .from("attendance")
      .update({
        attendance_date: attendanceDate,
        status: status,
        check_in: checkIn || null,
      })
      .eq("id", id);

    if (error) {
      console.error("SUPABASE ERROR:", error);

      setMessage(
        `Gagal mengubah absensi. ${error.message || ""}`
      );

      setSaving(false);
      return;
    }

    setMessage("Absensi berhasil diperbarui!");

    setTimeout(() => {
      router.push("/dashboard/absensi");
    }, 1000);
  }

  if (loading) {
    return (
      <main className="dashboard">
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
              className="menu-item"
            >
              <span>📖</span>
              Jurnal Harian
            </Link>

            <Link
              href="/dashboard/absensi"
              className="menu-item active"
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

        <section className="dashboard-content">
          <div className="journal-empty">
            Memuat data absensi...
          </div>
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
            className="menu-item"
          >
            <span>📖</span>
            Jurnal Harian
          </Link>

          <Link
            href="/dashboard/absensi"
            className="menu-item active"
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
              ABSENSI
            </p>

            <h1>
              Edit Absensi
            </h1>

            <p className="header-description">
              Ubah data kehadiran magang kamu.
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
              ABSENSI
            </span>

            <h2>
              Edit Data Kehadiran
            </h2>

            <p>
              Perbarui informasi kehadiran kamu.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* TANGGAL */}
            <div className="form-group">
              <label>
                Tanggal Kehadiran
              </label>

              <input
                type="date"
                value={attendanceDate}
                onChange={(e) =>
                  setAttendanceDate(e.target.value)
                }
                required
                disabled={saving}
              />
            </div>

            {/* STATUS */}
            <div className="form-group">
              <label>
                Status Kehadiran
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                required
                disabled={saving}
              >
                <option value="Hadir">
                  Hadir
                </option>

                <option value="Izin">
                  Izin
                </option>

                <option value="Sakit">
                  Sakit
                </option>

                <option value="Alpa">
                  Alpa
                </option>
              </select>
            </div>

            {/* JAM MASUK */}
            <div className="form-group">
              <label>
                Jam Masuk
              </label>

              <input
                type="time"
                value={checkIn}
                onChange={(e) =>
                  setCheckIn(e.target.value)
                }
                disabled={saving}
              />
            </div>

            {/* MESSAGE */}
            {message && (
              <div className="journal-message">
                {message}
              </div>
            )}

            {/* ACTION */}
            <div className="journal-form-actions">
              <Link
                href="/dashboard/absensi"
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

export default function EditAbsensiPage() {
  return (
    <Suspense
      fallback={
        <main className="dashboard">
          <section className="dashboard-content">
            <div className="journal-empty">
              Memuat halaman edit absensi...
            </div>
          </section>
        </main>
      }
    >
      <EditAbsensiContent />
    </Suspense>
  );
}