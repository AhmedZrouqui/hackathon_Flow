import * as z from 'zod'
import { URLPattern } from '../utils'

export const formSchema = z.object({
    id: z.number().optional(),
    firstname: z
        .string({
            required_error: 'Le prénom est requis',
            invalid_type_error:
                'Le prénom doit être de type texte (exemple: Lionel).',
        })
        .min(2, { message: 'Le prénom doit comporter au moins 2 caractères.' }),
    lastname: z
        .string({
            required_error: 'Le nom de famille est requis',
            invalid_type_error:
                'Le nom de famille doit être de type texte (exemple: Messi).',
        })
        .min(2, {
            message: 'le nom de famille doit comporter au moins 2 caractères.',
        }),
    salary: z
        .number({
            invalid_type_error: 'Le salaire doit être un nombre.',
            required_error: 'Le salaire est requis',
        })
        .nonnegative({
            message: 'Salaire doit être positif (supérieur ou égal à 0).',
        }),
    devise: z
        .string({ required_error: 'La devise est requise.' })
        .max(3, 'La devise ne peut pas comporter plus de 3 caractères.'),
    goal: z
        .number({ invalid_type_error: 'But doit être un nombre' })
        .nonnegative({
            message: 'Nombre de but doit être positif (supérieur ou égal à 0).',
        }),
    pictureUrl: z
        .string()
        .refine(
            (value: string) => URLPattern.test(value),
            'Enter a valid URL.'
        ),
})

export type PlayerType = z.infer<typeof formSchema>
