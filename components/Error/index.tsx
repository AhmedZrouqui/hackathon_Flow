'use client'

import React, { useEffect } from 'react'
import Button from '../Button'

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error('Error occured => ', error)
    }, [error])
    return (
        <div>
            <h2>Something went wrong!</h2>
            <Button onClick={() => reset()} errorButton>
                Try again
            </Button>
        </div>
    )
}

export default ErrorComponent
