import { useState } from "react";
import API from "../api/axios";

export default function BookingPage({ id }) {
  const [file, setFile] = useState();

  const uploadPayment = async () => {
    const form = new FormData();
    form.append("payment", file);

    await API.post(`/booking/payment/${id}`, form);
    alert("Payment uploaded");
  };

  return (
    <div>
      <h2>Upload Payment</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadPayment}>Submit</button>
    </div>
  );
}