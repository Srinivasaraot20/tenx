const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('digital@123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin' }, 
    update: {
      password: hashedPassword,
    },
    create: {
      name: 'Admin',
      email: 'admin',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log({ admin })
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
