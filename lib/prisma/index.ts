import { PrismaClient } from '@prisma/client'

let client: PrismaClient

const getPrismaClient = () => {
    if (!client) client = new PrismaClient()

    return client
}

export default getPrismaClient()
