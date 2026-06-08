import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <Link
      to={`/detail/${item._id}`}
      style={{
        textDecoration: "none",
        color: "inherit"
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s"
        }}
      >
        <img
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.name}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            backgroundColor: "#f5f5f5"
          }}
        />

        <div style={{ padding: "15px" }}>
          <h3
            style={{
              margin: "0 0 10px 0",
              color: "#222",
              fontSize: "18px"
            }}
          >
            {item.name}
          </h3>

          <p
            style={{
              margin: 0,
              color: "#007ABD",
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            Rp {item.price?.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </Link>
  );
}