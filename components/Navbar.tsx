import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          <span className="logo-icon">S</span>
          <span>SIMMAG</span>
        </Link>

        <div className="nav-links">
          <a href="#fitur">Fitur</a>
          <a href="#tentang">Tentang</a>
          <a href="#cara-kerja">Cara Kerja</a>
        </div>

        <Link href="/login" className="login-button">
          Masuk
        </Link>
      </div>
    </nav>
  );
}