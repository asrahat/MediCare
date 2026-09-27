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

import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const router = useRouter();

  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

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


  const getDashboardRoute = (role) => {
    switch (role) {
      case "admin":
        return "/dashboard/admin";

      case "doctor":
        return "/dashboard/doctor";

      case "patient":
      default:
        return "/dashboard/patient";
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();

        if (session?.data?.user) {
          const role = session.data.user.role || "patient";

          router.replace(getDashboardRoute(role));
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };

    checkSession();
  }, [router]);

  const onSubmit = async (data) => {
    setLoginLoading(true);

    try {
      const { data: loginData, error: loginError } =
        await authClient.signIn.email({
          email: data.email.trim(),
          password: data.password,
        });

      if (loginError) {
        toast.error(
          loginError.message || "Invalid email or password"
        );

        return;
      }

      if (!loginData?.user) {
        toast.error("Login failed.");
        return;
      }

      const role = loginData.user.role || "patient";

      toast.success("Login successful!");

      router.replace(getDashboardRoute(role));
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      toast.error("Something went wrong during login.");
    } finally {
      setLoginLoading(false);
    }
  };

 
  const handleGoogleLogin = async () => {
  setGoogleLoading(true);

  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard/admin",
    });
  } catch (error) {
    console.error("Google login error:", error);

    toast.error("Google login failed.");

    setGoogleLoading(false);
  }
};
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[400px] w-[400px] rounded-full bg-sky-500/20 blur-[120px]" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative w-full max-w-xl">
        <Card className="rounded-[32px] border border-white/10 bg-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

          {/* Header */}
          <CardHeader className="flex flex-col items-center px-8 pb-6 pt-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 text-3xl text-white shadow-lg">
              🏥
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-white/60">
              Login to continue to MediCare Connect
            </p>
          </CardHeader>

          <CardBody className="px-8 pb-10">

          
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Email */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email Address"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-gray-400 p-2"
                  />
                )}
              />

              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}

              {/* Password */}
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-400 p-2"
                  />
                )}
              />

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              {/* Login */}
              <Button
                type="submit"
                isLoading={loginLoading}
                isDisabled={loginLoading || googleLoading}
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                {loginLoading ? "Signing in..." : "Sign In →"}
              </Button>
            </Form>

            {/* Divider */}
            <div className="my-7 flex items-center">
              <div className="h-px flex-1 bg-white/10" />

              <span className="px-4 text-xs text-white/40">
                or continue with
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

          
           <Button
  type="button"
  variant="bordered"
  isLoading={googleLoading}
  isDisabled={googleLoading || loginLoading}
  className="h-14 w-full rounded-2xl border-2 border-slate-300 bg-white text-slate-800"
  onPress={handleGoogleLogin}
>
  {googleLoading
    ? "Connecting to Google..."
    : "Continue with Google"}
</Button>
            {/* Register */}
            <p className="mt-6 text-center text-sm text-white/50">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-cyan-400 hover:text-cyan-300"
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