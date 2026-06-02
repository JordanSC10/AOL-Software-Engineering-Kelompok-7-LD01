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
    <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "auto", color: "white" }}>
      <h2 style={{ fontWeight: '900', textAlign: 'center', fontSize: '32px', marginBottom: '30px' }}>Detail Pembayaran</h2>
      
      {/* RINGKASAN PESANAN */}
      <div style={{ 
        border: "1px solid rgba(255, 255, 255, 0.2)", 
        padding: "25px", 
        borderRadius: "20px", 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(10px)',
        marginBottom: '30px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
      }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', opacity: 0.8 }}>Ringkasan Sewa:</p>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>📦 {bookingData?.itemName || "Perlengkapan Sewa"}</h4>
        <p style={{ margin: '0', fontSize: '24px', color: '#66b2ff', fontWeight: '800' }}>
          Total: Rp {bookingData?.totalPrice?.toLocaleString('id-ID')}
        </p>
      </div>
      
      <h3 style={{ fontSize: '18px', marginBottom: '15px', fontWeight: '600' }}>Pilih Metode Pembayaran:</h3>
      <select 
        value={paymentMethod} 
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{ 
          width: "100%", 
          padding: "15px", 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.3)', 
          marginBottom: "25px",
          backgroundColor: '#fff',
          color: '#333',
          fontSize: '16px',
          fontWeight: '600'
        }}
      >
        <option value="Bank Transfer">Transfer Bank (Manual)</option>
        <option value="QRIS">QRIS / E-Wallet</option>
        <option value="COD">Bayar di Tempat (COD)</option>
      </select>

      {/* --- BOX INSTRUKSI DINAMIS --- */}
      <div style={{ 
        padding: '25px', 
        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
        borderRadius: '15px', 
        marginBottom: '30px', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        lineHeight: '1.6'
      }}>
        {paymentMethod === "Bank Transfer" && (
          <div>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#ffc107' }}>💳 Instruksi Transfer:</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>
              Silakan transfer tepat sesuai nominal ke rekening berikut:
            </p>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '15px', 
              borderRadius: '10px', 
              marginTop: '10px',
              borderLeft: '4px solid #ffc107'
            }}>
              <p style={{ margin: 0, fontSize: '15px' }}>
                <b>{bookingData?.ownerBankName || "Bank BCA"}</b><br/>
                No. Rek: <b>{bookingData?.ownerAccountNo || "123-456-7890"}</b><br/>
                a/n {bookingData?.ownerName || "Owner GearShare"}
              </p>
            </div>
            <p style={{ fontSize: '12px', marginTop: '10px', opacity: 0.7 }}>
              *Setelah transfer, wajib kirim bukti ke owner via WhatsApp/Chat.
            </p>
          </div>
        )}
        
        {paymentMethod === "QRIS" && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', color: '#ffc107' }}>📱 Scan QRIS Untuk Bayar:</p>
            <div style={{ 
              background: '#fff', 
              padding: '15px', 
              display: 'inline-block', 
              borderRadius: '15px' 
            }}>
              <img 
                src={bookingData?.ownerQrisUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=GearShare_Payment_${bookingData?.id}`} 
                alt="QRIS Owner" 
                style={{ width: '180px', height: '180px' }}
              />
            </div>
            <p style={{ fontSize: '12px', marginTop: '15px', opacity: 0.7 }}>
              Bisa discan pakai GoPay, OVO, Dana, atau Mobile Banking apa saja.
            </p>
          </div>
        )}

        {paymentMethod === "COD" && (
          <div>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#ffc107' }}>🤝 Pembayaran di Tempat:</p>
            <p style={{ fontSize: '14px' }}>
              Pembayaran dilakukan secara tunai/cash langsung ke Owner saat lo ambil barangnya atau barang sampai.
            </p>
            <div style={{ 
              backgroundColor: 'rgba(255,193,7,0.1)', 
              padding: '10px', 
              borderRadius: '8px', 
              fontSize: '12px',
              marginTop: '10px'
            }}>
              💡 Tips: Pastikan bawa uang pas atau konfirmasi kembalian ke Owner lewat Chat.
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handlePayment}
        style={{ 
          width: "100%", 
          padding: "18px", 
          backgroundColor: "#28a745", 
          color: "white", 
          border: "none", 
          borderRadius: "15px", 
          fontWeight: '900',
          cursor: "pointer",
          fontSize: '18px',
          boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
      >
        Konfirmasi & Selesaikan
      </button>
      
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', opacity: 0.6 }}>
        Dengan menekan tombol, Anda setuju dengan syarat & ketentuan GearShare.
      </p>
    </div>
  );
};

export default Payment;