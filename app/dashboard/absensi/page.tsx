"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import DashboardSidebar from "@/components/DashboardSidebar";

type Attendance = {
  id: number;
  attendance_date: string;
  status: string;
  check_in: string | null;
  created_at: string;
};

export default function AbsensiPage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadAttendances = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .order("attendance_date", { ascending: false });

    if (error) {
      console.error("Gagal mengambil absensi:", error);
      setLoading(false);
      return;
    }

    setAttendances(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus data absensi ini?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    const supabase = createClient();

    const { error } = await supabase
      .from("attendance")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Gagal menghapus absensi:", error);

      alert(
        `Absensi gagal dihapus.\n\n${error.message}`
      );

      setDeletingId(null);
      return;
    }

    setAttendances((currentAttendances) =>
      currentAttendances.filter(
        (attendance) => attendance.id !== id
      )
    );

    setDeletingId(null);
  };

  useEffect(() => {
    loadAttendances();
  }, []);

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
              ABSENSI
            </p>

            <h1>
              Kehadiran Saya
            </h1>

            <p className="header-description">
              Catat dan pantau kehadiran magang kamu.
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
              Riwayat Kehadiran
            </h2>

            <p>
              Berikut adalah riwayat kehadiran magang kamu.
            </p>

          </div>

          <Link
            href="/dashboard/absensi/tambah"
            className="add-journal-button"
          >
            + Tambah Absensi
          </Link>

        </div>


        {/* LIST */}
        {loading ? (

          <div className="journal-empty">
            Memuat data absensi...
          </div>

        ) : attendances.length === 0 ? (

          <div className="journal-empty">

            <div className="journal-empty-icon">
              📅
            </div>

            <h3>
              Belum ada data absensi
            </h3>

            <p>
              Tambahkan data kehadiran pertama kamu.
            </p>

            <Link
              href="/dashboard/absensi/tambah"
              className="add-journal-button"
            >
              + Tambah Absensi
            </Link>

          </div>

        ) : (

          <div className="journal-list">

            {attendances.map((attendance) => {

              const date = new Date(
                `${attendance.attendance_date}T00:00:00`
              );

              const day = date.getDate();

              const month = date
                .toLocaleDateString("id-ID", {
                  month: "short",
                })
                .toUpperCase();

              return (

                <div
                  className="journal-card"
                  key={attendance.id}
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
                          {attendance.status}
                        </h3>

                        <p>
                          {attendance.check_in
                            ? `Jam masuk: ${attendance.check_in}`
                            : "Belum melakukan check-in."}
                        </p>

                      </div>

                      <span className="journal-status">
                        {attendance.status}
                      </span>

                    </div>


                    {/* FOOTER */}
                    <div className="journal-footer">

                      <span>
                        📅{" "}
                        {date.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>

                      {/* ACTION BUTTONS */}
                      <div className="journal-actions">

                        <Link
                          href={`/dashboard/absensi/edit?id=${attendance.id}`}
                          className="edit-button"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            handleDelete(attendance.id)
                          }
                          disabled={
                            deletingId === attendance.id
                          }
                        >
                          {deletingId === attendance.id
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

