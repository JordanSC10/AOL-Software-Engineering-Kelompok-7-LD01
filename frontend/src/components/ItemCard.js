import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt={item.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />

      <div style={{ padding: "10px" }}>
        <h3>{item.name}</h3>
        <p>Rp {item.price}</p>
        <p>{item.location}</p>

        <Link to={`/detail/${item._id}`}>
          <button>View</button>
        </Link>
      </div>
    </div>
  );
}