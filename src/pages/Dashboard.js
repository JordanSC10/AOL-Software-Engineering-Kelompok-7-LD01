import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/booking").then(res => setBookings(res.data));
  }, []);

  const handleAction = async (id, status) => {
    await API.put(`/booking/${id}`, { status });
    alert("Updated");
  };

  return (
    <div>
      <h2>Owner Dashboard</h2>

      {bookings.map(b => (
        <div key={b._id}>
          <p>{b.equipment.name}</p>
          <button onClick={() => handleAction(b._id, "approved")}>
            Approve
          </button>
          <button onClick={() => handleAction(b._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}