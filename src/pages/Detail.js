import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import BookingForm from "../components/BookingForm";
import ReviewSection from "../components/ReviewSection";

export default function Detail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [rentalDuration, setRentalDuration] = useState(1);

  useEffect(() => {
    API.get(`/equipment/${id}`).then(res => setItem(res.data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  const totalPrice = item.price * rentalDuration;

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto", display: 'flex', gap: '50px' }}>
      <div style={{ flex: 1 }}>
        <img src={`http://localhost:5000/uploads/${item.image}`} style={{ width: "100%", borderRadius: "30px", boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
      </div>

      <div style={{ flex: 1.2 }}>
        <h2 style={{ fontSize: '42px', fontWeight: '900' }}>{item.name}</h2>
        <p style={{ color: '#007bff', fontSize: '24px', fontWeight: '700' }}>Rp {item.price.toLocaleString()} <span style={{ fontSize: '14px', color: '#999' }}>/ day</span></p>
        <p style={{ lineHeight: '1.8', color: '#666' }}>{item.description}</p>

        {/* Kalkulator Durasi Lo */}
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '15px', border: '1px solid #eee' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>DURASI RENTAL:</label>
          <select 
            value={rentalDuration} 
            onChange={(e) => setRentalDuration(parseInt(e.target.value))}
            style={{ width: '100%', padding: '10px', marginTop: '10px', borderRadius: '8px' }}
          >
            {[1,2,3,4,5,6,7].map(d => <option key={d} value={d}>{d} Hari</option>)}
          </select>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Total:</span>
            <span style={{ fontSize: '24px', fontWeight: '900' }}>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <BookingForm equipmentId={item._id} duration={rentalDuration} totalPrice={totalPrice} />
      </div>
    </div>
  );
}