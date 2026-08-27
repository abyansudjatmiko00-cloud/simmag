import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-content">

          <div className="badge">
            ✦ Sistem Informasi Manajemen Magang
          </div>

          <h1>
            Kelola Magang
            <br />
            <span>Lebih Mudah.</span>
          </h1>

          <p>
            SIMMAG membantu siswa, guru pembimbing,
            dan sekolah mengelola kegiatan magang
            secara mudah, terstruktur, dan efisien.
          </p>

          <div className="hero-buttons">
            <Link href="/login" className="primary-button">
              Mulai Sekarang →
            </Link>

            <a href="#fitur" className="secondary-button">
              Lihat Fitur
            </a>
          </div>

        </div>

        <div className="hero-card">

          <div className="card-header">
            <span>Dashboard Siswa</span>
            <div className="avatar">A</div>
          </div>

          <div className="welcome">
            <small>Selamat datang kembali</small>
            <strong>Aktivitas Magang</strong>
          </div>

          <div className="stats-card">

            <div>
              <span>📅</span>
              <small>Kehadiran</small>
              <strong>95%</strong>
            </div>

            <div>
              <span>📖</span>
              <small>Jurnal</small>
              <strong>24</strong>
            </div>

            <div>
              <span>✓</span>
              <small>Status</small>
              <strong>Aktif</strong>
            </div>

          </div>

          <div className="activity">
            <strong>Aktivitas Mingguan</strong>

            <div className="bars">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}