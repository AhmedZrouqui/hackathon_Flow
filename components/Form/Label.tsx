import React from 'react'

function Label({ label }: { label?: string }) {
    if (!label) return null
    return <label className="text-sm text-gray-900">{label}</label>
}

export default Label
