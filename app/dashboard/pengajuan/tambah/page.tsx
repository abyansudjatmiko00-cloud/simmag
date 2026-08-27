"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function TambahPengajuanPage() {
  const router = useRouter();
  const supabase = createClient();

  const [companyName, setCompanyName] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");

    // VALIDASI INPUT
    if (!companyName.trim()) {
      setMessage("Nama perusahaan wajib diisi.");
      return;
    }

    if (!supervisorName.trim()) {
      setMessage("Nama pembimbing wajib diisi.");
      return;
    }

    if (!companyAddress.trim()) {
      setMessage("Alamat perusahaan wajib diisi.");
      return;
    }

    if (!startDate) {
      setMessage("Tanggal mulai wajib diisi.");
      return;
    }

    if (!endDate) {
      setMessage("Tanggal selesai wajib diisi.");
      return;
    }

    if (endDate < startDate) {
      setMessage(
        "Tanggal selesai tidak boleh sebelum tanggal mulai."
      );
      return;
    }

    // CEGAH SUBMIT BERULANG
    if (saving) {
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("applications")
      .insert({
        company_name: companyName.trim(),
        supervisor_name: supervisorName.trim(),
        company_address: companyAddress.trim(),
        start_date: startDate,
        end_date: endDate,
        description: description.trim() || null,
      });

    if (error) {
      console.error("SUPABASE ERROR:", error);

      setMessage(
        `Gagal mengirim pengajuan. ${error.message || ""}`
      );

      setSaving(false);
      return;
    }

    setMessage("Pengajuan berhasil dikirim!");

    setTimeout(() => {
      router.push("/dashboard/pengajuan");
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
            className="menu-item"
          >
            <span>📅</span>
            Absensi
          </Link>

          <Link
            href="/dashboard/pengajuan"
            className="menu-item active"
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
              PENGAJUAN MAGANG
            </p>

            <h1>
              Ajukan Magang
            </h1>

            <p className="header-description">
              Isi informasi tempat magang yang ingin kamu ajukan.
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
              PENGAJUAN MAGANG
            </span>

            <h2>
              Informasi Tempat Magang
            </h2>

            <p>
              Lengkapi data tempat magang kamu.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* NAMA PERUSAHAAN */}
            <div className="form-group">

              <label>
                Nama Perusahaan
              </label>

              <input
                type="text"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(e.target.value)
                }
                placeholder="Masukkan nama perusahaan"
                required
                disabled={saving}
              />

            </div>


            {/* NAMA PEMBIMBING */}
            <div className="form-group">

              <label>
                Nama Pembimbing
              </label>

              <input
                type="text"
                value={supervisorName}
                onChange={(e) =>
                  setSupervisorName(e.target.value)
                }
                placeholder="Masukkan nama pembimbing"
                required
                disabled={saving}
              />

            </div>


            {/* ALAMAT */}
            <div className="form-group">

              <label>
                Alamat Perusahaan
              </label>

              <textarea
                value={companyAddress}
                onChange={(e) =>
                  setCompanyAddress(e.target.value)
                }
                placeholder="Masukkan alamat perusahaan"
                rows={4}
                required
                disabled={saving}
              />

            </div>


            {/* TANGGAL */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >

              {/* TANGGAL MULAI */}
              <div className="form-group">

                <label>
                  Tanggal Mulai
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                  required
                  disabled={saving}
                />

              </div>


              {/* TANGGAL SELESAI */}
              <div className="form-group">

                <label>
                  Tanggal Selesai
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                  required
                  disabled={saving}
                />

              </div>

            </div>


            {/* DESKRIPSI */}
            <div className="form-group">

              <label>
                Deskripsi
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Jelaskan rencana kegiatan magang kamu (opsional)"
                rows={6}
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
                href="/dashboard/pengajuan"
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
                  ? "Mengirim..."
                  : "Kirim Pengajuan →"}
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}