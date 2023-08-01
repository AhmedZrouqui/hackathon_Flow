import React from 'react'

const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null
    return <span className="text-xs text-red-800 mb-2 block">{message}</span>
}

export default ErrorMessage
