"use client";
import z from "zod";
import { useEffect } from "react";
import { loginUser } from "./actions";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "./validation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function Page() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { execute, result } = useAction(loginUser, {
    onSuccess: () => {
      toast({
        title: "Succesfully Logged In!",
        variant: "default",
        duration: 2000,
        description: "Enjoy",
      });
    },
  });

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

  const onSubmit = (data: { username: string; password: string }) => {
    execute(data);
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container mb-20  mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center lg:justify-between">
          <div className="hidden lg:block lg:w-1/2">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
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
                <div className="flex items-center justify-between">
                  <a
                    href="#!"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="#!"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Register
                  </a>
                </p>
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
