import { Prisma } from '@prisma/client'
import prisma from '.'
import { PlayersReturnType } from '../types'
import { PlayerType } from '../validation'

/**
 * Gets all players from database.
 *
 * @returns an object of type `PlayerType` and a status message.
 *
 */

async function getPlayers(page: number): Promise<PlayersReturnType> {
    const response: PlayersReturnType = {
        status: 200,
        data: null,
        errorMessage: '',
    }
    try {
        response.data = await prisma.player.findMany({
            skip: (page - 1) * 10,
            take: 10,
        })
        response.status = 200
    } catch (err) {
        response.data = null
        response.status = 500
        response.errorMessage = '500 Internal error.'
    }

    return response
}

async function getPlayerByID(playerId: number): Promise<PlayersReturnType> {
    const response: PlayersReturnType = {
        status: 200,
        data: null,
        errorMessage: '',
    }
    try {
        response.data = await prisma.player.findUnique({
            where: {
                id: playerId,
            },
        })
        response.status = 200
    } catch (err) {
        response.data = null
        response.status = 500
        response.errorMessage = '500 Internal error.'
    }

    return response
}

async function removePlayer(playerId: number): Promise<PlayersReturnType> {
    const response: PlayersReturnType = {
        status: 200,
        data: null,
        errorMessage: '',
    }
    try {
        response.data = await prisma.player.delete({
            where: {
                id: playerId,
            },
        })
        response.status = 200
    } catch (err) {
        response.data = null
        response.status = 500
        response.errorMessage = '500 Internal error.'
    }

    return response
}

async function updatePlayer(
    playerId: number,
    payload: PlayerType
): Promise<PlayersReturnType> {
    const response: PlayersReturnType = {
        status: 200,
        data: null,
        errorMessage: '',
    }
    try {
        response.data = await prisma.player.update({
            where: {
                id: playerId,
            },

            data: payload,
        })
        response.status = 200
    } catch (err) {
        response.data = null
        response.status = 500
        response.errorMessage = String(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                response.errorMessage =
                    'A player with same first and last name already exists.'
            }
        }
    }

    return response
}

async function createPlayer(payload: PlayerType): Promise<PlayersReturnType> {
    const response: PlayersReturnType = {
        status: 200,
        data: null,
        errorMessage: '',
    }
    try {
        response.data = await prisma.player.create({
            data: payload,
        })
        response.status = 200
    } catch (err) {
        response.data = null
        response.status = 500
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                response.errorMessage =
                    'A player with same first and last name already exists.'
            }
        }
    }

    return response
}

async function getPlayersCount(): Promise<number> {
    const count = await prisma.player.count()
    return count
}

export const playerCRUD = {
    getPlayers,
    getPlayerByID,
    removePlayer,
    updatePlayer,
    createPlayer,
    getPlayersCount,
}
