import { useState } from 'react';
import axios from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    ktp: null
  });
  const [ktpPreview, setKtpPreview] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, ktp: file });
      setKtpPreview(URL.createObjectURL(file));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!form.ktp) return alert('Pake KTP dulu bos, biar aman!');

    const formData = new FormData();
    // Append semua field ke FormData
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    try {
      await axios.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Registrasi Berhasil! KTP lo lagi dicek sama admin.');
      // Redirect ke login atau dashboard di sini nanti
    } catch (err) {
      console.error(err);
      alert('Waduh, registrasi gagal. Cek koneksi atau data lo.');
    }
  };

  return (
    <div className="verify-container" style={containerStyle}>
      <h2 style={{ textAlign: 'center', fontWeight: '900', marginBottom: '10px' }}>Join GearShare</h2>
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginBottom: '20px' }}>Pinjem gear jadi gampang dan aman.</p>
      
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="name" style={inputStyle} placeholder="Full Name" onChange={handleInputChange} required />
        <input name="email" style={inputStyle} type="email" placeholder="Email" onChange={handleInputChange} required />
        <input name="phone" style={inputStyle} placeholder="Phone (WhatsApp)" onChange={handleInputChange} required />
        <input name="password" style={inputStyle} type="password" placeholder="Password" onChange={handleInputChange} required />
        
        <div style={uploadBoxStyle}>
          <span style={{ fontSize: '12px', color: '#007bff', fontWeight: 'bold' }}>
            {ktpPreview ? '✅ KTP Terpilih' : '📸 Upload Foto KTP (Wajib)'}
          </span>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ fontSize: '11px', marginTop: '10px', width: '100%' }} />
          {ktpPreview && (
            <img src={ktpPreview} alt="KTP Preview" style={{ marginTop: '10px', width: '100%', borderRadius: '8px', border: '1px solid #ddd' }} />
          )}
        </div>

        <button type="submit" className="btn-full" style={buttonStyle}>
          Daftar & Verifikasi
        </button>
      </form>
    </div>
  );
}

// Styles
const containerStyle = { maxWidth: '400px', margin: '50px auto', padding: '30px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '14px' };
const uploadBoxStyle = { padding: '15px', border: '2px dashed #007bff', borderRadius: '12px', textAlign: 'center', backgroundColor: '#f0f7ff' };
const buttonStyle = { padding: '14px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' };