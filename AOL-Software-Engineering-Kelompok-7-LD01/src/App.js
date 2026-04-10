import React, { useState } from 'react';
import './App.css';

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  outline: 'none'
};

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUserName] = useState('');
  const [rentalDuration, setRentalDuration] = useState(1);

  const items = [
    { id: 1, name: "Raket Yonex Astrox 100 ZZ", price: "50.000", category: "Badminton", img: "/astrox.jpg", desc: "Kondisi 95% mulus, senar baru ditarik 28 lbs. Cocok untuk pemain tipe menyerang.", owner: "Jordan", location: "Jakarta Barat" },
    { id: 2, name: "Sepatu Bola Adidas F50", price: "120.000", category: "Football", img: "/f50.jpg", desc: "Size 42. Ringan banget, enak buat lari kencang. Baru dipakai 2 kali di lapangan rumput.", owner: "Gilbert", location: "Tangerang" },
    { id: 3, name: "Dumbbell 10Kg", price: "30.000", category: "Fitness", img: "/dumbbell.jpg", desc: "Bahan besi solid, grip karet tidak licin. Ada sepasang (2 pcs).", owner: "Raymond", location: "Jakarta Selatan" },
  ];

  const handleSewaClick = (item) => {
    setSelectedItem(item);
    setRentalDuration(1);
    setView('detail');
  };

  const handleBack = () => {
    setView('home');
    setSelectedItem(null);
  };

  return (
    <>
      {/* Modal Authentication - Register + Verif KTP */}
      {showAuth && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', width: '380px', position: 'relative' }}>
            <button onClick={() => setShowAuth(false)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#eee', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            <h2 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '10px' }}>{isLogin ? 'Welcome Back' : 'Join GearShare'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              {!isLogin && (
                <>
                  <input type="text" placeholder="Nama Lengkap" style={inputStyle} onChange={(e) => setUserName(e.target.value)} />
                  <div style={{ padding: '15px', border: '2px dashed #007bff', borderRadius: '12px', textAlign: 'center', backgroundColor: '#f0f7ff' }}>
                    <span style={{ fontSize: '12px', color: '#007bff', fontWeight: 'bold' }}>Upload Foto KTP (Wajib)</span>
                    <input type="file" style={{ fontSize: '10px', marginTop: '5px' }} />
                  </div>
                </>
              )}
              <input type="email" placeholder="Email" style={inputStyle} />
              <input type="password" placeholder="Password" style={inputStyle} />
              <button
                onClick={() => { if (!isLogin) setIsVerified(true); setShowAuth(false); }}
                style={{ padding: '14px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
              >
                {isLogin ? 'Sign In' : 'Daftar & Verifikasi'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px' }}>
                  {isLogin ? 'Register' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
        {/* Navbar */}
        <nav style={{ backgroundColor: '#ffffff', padding: '15px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 15px rgba(0,0,0,0.03)', position: 'sticky', top: 0, zIndex: 100 }}>
          <h1 onClick={() => { setView('home'); setActiveTab('home') }} style={{ color: '#1a1a1a', margin: 0, fontSize: '22px', fontWeight: '900', cursor: 'pointer' }}>GEAR<span style={{ color: '#007bff' }}>SHARE</span></h1>
          <div style={{ display: 'flex', gap: '35px' }}>
            {['home', 'products', 'guide', 'about us'].map((tab) => (
              <span key={tab} onClick={() => { setActiveTab(tab); setView('home') }} style={{ cursor: 'pointer', fontWeight: '600', textTransform: 'uppercase', fontSize: '13px', color: activeTab === tab ? '#007bff' : '#999', borderBottom: activeTab === tab ? '2px solid #007bff' : '2px solid transparent', paddingBottom: '5px' }}>
                {tab}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {isVerified ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 15px', backgroundColor: '#f1f3f5', borderRadius: '25px' }}>
                <span style={{ color: '#28a745', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>{userName || 'User'}</span>
              </div>
            ) : (
              <>
                <button onClick={() => { setIsLogin(true); setShowAuth(true) }} style={{ background: 'none', border: 'none', fontWeight: '700', color: '#1a1a1a', cursor: 'pointer' }}>LOGIN</button>
                <button onClick={() => { setIsLogin(false); setShowAuth(true) }} style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '10px 24px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>JOIN NOW</button>
              </>
            )}
          </div>
        </nav>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
          {view === 'home' && (
            <>
              {/* Hero Section */}
              {activeTab === 'home' && (
                <div style={{ textAlign: 'center', padding: '120px 20px', marginBottom: '80px', background: 'linear-gradient(rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.95)), url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1500") center/cover', borderRadius: '30px', color: 'white' }}>
                  <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '64px', fontWeight: '900', marginBottom: '20px', lineHeight: '1' }}>Gear Up, <br /> <span style={{ borderBottom: '6px solid #007bff' }}>Pay Less.</span></h1>
                    <p style={{ fontSize: '18px', opacity: 0.8, maxWidth: '500px', margin: '0 auto' }}>Premium sports equipment rental. Professional gear, amateur prices.</p>
                    <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                      <button onClick={() => setActiveTab('products')} style={{ padding: '18px 35px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Browse Gear</button>
                      <button onClick={() => setActiveTab('guide')} style={{ padding: '18px 35px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>How it Works</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Halaman Guide */}
              {activeTab === 'guide' && (
                <div style={{ padding: '20px 0', maxWidth: '800px', margin: '0 auto' }}>
                  <h1 style={{ fontSize: '42px', fontWeight: '900', textAlign: 'center', marginBottom: '50px' }}>Getting Started</h1>
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {[{ n: '01', t: 'Find Your Gear', d: 'Search through curated professional sports equipment near you.', c: '#007bff' }, { n: '02', t: 'Verify & Book', d: 'Secure your rental with our quick ID verification system.', c: '#1a1a1a' }, { n: '03', t: 'Pickup & Play', d: 'Connect with the owner, grab your gear, and hit the field.', c: '#007bff' }].map(step => (
                      <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: 'white', padding: '40px', borderRadius: '20px', border: '1px solid #eee' }}>
                        <span style={{ fontSize: '48px', fontWeight: '900', color: step.c, opacity: 0.2 }}>{step.n}</span>
                        <div><h3 style={{ fontSize: '22px', marginBottom: '5px' }}>{step.t}</h3><p style={{ color: '#666' }}>{step.d}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Halaman About Us */}
              {activeTab === 'about us' && (
                <div style={{ padding: '60px', backgroundColor: 'white', borderRadius: '30px', border: '1px solid #eee', textAlign: 'center' }}>
                  <h1 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '20px' }}>Our Mission</h1>
                  <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                    GearShare didirikan untuk mendemokratisasi akses ke alat olahraga berkualitas. Kami percaya bahwa biaya peralatan tidak boleh menjadi penghalang bagi siapa pun untuk mengejar gaya hidup sehat dan prestasi atletik.
                  </p>
                  <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
                    <div><h2 style={{ fontSize: '32px', color: '#007bff', margin: '0' }}>500+</h2><p style={{ color: '#999' }}>Gears Available</p></div>
                    <div><h2 style={{ fontSize: '32px', color: '#007bff', margin: '0' }}>1.2k</h2><p style={{ color: '#999' }}>Happy Athletes</p></div>
                  </div>
                </div>
              )}

              {/* Katalog Products (muncul di tab 'products' atau 'home') */}
              {(activeTab === 'products' || activeTab === 'home') && (
                <div style={{ marginTop: '40px' }}>
                  <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '30px' }}>{activeTab === 'products' ? 'Available Gear' : 'Featured Collections'}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                    {items.map(item => (
                      <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                        <div style={{ padding: '30px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 10px 0' }}>{item.name}</h3>
                          <p style={{ fontSize: '22px', fontWeight: '900' }}>Rp {item.price} <span style={{ fontSize: '14px', color: '#999', fontWeight: '400' }}>/ day</span></p>
                          <button onClick={() => handleSewaClick(item)} style={{ width: '100%', marginTop: '25px', padding: '15px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '800' }}>Rent Now</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* View Detail */}
          {/* View Detail - Versi Rapih */}
          {view === 'detail' && (
            <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
              {/* Kolom Kiri: Gambar */}
              <div style={{ flex: 1 }}>
                <button onClick={handleBack} style={{ marginBottom: '30px', border: 'none', background: '#f0f0f0', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>← BACK</button>
                <img src={selectedItem.img} alt={selectedItem.name} style={{ width: '100%', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              </div>

              {/* Kolom Kanan: Info & Transaksi */}
              <div style={{ flex: 1.2 }}>
                <h2 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 10px 0' }}>{selectedItem.name}</h2>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#007bff', marginBottom: '20px' }}>Rp {selectedItem.price} <span style={{ fontSize: '16px', color: '#999' }}> / day</span></p>
                <p style={{ color: '#666', lineHeight: '1.8', fontSize: '17px' }}>{selectedItem.desc}</p>

                {/* Pilihan Durasi & Total Harga - Taruh di sini biar rapi */}
                <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#ffffff', borderRadius: '20px', border: '2px solid #f0f0f0' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>DURASI RENTAL:</label>
                  <select
                    value={rentalDuration}
                    onChange={(e) => setRentalDuration(parseInt(e.target.value))}
                    style={{ ...inputStyle, width: '100%', cursor: 'pointer', marginBottom: '20px', backgroundColor: '#fff' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(day => (
                      <option key={day} value={day}>{day} Hari</option>
                    ))}
                  </select>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                    <span style={{ fontWeight: '600', color: '#666' }}>Total Pembayaran:</span>
                    <span style={{ fontSize: '28px', fontWeight: '900', color: '#1a1a1a' }}>
                      Rp {(parseInt(selectedItem.price.replace('.', '')) * rentalDuration).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => alert(`Rental ${selectedItem.name} selama ${rentalDuration} hari berhasil!`)}
                    style={{ width: '100%', marginTop: '20px', padding: '20px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '18px', cursor: 'pointer' }}
                  >
                    CONFIRM RENTAL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;