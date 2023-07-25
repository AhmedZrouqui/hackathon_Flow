import { getPlayers } from '@/app/actions'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)

        const page = url.searchParams.get('page') ?? 1

        const players = await getPlayers(Number(page))
        return NextResponse.json(players)
    } catch (err) {
        return new NextResponse(
            JSON.stringify({
                error: 'Internal server error',
            }),
            { status: 500 }
        )
    }
}
