# Backend GearShare

Backend ini menggunakan Express dan Mongoose untuk terhubung ke MongoDB.

## Setup

1. Buka folder `backend/`
2. Jalankan `npm install`
3. Salin `.env.example` menjadi `.env`
4. Isi `MONGO_URI` dengan alamat MongoDB Anda
5. Jalankan `npm run dev` untuk mode pengembangan

## File penting

- `server.js`: server Express dasar
- `db.js`: koneksi MongoDB dengan `mongoose.connect`
- `.env.example`: contoh variabel lingkungan untuk `MONGO_URI`

## Endpoint contoh

- `GET /api/status`
- `GET /api/users`
