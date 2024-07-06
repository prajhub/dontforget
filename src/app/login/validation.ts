
import {z} from "zod"


export const logInSchema = z.object({
    username: z.string().min(3, {
        message: "Must be 3 characters"
    }),
    password: z.string().min(8)
})

export type TlogInSchema = z.infer<typeof logInSchema>