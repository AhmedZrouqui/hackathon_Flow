import { PlayerType } from '../validation'

export interface StatusType {
    status: number
    //data: Array<PlayerType> | PlayerType | null
    errorMessage?: string
}

export interface SinglePlayerReturnType extends StatusType {
    data: PlayerType | null
}

export interface ManyPlayersReturnType extends StatusType {
    data: Array<PlayerType> | null
}

export enum FormType {
    CREATE,
    UPDATE,
}
