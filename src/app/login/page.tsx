"use client"
import z from "zod"

import { loginUser } from "./actions";
import { useAction } from "next-safe-action/hooks";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { logInSchema } from "./validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
  } from "@/components/ui/form"

export default  function Page() {

	const form = useForm<z.infer<typeof logInSchema>>({
		resolver: zodResolver(logInSchema),
    defaultValues: {
      username: "",
      password: ""
    }
	})

  const { execute, result} = useAction(loginUser)
	


	const onSubmit = async (data: { username: string; password: string }) => {
		
		execute(data)
	  };
	  
	return (
		<>
		
		<div>
		<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="username" placeholder="username" {...field} />
              </FormControl>
              {form.formState.errors.username && (<FormMessage>{form.formState.errors.username.message}</FormMessage>)}
              
            </FormItem>
			

			
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              
              {form.formState.errors.password && (<FormMessage>{form.formState.errors.password.message}</FormMessage>)}
            </FormItem>
			

			
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

    {result.data?.message ? <p>{result.data.message}</p> : <p>none</p>}
		</div>
			
		</>
	);
}


interface ActionResult {
	error: string;
}