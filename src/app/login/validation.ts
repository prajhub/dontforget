
import {z} from "zod"


export const logInSchema = z.object({
    username: z.string().min(3, {
        message: "You cannot leave it empty!"
    }),
    password: z.string().min(8, {
        message: "Must be atleast 8 characters!"
    })
})

export type TlogInSchema = z.infer<typeof logInSchema>