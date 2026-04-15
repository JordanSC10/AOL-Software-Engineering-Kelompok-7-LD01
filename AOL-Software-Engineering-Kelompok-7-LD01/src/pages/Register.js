import { useState } from 'react';
import axios from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({});
  const [ktpPreview, setKtpPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, ktp: file });
    setKtpPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    try {
      await axios.post('/auth/register', formData);
      alert('Registered & KTP Uploaded for Verification!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="verify-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', fontWeight: '900' }}>Join GearShare</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input style={inputStyle} placeholder="Full Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input style={inputStyle} placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input style={inputStyle} placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input style={inputStyle} type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        
        {/* Fitur KTP Lo */}
        <div style={{ padding: '15px', border: '2px dashed #007bff', borderRadius: '12px', textAlign: 'center', backgroundColor: '#f0f7ff' }}>
          <span style={{ fontSize: '12px', color: '#007bff', fontWeight: 'bold' }}>
            {ktpPreview ? 'KTP Terdeteksi!' : 'Upload Foto KTP (Wajib)'}
          </span>
          <input type="file" onChange={handleFileChange} style={{ fontSize: '10px', marginTop: '5px' }} />
        </div>

        <button className="btn-full" onClick={submit} style={{ padding: '14px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
          Daftar & Verifikasi
        </button>
      </div>
    </div>
  );
}

const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };