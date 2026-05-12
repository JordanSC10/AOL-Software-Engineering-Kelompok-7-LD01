import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    setUser(null);
    
    alert("Berhasil Logout!");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <Link to="/" style={{ textDecoration: 'none', color: '#1a1a1a' }}>
          Gear<span style={{ color: '#007bff' }}>Share</span>
        </Link>
      </div>

      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/verify" style={linkStyle}>Verify KTP</Link>
      </div>

      <div style={authContainerStyle}>
        {/* LOGIC LOGIN/LOGOUT*/}
        {user ? (
          <>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Halo, {user.name}!</span>
            <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={registerBtnStyle}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 5%',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: '900',
  letterSpacing: '-1px'
};

const linkContainerStyle = {
  display: 'flex',
  gap: '25px'
};

const authContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#555',
  fontSize: '14px',
  fontWeight: '600',
  transition: '0.3s'
};

const registerBtnStyle = {
  textDecoration: 'none',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: '0.3s'
};

const logoutBtnStyle = {
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};