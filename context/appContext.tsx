import { IPlayer } from '@/lib/types'
import { createContext, useCallback, useContext, useState } from 'react'

interface IContext {
    modalIsOpen: boolean
    modalType: string
    openModal: (t: string) => void
    closeModal: () => void
    fetchPlayerData: (id: number) => void
    formInitialValues: IPlayer | null
}

const initialState: IContext = {
    modalIsOpen: false,
    modalType: '',
    openModal: () => {},
    closeModal: () => {},
    fetchPlayerData: () => {},
    formInitialValues: null,
}

const AppContext = createContext<IContext | undefined>(undefined)

export const useAppContext = () => useContext(AppContext)

export default function AppProvider({ children }: React.PropsWithChildren) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(
        initialState.modalIsOpen
    )

    const [modalType, setModalType] = useState<string>(initialState.modalType)
    const [formInitialValues, setFormInitialValues] = useState<IPlayer | null>(
        initialState.formInitialValues
    )

    const [loading, setLoading] = useState<boolean>(false)

    const openModal = useCallback((t: string) => {
        setModalType(t)
        setModalIsOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalIsOpen(false)
        setFormInitialValues(null)
    }, [])

    const fetchPlayerData = async (id: number) => {
        const response = await fetch('http://localhost:3000/api/players/' + id)
        if (response.ok) {
            const player = await response.json()
            setFormInitialValues(player as IPlayer)
            openModal('UPDATE')

            return
        }

        throw new Error('An error has occurred')
    }

    return (
        <AppContext.Provider
            value={{
                modalIsOpen,
                modalType,
                openModal,
                closeModal,
                fetchPlayerData,
                formInitialValues,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
