"use server"
import { unauthenticatedAction } from "@/lib/safe-action";
import { logInSchema } from "./validation";
import { login } from "../data-access/login-user";


export const loginUser = unauthenticatedAction
  .schema(logInSchema)
  .action(async ({ parsedInput: { username, password } }) => {
	const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const result = await login(formData);

	if (result.error) {
		return { error: result.error };
	  } else {
		return { message: `Hello ${username}!`, user: result.user };
	  }
  });