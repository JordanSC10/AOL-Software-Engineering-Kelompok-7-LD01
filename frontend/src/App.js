import React, { useState } from 'react';
import './App.css';

// Mock Data - Idealnya dipisah ke file constants.js
const GEAR_DATA = [
  { id: 1, name: "Raket Yonex Astrox 100 ZZ", price: 50000, category: "Badminton", img: "/astrox.jpg", desc: "Kondisi 95% mulus, senar baru ditarik 28 lbs.", owner: "Jordan", location: "Jakarta Barat" },
  { id: 2, name: "Sepatu Bola Adidas F50", price: 120000, category: "Football", img: "/f50.jpg", desc: "Size 42. Ringan banget, enak buat lari kencang.", owner: "Gilbert", location: "Tangerang" },
  { id: 3, name: "Dumbbell 10Kg", price: 30000, category: "Fitness", img: "/dumbbell.jpg", desc: "Bahan besi solid, grip karet tidak licin.", owner: "Raymond", location: "Jakarta Selatan" },
];

function App() {
  const [view, setView] = useState('welcome');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Login/Signup form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupRole, setSignupRole] = useState('Renter');
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [gearData, setGearData] = useState(GEAR_DATA);
  const [newGear, setNewGear] = useState({ name: '', category: '', price: '', location: '', desc: '', img: '' });
  const [bookingRequests, setBookingRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');

  const categories = Array.from(new Set(gearData.map((item) => item.category)));
  const filteredGear = gearData.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query);
    const matchesCategory = searchCategory ? item.category === searchCategory : true;
    const matchesLocation = searchLocation ? item.location.toLowerCase().includes(searchLocation.toLowerCase()) : true;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Handler functions
  const navigateTo = (viewName, item = null) => {
    setView(viewName);
    if (item) setSelectedItem(item);
  };

  const handleVerify = () => {
    if (!userName.trim()) return alert("Nama harus diisi!");
    setIsVerified(true);
    setView('detail');
    alert('Verifikasi Berhasil!');
  };

  const handleLogin = () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      alert("Email dan password harus diisi!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      alert("Email tidak valid!");
      return;
    }
    const matchedUser = users.find((user) => user.email === loginEmail && user.password === loginPassword);
    if (!matchedUser) {
      alert('Email atau password salah. Silakan cek kembali.');
      return;
    }
    setCurrentUser({ email: matchedUser.email, displayName: matchedUser.displayName, role: matchedUser.role });
    setIsLoggedIn(true);
    setLoginEmail('');
    setLoginPassword('');
    setView('home');
    alert('Login Berhasil!');
  };

  const handleSignup = () => {
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim() || !signupConfirmPassword.trim()) {
      alert("Semua field harus diisi!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) {
      alert("Email tidak valid!");
      return;
    }
    if (signupPassword.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    if (users.some((user) => user.email === signupEmail)) {
      alert('Email sudah terdaftar. Silakan login.');
      return;
    }
    const newUser = {
      displayName: signupName,
      email: signupEmail,
      password: signupPassword,
      role: signupRole,
    };
    setUsers([...users, newUser]);
    setCurrentUser({ email: signupEmail, displayName: signupName, role: signupRole });
    setIsLoggedIn(true);
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setView('home');
    alert('Pendaftaran Berhasil! Selamat datang di GearShare');
  };

  const handleListingSubmit = () => {
    if (!newGear.name.trim() || !newGear.category.trim() || !newGear.price.trim() || !newGear.location.trim() || !newGear.desc.trim()) {
      alert('Semua field listing harus diisi!');
      return;
    }
    setGearData([
      ...gearData,
      {
        id: gearData.length + 1,
        name: newGear.name,
        category: newGear.category,
        price: Number(newGear.price),
        location: newGear.location,
        desc: newGear.desc,
        img: newGear.img || '/astrox.jpg',
        owner: currentUser?.displayName || 'Owner Baru',
      },
    ]);
    setNewGear({ name: '', category: '', price: '', location: '', desc: '', img: '' });
    setView('home');
    alert('Peralatan berhasil diunggah!');
  };

  const handleBookingRequest = (item) => {
    if (!isLoggedIn) {
      alert('Silakan login dahulu untuk membuat booking.');
      return;
    }
    if (currentUser?.role !== 'Renter') {
      alert('Hanya Renter yang bisa membuat booking.');
      return;
    }
    setBookingRequests([
      ...bookingRequests,
      {
        id: Date.now(),
        item,
        renter: currentUser.displayName,
        status: 'Pending',
        requestedAt: new Date().toLocaleString(),
      },
    ]);
    alert('Permintaan booking terkirim. Silakan cek Booking Requests.');
  };

  const handleApproveBooking = (requestId) => {
    setBookingRequests(
      bookingRequests.map((request) =>
        request.id === requestId ? { ...request, status: 'Approved' } : request
      )
    );
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: currentUser ? currentUser.displayName : 'Guest',
        content: chatMessage,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setChatMessage('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsVerified(false);
    setUserName('');
    setView('welcome');
  };

  return (
    <div className="app-container dark-immersive">
      {/* Navbar hanya tampil jika sudah login */}
      {isLoggedIn && (
        <nav className="navbar">
          <h1 className="logo" onClick={() => navigateTo('home')}>
            GEAR<span>SHARE</span>
          </h1>
          <div className="nav-profile">
            {isLoggedIn && currentUser ? (
              <div className="user-badge">
                <span className="status">✓ {isVerified ? 'Terverifikasi' : 'Logged In'}</span>
                <div className="avatar">{currentUser.displayName[0]?.toUpperCase()}</div>
                <span className="name">{currentUser.displayName}</span>
                <button className="btn-text" onClick={handleLogout} style={{marginLeft: '10px', padding: '8px 16px', fontSize: '12px'}}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="nav-auth">
                <button className="btn-text" onClick={() => navigateTo('login')}>Masuk</button>
                <button className="btn-primary" onClick={() => navigateTo('signup')}>Daftar</button>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* Content Area */}
      <main className="main-content">
        {!isLoggedIn ? (
          <>
            {view === 'welcome' && (
              <div className="welcome-view">
                <div className="welcome-content">
                  <h1 className="welcome-title">Welcome To GearShare!</h1>
                  <p className="welcome-subtitle">Sign up or Login to start our journey together!</p>
                  <div className="welcome-buttons">
                    <button className="btn-primary" onClick={() => setView('signup')}>
                      Sign Up
                    </button>
                    <button className="btn-text" onClick={() => setView('login')}>
                      Login
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === 'login' && (
              <div className="verify-container">
                <button className="btn-back" style={{marginBottom: '20px'}} onClick={() => setView('welcome')}>← Kembali</button>
                <h2>Masuk ke GearShare</h2>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email"
                    value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)} 
                    placeholder="masukkan@email.com"
                  />
                  <label>Password</label>
                  <input 
                    type="password"
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    placeholder="Masukkan password"
                  />
                  <button className="btn-primary-full" onClick={handleLogin}>
                    Masuk
                  </button>
                  <p style={{textAlign: 'center', color: 'rgba(240, 249, 255, 0.7)', marginTop: '20px'}}>
                    Belum punya akun? <span onClick={() => setView('signup')} style={{color: '#60a5fa', cursor: 'pointer', fontWeight: 'bold'}}>Daftar di sini</span>
                  </p>
                </div>
              </div>
            )}

            {view === 'signup' && (
              <div className="verify-container">
                <button className="btn-back" style={{marginBottom: '20px'}} onClick={() => setView('welcome')}>← Kembali</button>
                <h2>Daftar ke GearShare</h2>
                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <input 
                    type="text"
                    value={signupName} 
                    onChange={(e) => setSignupName(e.target.value)} 
                    placeholder="Contoh: Ahmad Ridho"
                  />
                  <label>Email</label>
                  <input 
                    type="email"
                    value={signupEmail} 
                    onChange={(e) => setSignupEmail(e.target.value)} 
                    placeholder="email@example.com"
                  />
                  <label>Password</label>
                  <input 
                    type="password"
                    value={signupPassword} 
                    onChange={(e) => setSignupPassword(e.target.value)} 
                    placeholder="Min. 6 karakter"
                  />
                  <label>Konfirmasi Password</label>
                  <input 
                    type="password"
                    value={signupConfirmPassword} 
                    onChange={(e) => setSignupConfirmPassword(e.target.value)} 
                    placeholder="Ulangi password"
                  />
                  <div className="role-label-row">
                    <label>Pilih Role Akun</label>
                    <span className="role-note">Renter = Penyewa, Owner = Pengunggah alat</span>
                  </div>
                  <div className="role-selection">
                    <button
                      type="button"
                      className={`role-pill ${signupRole === 'Renter' ? 'active' : ''}`}
                      onClick={() => setSignupRole('Renter')}
                    >
                      Renter
                    </button>
                    <button
                      type="button"
                      className={`role-pill ${signupRole === 'Owner' ? 'active' : ''}`}
                      onClick={() => setSignupRole('Owner')}
                    >
                      Owner
                    </button>
                  </div>
                  <select value={signupRole} onChange={(e) => setSignupRole(e.target.value)}>
                    <option value="Renter">Renter</option>
                    <option value="Owner">Owner</option>
                  </select>
                  <button className="btn-primary-full" onClick={handleSignup}>
                    Daftar
                  </button>
                  <p style={{textAlign: 'center', color: 'rgba(240, 249, 255, 0.7)', marginTop: '20px'}}>
                    Sudah punya akun? <span onClick={() => setView('login')} style={{color: '#60a5fa', cursor: 'pointer', fontWeight: 'bold'}}>Masuk di sini</span>
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* --- HOME VIEW --- */}
            {view === 'home' && (
              <div className="home-view">
                <header className="content-header">
                  <h2>Sewa Alat Olahraga</h2>
                  {currentUser?.role === 'Owner' && (
                    <button className="btn-primary" onClick={() => navigateTo('list')} style={{marginLeft: 'auto'}}>
                      Unggah Peralatan
                    </button>
                  )}
                  <button className="btn-text" onClick={() => navigateTo('requests')} style={{marginLeft: '10px'}}>
                    Booking Requests
                  </button>
                  <button className="btn-text" onClick={() => navigateTo('chat')} style={{marginLeft: '10px'}}>
                    Chat
                  </button>
                </header>
            <div className="search-bar">
              <input
                className="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari alat, kategori, atau lokasi"
              />
              <input
                className="search-input search-filter"
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Lokasi"
              />
              <select
                className="search-input search-filter"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">Semua Kategori</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="item-grid">
              {filteredGear.map(item => (
                <div key={item.id} className="item-card">
                  <div className="img-wrapper">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <span className="category-tag">{item.category}</span>
                    <h3>{item.name}</h3>
                    <p className="price">Rp {item.price.toLocaleString()} / hari</p>
                    <button className="btn-full" onClick={() => navigateTo('detail', item)}>
                      Sewa Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

            {view === 'list' && currentUser?.role === 'Owner' && (
              <div className="verify-container">
                <button className="btn-back" style={{marginBottom: '20px'}} onClick={() => navigateTo('home')}>← Kembali</button>
                <h2>Unggah Peralatan</h2>
            <div className="form-group">
              <label>Nama Peralatan</label>
              <input
                type="text"
                value={newGear.name}
                onChange={(e) => setNewGear({ ...newGear, name: e.target.value })}
                placeholder="Contoh: Raket Badminton"
              />
              <label>Kategori</label>
              <input
                type="text"
                value={newGear.category}
                onChange={(e) => setNewGear({ ...newGear, category: e.target.value })}
                placeholder="Badminton, Football, Fitness"
              />
              <label>Harga per Hari</label>
              <input
                type="number"
                value={newGear.price}
                onChange={(e) => setNewGear({ ...newGear, price: e.target.value })}
                placeholder="Contoh: 50000"
              />
              <label>Lokasi</label>
              <input
                type="text"
                value={newGear.location}
                onChange={(e) => setNewGear({ ...newGear, location: e.target.value })}
                placeholder="Contoh: Jakarta Selatan"
              />
              <label>Deskripsi</label>
              <input
                type="text"
                value={newGear.desc}
                onChange={(e) => setNewGear({ ...newGear, desc: e.target.value })}
                placeholder="Deskripsi singkat peralatan"
              />
              <label>Link Gambar</label>
              <input
                type="text"
                value={newGear.img}
                onChange={(e) => setNewGear({ ...newGear, img: e.target.value })}
                placeholder="Contoh: /new-item.jpg"
              />
              <button className="btn-primary-full" onClick={handleListingSubmit}>
                Unggah Sekarang
              </button>
            </div>
          </div>
        )}

        {view === 'requests' && (
          <div className="verify-container">
            <button className="btn-back" style={{marginBottom: '20px'}} onClick={() => navigateTo('home')}>← Kembali</button>
            <h2>Booking Requests</h2>
            {bookingRequests.length === 0 ? (
              <p>Tidak ada permintaan booking saat ini.</p>
            ) : (
              bookingRequests.map((request) => (
                <div key={request.id} className="request-card">
                  <h4>{request.item.name}</h4>
                  <p><strong>Renter:</strong> {request.renter}</p>
                  <p><strong>Lokasi:</strong> {request.item.location}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                  <p><strong>Waktu:</strong> {request.requestedAt}</p>
                  {currentUser?.role === 'Owner' && request.status === 'Pending' && (
                    <button className="btn-full" onClick={() => handleApproveBooking(request.id)}>
                      Setujui
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {view === 'chat' && (
          <div className="verify-container">
            <button className="btn-back" style={{marginBottom: '20px'}} onClick={() => navigateTo('home')}>← Kembali</button>
            <h2>Chat Koordinasi</h2>
            <div className="chat-panel">
              {messages.length === 0 ? (
                <p>Belum ada pesan. Kirim pesan pertama untuk memulai koordinasi.</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.sender === currentUser?.displayName ? 'self' : ''}`}>
                    <strong>{msg.sender}</strong>
                    <p>{msg.content}</p>
                    <span>{msg.time}</span>
                  </div>
                ))
              )}
            </div>
            <div className="form-group">
              <label>Kirim Pesan</label>
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Tulis pesan untuk owner/renter..."
                rows={4}
              />
              <button className="btn-primary-full" onClick={handleSendMessage}>
                Kirim Pesan
              </button>
            </div>
          </div>
        )}

        {/* --- DETAIL VIEW --- */}
        {view === 'detail' && selectedItem && (
          <div className="detail-card">
            <button className="btn-back" onClick={() => navigateTo('home')}>← Kembali</button>
            <div className="detail-layout">
              <img className="detail-img" src={selectedItem.img} alt={selectedItem.name} />
              <div className="detail-info">
                <h2>{selectedItem.name}</h2>
                <p className="price-large">Rp {selectedItem.price.toLocaleString()} / hari</p>
                <hr />
                <h4>Deskripsi:</h4>
                <p className="description">{selectedItem.desc}</p>
                
                {!isVerified ? (
                  <div className="verify-alert">
                    <p><strong>⚠️ Verifikasi Diperlukan</strong></p>
                    <p>Unggah KTP untuk mulai menyewa.</p>
                    <button className="btn-warning" onClick={() => setView('verify')}>
                      Mulai Verifikasi
                    </button>
                  </div>
                ) : (
                  <div className="owner-box">
                    <p><strong>Pemilik:</strong> {selectedItem.owner}</p>
                    <p><strong>Lokasi:</strong> {selectedItem.location}</p>
                    {currentUser?.role === 'Renter' && (
                      <button className="btn-primary-full" onClick={() => handleBookingRequest(selectedItem)}>
                        Pesan Sekarang
                      </button>
                    )}
                    <button className="btn-success" onClick={() => navigateTo('chat')}>
                      Chat Pemilik
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- VERIFY VIEW --- */}
        {view === 'verify' && (
          <div className="verify-container">
            <h2>Verifikasi Identitas</h2>
            <div className="form-group">
              <label>Nama Lengkap (Sesuai KTP)</label>
              <input 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder="Contoh: Nabil Ganteng"
              />
              <label>Foto KTP</label>
              <div className="upload-placeholder">Pilih File KTP</div>
              <button className="btn-primary-full" onClick={handleVerify}>
                Kirim Verifikasi
              </button>
            </div>
          </div>
        )}
      </>) }
      </main>
    </div>
  );
}

export default App;