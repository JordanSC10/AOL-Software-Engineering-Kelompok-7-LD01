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
        ? "Booking Berhasil! Silakan janjian lokasi COD via Chat." 
        : "Payment Successful! Tunggu verifikasi owner ya.";
      
      alert(successMsg);
      navigate("/"); 
    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment Failed, please try again.");
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ fontWeight: '800', textAlign: 'center' }}>Checkout Gear</h2>
      
      <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "15px", backgroundColor: '#f9f9f9', marginBottom: '25px' }}>
        <p style={{ margin: '5px 0' }}><strong>📦 Item:</strong> {bookingData?.itemName || "Gear Rental"}</p>
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
        <option value="Bank Transfer">Direct Bank Transfer</option>
        <option value="QRIS">Online Payment (QRIS)</option>
        <option value="COD">Cash on Delivery (COD)</option>
      </select>

      {/* --- BOX INSTRUKSI DINAMIS (Tambahan Sesuai Request) --- */}
      <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '10px', marginBottom: '25px', border: '1px solid #ffeeba' }}>
        {paymentMethod === "Bank Transfer" && (
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>💳 Instruksi Transfer:</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>BCA: 8001234567 a/n GearShare Indonesia</p>
            <small>*Kirim bukti transfer ke Owner via fitur Chat.</small>
          </div>
        )}
        
        {paymentMethod === "QRIS" && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>📱 Scan QRIS:</p>
            <div style={{ background: '#fff', padding: '10px', display: 'inline-block', marginTop: '10px' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GearSharePayment" alt="QRIS Dummy" />
            </div>
            <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>Otomatis terverifikasi sistem.</p>
          </div>
        )}

        {paymentMethod === "COD" && (
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>🤝 Ketemu Langsung:</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Bayar tunai di lokasi saat serah terima alat.</p>
            <small>*Janjian di mall atau toko olahraga via fitur Chat.</small>
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