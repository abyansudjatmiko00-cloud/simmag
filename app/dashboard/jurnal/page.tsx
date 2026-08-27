"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Journal = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
};

export default function JurnalPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // AMBIL DATA JURNAL
  // =========================

  const loadJournals = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("journals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil jurnal:", error);
      setLoading(false);
      return;
    }

    setJournals(data || []);
    setLoading(false);
  };


  // =========================
  // HAPUS JURNAL
  // =========================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus jurnal ini?"
    );

    if (!confirmed) {
      return;
    }

    const supabase = createClient();

    const { error } = await supabase
      .from("journals")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Gagal menghapus jurnal:", error);
      alert(`Jurnal gagal dihapus. ${error.message}`);
      return;
    }

    // Hapus dari tampilan setelah berhasil di database
    setJournals((currentJournals) =>
      currentJournals.filter((journal) => journal.id !== id)
    );
  };


  // =========================
  // LOAD SAAT HALAMAN DIBUKA
  // =========================

  useEffect(() => {
    loadJournals();
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

            <h1>
              Jurnal Kegiatan
            </h1>

            <p className="header-description">
              Catat dan kelola kegiatan magang kamu.
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
              Jurnal Saya
            </h2>

            <p>
              Berikut adalah daftar kegiatan magang yang telah kamu catat.
            </p>

          </div>


          <Link
            href="/dashboard/jurnal/tambah"
            className="add-journal-button"
          >
            + Tambah Jurnal
          </Link>

        </div>


        {/* JOURNAL LIST */}

        {loading ? (

          <div className="journal-empty">
            Memuat jurnal...
          </div>

        ) : journals.length === 0 ? (

          <div className="journal-empty">

            <div className="journal-empty-icon">
              📖
            </div>

            <h3>
              Belum ada jurnal
            </h3>

            <p>
              Tambahkan kegiatan magang pertama kamu.
            </p>

            <Link
              href="/dashboard/jurnal/tambah"
              className="add-journal-button"
            >
              + Tambah Jurnal
            </Link>

          </div>

        ) : (

          <div className="journal-list">

            {journals.map((journal) => {

              const date = new Date(journal.created_at);

              const day = date.getDate();

              const month = date
                .toLocaleDateString("id-ID", {
                  month: "short",
                })
                .toUpperCase();


              return (

                <div
                  className="journal-card"
                  key={journal.id}
                >

                  {/* DATE */}

                  <div className="journal-date">

                    <strong>
                      {day}
                    </strong>

                    <span>
                      {month}
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="journal-content">

                    <div className="journal-title-row">

                      <div>

                        <h3>
                          {journal.title}
                        </h3>

                        <p>
                          {journal.description}
                        </p>

                      </div>


                      <span className="journal-status">
                        {journal.status}
                      </span>

                    </div>


                    {/* FOOTER */}

                    <div className="journal-footer">

                      <span>
                        📅 Kegiatan Magang
                      </span>


                      <div className="journal-actions">

                        {/* LIHAT */}

                        <Link
                          href={`/dashboard/jurnal/detail?id=${journal.id}`}
                        >
                          Lihat
                        </Link>


                        {/* EDIT */}

                        <Link
                          href={`/dashboard/jurnal/edit?id=${journal.id}`}
                        >
                          Edit
                        </Link>


                        {/* HAPUS */}

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDelete(journal.id)}
                        >
                          Hapus
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