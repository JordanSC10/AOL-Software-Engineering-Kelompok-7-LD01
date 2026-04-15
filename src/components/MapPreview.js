export default function MapPreview({ lat, lng }) {
  return (
    <iframe
      width="100%"
      height="300"
      src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
    ></iframe>
  );
}