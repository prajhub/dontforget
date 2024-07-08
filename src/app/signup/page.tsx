"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "./validation";
import { useEffect } from "react";
import z from "zod";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpUser } from "./actions";

export default function Page() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { execute, result } = useAction(signUpUser, {
    onSuccess: () => {
      toast({
        title: "Account Created",
        variant: "default",
        duration: 2000,
        description: "You have successfully created an account",
      });
    },

    onError: ({ error }) => {
      toast({
        title: "Signup Failed",
        description: error.serverError,
        variant: "destructive", // Use the "destructive" variant for errors
      });
    },
  });

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    execute(data);
  }

  useEffect(() => {
    if (result.data?.error) {
      toast({
        title: "Error",
        description: result.data.error,
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [result.data, toast]);

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center lg:justify-between">
          <div className="hidden lg:block lg:w-1/2">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="w-full max-w-md lg:w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Username"
                          {...field}
                          className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:border-blue-500 focus:placeholder-opacity-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500"
                        />
                      </FormControl>
                      {form.formState.errors.username && (
                        <FormMessage>
                          {form.formState.errors.username.message}
                        </FormMessage>
                      )}
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
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:border-blue-500 focus:placeholder-opacity-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500"
                        />
                      </FormControl>
                      {form.formState.errors.password && (
                        <FormMessage>
                          {form.formState.errors.password.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                          className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:border-blue-500 focus:placeholder-opacity-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500"
                        />
                      </FormControl>
                      {form.formState.errors.passwordConfirmation && (
                        <FormMessage>
                          {form.formState.errors.passwordConfirmation.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ActionResult {
  error: string;
}
