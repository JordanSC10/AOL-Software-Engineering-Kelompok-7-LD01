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
      // Kirim status payment ke backend Remon
      await API.post("/payments", {
        bookingId: bookingData.id,
        method: paymentMethod,
        amount: bookingData.totalPrice,
      });
      alert("Payment Successful!");
      navigate("/"); // Balik ke Home
    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment Failed, please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Payment Detail</h2>
      <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
        <p><strong>Item:</strong> {bookingData?.itemName}</p>
        <p><strong>Total Amount:</strong> Rp {bookingData?.totalPrice?.toLocaleString()}</p>
      </div>
      
      <h3 style={{ marginTop: "20px" }}>Select Payment Method</h3>
      <select 
        value={paymentMethod} 
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      >
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="E-Wallet">E-Wallet (OVO/Dana)</option>
        <option value="Credit Card">Credit Card</option>
      </select>

      <button 
        onClick={handlePayment}
        style={{ width: "100%", padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;