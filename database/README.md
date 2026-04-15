# Database Design

## Jobdesk
- Mendesain struktur database MongoDB.
- Mengelola penyimpanan data user, transaksi, dan peralatan.

## Tujuan
Membuat struktur database yang sederhana, fleksibel, dan mudah dikembangkan untuk kebutuhan aplikasi GearShare.

## Struktur folder database
- `schema.sql`: definisi tabel dan relasi database (SQL)
- `seed.sql`: data dummy awal untuk mock data
- `mongoose-schemas.js`: contoh schema Mongoose untuk MongoDB

## Koleksi utama
1. `users`
2. `equipments`
3. `transactions`

---

## Koleksi `users`
Menyimpan informasi pengguna aplikasi.

Contoh struktur dokumen:
```json
{
  "_id": "ObjectId",
  "name": "Nama User",
  "email": "user@example.com",
  "passwordHash": "hashed_password",
  "role": "user", // atau "admin"
  "phone": "+628123456789",
  "address": "Alamat lengkap",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

Field utama:
- `name`: nama lengkap pengguna
- `email`: email unik untuk login
- `passwordHash`: hash password
- `role`: peran akses (`user`, `admin`)
- `phone`, `address`: data kontak
- `createdAt`, `updatedAt`: metadata waktu

---

## Koleksi `equipments`
Menyimpan data peralatan yang dapat disewa atau dipinjam.

Contoh struktur dokumen:
```json
{
  "_id": "ObjectId",
  "name": "Nama Peralatan",
  "category": "Kategori",
  "description": "Deskripsi singkat",
  "rentalPrice": 25000,
  "stock": 5,
  "status": "available", // available, rented, maintenance
  "imageUrl": "https://...",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

Field utama:
- `name`: nama peralatan
- `category`: kategori peralatan
- `description`: detail peralatan
- `rentalPrice`: harga sewa per satuan
- `stock`: jumlah tersedia
- `status`: status stock (`available`, `rented`, `maintenance`)
- `imageUrl`: foto peralatan

---

## Koleksi `transactions`
Mencatat detail transaksi peminjaman atau penyewaan.

Contoh struktur dokumen:
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "equipmentId": "ObjectId",
  "quantity": 2,
  "rentalStart": "ISODate",
  "rentalEnd": "ISODate",
  "totalPrice": 50000,
  "status": "pending", // pending, confirmed, returned, canceled
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

Field utama:
- `userId`: referensi ke `users`
- `equipmentId`: referensi ke `equipments`
- `quantity`: jumlah unit peralatan
- `rentalStart`, `rentalEnd`: periode transaksi
- `totalPrice`: total biaya sewa
- `status`: status transaksi

---

## Relasi antar koleksi
- `transactions.userId` -> `users._id`
- `transactions.equipmentId` -> `equipments._id`

Relasi ini membuat data tetap terstruktur namun fleksibel sebagai dokumen MongoDB.

## Catatan implementasi
- Gunakan indeks pada `email` di `users` untuk mempercepat pencarian login.
- Gunakan indeks pada `equipmentId` dan `userId` di `transactions` untuk performa query riwayat transaksi.
- Simpan hash password, bukan password asli.
- Pertimbangkan penamaan field konsisten untuk kemudahan pengelolaan.
