import { IPlayer } from '@/lib/types'

export async function createPlayer(payload: IPlayer) {
    'use server;'

    try {
        await createPlayer(payload)
    } catch (err) {
        throw new Error('')
    }
}

export async function updatePlayer(id: number, payload: IPlayer) {
    'use server;'

    try {
        const player = await updatePlayer(id, payload)
        console.log('player ==> ', player)
    } catch (err) {
        console.log(err)
        throw new Error('')
    }
}
