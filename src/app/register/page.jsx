"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
} from "@heroui/react";

import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/utils/uploadImage";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "patient",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image?.[0];
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { data: signUpData, error: signUpError } =
        await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.name,
          image: imageUrl,
          role: data.role,
        });

      if (signUpError) {
        toast.error("Registration failed");
        return;
      }

      toast.success("Sign up successful!");
      router.push("/");
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

            <h2 className="mt-6 text-3xl font-bold text-white">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-white/60">
              Join MediCare Connect in seconds
            </p>
          </CardHeader>

    
          <CardBody className="px-8 pb-10">
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

       
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Full Name"
                    placeholder="Your Name"
                   
                     className="w-full p-2 border border-gray-400 rounded-xl"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

  
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
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

  
              <div>
                <Label className="text-white/70 text-sm font-medium mb-2 block">
                  Profile Photo
                </Label>

                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="w-full h-14 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-cyan-500/20 file:text-cyan-300 hover:border-cyan-400/40 transition"
                    />
                  )}
                />
              </div>

     
              <div>
                <Label className="text-white/70 text-sm font-medium mb-3 block">
                  Register as
                </Label>

                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-4">
                      
          
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          value="patient"
                          checked={field.value === "patient"}
                          onChange={field.onChange}
                          className="hidden"
                        />
                        <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center hover:border-cyan-400/40 transition">
                          <div className="text-3xl">👤</div>
                          <p className="mt-2 font-semibold text-white">Patient</p>
                          <p className="text-xs text-white/50">Book appointments</p>
                        </div>
                      </label>

                
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          value="doctor"
                          checked={field.value === "doctor"}
                          onChange={field.onChange}
                          className="hidden"
                        />
                        <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center hover:border-cyan-400/40 transition">
                          <div className="text-3xl">👨‍⚕️</div>
                          <p className="mt-2 font-semibold text-white">Doctor</p>
                          <p className="text-xs text-white/50">Provide care</p>
                        </div>
                      </label>

                    </div>
                  )}
                />
              </div>

  
              <Button
                type="submit"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
              >
                Create Account →
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
              className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
              startContent={<FaGoogle className="text-red-400" />}
            >
              Continue with Google
            </Button>

    
            <p className="text-center text-sm text-white/50 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}