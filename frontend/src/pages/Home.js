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
    <div style={{ padding: "20px" }}>
      <h1>GearShare Marketplace</h1>

      <input
        placeholder="Search equipment..."
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {filtered.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}