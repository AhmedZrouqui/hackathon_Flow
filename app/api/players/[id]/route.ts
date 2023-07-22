import {
    getPlayerByID,
    getPlayers,
    removePlayer,
    updatePlayer,
} from '@/lib/prisma/players'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const playerId = Number(params.id)
        const player = await getPlayerByID(playerId)

        return new NextResponse(
            JSON.stringify(player, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ),
            {
                status: 200,
            }
        )
    } catch (err) {
        return new NextResponse('Internal server error.', {
            status: 500,
        })
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const playerId = Number(params.id)
        const payload = await req.json()
        const player = await updatePlayer(playerId, payload)

        return new NextResponse(
            JSON.stringify(player, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ),
            {
                status: 200,
            }
        )
    } catch (err) {
        console.log(err)
        return new NextResponse('Internal server error.', {
            status: 500,
        })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const playerId = Number(params.id)
        const player = await removePlayer(playerId)

        return new NextResponse(
            JSON.stringify(player, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ),
            {
                status: 200,
            }
        )
    } catch (err) {
        return new NextResponse('Internal server error.', {
            status: 500,
        })
    }
}
