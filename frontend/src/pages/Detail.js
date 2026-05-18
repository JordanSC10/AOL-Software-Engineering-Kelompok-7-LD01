import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

import BookingForm from "../components/BookingForm";
import ReviewSection from "../components/ReviewSection";
import ChatButton from "../components/ChatButton";

import { AuthContext } from "../context/AuthContext";

export default function Detail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [rentalDuration, setRentalDuration] = useState(1);

  useEffect(() => {
    API.get(`/equipment/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!item) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </p>
    );
  }

  const totalPrice = item.price * rentalDuration;

  const isOwner =
    user && (user.id === item.owner || user._id === item.owner);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "50px",
          marginBottom: "50px",
        }}
      >
        {/* IMAGE */}
        <div style={{ flex: 1 }}>
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
            style={{
              width: "100%",
              borderRadius: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              objectFit: "cover",
            }}
          />
        </div>

        {/* INFO */}
        <div style={{ flex: 1.2 }}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "900",
              marginBottom: "10px",
            }}
          >
            {item.name}
          </h2>

          <p
            style={{
              color: "#007bff",
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Rp {item.price.toLocaleString("id-ID")}
            <span
              style={{
                fontSize: "14px",
                color: "#999",
              }}
            >
              {" "}
              / day
            </span>
          </p>

          <p
            style={{
              lineHeight: "1.8",
              color: "#666",
              marginBottom: "30px",
            }}
          >
            {item.description}
          </p>

          {/* CHAT BUTTON */}
          {!isOwner && (
            <ChatButton
              phone="628123456789"
              itemName={item.name}
              renterName={user?.name || "User"}
            />
          )}

          {/* RENT DURATION */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "15px",
              border: "1px solid #eee",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <label
              style={{
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              DURASI RENTAL:
            </label>

            <select
              value={rentalDuration}
              onChange={(e) =>
                setRentalDuration(parseInt(e.target.value))
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>
                  {d} Hari
                </option>
              ))}
            </select>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "600" }}>
                Total Estimasi:
              </span>

              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  color: "#1a1a1a",
                }}
              >
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* BOOKING */}
          {isOwner ? (
            <div style={ownerAlertStyle}>
              ⚠️ Ini adalah barang milik Anda.
            </div>
          ) : (
            <BookingForm
              equipmentId={item._id}
              duration={rentalDuration}
              totalPrice={totalPrice}
            />
          )}
        </div>
      </div>

      <hr
        style={{
          border: "0.5px solid #eee",
          margin: "40px 0",
        }}
      />

      <ReviewSection equipmentId={item._id} />
    </div>
  );
}

const ownerAlertStyle = {
  padding: "20px",
  backgroundColor: "#fff3cd",
  color: "#856404",
  borderRadius: "12px",
  textAlign: "center",
  fontWeight: "600",
};