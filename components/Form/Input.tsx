import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

interface IInput {
    error: FieldError | undefined
    formRegister: UseFormRegisterReturn
    placeholder: string
    label?: string
}

function Input({ error, formRegister, placeholder, label }: IInput) {
    return (
        <div className="w-full">
            {label && <label className="text-sm text-gray-900">{label}</label>}
            <input
                {...formRegister}
                className={`block border px-3 py-2 rounded-md text-sm mb-2 w-full ${
                    error ? 'border-red-800' : 'border-gray-300'
                }`}
                placeholder={placeholder}
            />
            <ErrorMessage message={error?.message} />
        </div>
    )
}

export default Input
