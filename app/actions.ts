'use server'

import { playerCRUD } from '@/lib/prisma/players'
import { SinglePlayerReturnType, ManyPlayersReturnType } from '@/lib/types'
import { PlayerType } from '@/lib/validation'
import { revalidateTag } from 'next/cache'

export async function getPlayer(id: number): Promise<SinglePlayerReturnType> {
    const res = await playerCRUD.getPlayerByID(parseInt(id.toString()))

    return res
}

export async function updatePlayer(
    id: number,
    payload: PlayerType
): Promise<SinglePlayerReturnType> {
    const res = await playerCRUD.updatePlayer(parseInt(id.toString()), payload)

    revalidateTag('players')
    return res
}

export async function removePlayer(
    id: number
): Promise<SinglePlayerReturnType> {
    const res = await playerCRUD.removePlayer(parseInt(id.toString()))

    revalidateTag('players')
    return res
}

export async function getPlayers(page: number): Promise<ManyPlayersReturnType> {
    const res = await playerCRUD.getPlayers(page)

    return res
}

export async function createPlayer(
    payload: PlayerType
): Promise<SinglePlayerReturnType> {
    const res = await playerCRUD.createPlayer(payload)

    revalidateTag('players')
    return res
}

export async function getPlayersCount() {
    const res = await playerCRUD.getPlayersCount()

    return res
}
