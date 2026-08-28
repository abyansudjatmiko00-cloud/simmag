import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardPage() {
  return (
    <main className="dashboard">

{/* SIDEBAR */}
<DashboardSidebar />


      {/* CONTENT */}
      <section className="dashboard-content">

        {/* HEADER */}
        <header className="dashboard-header">

          <div>
            <p className="dashboard-label">
              DASHBOARD SISWA
            </p>

            <h1>
              Selamat datang, Abyan 👋
            </h1>

            <p className="header-description">
              Pantau kegiatan magang kamu di sini.
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


        {/* STATISTICS */}
        <div className="dashboard-stats">

          <div className="dashboard-stat">
            <div className="stat-icon blue">
              📅
            </div>

            <div>
              <span>Total Kehadiran</span>
              <strong>95%</strong>
            </div>
          </div>


          <div className="dashboard-stat">
            <div className="stat-icon green">
              📖
            </div>

            <div>
              <span>Jurnal Selesai</span>
              <strong>24</strong>
            </div>
          </div>


          <div className="dashboard-stat">
            <div className="stat-icon orange">
              📋
            </div>

            <div>
              <span>Pengajuan</span>
              <strong>1</strong>
            </div>
          </div>


          <div className="dashboard-stat">
            <div className="stat-icon purple">
              ⏱
            </div>

            <div>
              <span>Sisa Hari</span>
              <strong>36</strong>
            </div>
          </div>

        </div>


        {/* CONTENT GRID */}
        <div className="dashboard-grid">

          {/* PROGRESS */}
          <div className="dashboard-card">

            <div className="card-title">
              <div>
                <span className="small-title">
                  PROGRES MAGANG
                </span>

                <h2>
                  Perjalanan Magang
                </h2>
              </div>

              <strong>60%</strong>
            </div>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <div className="progress-info">
              <span>54 hari</span>
              <span>90 hari</span>
            </div>

            <p className="card-description">
              Kamu sudah menyelesaikan lebih dari
              setengah masa magang. Tetap semangat!
            </p>

          </div>


          {/* STATUS */}
          <div className="dashboard-card">

            <span className="small-title">
              STATUS MAGANG
            </span>

            <div className="status-box">

              <div className="status-check">
                ✓
              </div>

              <div>
                <strong>Magang Aktif</strong>
                <p>
                  Sedang menjalani kegiatan magang
                </p>
              </div>

            </div>

            <div className="company-info">

              <span>Tempat Magang</span>

              <strong>
                PT Teknologi Indonesia
              </strong>

              <small>
                Jakarta, Indonesia
              </small>

            </div>

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
                Jurnal Terakhir
              </h2>
            </div>

            <Link href="/dashboard/jurnal">
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
                  Membuat desain halaman dashboard
                </strong>

                <p>
                  Mengerjakan tampilan dashboard
                  menggunakan Next.js.
                </p>
              </div>

              <span className="activity-status">
                Selesai
              </span>

            </div>


            <div className="activity-item">

              <div className="activity-date">
                <strong>25</strong>
                <span>AGU</span>
              </div>

              <div className="activity-text">
                <strong>
                  Mempelajari struktur project
                </strong>

                <p>
                  Memahami struktur folder dan
                  komponen website.
                </p>
              </div>

              <span className="activity-status">
                Selesai
              </span>

            </div>


            <div className="activity-item">

              <div className="activity-date">
                <strong>24</strong>
                <span>AGU</span>
              </div>

              <div className="activity-text">
                <strong>
                  Setup project
                </strong>

                <p>
                  Membuat project SIMMAG dengan
                  Next.js.
                </p>
              </div>

              <span className="activity-status">
                Selesai
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}