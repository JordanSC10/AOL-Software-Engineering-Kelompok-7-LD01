import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logoGearShare from "../assets/gearshare-logo.png";

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
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={logoGearShare} 
            alt="GearShare Logo" 
            style={logoImageStyle} 
          />
        </Link>
      </div>

      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/verify" style={linkStyle}>Verify KTP</Link>
      </div>

      <div style={authContainerStyle}>
        {user ? (
          <>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>Halo, {user.name}!</span>
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

const logoImageStyle = {
  height: '110px', 
  marginTop: '5px', 
  objectFit: 'contain',
  filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.1)) brightness(1.1)',
  transition: '0.3s' 
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 5%', 
  height: '70px',  
  backgroundColor: '#004a73', 
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)', 
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  overflow: 'hidden',
  borderBottom: '1px solid rgba(255,255,255,0.1)' 
};

const logoStyle = {
  cursor: 'pointer'
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
  color: '#ffffff', 
  fontSize: '14px',
  fontWeight: '600',
  transition: '0.3s',
  opacity: '0.9'
};

const registerBtnStyle = {
  textDecoration: 'none',
  backgroundColor: '#ffffff', 
  color: '#004a73',       
  padding: '10px 25px',
  borderRadius: '50px',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: '0.3s',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
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