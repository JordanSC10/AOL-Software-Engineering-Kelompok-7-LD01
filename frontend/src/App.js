import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Verify from "./pages/Verify";
import Payment from "./pages/Payment"; // Tambahkan jika ada halaman payment

function App() {
  return (
    <Router>
      {/* Navbar di luar Routes supaya selalu muncul di atas */}
      <Navbar /> 
      
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Halaman Utama */}
          <Route path="/" element={<Home />} />

          {/* Autentikasi */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Verifikasi KTP */}
          <Route path="/verify" element={<Verify />} />

          {/* Dashboard Owner/User */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Detail Barang - Menggunakan parameter :id */}
          <Route path="/detail/:id" element={<Detail />} />

          {/* Halaman Pembayaran */}
          <Route path="/payment" element={<Payment />} />

          {/* Halaman 404 jika URL tidak ditemukan */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <h1>404</h1>
              <p>Halaman tidak ditemukan, Binusian!</p>
            </div>
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App;