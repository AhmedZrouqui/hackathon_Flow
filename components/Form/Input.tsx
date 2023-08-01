import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import classNames from 'classnames'

interface IInput {
    error?: FieldError
    formRegister: UseFormRegisterReturn
    placeholder: string
    label?: string
}

function Input({ error, formRegister, placeholder, label }: IInput) {
    const cn = classNames
    return (
        <div className="w-full">
            {label && <label className="text-sm text-gray-900">{label}</label>}
            <input
                {...formRegister}
                className={cn(
                    'block border px-3 py-2 rounded-md text-sm mb-2 w-full border-gray-300',
                    {
                        '!border-red-800': error,
                    }
                )}
                placeholder={placeholder}
            />
            <ErrorMessage message={error?.message} />
        </div>
    )
}

export default Input
