'use client'

import React from 'react'

interface ButtonProps extends React.PropsWithChildren {
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

function Button(props: ButtonProps) {
    return (
        <button
            type={props.type}
            disabled={props.loading}
            className={`px-4 py-2 ${
                props.loading ? 'bg-gray-400' : 'bg-cyan-600'
            } rounded text-white ${props.className}`}
        >
            {props.loading ? 'Chargement...' : props.children}
        </button>
    )
}

export default Button
