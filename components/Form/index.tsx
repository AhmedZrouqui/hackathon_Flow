'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormType, SinglePlayerReturnType } from '@/lib/types'
import { PlayerType, formSchema } from '@/lib/validation'
import { useAppContext } from '@/context/appContext'
import Input from './Input'
import FormGroup from './FormGroup'
import Button from '../Button'

interface IForm {
    initialData: PlayerType | null
    type: FormType
    playerId?: number
    updateAction?: (
        id: number,
        payload: PlayerType
    ) => Promise<SinglePlayerReturnType>
    createAction?: (payload: PlayerType) => Promise<SinglePlayerReturnType>
}

function Form({
    initialData,
    type,
    playerId,
    updateAction,
    createAction,
}: IForm) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(formSchema),
        ...(initialData && { defaultValues: initialData }),
    })

    const [loading, setLoading] = useState<boolean>(false)

    const ctx = useAppContext()

    const submit = async (data: PlayerType) => {
        try {
            setLoading(true)
            let res: SinglePlayerReturnType

            switch (type) {
                case FormType.UPDATE:
                    res = await updateAction!(playerId!, data)
                    break
                default:
                    res = await createAction!(data)
                    reset()
                    break
            }

            ctx?.openToast({
                open: true,
                success: res.status === 200,
                message:
                    res.status === 200
                        ? 'Success!'
                        : res.errorMessage ?? 'Error.',
            })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <FormGroup>
                    <Input
                        label="Prénom"
                        placeholder="Entrez prenom..."
                        formRegister={register('firstname', {
                            required: true,
                        })}
                        error={errors.firstname}
                    />
                    <Input
                        label="Nom de famille"
                        placeholder="Entrez nom..."
                        formRegister={register('lastname', { required: true })}
                        error={errors.lastname}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        label="Salaire annuel"
                        placeholder="Entrez salaire..."
                        formRegister={register('salary', {
                            required: true,
                            valueAsNumber: true,
                        })}
                        error={errors.salary}
                    />
                    <Input
                        label="Devise"
                        placeholder="Entrez devise..."
                        formRegister={register('devise', {
                            required: true,
                        })}
                        error={errors.devise}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        label="Nombre de but"
                        placeholder="Entrez nombre de but..."
                        formRegister={register('goal', {
                            required: true,
                            valueAsNumber: true,
                        })}
                        error={errors.goal}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        label="Photo de profile"
                        placeholder="Entrez url..."
                        formRegister={register('pictureUrl', {
                            required: true,
                        })}
                        error={errors.pictureUrl}
                    />
                </FormGroup>
                <div className="flex justify-end">
                    <Button type="submit" loading={loading}>
                        Enregistrer
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Form
