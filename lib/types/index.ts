import { PlayerType } from '../validation'

export type PlayersReturnType = {
    status: number
    data: Array<PlayerType> | PlayerType | null
    errorMessage?: string
}

export enum FormType {
    CREATE,
    UPDATE,
}
