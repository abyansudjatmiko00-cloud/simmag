export default function Footer() {
  return (
    <footer className="footer" id="tentang">

      <div className="footer-container">

        <div>
          <h3>SIMMAG</h3>

          <p>
            Sistem Informasi Manajemen Magang
            untuk membantu pengelolaan kegiatan
            magang siswa.
          </p>
        </div>

        <div>
          <h4>Menu</h4>
          <a href="#fitur">Fitur</a>
          <a href="#tentang">Tentang</a>
          <a href="#cara-kerja">Cara Kerja</a>
        </div>

        <div>
          <h4>Pengguna</h4>
          <a href="/login">Siswa</a>
          <a href="/login">Guru</a>
          <a href="/login">Admin</a>
        </div>

      </div>

      <div className="copyright">
        © 2026 SIMMAG. All rights reserved.
      </div>

    </footer>
  );
}