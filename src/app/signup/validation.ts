import z from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(3, {
      message: "You cannot leave it empty!",
    }),
    password: z.string().min(8, {
      message: "Must be atleast 8 characters!",
    }),
    passwordConfirmation: z.string().min(8, {
      message: "You cannot leave it empty!",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export type TSignupSchema = z.infer<typeof signUpSchema>;
