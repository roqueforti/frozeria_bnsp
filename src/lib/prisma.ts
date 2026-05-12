import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
// Cache buster
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL
  console.log("DEBUG DATABASE_URL:", connectionString)
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing!")
  }
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
