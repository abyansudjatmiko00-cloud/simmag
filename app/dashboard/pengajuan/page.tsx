"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function PengajuanPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadApplications = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil pengajuan:", error);
      setLoading(false);
      return;
    }

    setApplications(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus pengajuan ini?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    const supabase = createClient();

    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Gagal menghapus pengajuan:", error);
      alert("Pengajuan gagal dihapus.");
      setDeletingId(null);
      return;
    }

    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== id
      )
    );

    setDeletingId(null);
  };

  useEffect(() => {
    loadApplications();
  }, []);

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
              Pengajuan Magang
            </h1>

            <p className="header-description">
              Kelola pengajuan tempat magang kamu.
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

        {/* ACTION */}
        <div className="journal-action">

          <div>

            <h2>
              Pengajuan Saya
            </h2>

            <p>
              Berikut adalah daftar pengajuan magang kamu.
            </p>

          </div>

          <Link
            href="/dashboard/pengajuan/tambah"
            className="add-journal-button"
          >
            + Ajukan Magang
          </Link>

        </div>

        {/* LIST */}
        {loading ? (

          <div className="journal-empty">
            Memuat pengajuan...
          </div>

        ) : applications.length === 0 ? (

          <div className="journal-empty">

            <div className="journal-empty-icon">
              📋
            </div>

            <h3>
              Belum ada pengajuan
            </h3>

            <p>
              Buat pengajuan magang pertama kamu.
            </p>

            <Link
              href="/dashboard/pengajuan/tambah"
              className="add-journal-button"
            >
              + Ajukan Magang
            </Link>

          </div>

        ) : (

          <div className="journal-list">

            {applications.map((application) => {

              const startDate = new Date(
                `${application.start_date}T00:00:00`
              );

              const endDate = new Date(
                `${application.end_date}T00:00:00`
              );

              return (

                <div
                  className="journal-card"
                  key={application.id}
                >

                  {/* DATE */}
                  <div className="journal-date">

                    <strong>
                      {startDate.getDate()}
                    </strong>

                    <span>
                      {startDate
                        .toLocaleDateString("id-ID", {
                          month: "short",
                        })
                        .toUpperCase()}
                    </span>

                  </div>

                  {/* CONTENT */}
                  <div className="journal-content">

                    <div className="journal-title-row">

                      <div>

                        <h3>
                          {application.company_name}
                        </h3>

                        <p>
                          Pembimbing:{" "}
                          {application.supervisor_name}
                        </p>

                        <p>
                          {application.company_address}
                        </p>

                      </div>

                      <span className="journal-status">
                        {application.status}
                      </span>

                    </div>

                    {/* FOOTER */}
                    <div className="journal-footer">

                      <span>
                        📅{" "}
                        {startDate.toLocaleDateString("id-ID")}
                        {" - "}
                        {endDate.toLocaleDateString("id-ID")}
                      </span>

                      <div className="journal-actions">

                        <Link
                          href={`/dashboard/pengajuan/detail?id=${application.id}`}
                        >
                          Lihat
                        </Link>

                        <Link
                          href={`/dashboard/pengajuan/edit?id=${application.id}`}
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            handleDelete(application.id)
                          }
                          disabled={
                            deletingId === application.id
                          }
                        >
                          {deletingId === application.id
                            ? "Menghapus..."
                            : "Hapus"}
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>

    </main>
  );
}