export default function ChatButton({ phone, itemName, renterName }) {
  // Pesan otomatis biar owner tau siapa yang chat dan nanya barang apa
  const message = `Halo, saya ${renterName}. Saya tertarik ingin menyewa ${itemName} Anda di GearShare.`;
  const encodedMessage = encodeURIComponent(message);

  return (
    <div>
      <a 
        href={`https://wa.me/${phone}?text=${encodedMessage}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="chat-btn"
      >
        Chat via WhatsApp
      </a>
    </div>
  );
}