"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Form,
} from "@heroui/react";

import { FaGoogle } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

const LoginForm = ({ redirectTo = "/" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();

        if (session?.data?.user) {
          router.replace(redirectTo);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkSession();
  }, [router, redirectTo]);

  const onSubmit = async (data) => {
    try {
      const { data: loginData, error: loginError } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

      if (loginError) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Login successful!");

      setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
      }, 500);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-sky-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-xl relative">
        <Card className="rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
          <CardHeader className="flex flex-col items-center text-center px-8 pt-10 pb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 flex items-center justify-center text-white text-3xl shadow-lg">
              🏥
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>

            <p className="mt-2 text-sm text-white/60">
              Login to continue to MediCare Connect
            </p>
          </CardHeader>

          <CardBody className="px-8 pb-10">
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email Address"
                    placeholder="john@example.com"
                    className="w-full p-2 border border-gray-400 rounded-xl"
                  />
                )}
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    className="w-full p-2 border border-gray-400 rounded-xl"
                  />
                )}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
              >
                Sign In →
              </Button>
            </Form>

            <div className="flex items-center my-7">
              <div className="flex-1 h-px bg-white/10" />
              <span className="px-4 text-xs text-white/40">
                or continue with
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <Button
              variant="bordered"
              className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 text-white"
              startContent={<FaGoogle className="text-red-400" />}
            >
              Continue with Google
            </Button>

            <p className="text-center text-sm text-white/50 mt-6">
              Don’t have an account?{" "}
              <Link
                href={`/register?redirect=${encodeURIComponent(redirectTo)}`}
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
