import Table from '@/components/Table'
import { getPlayersCount } from './actions'

const getData = async (page: number) => {
    const url = new URL(`${process.env?.BASE_URL}/api/players?page=${page}`)
    const res = await fetch(url.href, {
        next: {
            tags: ['players'],
        },
    })
    if (!res.ok) return []

    const players = await res.json()
    return players
}

export default async function Page({
    searchParams,
}: {
    searchParams: { page: number }
}) {
    const page = searchParams.page ?? 1
    const data = await getData(page)
    const playersCount = await getPlayersCount()

    return (
        <main className="w-full min-h-screen">
            <Table
                currentPage={page}
                data={data.data}
                playersCount={playersCount}
            />
        </main>
    )
}
