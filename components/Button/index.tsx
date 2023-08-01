'use client'

import React from 'react'
import classNames from 'classnames'

interface ButtonProps extends React.PropsWithChildren {
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
    className?: string
    onClick?: () => void
    errorButton?: boolean
}

function Button(props: ButtonProps) {
    const cn = classNames
    return (
        <button
            type={props.type}
            disabled={props.loading}
            onClick={props.onClick}
            className={cn(`px-4 py-2 rounded text-white ${props.className}`, {
                'bg-cyan-600': !props.loading,
                'bg-red-600': props.errorButton,
                'bg-gray-400': props.loading,
            })}
        >
            {props.loading ? 'Chargement...' : props.children}
        </button>
    )
}

export default Button
