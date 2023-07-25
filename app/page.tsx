import Table from '@/components/Table'
import { getPlayers, getPlayersCount } from './actions'
import { PlayerType } from '@/lib/validation'

async function _getPlayersCount(): Promise<number> {
    const res = await getPlayersCount()

    return res
}

const getData = async (page: number) => {
    const url = new URL(
        (process.env.BASE_URL as string) + '/api/players?page=' + page
    )
    const res = await fetch(url.href, {
        method: 'GET',
        next: {
            tags: ['players'],
        },
    })

    if (res.ok) {
        const players = await res.json()

        return players
    }

    return []
}

export default async function Page({
    searchParams,
}: {
    searchParams: { page: number }
}) {
    const page = searchParams.page ?? 1
    const data = await getData(page)
    const playersCount = await _getPlayersCount()

    return (
        <main className="w-full min-h-screen">
            <Table
                currenPage={page}
                data={data.data as PlayerType[]}
                playersCount={playersCount}
            />
        </main>
    )
}
