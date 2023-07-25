'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

function GoBack() {
    const router = useRouter()
    return (
        <div
            onClick={() => router.back()}
            className="mb-10 underline cursor-pointer text-lg font-medium"
        >
            {'<'} Revenir
        </div>
    )
}

export default GoBack
