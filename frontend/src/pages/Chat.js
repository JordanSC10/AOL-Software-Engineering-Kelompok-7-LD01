import { useEffect, useState, useContext } from 'react';
import { io } from "socket.io-client";
import { AuthContext } from '../context/AuthContext';

// Koneksi ke backend (sesuain port backend lo)
const socket = io("http://localhost:5000");

export default function Chat({ roomId }) {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    // Gabung ke room spesifik pas chat dibuka
    socket.emit("join_room", roomId);

    // Dengerin pesan masuk
    socket.on("receive_message", (data) => {
      setChatLog((prev) => [...prev, data]);
    });

    // Cleanup pas chat ditutup biar gak memory leak
    return () => { socket.off("receive_message"); };
  }, [roomId]);

  const sendMessage = () => {
    if (message !== "") {
      const msgData = {
        room: roomId,
        sender: user?.name || "Anonim",
        message: message,
      };
      socket.emit("send_message", msgData);
      setChatLog((prev) => [...prev, msgData]); // Munculin chat sendiri
      setMessage("");
    }
  };

  return (
    <div className="chat-container" style={chatStyle}>
      <div className="chat-messages" style={msgBoxStyle}>
        {chatLog.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === user?.name ? 'right' : 'left' }}>
            <p style={bubbleStyle(msg.sender === user?.name)}>
              <strong>{msg.sender}:</strong> {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: '10px' }}
        />
        <button onClick={sendMessage}>Kirim</button>
      </div>
    </div>
  );
}

// Styling simpel
const chatStyle = { border: '1px solid #ddd', borderRadius: '10px', background: '#fff', padding: '10px' };
const msgBoxStyle = { height: '200px', overflowY: 'auto', marginBottom: '10px' };
const bubbleStyle = (isMe) => ({
  background: isMe ? '#007bff' : '#eee',
  color: isMe ? 'white' : 'black',
  padding: '5px 10px',
  borderRadius: '10px',
  display: 'inline-block',
  margin: '2px 0'
});