"use server";

import { unauthenticatedAction } from "@/lib/safe-action";
import { signUpSchema } from "./validation";
import { signup } from "../data-access/signup-user";

export const signUpUser = unauthenticatedAction
  .schema(signUpSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const result = await signup(formData);

    if (result.error) {
      return { error: result.error };
    } else {
      return { message: `Hello ${username}!`, user: result.user };
    }
  });
