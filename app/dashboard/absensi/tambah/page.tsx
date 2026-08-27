"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function TambahAbsensiPage() {
  const router = useRouter();
  const supabase = createClient();

  const [attendanceDate, setAttendanceDate] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [checkIn, setCheckIn] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (saving) {
      return;
    }

    setMessage("");

    // VALIDASI TANGGAL
    if (!attendanceDate) {
      setMessage("Tanggal absensi wajib diisi.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("attendance")
      .insert({
        attendance_date: attendanceDate,
        status: status,
        check_in: checkIn || null,
      });

    if (error) {
      console.error("SUPABASE ERROR:", error);

      setMessage(
        `Gagal menyimpan absensi. ${error.message || ""}`
      );

      setSaving(false);
      return;
    }

    setMessage("Absensi berhasil disimpan!");

    setTimeout(() => {
      router.push("/dashboard/absensi");
    }, 1000);
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
              Tambah Absensi
            </h1>

            <p className="header-description">
              Catat kehadiran magang kamu.
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
              Catat Kehadiran
            </h2>

            <p>
              Isi informasi kehadiran magang kamu.
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


            {/* CHECK IN */}
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
                  : "Simpan Absensi →"}
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}