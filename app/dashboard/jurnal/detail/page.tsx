"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Journal = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
};

function DetailJurnalContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadJournal = async () => {
      if (!id) {
        setErrorMessage("ID jurnal tidak ditemukan.");
        setLoading(false);
        return;
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("journals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil detail jurnal:", error);

        setErrorMessage(
          `Gagal mengambil jurnal. ${error.message}`
        );

        setLoading(false);
        return;
      }

      setJournal(data);
      setLoading(false);
    };

    loadJournal();
  }, [id]);

  if (loading) {
    return (
      <main className="dashboard">
        <section className="dashboard-content">
          <h1>Memuat jurnal...</h1>
        </section>
      </main>
    );
  }

  if (!journal) {
    return (
      <main className="dashboard">
        <section className="dashboard-content">
          <div className="journal-empty">
            <h3>Jurnal tidak ditemukan</h3>

            <p>{errorMessage}</p>

            <Link
              href="/dashboard/jurnal"
              className="cancel-button"
            >
              ← Kembali ke Jurnal
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const date = new Date(journal.created_at);

  const day = date.getDate();

  const month = date
    .toLocaleDateString("id-ID", {
      month: "short",
    })
    .toUpperCase();

  const fullDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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

            <h1>Detail Jurnal</h1>

            <p className="header-description">
              Lihat detail kegiatan magang kamu.
            </p>
          </div>
        </header>

        {/* DETAIL CARD */}
        <div className="journal-detail-card">
          {/* TOP */}
          <div className="detail-top">
            <div className="detail-date">
              <strong>{day}</strong>

              <span>{month}</span>
            </div>

            <div>
              <span className="journal-status">
                {journal.status}
              </span>

              <h2>{journal.title}</h2>

              <p>{fullDate}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="detail-section">
            <h3>Deskripsi Kegiatan</h3>

            <p>{journal.description}</p>
          </div>

          {/* INFORMATION */}
          <div className="detail-section">
            <h3>Informasi</h3>

            <div className="detail-info-grid">
              <div>
                <span>Tanggal</span>

                <strong>{fullDate}</strong>
              </div>

              <div>
                <span>Status</span>

                <strong className="green-text">
                  {journal.status}
                </strong>
              </div>

              <div>
                <span>Kategori</span>

                <strong>Kegiatan Magang</strong>
              </div>

              <div>
                <span>Penulis</span>

                <strong>Abyan</strong>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="detail-actions">
            <Link
              href="/dashboard/jurnal"
              className="cancel-button"
            >
              ← Kembali
            </Link>

            <Link
              href={`/dashboard/jurnal/edit?id=${journal.id}`}
              className="edit-button"
            >
              ✏ Edit Jurnal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function DetailJurnalPage() {
  return (
    <Suspense
      fallback={
        <main className="dashboard">
          <section className="dashboard-content">
            <div className="journal-empty">
              Memuat halaman detail jurnal...
            </div>
          </section>
        </main>
      }
    >
      <DetailJurnalContent />
    </Suspense>
  );
}