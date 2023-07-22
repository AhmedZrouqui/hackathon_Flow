import { getPlayers } from '@/lib/prisma/players'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const players = await getPlayers()
        return new NextResponse(
            JSON.stringify(players, (key, value) =>
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
