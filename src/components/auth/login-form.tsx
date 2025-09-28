"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isloading, setisloading] = useState(false);
  const router = useRouter();
  // initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setisloading(true);
    console.log(values);

    try {
      const { error } = await signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: true, // custom logic , button to press to remember ...
      });

      if (error) {
        toast("Login failed ");
        return;
      }
      toast("login success");
      router.push("/");
      console.log(values);
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setisloading(false);
    }
  };

  return (
    // {/* ... form ???? many children ...??  */}
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password "
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isloading}>
            {isloading ? "Logging in " : "Log in "}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default LoginForm;
