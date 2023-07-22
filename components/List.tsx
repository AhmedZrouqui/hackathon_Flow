'use client'

import { IPlayer } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import Modal from './modal'
import { useAppContext } from '@/context/appContext'

interface IList {
    playersData: IPlayer[]
}

function List(data: IList) {
    const [players, setPlayers] = useState<Array<IPlayer>>(data.playersData)
    const ctx = useAppContext()
    useEffect(() => {
        setPlayers(data.playersData)
    }, [data.playersData])

    const createPlayer = () => {
        ctx?.openModal('CREATE')
    }
    return (
        <div>
            <div>
                {players &&
                    players.map((p: IPlayer, i: number) => (
                        <div key={i}>{p.firstname}</div>
                    ))}
            </div>
            <button onClick={createPlayer}>create player</button>
        </div>
    )
}

export default List
