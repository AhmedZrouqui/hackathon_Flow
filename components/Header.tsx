import { useAppContext } from '@/context/appContext'
import Link from 'next/link'
import React from 'react'

function Header() {
    const ctx = useAppContext()
    return (
        <div className="w-full bg-slate-300">
            <div
                className="max-w-7xl m-auto flex justify-between py-5 items-center
        "
            >
                <h2 className="text-xl font-medium">Liste des joueurs</h2>
                <Link
                    href={'/add'}
                    className="px-4 py-2 bg-cyan-600 rounded text-white hover:bg-cyan-700 transition"
                >
                    Ajouter un joueur
                </Link>
            </div>
        </div>
    )
}

export default Header
