import { useEffect, useState } from "react";
import API from "../api/axios";
import ItemCard from "../components/ItemCard";
import logoGearShare from "../assets/gearshare-logo.png";

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/equipment")
      .then(res => setItems(res.data))
      .catch(err => console.log("Backend offline.", err));
  }, []);

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ 
      background: 'linear-gradient(180deg, #007ABD 0%, #005f91 50%, #004a73 100%)', 
      minHeight: '100vh',
      paddingBottom: '100px' 
    }}>
      {/* HERO SECTION */}
      <div style={{ 
        padding: '0px 5% 80px', 
        textAlign: 'center',
        color: 'white' 
      }}>
        <img 
          src={logoGearShare} 
          alt="GearShare Logo" 
          style={{ 
            width: '320px', 
            marginBottom: '-60px', 
            filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.2)) brightness(1.1)',
            display: 'block',      
            marginRight: 'auto',
            marginLeft: 'auto'
          }} 
        />
        <h1 style={{ 
          fontSize: '52px', 
          fontWeight: '900', 
          marginTop: '0px', 
          marginBottom: '0px',   
          letterSpacing: '-2px', 
          lineHeight: '0.6',    
        }}>
          Explore Gear
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          marginTop: '20px',      
          fontSize: '18px',
          fontWeight: '500'
        }}>
          Sewa alat hobi & olahraga dari owner terpercaya.
        </p>
      </div>

      {/* SEARCH & GRID AREA */}
      <div style={{ padding: "0 5%", maxWidth: "1400px", margin: "-30px auto 0" }}>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 50px' }}>
          <input
            placeholder="Cari kamera, tenda, atau raket..."
            style={searchStyle}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "30px"
        }}>
          {filtered.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
        
        {items.length > 0 && filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#fff', marginTop: '50px' }}>
            Barang nggak ketemu, coba cari yang lain...
          </p>
        )}
      </div>
    </div>
  );
}

const searchStyle = {
  padding: "18px 30px",
  width: "100%",
  borderRadius: "50px",
  border: "none", 
  outline: "none",
  fontSize: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)", 
  transition: "0.3s"
};