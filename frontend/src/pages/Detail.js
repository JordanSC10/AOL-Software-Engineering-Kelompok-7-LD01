import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import BookingForm from "../components/BookingForm";
import ReviewSection from "../components/ReviewSection";

export default function Detail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 1. Ambil data barang
    API.get(`/equipment/${id}`).then(res => setItem(res.data));

    // 2. Ambil data user dari localStorage (biasanya disimpan pas login)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, [id]);

  if (!item) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

  const totalPrice = item.price * rentalDuration;

  // 3. Logic Restriksi Owner (Nomor 3)
  // Kita cek apakah ID user yang login sama dengan ID owner barang ini
  // Catatan: Pastiin backend lo ngirim field 'owner' atau 'ownerId' di data item
  const isOwner = currentUser && (currentUser.id === item.owner || currentUser._id === item.owner);

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: 'flex', gap: '50px', marginBottom: '50px' }}>
        {/* Bagian Kiri: Gambar */}
        <div style={{ flex: 1 }}>
          <img 
            src={`http://localhost:5000/uploads/${item.image}`} 
            alt={item.name}
            style={{ width: "100%", borderRadius: "30px", boxShadow: '0 10px 30px rgba(0,0,0,0.1)', objectFit: 'cover' }} 
          />
        </div>

        {/* Bagian Kanan: Info & Booking */}
        <div style={{ flex: 1.2 }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '10px' }}>{item.name}</h2>
          <p style={{ color: '#007bff', fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
            Rp {item.price.toLocaleString('id-ID')} <span style={{ fontSize: '14px', color: '#999' }}>/ day</span>
          </p>
          <p style={{ lineHeight: '1.8', color: '#666', marginBottom: '30px' }}>{item.description}</p>

          {/* Kalkulator Durasi */}
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '15px', border: '1px solid #eee', marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>DURASI RENTAL:</label>
            <select 
              value={rentalDuration} 
              onChange={(e) => setRentalDuration(parseInt(e.target.value))}
              style={{ width: '100%', padding: '12px', marginTop: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            >
              {[1,2,3,4,5,6,7].map(d => <option key={d} value={d}>{d} Hari</option>)}
            </select>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '600' }}>Total Estimasi:</span>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#1a1a1a' }}>
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Logic Tampilan Tombol Booking */}
          {isOwner ? (
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#fff3cd', 
              color: '#856404', 
              borderRadius: '12px', 
              border: '1px solid #ffeeba',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              ⚠️ Ini adalah barang milik Anda. Anda tidak bisa menyewa properti sendiri.
            </div>
          ) : (
            <BookingForm equipmentId={item._id} duration={rentalDuration} totalPrice={totalPrice} />
          )}
        </div>
      </div>

      <hr style={{ border: '0.5px solid #eee', margin: '40px 0' }} />
      
      {/* Section Review */}
      <ReviewSection equipmentId={item._id} />
    </div>
  );
}