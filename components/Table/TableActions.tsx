'use client'

import { removePlayer } from '@/app/actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiSolidPencil, BiTrash } from 'react-icons/bi'

interface IActions {
    playerId: number
}

function TableActions({ playerId }: IActions) {
    const router = useRouter()
    return (
        <div className="flex gap-2 w-full h-full justify-center">
            <span
                id="update"
                className="cursor-pointer text-gray-400"
                onClick={() => router.push(`/edit/${playerId}`)}
            >
                <BiSolidPencil />
            </span>
            <span
                id="remove"
                className="cursor-pointer text-gray-400"
                onClick={() => removePlayer(playerId)}
            >
                <BiTrash />
            </span>
        </div>
    )
}

export default TableActions
