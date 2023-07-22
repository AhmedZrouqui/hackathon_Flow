import { IPlayer } from '@/lib/types'
import { createContext, useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

interface IContext {
    modalIsOpen: boolean
    players: IPlayer[]
    modalType: string
    openModal: (t: string) => void
    closeModal: () => void
    fetchPlayerData: (id: number) => void
    formInitialValues: IPlayer | null
    removePlayer: (id: number) => void
    createPlayer: (payload: IPlayer) => void
    updatePlayer: (id: number, payload: IPlayer) => void
    toast: {
        open: boolean
        success: boolean
        message: string
    }
    closeToast: () => void
    initPlayers: (v: IPlayer[]) => void
}

const initialState: IContext = {
    modalIsOpen: false,
    players: [],
    modalType: '',
    openModal: () => {},
    closeModal: () => {},
    fetchPlayerData: () => {},
    formInitialValues: null,
    removePlayer: () => {},
    createPlayer: () => {},
    updatePlayer: () => {},
    toast: {
        open: false,
        success: false,
        message: '',
    },
    closeToast: () => {},
    initPlayers: () => {},
}

const AppContext = createContext<IContext | undefined>(undefined)

export const useAppContext = () => useContext(AppContext)

export default function AppProvider({ children }: React.PropsWithChildren) {
    const router = useRouter()

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(
        initialState.modalIsOpen
    )

    const [modalType, setModalType] = useState<string>(initialState.modalType)
    const [formInitialValues, setFormInitialValues] = useState<IPlayer | null>(
        initialState.formInitialValues
    )

    const [toast, setToast] = useState({
        open: false,
        success: false,
        message: '',
    })

    const [players, setPlayers] = useState<IPlayer[]>([])

    const initPlayers = useCallback((data: IPlayer[]) => {
        setPlayers(data)
    }, [])

    const openModal = useCallback((t: string) => {
        setModalType(t)
        setModalIsOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalIsOpen(false)
        setFormInitialValues(null)
    }, [])

    const fetchPlayerData = useCallback(
        async (id: number) => {
            const response = await fetch(
                'http://localhost:3000/api/players/' + id
            )
            if (response.ok) {
                const player = await response.json()
                setFormInitialValues(player as IPlayer)
                openModal('UPDATE')

                return
            }

            throw new Error('An error has occurred')
        },
        [openModal]
    )

    const createPlayer = useCallback(
        async (payload: IPlayer) => {
            const response = await fetch('http://localhost:3000/api/players', {
                method: 'POST',
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                const player = await response.json()
                //setPlayers((prev) => [...prev, player])
                router.refresh()
                setToast({
                    open: true,
                    success: true,
                    message: 'Player has been created',
                })

                closeModal()

                return
            }

            setToast({
                open: true,
                success: false,
                message: 'An error occured while creating player.',
            })
        },
        [closeModal]
    )

    const updatePlayer = useCallback(
        async (id: number, payload: IPlayer) => {
            const response = await fetch(
                'http://localhost:3000/api/players/' + id,
                {
                    method: 'PATCH',
                    body: JSON.stringify(payload),
                }
            )

            if (response.ok) {
                const _player = await response.json()
                router.refresh()
                setToast({
                    open: true,
                    success: true,
                    message: 'Player has been Updated',
                })

                closeModal()

                return
            }
            setToast({
                open: true,
                success: false,
                message: 'An error occured while updating player.',
            })
        },
        [closeModal]
    )

    const removePlayer = async (id: number) => {
        const response = await fetch(
            'http://localhost:3000/api/players/' + id,
            {
                method: 'DELETE',
            }
        )
        if (response.ok) {
            const player = await response.json()
            setFormInitialValues(player as IPlayer)
            router.refresh()
            setToast({
                open: true,
                success: true,
                message: 'Player has been deleted',
            })

            return
        }
        setToast({
            open: true,
            success: false,
            message: 'Error, please try again!',
        })
    }

    const closeToast = useCallback(() => {
        setToast((prev) => ({ ...prev, open: false }))
    }, [])

    return (
        <AppContext.Provider
            value={{
                modalIsOpen,
                modalType,
                openModal,
                closeModal,
                fetchPlayerData,
                formInitialValues,
                removePlayer,
                createPlayer,
                players,
                updatePlayer,
                toast,
                closeToast,
                initPlayers,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
