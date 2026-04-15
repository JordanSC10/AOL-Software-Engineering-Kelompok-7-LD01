-- database/seed.sql
-- Contoh data dummy awal untuk tabel users, gear, dan transactions

INSERT INTO users (name, email, password_hash, role, phone, address)
VALUES
  ('Budi Santoso', 'budi@example.com', 'hashed_password_1', 'user', '+628111111111', 'Jl. Mawar No. 10, Jakarta'),
  ('Siti Nurjanah', 'siti@example.com', 'hashed_password_2', 'user', '+628222222222', 'Jl. Melati No. 20, Bandung'),
  ('Admin GearShare', 'admin@example.com', 'hashed_password_3', 'admin', '+628333333333', 'Kantor GearShare');

INSERT INTO gear (name, category, description, rental_price, stock, status, image_url)
VALUES
  ('Tenda 4 Orang', 'Camping', 'Tenda family untuk 4 orang', 75000, 5, 'available', 'https://example.com/tenda4.jpg'),
  ('Sleeping Bag', 'Camping', 'Sleeping bag hangat untuk petualangan malam', 25000, 10, 'available', 'https://example.com/sleepingbag.jpg'),
  ('Lampu Senter', 'Outdoor', 'Lampu senter LED tahan air', 15000, 20, 'available', 'https://example.com/senter.jpg');

INSERT INTO transactions (user_id, gear_id, quantity, rental_start, rental_end, total_price, status)
VALUES
  (1, 1, 1, '2026-05-01 08:00:00+07', '2026-05-03 18:00:00+07', 150000, 'confirmed'),
  (2, 2, 2, '2026-05-02 09:00:00+07', '2026-05-02 20:00:00+07', 50000, 'returned');
