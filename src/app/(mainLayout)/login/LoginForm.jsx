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
        toast.error(loginError.message || "Invalid email or password");

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8">
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

            <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>

            <p className="mt-2 text-sm text-white/60">
              Login to continue to MediCare Connect
            </p>
          </CardHeader>

          <CardBody className="px-8 pb-10">
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                <p className="text-sm text-red-500">{errors.email.message}</p>
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

            {/* Google Login */}
           <Button
  type="button"
  isLoading={googleLoading}
  isDisabled={googleLoading || loginLoading}
  onPress={handleGoogleLogin}
  className="group cursor-pointer relative h-14 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] font-semibold text-white shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.12] hover:shadow-cyan-500/10 active:scale-[0.98]"
>
  <div className="flex w-full items-center justify-center gap-3">
    {!googleLoading && (
      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
          />
          <path
            fill="#34A853"
            d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
          />
          <path
            fill="#FBBC05"
            d="M6.54 13.83A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.83V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.53Z"
          />
          <path
            fill="#EA4335"
            d="M12 6.14c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.25 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.64l3.24 2.53c.77-2.31 2.92-4.03 5.46-4.03Z"
          />
        </svg>
      </span>
    )}

    <span className="tracking-wide">
      {googleLoading
        ? "Connecting to Google..."
        : "Continue with Google"}
    </span>
  </div>
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

        {/* Trial Credentials */}
        <div className="mt-5 rounded-xl border border-emerald-200/20 bg-emerald-50/10 px-4 py-3 backdrop-blur-md">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-200">
            Ecosystem Trial Credentials:
          </p>

          <div className="space-y-1 text-xs text-white/70">
            <p>
              <span className="font-medium text-white/90">Patient:</span>{" "}
              patient@patient.com{" "}
              <span className="text-white/50">
                (Password: patient@patient.com)
              </span>
            </p>

            <p>
              <span className="font-medium text-white/90">Doctor:</span>{" "}
              doctor@doctor.com{" "}
              <span className="text-white/50">
                (Password: doctor@doctor.com)
              </span>
            </p>

            <p>
              <span className="font-medium text-white/90">Admin:</span>{" "}
              admin@admin.com{" "}
              <span className="text-white/50">(Password: admin@admin.com)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
