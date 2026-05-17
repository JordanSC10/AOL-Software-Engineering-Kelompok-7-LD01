import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Verify from "./pages/Verify";
import Payment from "./pages/Payment";

function App() {
  return (
    <AuthProvider> {/* <-- BUNGKUS SEMUA DI SINI */}
      <Router>
        <Navbar /> 
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1>404</h1>
                <p>Halaman tidak ditemukan, Binusian!</p>
              </div>
            } />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;