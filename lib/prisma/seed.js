const { PrismaClient } = require('@prisma/client')
const playersData = require('../../data/players.json')
const prisma = new PrismaClient()

async function main() {
    await prisma.player.deleteMany()
    console.log('Deleted records in player table')

    await prisma.$queryRaw`ALTER TABLE Player AUTO_INCREMENT = 1`
    console.log('reset product auto increment to 1')

    const players = await prisma.player.createMany({
        data: [
            ...playersData.map((player) => ({
                firstname: player.firstname,
                lastname: player.lastname,
                salary: player.salary,
                devise: player.devise,
                goal: player.goal,
                pictureUrl: player.pictureURl,
            })),
        ],
    })

    console.log('Database has been seeded with ', playersData.length, ' entry.')
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
