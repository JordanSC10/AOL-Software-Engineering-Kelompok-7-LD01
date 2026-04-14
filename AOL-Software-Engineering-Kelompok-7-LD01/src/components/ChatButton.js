export default function ChatButton({ phone }) {
  return (
    <div>
      <a href={`https://wa.me/${phone}`} target="_blank">
        Chat via WhatsApp
      </a>
    </div>
  );
}