import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  
  // State untuk Tambah Barang Baru
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null); // State nomor 1 (File)

  useEffect(() => {
    API.get("/booking").then(res => setBookings(res.data));
  }, []);

  const handleAction = async (id, status) => {
    await API.put(`/booking/${id}`, { status });
    alert(`Booking ${status}`);
    // Refresh data booking setelah update
    API.get("/booking").then(res => setBookings(res.data));
  };

  // Fungsi Tambah Barang Baru (Nomor 1 & 2)
  const handleAddEquipment = async (e) => {
    e.preventDefault();

    // Validasi Nomor 2: Minimal Harga 1000
    if (price < 1000) {
      alert("Harga minimal adalah Rp1.000/hari!");
      return;
    }

    // Mengirim Data pake FormData (Karena ada file gambar)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile); 

    try {
      await API.post("/equipment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Alat berhasil ditambahkan!");
      // Reset form
      setName("");
      setPrice("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan alat.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Owner Dashboard</h2>

      {/* --- BAGIAN TAMBAH BARANG (BARU) --- */}
      <section style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ccc" }}>
        <h3>Tambah Alat Baru</h3>
        <form onSubmit={handleAddEquipment}>
          <div>
            <label>Nama Alat:</label><br/>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <br/>
          <div>
            <label>Harga Sewa per Hari (Min. 1.000):</label><br/>
            <input 
              type="number" 
              value={price} 
              min="1000" // Validasi HTML5
              onChange={(e) => setPrice(e.target.value)} 
              required 
            />
          </div>
          <br/>
          <div>
            <label>Upload Foto Alat:</label><br/>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files[0])} 
              required 
            />
          </div>
          <br/>
          <button type="submit" style={{ backgroundColor: "#28a745", color: "white" }}>
            Upload Alat
          </button>
        </form>
      </section>

      {/* --- BAGIAN DAFTAR BOOKING (YANG LAMA) --- */}
      <section>
        <h3>Daftar Permintaan Sewa</h3>
        {bookings.length === 0 ? <p>Belum ada permintaan.</p> : 
          bookings.map(b => (
            <div key={b._id} style={{ borderBottom: "1px solid #eee", marginBottom: "10px" }}>
              <p><strong>{b.equipment.name}</strong> - Status: {b.status}</p>
              <button onClick={() => handleAction(b._id, "approved")}>Approve</button>
              <button onClick={() => handleAction(b._id, "rejected")} style={{ marginLeft: "10px" }}>Reject</button>
            </div>
          ))
        }
      </section>
    </div>
  );
}