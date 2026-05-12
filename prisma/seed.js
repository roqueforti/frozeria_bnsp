const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Membersihkan database...");
  try {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    console.log("Database dibersihkan.");
  } catch (e) {
    console.log("Gagal membersihkan database:", e.message);
  }

  console.log("Mulai memasukkan data...");

  await prisma.category.createMany({
    data: [
      { id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Ayam', description: 'Olahan daging ayam beku' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Sapi', description: 'Olahan daging sapi premium' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Seafood', description: 'Hasil laut beku' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Sayuran', description: 'Sayuran potong beku' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000005', name: 'Kebab', description: 'Daging dan kulit kebab' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000006', name: 'Kentang', description: 'Kentang goreng beku' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'Cemilan', description: 'Cemilan beku lainnya' },
    ],
    skipDuplicates: true,
  });
  console.log("Kategori berhasil dimasukkan.");

  await prisma.product.createMany({
    data: [
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Ayam nugget crispy', stock: 120, minStock: 20, unit: 'pcs', sellPrice: 35000, buyPrice: 28000, weightSize: '500 gram', storageLocation: 'Rak A-3', photoUrl: '/products/frozen-chicken-nuggets.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Sosis sapi premium', stock: 15, minStock: 20, unit: 'pack', sellPrice: 28000, buyPrice: 22000, weightSize: '300 gram', storageLocation: 'Rak B-1', photoUrl: '/products/sosis-sapi.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Dim sum udang', stock: 5, minStock: 10, unit: 'box', sellPrice: 45000, buyPrice: 35000, weightSize: '400 gram', storageLocation: 'Rak C-2', photoUrl: '/products/dim-sum.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Bakso urat sapi', stock: 60, minStock: 15, unit: 'pack', sellPrice: 22000, buyPrice: 18000, weightSize: '500 gram', storageLocation: 'Rak B-2', photoUrl: '/products/bakso-sapi.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Edamame beku', stock: 12, minStock: 15, unit: 'pack', sellPrice: 18000, buyPrice: 14000, weightSize: '250 gram', storageLocation: 'Rak D-1', photoUrl: '/products/edamame.png' },
      
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Ayam Karage', stock: 50, minStock: 15, unit: 'pack', sellPrice: 42000, buyPrice: 35000, weightSize: '500 gram', storageLocation: 'Rak A-1', photoUrl: '/products/frozen-karage.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Sayap Ayam Bumbu', stock: 30, minStock: 10, unit: 'pack', sellPrice: 55000, buyPrice: 45000, weightSize: '1 kg', storageLocation: 'Rak A-2', photoUrl: '/products/frozen-wings.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Daging Sapi Slice', stock: 40, minStock: 10, unit: 'pack', sellPrice: 65000, buyPrice: 55000, weightSize: '500 gram', storageLocation: 'Rak B-3', photoUrl: '/products/frozen-beef-slice.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Udang Kupas Beku', stock: 25, minStock: 10, unit: 'pack', sellPrice: 75000, buyPrice: 60000, weightSize: '500 gram', storageLocation: 'Rak C-1', photoUrl: '/products/frozen-shrimp.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Cumi Ring', stock: 20, minStock: 10, unit: 'pack', sellPrice: 50000, buyPrice: 40000, weightSize: '500 gram', storageLocation: 'Rak C-3', photoUrl: '/products/frozen-squid-rings.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Jagung Manis Pipil', stock: 35, minStock: 15, unit: 'pack', sellPrice: 20000, buyPrice: 15000, weightSize: '500 gram', storageLocation: 'Rak D-2', photoUrl: '/products/frozen-corn.png' },
      
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000005', name: 'Kulit Kebab Besar', stock: 100, minStock: 30, unit: 'pack', sellPrice: 25000, buyPrice: 20000, weightSize: '20 pcs', storageLocation: 'Rak E-1', photoUrl: '/products/frozen-kebab.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000005', name: 'Daging Kebab Tiang', stock: 10, minStock: 5, unit: 'pcs', sellPrice: 250000, buyPrice: 210000, weightSize: '2 kg', storageLocation: 'Rak E-2', photoUrl: '/products/frozen-kebab.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000006', name: 'Kentang Shoestring', stock: 80, minStock: 20, unit: 'pack', sellPrice: 30000, buyPrice: 24000, weightSize: '1 kg', storageLocation: 'Rak F-1', photoUrl: '/products/frozen-fries.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000006', name: 'Kentang Crinkle Cut', stock: 60, minStock: 20, unit: 'pack', sellPrice: 32000, buyPrice: 25000, weightSize: '1 kg', storageLocation: 'Rak F-2', photoUrl: '/products/frozen-fries.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'Risoles Mayonaise', stock: 45, minStock: 15, unit: 'pack', sellPrice: 25000, buyPrice: 20000, weightSize: '10 pcs', storageLocation: 'Rak G-1', photoUrl: '/products/frozen-risoles.png' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'Singkong Keju', stock: 50, minStock: 15, unit: 'pack', sellPrice: 15000, buyPrice: 12000, weightSize: '500 gram', storageLocation: 'Rak G-2', photoUrl: '/products/frozen-cassava.png' },
    ],
    skipDuplicates: true,
  });
  console.log("Produk berhasil dimasukkan.");
  console.log("Seeding selesai!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error:", e.message);
    await prisma.$disconnect();
    process.exit(1);
  });
