"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { OAuthGoogle } from "./oauth";
import { Button } from "../ui/button";
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Section from "../common/layout/section";
import toast, { Toaster } from "react-hot-toast";
import AppConfig from "../../config/app.config";
import { login } from "../../services/api/auth";
import { useRouter } from "next/navigation";
import CommonAvatar from "../ui/common-avatar";
import { loginSchema } from "../../shared/schema/login";
import authStore from "../../store/auth.store";
import { Dots, Spinner } from "../ui/loading-animation";

export default function Login() {
  const { user, setUser } = authStore.getState();
  const router = useRouter();
  const form = useForm({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      username: "thisisrobin",
      password: "dcrobin#2025",
    },
  });

  async function onSubmit(data) {
    try {
      const prom = await new Promise((resolve) => setTimeout(resolve, 2500));
      const [_, result] = await Promise.allSettled([prom, login(data)]);
      const res = result?.value;
      if (res?.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Error while login", error);
      const errMessage = error?.response?.data?.message ?? error.message;
      toast.error(errMessage);
    } finally {}
  }

  if (user?.id) {
    setTimeout(() => router.push(`/u/${user.id}/dashboard`), 3000);
    return (<Section className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-gray-500 font-medium text-lg">Redirecting...</p>
      <Dots onScreenHeight={false} />
    </Section>)
  }

  return (
    <Section className="flex flex-col justify-center items-center min-h-screen bg-[#faf9fb]">
      <Form {...form}>
        <div className="flex flex-col items-center justify-center space-y-12 sm:shadow-xl sm:rounded-2xl px-6 py-10 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="flex flex-col items-center mb-5">
            <CommonAvatar />
            <p className="text-xl">Resource Sphere</p>
            <FormDescription>Login into your account</FormDescription>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input placeholder="batman" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <> <Spinner size="small" onScreenHeight={false}/> Logging in... </> : 'Login'}
            </Button>
          </form>
          <OAuthGoogle />
        </div>
      </Form>
      <div className="flex items-center justify-center px-2 py-6">
        &#169; Copyright {new Date().getFullYear()} {AppConfig.appName}
      </div>
      <Toaster />
    </Section>
  );
}
