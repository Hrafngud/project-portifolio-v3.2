import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('novasenhasinistra', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: hashedPassword,
      name: 'Admin'
    }
  })
  
  console.log('Admin created:', admin)
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect()) 