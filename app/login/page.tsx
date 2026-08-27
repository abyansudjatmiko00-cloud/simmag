import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">

      <div className="login-box">

        <Link href="/" className="login-logo">
          <span className="logo-icon">S</span>
          <span>SIMMAG</span>
        </Link>

        <h1>Selamat Datang</h1>

        <p>
          Masuk ke akun SIMMAG kamu
        </p>

        <form>

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Masukkan email"
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Masukkan password"
          />

          <Link href="/dashboard" className="login-submit">
            Masuk
        </Link>

        </form>

        <Link href="/" className="back-home">
          ← Kembali ke halaman utama
        </Link>

      </div>

    </main>
  );
}