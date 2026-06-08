import { useState } from "react";
import API from "../api/axios";

export default function Verify() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const submit = async () => {
    if (!file) {
      return alert(
        "Silakan pilih file foto KTP Anda terlebih dahulu."
      );
    }

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser) {
      return alert(
        "User tidak ditemukan. Silakan login ulang."
      );
    }

    setLoading(true);

    const form = new FormData();

    form.append("ktp", file);
    form.append(
      "userId",
      storedUser._id || storedUser.id
    );

    try {
      const response = await API.post(
        "/verify",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update localStorage too
      storedUser.isVerified = "confirmed";

      localStorage.setItem(
        "user",
        JSON.stringify(storedUser)
      );

      alert("KTP berhasil diverifikasi!");

      setPreview(null);
      setFile(null);

      window.location.reload();

    } catch (err) {
      console.error(err);

      alert(
        "Gagal mengunggah file. Silakan coba beberapa saat lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        textAlign: "center",
        padding: "30px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        color: "white",
      }}
    >
      <h2
        style={{
          fontWeight: "900",
          fontSize: "28px",
        }}
      >
        🛡️ Verifikasi Identitas
      </h2>

      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          padding: "15px",
          borderRadius: "10px",
          margin: "20px 0",
          textAlign: "left",
          borderLeft: "5px solid #007bff",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "#ddd",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          "ID is only used for security protection.
          Please use it wisely. Any inappropriate use
          will be processed according to the law."
        </p>

        <p
          style={{
            fontSize: "12px",
            color: "#ffaaaa",
            margin: "5px 0 0 0",
            fontWeight: "bold",
          }}
        >
          * Demi keamanan, Anda diperbolehkan
          menyensor/menutup 4 digit terakhir
          NIK Anda.
        </p>
      </div>

      <p
        style={{
          color: "#eee",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        Demi keamanan bersama, setiap pemilik
        perlengkapan wajib melakukan verifikasi
        identitas resmi (KTP) sebelum dapat
        mengunggah barang.
      </p>

      <div
        style={{
          margin: "20px 0",
          padding: "20px",
          border:
            "2px dashed rgba(255, 255, 255, 0.3)",
          borderRadius: "15px",
          backgroundColor:
            "rgba(255, 255, 255, 0.05)",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "100%",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          />
        ) : (
          <div
            style={{
              padding: "40px",
              color: "#ccc",
            }}
          >
            <span
              style={{
                fontSize: "40px",
              }}
            >
              📸
            </span>
            <br />
            Belum ada foto KTP terpilih
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{
            fontSize: "14px",
            color: "white",
          }}
        />
      </div>

      <button
        onClick={submit}
        disabled={!file || loading}
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: file
            ? "#007bff"
            : "rgba(255,255,255,0.2)",
          color: file ? "white" : "#aaa",
          border: "none",
          borderRadius: "12px",
          fontWeight: "bold",
          cursor: file
            ? "pointer"
            : "not-allowed",
          transition: "0.3s",
        }}
      >
        {loading
          ? "Sedang Mengirim..."
          : "Kirim KTP untuk Verifikasi"}
      </button>
    </div>
  );
}