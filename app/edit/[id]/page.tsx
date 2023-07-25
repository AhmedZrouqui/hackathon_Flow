import { getPlayer } from '@/app/actions'
import React from 'react'
import { PlayerType } from '@/lib/validation'
import Form from '@/components/Form'
import { FormType } from '@/lib/types'
import GoBack from '@/components/GoBack'

async function getData(playerId: number) {
    const res = await getPlayer(playerId)

    return res
}

async function Page({ params }: { params: { id: number } }) {
    const playerData = await getData(params.id)

    if (playerData.status === 500) return <div></div>

    return (
        <div>
            <GoBack />
            <Form
                playerId={params.id}
                initialData={playerData.data as PlayerType}
                type={FormType.UPDATE}
            />
        </div>
    )
}

export default Page
