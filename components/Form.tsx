'use client'

import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormType } from '@/lib/types'
import { PlayerType, formSchema } from '@/lib/validation'
import { createPlayer, updatePlayer } from '@/app/actions'
import { useAppContext } from '@/context/appContext'

interface IForm {
    initialData?: PlayerType
    type: FormType
    playerId?: number
}

function Form({ initialData, type, playerId }: IForm) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    })

    const [formValues, setFormValues] = useState<PlayerType>(
        () =>
            initialData ?? {
                id: 0,
                firstname: '',
                lastname: '',
                salary: 0,
                devise: '',
                goal: 0,
                pictureUrl: '',
            }
    )

    const ctx = useAppContext()

    const submit = async (data: FieldValues) => {
        const typedData = data as unknown as PlayerType
        let res

        if (type === FormType.UPDATE) {
            res = await updatePlayer(playerId as number, typedData)
        } else {
            res = await createPlayer(typedData)
        }

        ctx?.openToast({
            open: true,
            success: res.status === 200,
            message:
                res.status === 200 ? 'Success!' : res.errorMessage ?? 'Error.',
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="flex gap-3 w-full">
                    <div className="w-full">
                        <label className="text-sm text-gray-900">Prénom</label>
                        <input
                            {...register('firstname', { required: true })}
                            placeholder="Entrez prenom..."
                            className={`block border px-3 py-2 rounded-md text-sm mb-2 w-full ${
                                errors.firstname
                                    ? 'border-red-800'
                                    : 'border-gray-300'
                            }`}
                            value={formValues.firstname}
                            onChange={(e) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    firstname: e.target.value,
                                }))
                            }
                        />
                        {errors.firstname && (
                            <span className="text-xs text-red-800 mb-2 block">
                                {errors.firstname?.message as string}
                            </span>
                        )}
                    </div>
                    <div className="w-full">
                        <label className="text-sm text-gray-900">Nom</label>
                        <input
                            {...register('lastname', { required: true })}
                            placeholder="Entrez nom..."
                            className={`block border px-3 py-2 rounded-md text-sm mb-2 w-full ${
                                errors.lastname
                                    ? 'border-red-800'
                                    : 'border-gray-300'
                            }`}
                            value={formValues.lastname}
                            onChange={(e) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    lastname: e.target.value,
                                }))
                            }
                        />
                        {errors.lastname && (
                            <span className="text-xs text-red-800 mb-2 block">
                                {errors.lastname?.message as string}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-3 w-full">
                    <div className="w-full">
                        <label className="text-sm text-gray-900">
                            Salaire annuel
                        </label>
                        <input
                            {...register('salary', {
                                required: true,
                                valueAsNumber: true,
                            })}
                            placeholder="Enter salary"
                            className={`block border px-3 py-2 rounded-md text-sm mb-2 w-full ${
                                errors.salary
                                    ? 'border-red-800'
                                    : 'border-gray-300'
                            }`}
                            type="number"
                            value={Number(formValues.salary)}
                            onChange={(e) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    salary: Number(e.target.value),
                                }))
                            }
                        />
                        {errors.salary && (
                            <span className="text-xs text-red-800 mb-2 block">
                                {errors.salary?.message as string}
                            </span>
                        )}
                    </div>
                    <div className="w-full">
                        <label className="text-sm text-gray-900">Devise</label>
                        <input
                            {...register('devise', {
                                required: true,
                            })}
                            placeholder="Enter devise"
                            className={`block border px-3 py-2 rounded-md text-sm mb-2 w-full ${
                                errors.devise
                                    ? 'border-red-800'
                                    : 'border-gray-300'
                            }`}
                            value={formValues.devise}
                            onChange={(e) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    devise: e.target.value,
                                }))
                            }
                        />
                        {errors.devise && (
                            <span className="text-xs text-red-800 mb-2 block">
                                {errors.devise?.message as string}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-full">
                        <label className="text-sm text-gray-900">
                            Nombre de buts
                        </label>
                        <input
                            {...register('goal', {
                                required: true,
                                valueAsNumber: true,
                            })}
                            placeholder="Enter devise"
                            className={`block border px-3 py-2 rounded-md text-sm mb-2 w-full ${
                                errors.goal
                                    ? 'border-red-800'
                                    : 'border-gray-300'
                            }`}
                            value={Number(formValues.goal)}
                            type="number"
                            onChange={(e) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    goal: Number(e.target.value),
                                }))
                            }
                        />
                        {errors.goal && (
                            <span className="text-xs text-red-800 mb-2 block">
                                {errors.goal?.message as string}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-full">
                        <label className="text-sm text-gray-900">
                            Photo de profile
                        </label>
                        <input
                            {...register('pictureUrl', {
                                required: true,
                            })}
                            placeholder="Enter url"
                            className={`block border px-3 py-2 rounded-md text-sm mb-2 w-full ${
                                errors.goal
                                    ? 'border-red-800'
                                    : 'border-gray-300'
                            }`}
                            value={formValues.pictureUrl}
                            onChange={(e) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    pictureUrl: e.target.value,
                                }))
                            }
                        />
                        {errors.pictureUrl && (
                            <span className="text-xs text-red-800 mb-2 block">
                                {errors.pictureUrl?.message as string}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-cyan-600 rounded text-white"
                        type="submit"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form
