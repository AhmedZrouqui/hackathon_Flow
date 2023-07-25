'use server'

import { playerCRUD } from '@/lib/prisma/players'
import { PlayersReturnType } from '@/lib/types'
import { PlayerType } from '@/lib/validation'
import { revalidatePath } from 'next/cache'

export async function getPlayer(id: number): Promise<PlayersReturnType> {
    const res = await playerCRUD.getPlayerByID(parseInt(id.toString()))

    return res
}

export async function updatePlayer(
    id: number,
    payload: PlayerType
): Promise<PlayersReturnType> {
    const res = await playerCRUD.updatePlayer(parseInt(id.toString()), payload)

    return res
}

export async function removePlayer(id: number): Promise<PlayersReturnType> {
    const res = await playerCRUD.removePlayer(parseInt(id.toString()))

    revalidatePath('/')
    return res
}

export async function getPlayers(page: number): Promise<PlayersReturnType> {
    const res = await playerCRUD.getPlayers(page)

    return res
}

export async function createPlayer(
    payload: PlayerType
): Promise<PlayersReturnType> {
    const res = await playerCRUD.createPlayer(payload)

    return res
}

export async function getPlayersCount() {
    const res = await playerCRUD.getPlayersCount()

    return res
}
