import { getPlayer, updatePlayer } from '@/app/actions'
import React from 'react'
import Form from '@/components/Form'
import { FormType } from '@/lib/types'
import GoBack from '@/components/GoBack'

async function Page({ params }: { params: { id: number } }) {
    const playerData = await getPlayer(params.id)

    if (playerData.status === 500) return null

    return (
        <div>
            <GoBack />
            <Form
                playerId={params.id}
                initialData={playerData?.data}
                type={FormType.UPDATE}
                action={updatePlayer}
            />
        </div>
    )
}

export default Page
