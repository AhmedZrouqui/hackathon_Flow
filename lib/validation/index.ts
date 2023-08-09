import * as z from 'zod'

export const formSchema = z
    .object({
        id: z.number().optional(),
        firstname: z
            .string({
                required_error: 'Le prénom est requis',
                invalid_type_error:
                    'Le prénom doit être de type texte (exemple: Lionel).',
            })
            .trim()
            .min(2, {
                message: 'Le prénom doit comporter au moins 2 caractères.',
            }),
        lastname: z
            .string({
                required_error: 'Le nom de famille est requis',
                invalid_type_error:
                    'Le nom de famille doit être de type texte (exemple: Messi).',
            })
            .trim()
            .min(2, {
                message:
                    'le nom de famille doit comporter au moins 2 caractères.',
            }),
        salary: z
            .number({
                invalid_type_error: 'Le salaire doit être un nombre.',
                required_error: 'Le salaire est requis',
            })
            .nonnegative({
                message: 'Salaire doit être positif (supérieur ou égal à 0).',
            }),
        devise: z.enum(['$', 'MAD', '€'], {
            invalid_type_error: 'Devise doit être $, MAD, ou €.',
            required_error: 'Devise doit être $, MAD, ou €.',
        }),
        goal: z
            .number({ invalid_type_error: 'But doit être un nombre' })
            .nonnegative({
                message:
                    'Nombre de but doit être positif (supérieur ou égal à 0).',
            }),
        pictureUrl: z
            .string({ required_error: 'Photo de profile requise.' })
            .url('Enter a valid URL.')
            .nullish(),
    })
    .strict()

export type PlayerType = z.infer<typeof formSchema>
