import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

// Load .env variables
dotenv.config()

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.category.createMany({
    data: [
      { id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Ayam', description: 'Olahan daging ayam beku' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Sapi', description: 'Olahan daging sapi premium' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Seafood', description: 'Hasil laut beku' },
      { id: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Sayuran', description: 'Sayuran potong beku' },
    ],
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: [
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Ayam nugget crispy', stock: 120, minStock: 20, unit: 'pcs', sellPrice: 35000, buyPrice: 28000, weightSize: '500 gram', storageLocation: 'Rak A-3' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Sosis sapi premium', stock: 15, minStock: 20, unit: 'pack', sellPrice: 28000, buyPrice: 22000, weightSize: '300 gram', storageLocation: 'Rak B-1' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Dim sum udang', stock: 0, minStock: 10, unit: 'box', sellPrice: 45000, buyPrice: 35000, weightSize: '400 gram', storageLocation: 'Rak C-2' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Bakso urat sapi', stock: 60, minStock: 15, unit: 'pack', sellPrice: 22000, buyPrice: 18000, weightSize: '500 gram', storageLocation: 'Rak B-2' },
      { categoryId: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Edamame beku', stock: 0, minStock: 15, unit: 'pack', sellPrice: 18000, buyPrice: 14000, weightSize: '250 gram', storageLocation: 'Rak D-1' },
    ],
    skipDuplicates: true,
  });
  console.log("Seeding complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
