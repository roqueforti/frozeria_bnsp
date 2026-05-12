const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Local static paths served from /public
const photoUpdates = [
  { name: 'Ayam nugget crispy', photoUrl: '/products/ayam-nugget.png' },
  { name: 'Sosis sapi premium', photoUrl: '/products/sosis-sapi.png' },
  { name: 'Dim sum udang', photoUrl: '/products/dim-sum.png' },
  { name: 'Bakso urat sapi', photoUrl: '/products/bakso-sapi.png' },
  { name: 'Edamame beku', photoUrl: '/products/edamame.png' },
];

async function main() {
  console.log("Updating product photos to local static files...");
  for (const item of photoUpdates) {
    const updated = await prisma.product.updateMany({
      where: { name: item.name },
      data: { photoUrl: item.photoUrl },
    });
    console.log(`✓ ${item.name}: updated ${updated.count} record(s)`);
  }
  console.log("\nDone! All photos updated.");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error("Error:", e.message);
    await prisma.$disconnect();
    process.exit(1);
  });
