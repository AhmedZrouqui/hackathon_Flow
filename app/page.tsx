import Table from '@/components/Table'
import { getPlayers, getPlayersCount } from './actions'
import { PlayerType } from '@/lib/validation'

async function _getPlayersCount(): Promise<number> {
    const res = await getPlayersCount()

    return res
}

const getData = async (page: number) => {
    const res = await getPlayers(page)

    return res
}

export default async function Page({
    searchParams,
}: {
    searchParams: { page: number }
}) {
    const page = searchParams.page ?? 1
    const data = await getData(page)
    const playersCount = await _getPlayersCount()

    if (data.status === 500) return <h2>Internal Error, please try later.</h2>
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
