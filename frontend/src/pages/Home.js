import { useEffect, useState } from "react";
import API from "../api/axios";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/equipment").then(res => setItems(res.data));
  }, []);

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px 5%", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>Explore Gear</h1>
        <p style={{ color: '#666' }}>Sewa alat hobi & olahraga dari owner terpercaya.</p>
      </div>

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
      
      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>Barang nggak ketemu, coba cari yang lain...</p>
      )}
    </div>
  );
}

const searchStyle = {
  padding: "15px 25px",
  width: "100%",
  borderRadius: "50px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "0.3s"
};