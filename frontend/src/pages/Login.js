import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from '../api/axios';
import AuthContext from '../context/AuthContext'; 

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const submit = async () => {
    try {
      const res = await axios.post('/auth/login', form);
      
      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token); 

      alert('Login Sukses!');

      navigate('/'); 
    } catch (err) {
      console.error(err);
      alert('Login gagal! Cek email/password lo.');
    }
  };

  return (
    <div className="verify-container" style={containerStyle}>
      <h2 style={{ textAlign: 'center', fontWeight: '900' }}>Login GearShare</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          style={inputStyle} 
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })} 
        />

        <input 
          style={inputStyle} 
          type="password" 
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} 
        />

        <button className="btn-full" onClick={submit} style={buttonStyle}>
          Masuk Sekarang
        </button>
        
        <p style={{ fontSize: '12px', textAlign: 'center' }}>
          Belum punya akun? <a href="/register" style={{ color: '#007bff' }}>Daftar di sini</a>
        </p>
      </div>
    </div>
  );
}

const containerStyle = { maxWidth: '400px', margin: '100px auto', padding: '30px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const buttonStyle = { padding: '14px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' };