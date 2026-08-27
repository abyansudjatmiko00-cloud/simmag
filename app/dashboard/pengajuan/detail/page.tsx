"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Application = {
  id: number;
  company_name: string;
  supervisor_name: string;
  company_address: string;
  start_date: string;
  end_date: string;
  description: string | null;
  status: string;
  created_at: string;
};

function DetailPengajuanContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [application, setApplication] =
    useState<Application | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadApplication() {
      if (!id) {
        setErrorMessage("ID pengajuan tidak ditemukan.");
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
        console.error(
          "Gagal mengambil pengajuan:",
          error
        );

        setErrorMessage(
          `Gagal mengambil data pengajuan. ${error.message || ""}`
        );

        setLoading(false);
        return;
      }

      setApplication(data);
      setLoading(false);
    }

    loadApplication();
  }, [id]);

  if (loading) {
    return (
      <main className="dashboard">
        <section className="dashboard-content">
          <div className="journal-empty">
            Memuat detail pengajuan...
          </div>
        </section>
      </main>
    );
  }

  if (!application) {
    return (
      <main className="dashboard">
        <section className="dashboard-content">
          <div className="journal-empty">
            <div className="journal-empty-icon">
              📋
            </div>

            <h3>
              Pengajuan tidak ditemukan
            </h3>

            <p>
              {errorMessage ||
                "Data pengajuan yang kamu cari tidak tersedia."}
            </p>

            <Link
              href="/dashboard/pengajuan"
              className="add-journal-button"
            >
              ← Kembali ke Pengajuan
            </Link>
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
              Detail Pengajuan
            </h1>

            <p className="header-description">
              Lihat informasi lengkap pengajuan magang kamu.
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

        {/* DETAIL */}
        <div className="dashboard-card journal-form-card">
          <div className="journal-form-header">
            <span className="small-title">
              DETAIL PENGAJUAN
            </span>

            <h2>
              {application.company_name}
            </h2>

            <p>
              Status: {application.status}
            </p>
          </div>

          {/* NAMA PERUSAHAAN */}
          <div className="form-group">
            <label>
              Nama Perusahaan
            </label>

            <input
              type="text"
              value={application.company_name}
              readOnly
            />
          </div>

          {/* PEMBIMBING */}
          <div className="form-group">
            <label>
              Nama Pembimbing
            </label>

            <input
              type="text"
              value={application.supervisor_name}
              readOnly
            />
          </div>

          {/* ALAMAT */}
          <div className="form-group">
            <label>
              Alamat Perusahaan
            </label>

            <textarea
              value={application.company_address}
              rows={4}
              readOnly
            />
          </div>

          {/* TANGGAL */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "20px",
            }}
          >
            <div className="form-group">
              <label>
                Tanggal Mulai
              </label>

              <input
                type="date"
                value={application.start_date}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>
                Tanggal Selesai
              </label>

              <input
                type="date"
                value={application.end_date}
                readOnly
              />
            </div>
          </div>

          {/* DESKRIPSI */}
          <div className="form-group">
            <label>
              Deskripsi
            </label>

            <textarea
              value={
                application.description ||
                "Tidak ada deskripsi."
              }
              rows={6}
              readOnly
            />
          </div>

          {/* STATUS */}
          <div className="journal-message">
            Status Pengajuan:{" "}
            <strong>
              {application.status}
            </strong>
          </div>

          {/* ACTION */}
          <div className="journal-form-actions">
            <Link
              href="/dashboard/pengajuan"
              className="cancel-button"
            >
              ← Kembali
            </Link>

            <Link
              href={`/dashboard/pengajuan/edit?id=${application.id}`}
              className="submit-journal-button"
            >
              ✏ Edit Pengajuan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function DetailPengajuanPage() {
  return (
    <Suspense
      fallback={
        <main className="dashboard">
          <section className="dashboard-content">
            <div className="journal-empty">
              Memuat halaman detail pengajuan...
            </div>
          </section>
        </main>
      }
    >
      <DetailPengajuanContent />
    </Suspense>
  );
}