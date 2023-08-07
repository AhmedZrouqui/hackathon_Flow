import Link from 'next/link'
import React from 'react'

function GoBack() {
    return (
        <Link
            href="/"
            className="mb-10 underline cursor-pointer text-lg font-medium"
        >
            {'<'} Revenir
        </Link>
    )
}

export default GoBack
