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
    if (!file) return alert("Silakan pilih file foto KTP Anda terlebih dahulu.");
    setLoading(true);
    const form = new FormData();
    form.append("ktp", file);

    try {
      await API.post("/verify", form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("KTP Berhasil Diunggah! Admin akan segera meninjau data Anda.");
      setPreview(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Gagal mengunggah file. Silakan coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center', padding: '30px', border: '1px solid #eee', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontWeight: '900', fontSize: '28px' }}>🛡️ Verifikasi Identitas</h2>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '10px', margin: '20px 0', textAlign: 'left', borderLeft: '5px solid #007bff' }}>
        <p style={{ fontSize: '13px', color: '#555', fontStyle: 'italic', margin: 0 }}>
          "ID is only used for security protection. Please use it wisely. Any inappropriate use will be processed according to the law."
        </p>
      </div>

      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        Demi keamanan bersama, setiap pemilik perlengkapan wajib melakukan verifikasi identitas resmi (KTP) sebelum dapat mengunggah barang.
      </p>
      
      <div style={{ margin: '20px 0', padding: '20px', border: '2px dashed #ddd', borderRadius: '15px', backgroundColor: '#fafafa' }}>
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '100%', marginBottom: '15px', borderRadius: '10px' }} />
        ) : (
          <div style={{ padding: '40px', color: '#aaa' }}>
            <span style={{ fontSize: '40px' }}>📸</span> <br/>
            Belum ada foto KTP terpilih
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleFile} style={{ fontSize: '14px' }} />
      </div>

      <button 
        onClick={submit} 
        disabled={!file || loading}
        style={{ 
          width: '100%', 
          padding: '15px', 
          backgroundColor: file ? '#007bff' : '#ccc', 
          color: 'white', 
          border: 'none', 
          borderRadius: '12px', 
          fontWeight: 'bold',
          cursor: file ? 'pointer' : 'not-allowed',
          transition: '0.3s'
        }}
      >
        {loading ? "Sedang Mengirim..." : "Kirim KTP untuk Verifikasi"}
      </button>
    </div>
  );
}