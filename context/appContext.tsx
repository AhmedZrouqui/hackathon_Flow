'use client'

import { createContext, useCallback, useContext, useState } from 'react'

type ToastType = {
    open: boolean
    success: boolean
    message: string
}

interface IContext {
    toast: ToastType
    closeToast: () => void
    openToast: (obj: ToastType) => void
}

const initialState: IContext = {
    toast: {
        open: false,
        success: false,
        message: '',
    },
    closeToast: () => {},
    openToast: () => {},
}

const AppContext = createContext<IContext | undefined>(undefined)

export const useAppContext = () => useContext(AppContext)

export default function AppProvider({ children }: React.PropsWithChildren) {
    const [toast, setToast] = useState<ToastType>(initialState.toast)

    const openToast = useCallback((obj: ToastType) => {
        setToast(obj)
    }, [])

    const closeToast = useCallback(() => {
        setToast((prev) => ({ ...prev, open: false }))
    }, [])

    return (
        <AppContext.Provider
            value={{
                toast,
                closeToast,
                openToast,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
