const features = [
  {
    icon: "📋",
    title: "Pengajuan Magang",
    text: "Ajukan dan kelola tempat magang dengan mudah.",
  },
  {
    icon: "📅",
    title: "Absensi Digital",
    text: "Catat kehadiran selama kegiatan magang.",
  },
  {
    icon: "📖",
    title: "Jurnal Harian",
    text: "Catat kegiatan magang setiap hari secara teratur.",
  },
  {
    icon: "📊",
    title: "Monitoring",
    text: "Guru dapat memantau perkembangan siswa.",
  },
  {
    icon: "👥",
    title: "Data Siswa",
    text: "Kelola data siswa dan penempatan magang.",
  },
  {
    icon: "📄",
    title: "Laporan",
    text: "Buat laporan kegiatan magang dengan mudah.",
  },
];

export default function Features() {
  return (
    <section id="fitur" className="features">

      <div className="section-title">
        <span>FITUR UTAMA</span>

        <h2>
          Semua kebutuhan magang
          <br />
          dalam satu sistem
        </h2>

        <p>
          SIMMAG menyediakan fitur yang membantu
          siswa, guru, dan sekolah.
        </p>
      </div>

      <div className="feature-grid">

        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.text}</p>

          </div>
        ))}

      </div>

    </section>
  );
}