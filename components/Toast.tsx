import { useAppContext } from '@/context/appContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Toast() {
    const ctx = useAppContext()

    useEffect(() => {
        const timeout = setTimeout(() => {
            ctx?.closeToast()
        }, 3000)

        return () => clearTimeout(timeout)
    }, [ctx, ctx?.toast])

    if (!ctx?.toast.open) return <></>
    return (
        <div
            className={`${
                ctx?.toast.success ? ' bg-blue-600' : 'bg-red-700'
            } text-white absolute bottom-[20px] left-1/2 translate-x-[-50%] py-4 px-2 shadow-md rounded-lg`}
        >
            {ctx?.toast.message}
        </div>
    )
}

export default Toast
