// createUser.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      id: 'default-id', // Sesuai dengan ID yang kita gunakan di auth.ts
      name: 'Test Organizer',
      email: 'test@example.com',
      password: 'password123',
      role: 'organizer'
    }
  })
  console.log('Created user:', user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())