// database/seed.js
const mongoose = require('mongoose');

// Import model dari file schema kamu
const { User, Gear, Transaction } = require('./mongoose-schemas');

// Ganti URI ini dengan string koneksi MongoDB kamu (misal: MongoDB Atlas / Local)
const MONGO_URI = 'mongodb://127.0.0.1:27017/gearshare_db'; 

async function seedDatabase() {
  try {
    // 1. Buka koneksi ke Database
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // 2. Bersihkan data lama agar tidak terjadi duplikasi saat script dijalankan ulang
    await User.deleteMany({});
    await Gear.deleteMany({});
    await Transaction.deleteMany({});
    console.log('🧹 Cleared existing data...');

    // 3. SEEDING USERS
    // Kita simpan hasilnya ke variabel agar kita bisa mengambil ObjectId (_id) mereka
    const users = await User.insertMany([
      { name: 'Budi Santoso', email: 'budi@example.com', passwordHash: 'hashed_password_1', role: 'user', phone: '+628111111111', address: 'Jl. Mawar No. 10, Jakarta' },
      { name: 'Siti Nurjanah', email: 'siti@example.com', passwordHash: 'hashed_password_2', role: 'user', phone: '+628222222222', address: 'Jl. Melati No. 20, Bandung' },
      { name: 'Admin GearShare', email: 'admin@example.com', passwordHash: 'hashed_password_3', role: 'admin', phone: '+628333333333', address: 'Kantor GearShare' }
    ]);
    console.log('👤 Users seeded...');

    // 4. SEEDING GEAR
    // Gunakan _id dari user yang baru saja dibuat sebagai ownerId
    const gears = await Gear.insertMany([
      { ownerId: users[0]._id, name: 'Tenda 4 Orang', category: 'Camping', description: 'Tenda family untuk 4 orang', rentalPrice: 75000, stock: 5, listingStatus: 'active', imageUrl: 'https://example.com/tenda4.jpg' },
      { ownerId: users[1]._id, name: 'Sleeping Bag', category: 'Camping', description: 'Sleeping bag hangat untuk petualangan malam', rentalPrice: 25000, stock: 10, listingStatus: 'active', imageUrl: 'https://example.com/sleepingbag.jpg' },
      { ownerId: users[0]._id, name: 'Lampu Senter', category: 'Outdoor', description: 'Lampu senter LED tahan air', rentalPrice: 15000, stock: 20, listingStatus: 'active', imageUrl: 'https://example.com/senter.jpg' }
    ]);
    console.log('⛺ Gear seeded...');

    // 5. SEEDING TRANSACTIONS
    await Transaction.insertMany([
      { userId: users[1]._id, gearId: gears[0]._id, quantity: 1, rentalStart: new Date('2026-05-01T08:00:00+07:00'), rentalEnd: new Date('2026-05-03T18:00:00+07:00'), totalPrice: 150000, status: 'confirmed' },
      { userId: users[0]._id, gearId: gears[1]._id, quantity: 2, rentalStart: new Date('2026-05-02T09:00:00+07:00'), rentalEnd: new Date('2026-05-02T20:00:00+07:00'), totalPrice: 50000, status: 'returned' }
    ]);
    console.log('💳 Transactions seeded...');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0); // Matikan proses node jika sukses

  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1); // Matikan proses dengan kode error
  }
}

// Eksekusi fungsi
seedDatabase();