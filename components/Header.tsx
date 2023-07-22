import { useAppContext } from '@/context/appContext'
import React from 'react'

function Header() {
    const ctx = useAppContext()
    return (
        <div
            className="max-w-[800px] m-auto flex justify-between py-5 items-center
        "
        >
            <h2 className="text-xl">Liste des joueurs</h2>
            <button
                onClick={() => ctx?.openModal('CREATE')}
                className="px-4 py-2 bg-cyan-600 rounded text-white"
            >
                Ajouter un joueur
            </button>
        </div>
    )
}

export default Header
