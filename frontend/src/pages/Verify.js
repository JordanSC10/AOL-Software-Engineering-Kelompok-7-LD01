import { useState } from "react";
import API from "../api/axios";

export default function Verify() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const submit = async () => {
    if (!file) return alert("Pilih file foto KTP lo dulu!");

    setLoading(true);
    const form = new FormData();
    form.append("ktp", file);

    try {
      await API.post("/verify", form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("KTP Berhasil Diupload! Tunggu verifikasi admin ya.");
      setPreview(null);
      setFile(null);
    } catch (err) {
      alert("Gagal upload. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center', padding: '20px', border: '1px solid #eee', borderRadius: '15px' }}>
      <h2 style={{ fontWeight: '800' }}>Verifikasi Identitas</h2>
      <p style={{ color: '#777', fontSize: '14px' }}>Upload KTP biar lo bisa mulai ngerental atau buka toko.</p>
      
      <div style={{ margin: '20px 0', padding: '20px', border: '1px dashed #ccc', borderRadius: '10px' }}>
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '100%', marginBottom: '10px', borderRadius: '5px' }} />
        ) : (
          <div style={{ padding: '20px', color: '#999' }}>Belum ada foto terpilih</div>
        )}
        <input type="file" accept="image/*" onChange={handleFile} />
      </div>

      <button 
        onClick={submit} 
        disabled={!file || loading}
        style={{ 
          width: '100%', 
          padding: '12px', 
          backgroundColor: file ? '#007bff' : '#ccc', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: file ? 'pointer' : 'not-allowed' 
        }}
      >
        {loading ? "Sabar, lagi ngirim..." : "Kirim KTP"}
      </button>
    </div>
  );
}