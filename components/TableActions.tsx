import { useAppContext } from '@/context/appContext'
import React from 'react'
import { BiSolidPencil, BiTrash } from 'react-icons/bi'

interface IActions {
    playerId: number
}

function TableActions({ playerId }: IActions) {
    const ctx = useAppContext()
    return (
        <div className="flex gap-2 w-full h-full justify-center">
            <span
                id="update"
                className="cursor-pointer text-gray-400"
                onClick={() => ctx?.fetchPlayerData(playerId)}
            >
                <BiSolidPencil />
            </span>
            <span
                id="remove"
                className="cursor-pointer text-gray-400"
                onClick={() => ctx?.removePlayer(playerId)}
            >
                <BiTrash />
            </span>
        </div>
    )
}

export default TableActions
