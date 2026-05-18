import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {}; 
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");

  const handlePayment = async () => {
    try {
      await API.post("/payments", {
        bookingId: bookingData?.id,
        method: paymentMethod,
        amount: bookingData?.totalPrice,
      });
      
      const successMsg = paymentMethod === "COD" 
        ? "Pemesanan Berhasil! Silakan tentukan lokasi pertemuan melalui fitur Chat." 
        : "Pembayaran Berhasil! Mohon tunggu verifikasi dari pemilik barang.";
      
      alert(successMsg);
      navigate("/"); 
    } catch (err) {
      console.error("Payment failed", err);
      alert("Pembayaran gagal, silakan coba kembali.");
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ fontWeight: '800', textAlign: 'center' }}>Detail Pembayaran</h2>
      
      <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "15px", backgroundColor: '#f9f9f9', marginBottom: '25px' }}>
        <p style={{ margin: '5px 0' }}><strong>📦 Item:</strong> {bookingData?.itemName || "Perlengkapan Sewa"}</p>
        <p style={{ margin: '5px 0', fontSize: '18px', color: '#007bff' }}>
          <strong>Total:</strong> Rp {bookingData?.totalPrice?.toLocaleString('id-ID')}
        </p>
      </div>
      
      <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Pilih Metode Pembayaran:</h3>
      <select 
        value={paymentMethod} 
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{ width: "100%", padding: "12px", borderRadius: '8px', border: '1px solid #ccc', marginBottom: "20px" }}
      >
        <option value="Bank Transfer">Transfer Bank Langsung</option>
        <option value="QRIS">Pembayaran Online (QRIS)</option>
        <option value="COD">Bayar di Tempat (COD)</option>
      </select>

      {/* --- BOX INSTRUKSI DINAMIS --- */}
      <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '10px', marginBottom: '25px', border: '1px solid #ffeeba' }}>
        {paymentMethod === "Bank Transfer" && (
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>💳 Instruksi Transfer:</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>
              Silakan transfer ke rekening <b>Pemilik Barang</b>:
            </p>
            <p style={{ fontSize: '14px', margin: '5px 0', backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>
              {bookingData?.ownerBankName || "Bank Pemilik"} : {bookingData?.ownerAccountNo || "Nomor Rekening"} <br/>
              a/n {bookingData?.ownerName || "Nama Pemilik"}
            </p>
            <small>*Kirim bukti transfer kepada Pemilik melalui fitur Chat.</small>
          </div>
        )}
        
        {paymentMethod === "QRIS" && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>📱 Scan QRIS Pemilik:</p>
            <div style={{ background: '#fff', padding: '10px', display: 'inline-block', marginTop: '10px' }}>
              {/* Menggunakan QRIS milik owner yang dikirim dari backend */}
              <img src={bookingData?.ownerQrisUrl || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=OwnerQRIS_${bookingData?.id}`} alt="QRIS Owner" />
            </div>
            <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>Mohon simpan bukti transaksi setelah melakukan pemindaian.</p>
          </div>
        )}

        {paymentMethod === "COD" && (
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>🤝 Pembayaran di Tempat:</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Pembayaran dilakukan secara tunai kepada Pemilik Barang saat serah terima perlengkapan.</p>
            <small>*Gunakan fitur Chat untuk kesepakatan lokasi pertemuan.</small>
          </div>
        )}
      </div>

      <button 
        onClick={handlePayment}
        style={{ 
          width: "100%", 
          padding: "15px", 
          backgroundColor: "#28a745", 
          color: "white", 
          border: "none", 
          borderRadius: "10px", 
          fontWeight: 'bold',
          cursor: "pointer",
          fontSize: '16px'
        }}
      >
        Konfirmasi {paymentMethod}
      </button>
    </div>
  );
};

export default Payment;