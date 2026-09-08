"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  Loader2,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [originalName, setOriginalName] = useState("");
  const [originalImage, setOriginalImage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    if (session?.user) {
      const userName = session.user.name || "";
      const userImage = session.user.image || "";

      setName(userName);
      setImage(userImage);

      setOriginalName(userName);
      setOriginalImage(userImage);
    }
  }, [session]);


  const getInitials = (userName) => {
    if (!userName) return "U";

    const words = userName.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  const handleChooseImage = () => {
    if (!isEditing || saving) return;

    fileInputRef.current?.click();
  };

  
  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Check file size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setSuccess("");

    setSelectedImage(file);

    // Create local preview
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };


  const handleEdit = () => {
    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  
  const handleCancel = () => {
    setName(originalName);
    setImage(originalImage);

    setSelectedImage(null);
    setPreviewImage("");

    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsEditing(false);
  };

 
  const handleSave = async () => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    setError("Please enter your name.");
    return;
  }

  try {
    setSaving(true);
    setError("");
    setSuccess("");

    let updatedImage = image;

    if (selectedImage) {
      updatedImage = await uploadImage(selectedImage);

      if (!updatedImage) {
        throw new Error(
          "Image upload failed. Please try again."
        );
      }
    }

    const result = await authClient.updateUser({
      name: trimmedName,
      image: updatedImage || null,
    });

    if (result?.error) {
      throw new Error(
        result.error.message ||
          "Failed to update profile."
      );
    }

  
    setName(trimmedName);
    setImage(updatedImage || "");

    setOriginalName(trimmedName);
    setOriginalImage(updatedImage || "");

    setSelectedImage(null);
    setPreviewImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSuccess("Profile updated successfully.");

 
    await authClient.getSession();

    window.location.reload();

  } catch (err) {
    console.error("Profile update error:", err);

    setError(
      err?.message ||
        "Failed to update your profile."
    );
  } finally {
    setSaving(false);
  }
};


  if (isPending) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-[#080D19]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123B3A]">
            <Loader2 className="h-7 w-7 animate-spin text-[#00C2B5]" />
          </div>

          <p className="text-sm text-[#94A3B8]">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }


  if (!session?.user) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#080D19]">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#24151B]">
            <UserRound className="h-6 w-6 text-[#FB7185]" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-white">
            Profile unavailable
          </h2>

          <p className="mt-1 text-sm text-[#64748B]">
            Please sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const displayImage =
    previewImage || image || "";

  return (
    <div className="min-h-full w-full bg-[#080D19] text-white">
      <div className="mx-auto w-full max-w-[900px] px-4 py-5 sm:px-0">

    
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00A99D]" />

            <span className="text-[13px] font-semibold text-[#00C2B5]">
              Patient Profile
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[28px] font-bold tracking-tight text-white">
                My Profile
              </h1>

              <p className="mt-1.5 text-[13px] text-[#94A3B8]">
                Manage your personal profile information.
              </p>
            </div>

            {!isEditing && (
              <button
                onClick={handleEdit}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#29404F] bg-[#111827] px-4 text-[13px] font-medium text-[#CBD5E1] transition hover:border-[#00A99D] hover:bg-[#162033] hover:text-white"
              >
                <Pencil className="h-4 w-4 text-[#00C2B5]" />
                Edit Profile
              </button>
            )}
          </div>
        </div>


        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#155E59] bg-[#102D2B] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#123B3A]">
              <Check className="h-4 w-4 text-[#2DD4BF]" />
            </div>

            <p className="text-sm font-medium text-[#5EEAD4]">
              {success}
            </p>
          </div>
        )}


        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#4C2730] bg-[#24151B] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3A1D26]">
              <X className="h-4 w-4 text-[#FB7185]" />
            </div>

            <p className="text-sm font-medium text-[#FDA4AF]">
              {error}
            </p>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-[#243247] bg-[#111827] shadow-[0_8px_30px_rgba(0,0,0,0.18)]">

          <div className="relative h-[130px] overflow-hidden bg-gradient-to-r from-[#102A35] via-[#123B3A] to-[#102331]">

            <div className="absolute -right-10 -top-20 h-48 w-48 rounded-full border border-[#00A99D]/10" />

            <div className="absolute -right-4 -top-14 h-32 w-32 rounded-full border border-[#00A99D]/10" />

            <div className="absolute -left-16 -bottom-24 h-40 w-40 rounded-full bg-[#00A99D]/5" />

          </div>

          <div className="relative px-5 pb-7 sm:px-7">

            <div className="-mt-[58px] flex flex-col gap-4 sm:flex-row sm:items-end">

  
              <div className="relative shrink-0">

                <div className="flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-3xl border-[5px] border-[#111827] bg-[#123B3A] shadow-xl">

                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-[#00C2B5]">
                      {getInitials(name)}
                    </span>
                  )}

                </div>
                {isEditing && (
                  <>
                    <button
                      type="button"
                      onClick={handleChooseImage}
                      disabled={saving}
                      className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#111827] bg-[#00A99D] shadow-lg transition hover:bg-[#00B8AA] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Camera className="h-4 w-4 text-white" />
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </>
                )}

              </div>

              <div className="min-w-0 flex-1 sm:pb-1">

                <div className="flex items-center gap-2">

                  <h2 className="truncate text-xl font-bold text-white">
                    {name || "Patient"}
                  </h2>

                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#123B3A]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#00C2B5]" />
                  </div>

                </div>

                <p className="mt-1 text-[12px] font-medium uppercase tracking-wider text-[#00A99D]">
                  Patient
                </p>

                {isEditing && (
                  <p className="mt-2 text-[11px] text-[#64748B]">
                    Click the camera icon to change your profile photo.
                  </p>
                )}

              </div>

            </div>

            

            {isEditing && (
              <div className="mt-7">

                <label className="mb-2 block text-[12px] font-medium text-[#CBD5E1]">
                  Full Name
                </label>

                <div className="relative">

                  <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Enter your name"
                    disabled={saving}
                    className="h-11 w-full rounded-xl border border-[#29404F] bg-[#0B1220] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#475569] focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D]/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

                {selectedImage && (
                  <p className="mt-2 text-[11px] text-[#00C2B5]">
                    New image selected. It will be uploaded when you save.
                  </p>
                )}

              </div>
            )}

          </div>

          <div className="border-t border-[#243247]" />

          <div className="p-5 sm:p-7">

            <div className="mb-5">
              <h3 className="text-[15px] font-semibold text-white">
                Account Information
              </h3>

              <p className="mt-1 text-[11px] text-[#64748B]">
                Your account details are protected and cannot
                be edited here.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

           
              <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123B3A]">
                    <Mail className="h-[17px] w-[17px] text-[#00C2B5]" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[11px] text-[#64748B]">
                      Email Address
                    </p>

                    <p className="mt-1 truncate text-[13px] font-medium text-[#E2E8F0]">
                      {session.user.email ||
                        "Not available"}
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123B3A]">
                    <ShieldCheck className="h-[17px] w-[17px] text-[#00C2B5]" />
                  </div>

                  <div>

                    <p className="text-[11px] text-[#64748B]">
                      Account Type
                    </p>

                    <p className="mt-1 text-[13px] font-medium text-[#E2E8F0]">
                      Patient
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

  
          {isEditing && (
            <>
              <div className="border-t border-[#243247]" />

              <div className="flex flex-col-reverse gap-3 bg-[#0B1220] p-5 sm:flex-row sm:justify-end sm:p-6">

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#29404F] bg-[#111827] px-5 text-[13px] font-medium text-[#CBD5E1] transition hover:bg-[#162033] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 text-[13px] font-semibold text-white shadow-[0_4px_15px_rgba(0,169,157,0.2)] transition hover:bg-[#008F85] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>

              </div>
            </>
          )}

        </div>

        <div className="flex items-center justify-center gap-2 py-4">

          <ShieldCheck className="h-3.5 w-3.5 text-[#00A99D]" />

          <p className="text-[10px] text-[#475569]">
            Your personal information is securely protected.
          </p>

        </div>

      </div>
    </div>
  );
}