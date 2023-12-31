'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormType, SinglePlayerReturnType } from '@/lib/types'
import { PlayerType, formSchema } from '@/lib/validation'
import { useAppContext } from '@/context/appContext'
import Input from './Input'
import { useRouter } from 'next/navigation'
import FormGroup from './FormGroup'
import Button from '../Button'

type FromAddProps = {
    type: FormType.CREATE
    action: (payload: PlayerType) => Promise<SinglePlayerReturnType>
}

type FormUpdateProps = {
    type: FormType.UPDATE
    action: (id: number, payload: PlayerType) => Promise<SinglePlayerReturnType>
}

type FormProps = {
    initialData: PlayerType | null

    playerId?: number
} & (FromAddProps | FormUpdateProps)

function Form({ initialData, type, playerId, action }: FormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(formSchema),
        ...(initialData && { defaultValues: initialData }),
    })

    const ctx = useAppContext()
    const router = useRouter()

    /**
     * Accepts data of type `PlayerType`.
     *
     * Submits form data depending on form type (UPDATE or CREATE).
     *
     * @returns `SinglePlayerReturnType`
     */
    const submitAction = async (data: PlayerType) => {
        let res: SinglePlayerReturnType
        switch (type) {
            case FormType.UPDATE:
                res = await action(playerId!, data)
                break
            default:
                res = await action(data)
                if (res.status === 200) reset()
                break
        }
        return res
    }

    const submit = async (data: PlayerType) => {
        try {
            const res = await submitAction(data)

            ctx?.openToast({
                open: true,
                success: res.status === 200,
                message:
                    res.status === 200
                        ? 'Success!'
                        : res.errorMessage ?? 'Error.',
            })

            if (res.status === 200) router.push('/')
        } catch (err) {
            console.log(err)
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
                        isNumber
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
                        isNumber
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
                    <Button type="submit" loading={isSubmitting}>
                        Enregistrer
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Form
