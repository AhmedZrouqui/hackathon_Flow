import List from '@/components/List'
import Table from '@/components/Table'
import { IPlayer } from '@/lib/types'

const getData = async () => {
    const players = await fetch('http://localhost:3000/api/players')
    if (players.ok) {
        const data = await players.json()
        return data
    }
    return []
}

export default async function Home() {
    const data = await getData()
    return (
        <main className="w-full min-h-screen">
            <Table data={data as IPlayer[]} />
        </main>
    )
}
