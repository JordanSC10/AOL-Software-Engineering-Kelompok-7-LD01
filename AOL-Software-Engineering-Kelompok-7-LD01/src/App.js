import React, { useState } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUserName] = useState(''); 

  const items = [
    { id: 1, name: "Raket Yonex Astrox 100 ZZ", price: "50.000", category: "Badminton", img: "/astrox.jpg", desc: "Kondisi 95% mulus, senar baru ditarik 28 lbs. Cocok untuk pemain tipe menyerang.", owner: "Jordan", location: "Jakarta Barat" },
    { id: 2, name: "Sepatu Bola Adidas F50", price: "120.000", category: "Football", img: "/f50.jpg", desc: "Size 42. Ringan banget, enak buat lari kencang. Baru dipakai 2 kali di lapangan rumput.", owner: "Gilbert", location: "Tangerang" },
    { id: 3, name: "Dumbbell 10Kg", price: "30.000", category: "Fitness", img: "/dumbbell.jpg", desc: "Bahan besi solid, grip karet tidak licin. Ada sepasang (2 pcs).", owner: "Raymond", location: "Jakarta Selatan" },
  ];

  const handleSewaClick = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  const handleBack = () => {
    setView('home');
    setSelectedItem(null);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Navbar Modern */}
      <nav style={{ backgroundColor: '#ffffff', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={handleBack} style={{ color: '#007bff', margin: 0, fontSize: '24px', fontWeight: '800', cursor: 'pointer' }}>GEAR<span style={{color: '#333'}}>SHARE</span></h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {isVerified ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#28a745', fontSize: '13px', fontWeight: 'bold' }}>✓ Terverifikasi</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px 12px', backgroundColor: '#f1f3f5', borderRadius: '25px' }}>
                <div style={{ width: '30px', height: '30px', backgroundColor: '#007bff', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>{userName || 'User'}</span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '15px' }}>
              <button style={{ background: 'none', border: 'none', fontWeight: '600', color: '#666', cursor: 'pointer' }}>Masuk</button>
              <button style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Daftar</button>
            </div>
          )}
        </div>
      </nav>

      {/* Konten Utama */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {view === 'home' && (
          <>
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#212529', fontSize: '28px' }}>Sewa Alat Olahraga</h2>
              <p style={{ color: '#6c757d' }}>Temukan perlengkapan terbaik dari komunitasmu.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
              {items.map(item => (
                <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f1f1' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '11px', color: '#007bff', fontWeight: 'bold' }}>{item.category}</span>
                    <h3 style={{ fontSize: '18px', margin: '8px 0' }}>{item.name}</h3>
                    <p style={{ fontSize: '18px', fontWeight: '800' }}>Rp {item.price} / hari</p>
                    <button onClick={() => handleSewaClick(item)} style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                      Sewa Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'detail' && (
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', gap: '40px' }}>
            <div style={{ flex: 1 }}>
               <button onClick={handleBack} style={{ marginBottom: '20px', border: 'none', background: '#f1f1f1', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>← Kembali</button>
               <img src={selectedItem.img} alt={selectedItem.name} style={{ width: '100%', borderRadius: '15px' }} />
            </div>
            <div style={{ flex: 1.5 }}>
               <h2 style={{ fontSize: '32px', margin: '10px 0' }}>{selectedItem.name}</h2>
               <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>Rp {selectedItem.price} / hari</p>
               <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />
               <h4>Deskripsi Produk:</h4>
               <p style={{ color: '#555', lineHeight: '1.6' }}>{selectedItem.desc}</p>
               
               {!isVerified ? (
                 <div style={{ marginTop: '30px', padding: '20px', border: '2px dashed #ffc107', borderRadius: '10px', backgroundColor: '#fff9e6' }}>
                   <p style={{ margin: 0, fontWeight: 'bold', color: '#856404' }}>⚠️ Verifikasi Diperlukan</p>
                   <p style={{ fontSize: '14px', color: '#856404' }}>Kamu harus verifikasi KTP untuk menyewa alat ini.</p>
                   <button onClick={() => setView('verify')} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#ffc107', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Mulai Verifikasi Sekarang</button>
                 </div>
               ) : (
                 <div style={{ marginTop: '30px' }}>
                   <div style={{ backgroundColor: '#f1f3f5', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                      <p style={{ margin: 0 }}><strong>Pemilik:</strong> {selectedItem.owner}</p>
                      <p style={{ margin: '5px 0 0 0' }}><strong>Lokasi:</strong> {selectedItem.location}</p>
                   </div>
                   <button style={{ width: '100%', padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}>
                      Hubungi Pemilik via Chat
                   </button>
                 </div>
               )}
            </div>
          </div>
        )}

        {view === 'verify' && (
          <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Verifikasi KTP</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '30px' }}>Lengkapi data diri untuk mulai menyewa di GearShare.</p>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="Sesuai KTP" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px', boxSizing: 'border-box' }} 
              />
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Foto KTP</label>
              <div style={{ border: '2px dashed #ddd', padding: '30px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#fdfdfd' }}>
                <p style={{ margin: 0, color: '#999' }}>Klik untuk pilih file KTP</p>
              </div>
              
              <button onClick={() => {setIsVerified(true); setView('detail'); alert('Verifikasi Berhasil!');}} style={{ width: '100%', marginTop: '30px', padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Kirim Data Verifikasi
              </button>
              <p onClick={() => setView('detail')} style={{ textAlign: 'center', marginTop: '15px', color: '#999', cursor: 'pointer', fontSize: '14px' }}>Kembali</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;