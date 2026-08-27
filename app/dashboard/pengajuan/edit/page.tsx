"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EditPengajuanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [companyName, setCompanyName] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadApplication() {
      if (!id) {
        setMessage("ID pengajuan tidak ditemukan.");
        setLoading(false);
        return;
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil pengajuan:", error);
        setMessage("Gagal mengambil data pengajuan.");
        setLoading(false);
        return;
      }

      setCompanyName(data.company_name || "");
      setSupervisorName(data.supervisor_name || "");
      setCompanyAddress(data.company_address || "");
      setStartDate(data.start_date || "");
      setEndDate(data.end_date || "");
      setDescription(data.description || "");

      setLoading(false);
    }

    loadApplication();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) {
      setMessage("ID pengajuan tidak ditemukan.");
      return;
    }

    setSaving(true);
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase
      .from("applications")
      .update({
        company_name: companyName,
        supervisor_name: supervisorName,
        company_address: companyAddress,
        start_date: startDate,
        end_date: endDate,
        description: description,
      })
      .eq("id", id);

    if (error) {
      console.error("SUPABASE ERROR:", error);

      setMessage(
        `Gagal mengubah pengajuan. ${error.message || ""}`
      );

      setSaving(false);
      return;
    }

    setMessage("Pengajuan berhasil diperbarui!");

    setTimeout(() => {
      router.push("/dashboard/pengajuan");
    }, 1000);
  }

  if (loading) {
    return (
      <main className="dashboard">
        <section className="dashboard-content">
          <h1>Memuat pengajuan...</h1>
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

        <header className="dashboard-header">

          <div>

            <p className="dashboard-label">
              PENGAJUAN MAGANG
            </p>

            <h1>
              Edit Pengajuan
            </h1>

            <p className="header-description">
              Ubah informasi pengajuan magang kamu.
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
              EDIT PENGAJUAN
            </span>

            <h2>
              Ubah Pengajuan Magang
            </h2>

            <p>
              Perbarui informasi tempat magang kamu.
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
              />

            </div>


            {/* PEMBIMBING */}
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
              />

            </div>


            {/* ALAMAT */}
            <div className="form-group">

              <label>
                Alamat Perusahaan
              </label>

              <input
                type="text"
                value={companyAddress}
                onChange={(e) =>
                  setCompanyAddress(e.target.value)
                }
                placeholder="Masukkan alamat perusahaan"
                required
              />

            </div>


            {/* TANGGAL */}
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
              />

            </div>


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
              />

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
                placeholder="Masukkan deskripsi pengajuan"
                rows={7}
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