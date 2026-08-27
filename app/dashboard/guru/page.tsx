"use client";

import Link from "next/link";

export default function DashboardGuruPage() {
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
            href="/dashboard/guru"
            className="menu-item active"
          >
            <span>📊</span>
            Dashboard
          </Link>

          <Link
            href="/dashboard/guru/siswa"
            className="menu-item"
          >
            <span>👥</span>
            Siswa Bimbingan
          </Link>

          <Link
            href="/dashboard/guru/jurnal"
            className="menu-item"
          >
            <span>📖</span>
            Monitoring Jurnal
          </Link>

          <Link
            href="/dashboard/guru/absensi"
            className="menu-item"
          >
            <span>📅</span>
            Monitoring Absensi
          </Link>

          <Link
            href="/dashboard/guru/pengajuan"
            className="menu-item"
          >
            <span>📋</span>
            Pengajuan Siswa
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
              DASHBOARD GURU
            </p>

            <h1>
              Selamat datang, Pak/Bu Guru 👋
            </h1>

            <p className="header-description">
              Pantau perkembangan siswa magang yang kamu bimbing.
            </p>

          </div>


          <div className="profile">

            <div className="profile-avatar">
              G
            </div>

            <div>
              <strong>Guru Pembimbing</strong>
              <span>Guru</span>
            </div>

          </div>

        </header>


        {/* STATISTICS */}
        <div className="dashboard-stats">

          <div className="dashboard-stat">

            <div className="stat-icon blue">
              👥
            </div>

            <div>
              <span>Siswa Bimbingan</span>
              <strong>12</strong>
            </div>

          </div>


          <div className="dashboard-stat">

            <div className="stat-icon green">
              📖
            </div>

            <div>
              <span>Jurnal Disetujui</span>
              <strong>86</strong>
            </div>

          </div>


          <div className="dashboard-stat">

            <div className="stat-icon orange">
              ⏳
            </div>

            <div>
              <span>Menunggu Review</span>
              <strong>5</strong>
            </div>

          </div>


          <div className="dashboard-stat">

            <div className="stat-icon purple">
              📅
            </div>

            <div>
              <span>Kehadiran Siswa</span>
              <strong>94%</strong>
            </div>

          </div>

        </div>


        {/* CONTENT GRID */}
        <div className="dashboard-grid">

          {/* STUDENT SUMMARY */}
          <div className="dashboard-card">

            <div className="card-heading">

              <div>

                <span className="small-title">
                  SISWA BIMBINGAN
                </span>

                <h2>
                  Daftar Siswa
                </h2>

              </div>

              <Link href="/dashboard/guru/siswa">
                Lihat Semua →
              </Link>

            </div>


            <div className="activity-list">

              <div className="activity-item">

                <div className="activity-date">
                  <strong>AS</strong>
                </div>

                <div className="activity-text">

                  <strong>
                    Ahmad Saputra
                  </strong>

                  <p>
                    XII RPL 1 • PT Teknologi Indonesia
                  </p>

                </div>

                <span className="activity-status">
                  Aktif
                </span>

              </div>


              <div className="activity-item">

                <div className="activity-date">
                  <strong>RF</strong>
                </div>

                <div className="activity-text">

                  <strong>
                    Rizky Firmansyah
                  </strong>

                  <p>
                    XII RPL 1 • CV Digital Kreatif
                  </p>

                </div>

                <span className="activity-status">
                  Aktif
                </span>

              </div>


              <div className="activity-item">

                <div className="activity-date">
                  <strong>NA</strong>
                </div>

                <div className="activity-text">

                  <strong>
                    Nadia Amelia
                  </strong>

                  <p>
                    XII RPL 2 • PT Media Nusantara
                  </p>

                </div>

                <span className="activity-status">
                  Aktif
                </span>

              </div>

            </div>

          </div>


          {/* REVIEW */}
          <div className="dashboard-card">

            <span className="small-title">
              PERLU TINDAKAN
            </span>

            <h2>
              Review Jurnal
            </h2>

            <p className="card-description">
              Beberapa jurnal siswa menunggu pemeriksaan dan persetujuan.
            </p>


            <div className="status-box">

              <div className="status-check">
                5
              </div>

              <div>

                <strong>
                  Jurnal Menunggu Review
                </strong>

                <p>
                  Periksa jurnal siswa yang baru masuk.
                </p>

              </div>

            </div>


            <Link
              href="/dashboard/guru/jurnal"
              className="add-journal-button"
              style={{
                display: "inline-block",
                marginTop: "20px",
                textDecoration: "none",
              }}
            >
              Review Jurnal →
            </Link>

          </div>

        </div>


        {/* RECENT ACTIVITY */}
        <div className="dashboard-card activity-card">

          <div className="card-heading">

            <div>

              <span className="small-title">
                AKTIVITAS TERBARU
              </span>

              <h2>
                Aktivitas Siswa
              </h2>

            </div>

            <Link href="/dashboard/guru/jurnal">
              Lihat Semua →
            </Link>

          </div>


          <div className="activity-list">

            <div className="activity-item">

              <div className="activity-date">
                <strong>26</strong>
                <span>AGU</span>
              </div>

              <div className="activity-text">

                <strong>
                  Ahmad Saputra mengirim jurnal
                </strong>

                <p>
                  Membuat desain halaman dashboard menggunakan Next.js.
                </p>

              </div>

              <span className="activity-status">
                Review
              </span>

            </div>


            <div className="activity-item">

              <div className="activity-date">
                <strong>26</strong>
                <span>AGU</span>
              </div>

              <div className="activity-text">

                <strong>
                  Rizky Firmansyah melakukan absensi
                </strong>

                <p>
                  Status kehadiran: Hadir.
                </p>

              </div>

              <span className="activity-status">
                Hadir
              </span>

            </div>


            <div className="activity-item">

              <div className="activity-date">
                <strong>25</strong>
                <span>AGU</span>
              </div>

              <div className="activity-text">

                <strong>
                  Nadia Amelia mengirim jurnal
                </strong>

                <p>
                  Mempelajari struktur project dan komponen website.
                </p>

              </div>

              <span className="activity-status">
                Review
              </span>

            </div>

          </div>

        </div>


        {/* QUICK ACTION */}
        <div className="dashboard-card">

          <div className="card-heading">

            <div>

              <span className="small-title">
                AKSES CEPAT
              </span>

              <h2>
                Menu Guru
              </h2>

            </div>

          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginTop: "20px",
            }}
          >

            <Link
              href="/dashboard/guru/siswa"
              className="quick-action-card"
              style={{
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                👥
              </span>

              <strong>
                Siswa Bimbingan
              </strong>

              <p>
                Lihat daftar siswa yang kamu bimbing.
              </p>
            </Link>


            <Link
              href="/dashboard/guru/jurnal"
              className="quick-action-card"
              style={{
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                📖
              </span>

              <strong>
                Monitoring Jurnal
              </strong>

              <p>
                Periksa dan setujui jurnal siswa.
              </p>
            </Link>


            <Link
              href="/dashboard/guru/absensi"
              className="quick-action-card"
              style={{
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                📅
              </span>

              <strong>
                Monitoring Absensi
              </strong>

              <p>
                Pantau kehadiran siswa.
              </p>
            </Link>


            <Link
              href="/dashboard/guru/pengajuan"
              className="quick-action-card"
              style={{
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                📋
              </span>

              <strong>
                Pengajuan Siswa
              </strong>

              <p>
                Periksa pengajuan magang siswa.
              </p>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}