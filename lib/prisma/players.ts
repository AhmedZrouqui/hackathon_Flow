import prisma from '.'
import { IPlayer } from '../types'

export async function getPlayers() {
    const players = await prisma.player.findMany()

    return players
}

export async function getPlayerByID(playerId: number) {
    const player = await prisma.player.findUnique({
        where: {
            id: playerId,
        },
    })

    return player
}

export async function removePlayer(playerId: number) {
    const removePlayer = await prisma.player.delete({
        where: {
            id: playerId,
        },
    })

    return removePlayer
}

export async function updatePlayer(playerId: number, payload: IPlayer) {
    const player = await prisma.player.update({
        where: {
            id: playerId,
        },

        data: payload,
    })

    return player
}

export async function createPlayer(payload: IPlayer) {
    const player = await prisma.player.create({
        data: {
            firstname: payload.firstname,
            lastname: payload.lastname,
            salary: payload.salary,
            devise: payload.devise,
            pictureUrl: payload.pictureUrl,
            goal: payload.goal,
        },
    })

    return player
}
