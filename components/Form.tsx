import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppContext } from '@/context/appContext'
import { IPlayer } from '@/lib/types'
import { updatePlayer } from '@/app/actions'

const schema = z.object({
    firstname: z.string().min(1, { message: 'Required' }),
    lastname: z.string().min(1, { message: 'Required' }),
    salary: z.string().min(1, { message: 'Required' }),
    devise: z.string().min(1, { message: 'Required' }),
})

function Form() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    const ctx = useAppContext()

    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        salary: 0,
        devise: '',
        goal: 0,
        pictureUrl: '',
    })

    useEffect(() => {
        if (ctx?.formInitialValues) setFormValues(ctx?.formInitialValues)
    }, [ctx?.formInitialValues])

    const formRef = useRef(null)

    const submit = async (data: FieldValues) => {
        data.pictureUrl = ''
        await updatePlayer(
            ctx?.formInitialValues?.id as number,
            data as IPlayer
        )
    }

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit(submit)}>
                <input
                    {...register('firstname', { required: true })}
                    placeholder="Type firstname"
                    className="block border px-3 py-2 border-gray-300 rounded-md text-sm mb-2"
                    value={formValues.firstname}
                    onChange={(e) =>
                        setFormValues((prev) => ({
                            ...prev,
                            firstname: e.target.value,
                        }))
                    }
                />
                <input
                    {...register('lastname', { required: true })}
                    placeholder="Type lastname"
                    className="block border px-3 py-2 border-gray-300 rounded-md text-sm mb-2"
                    value={formValues.lastname}
                    onChange={(e) =>
                        setFormValues((prev) => ({
                            ...prev,
                            lastname: e.target.value,
                        }))
                    }
                />
                <input
                    {...register('salary', { required: true })}
                    placeholder="Type salary"
                    className="block border px-3 py-2 border-gray-300 rounded-md text-sm mb-2"
                    value={formValues.salary}
                    onChange={(e) =>
                        setFormValues((prev) => ({
                            ...prev,
                            salary: Number(e.target.value),
                        }))
                    }
                />
                <input
                    {...register('devise', { required: true })}
                    placeholder="Type devise"
                    className="block border px-3 py-2 border-gray-300 rounded-md text-sm mb-2"
                    value={formValues.devise}
                    onChange={(e) =>
                        setFormValues((prev) => ({
                            ...prev,
                            devise: e.target.value,
                        }))
                    }
                />
                <input
                    {...register('goals', { required: true })}
                    placeholder="Type devise"
                    className="block border px-3 py-2 border-gray-300 rounded-md text-sm mb-2"
                    value={formValues.goal}
                    onChange={(e) =>
                        setFormValues((prev) => ({
                            ...prev,
                            goal: Number(e.target.value),
                        }))
                    }
                />
                <button>Save</button>
            </form>
        </div>
    )
}

export default Form
