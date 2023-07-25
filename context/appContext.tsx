import { createContext, useCallback, useContext, useState } from 'react'

interface IContext {
    toast: {
        open: boolean
        success: boolean
        message: string
    }
    closeToast: () => void
    openToast: (obj: any) => void
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
    const [toast, setToast] = useState(initialState.toast)

    const openToast = useCallback((obj: typeof toast) => {
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
