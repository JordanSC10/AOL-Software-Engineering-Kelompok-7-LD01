import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import AuthContext from "../context/AuthContext"; 

export default function Dashboard() {
  const { user } = useContext(AuthContext); 
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    API.get("/booking").then(res => setBookings(res.data));
  }, []);

  const handleAction = async (id, status) => {
    await API.put(`/booking/${id}`, { status });
    alert(`Booking ${status}`);
    API.get("/booking").then(res => setBookings(res.data));
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    if (price < 1000) return alert("Harga minimal Rp1.000!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile); 

    try {
      await API.post("/equipment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Alat berhasil ditambahkan!");
      setName(""); setPrice(""); setImageFile(null);
    } catch (err) {
      alert("Gagal menambahkan alat.");
    }
  };

  const isVerified = user?.isVerified === "approved";
  const isPending = user?.isVerified === "pending";

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '30px' }}>Owner Dashboard</h2>

      {/* STATUS VERIFIKASI BOX */}
      {!isVerified && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: isPending ? '#e3f2fd' : '#ffebee', 
          borderRadius: '15px', 
          marginBottom: '30px',
          border: `1px solid ${isPending ? '#2196f3' : '#f44336'}`
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: isPending ? '#0d47a1' : '#b71c1c' }}>
            {isPending ? "⏳ Verifikasi Sedang Diproses" : "⚠️ Akun Belum Terverifikasi"}
          </h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {isPending 
              ? "Mohon tunggu, admin sedang meninjau dokumen KTP Anda. Fitur pengelolaan barang akan terbuka setelah akun disetujui." 
              : "Anda wajib melakukan verifikasi KTP terlebih dahulu untuk dapat mengunggah perlengkapan sewa."}
          </p>
        </div>
      )}

      {/* FORM TAMBAH BARANG (Hanya muncul kalau sudah verified) */}
      <section style={{ 
        marginBottom: "40px", 
        padding: "30px", 
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
        opacity: isVerified ? 1 : 0.6,
        pointerEvents: isVerified ? 'auto' : 'none'
      }}>
        <h3 style={{ marginTop: 0 }}>Tambah Alat Baru</h3>
        {!isVerified && <p style={{ color: 'red', fontSize: '12px' }}>* Fitur ini terkunci sampai lo terverifikasi.</p>}
        <form onSubmit={handleAddEquipment}>
          <div style={{ marginBottom: '15px' }}>
            <label>Nama Alat:</label><br/>
            <input style={inputStyle} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Harga Sewa/Hari:</label><br/>
            <input style={inputStyle} type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Upload Foto Alat:</label><br/>
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} required />
          </div>
          <button type="submit" style={btnStyle}>Upload Alat</button>
        </form>
      </section>

      {/* DAFTAR BOOKING */}
      <section>
        <h3>Daftar Permintaan Sewa</h3>
        {bookings.length === 0 ? <p style={{ color: '#999' }}>Belum ada permintaan masuk.</p> : 
          bookings.map(b => (
            <div key={b._id} style={cardStyle}>
              <p><strong>{b.equipment.name}</strong> <span style={statusBadge}>{b.status}</span></p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleAction(b._id, "approved")} style={actionBtn('#28a745')}>Approve</button>
                <button onClick={() => handleAction(b._id, "rejected")} style={actionBtn('#dc3545')}>Reject</button>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ddd' };
const btnStyle = { backgroundColor: "#28a745", color: "white", padding: '12px 25px', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };
const cardStyle = { padding: '20px', borderBottom: "1px solid #eee", display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const statusBadge = { backgroundColor: '#eee', padding: '2px 8px', borderRadius: '5px', fontSize: '12px', marginLeft: '10px' };
const actionBtn = (bg) => ({ backgroundColor: bg, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' });