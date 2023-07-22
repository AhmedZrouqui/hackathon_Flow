import { getPlayerByID, getPlayers } from '@/lib/prisma/players'
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
