"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  DollarSign,
  Clock3,
  Plus,
  X,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  getDoctorProfile,
  createDoctorProfile,
  updateDoctorProfile,
} from "@/lib/actions/doctor";

export default function DoctorProfile() {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const userId = session?.user?.id;

  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    doctorName: "",
    specialization: "",
    qualifications: [],
    experience: "",
    consultationFee: "",
    hospitalName: "",
    profileImage: "",
    availableDays: [],
    availableSlots: [],
  });

  const [newQualification, setNewQualification] =
    useState("");

  const [newSlot, setNewSlot] = useState("");

  // ==========================================
  // LOAD DOCTOR PROFILE
  // ==========================================

  useEffect(() => {
    if (sessionLoading) return;

    if (!userId) {
      setLoading(false);
      return;
    }

    loadDoctorProfile();
  }, [userId, sessionLoading]);

  const loadDoctorProfile = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result =
        await getDoctorProfile(userId);

      // ======================================
      // PROFILE EXISTS
      // ======================================

      if (
        result.success &&
        result.data
      ) {
        setDoctor(result.data);

        setFormData({
          doctorName:
            result.data.doctorName || "",

          specialization:
            result.data.specialization || "",

          qualifications:
            Array.isArray(
              result.data.qualifications
            )
              ? result.data.qualifications
              : [],

          experience:
            result.data.experience ?? "",

          consultationFee:
            result.data.consultationFee ?? "",

          hospitalName:
            result.data.hospitalName || "",

          profileImage:
            result.data.profileImage || "",

          availableDays:
            Array.isArray(
              result.data.availableDays
            )
              ? result.data.availableDays
              : [],

          availableSlots:
            Array.isArray(
              result.data.availableSlots
            )
              ? result.data.availableSlots
              : [],
        });

        return;
      }

      // ======================================
      // PROFILE DOES NOT EXIST
      // ======================================

      if (
        result.profileExists === false
      ) {
        setDoctor(null);

        setFormData({
          doctorName:
            session?.user?.name || "",

          specialization: "",

          qualifications: [],

          experience: "",

          consultationFee: "",

          hospitalName: "",

          profileImage:
            session?.user?.image || "",

          availableDays: [],

          availableSlots: [],
        });

        return;
      }

      throw new Error(
        result.message ||
          "Failed to load doctor profile"
      );
    } catch (error) {
      console.error(
        "loadDoctorProfile error:",
        error
      );

      setError(
        error.message ||
          "Failed to load doctor profile"
      );
    } finally {
      // VERY IMPORTANT
      setLoading(false);
    }
  };

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // ADD QUALIFICATION
  // ==========================================

  const handleAddQualification = () => {
    const qualification =
      newQualification.trim();

    if (!qualification) return;

    if (
      formData.qualifications.includes(
        qualification
      )
    ) {
      setError(
        "This qualification already exists."
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,

      qualifications: [
        ...prev.qualifications,
        qualification,
      ],
    }));

    setNewQualification("");
    setError("");
  };

  // ==========================================
  // REMOVE QUALIFICATION
  // ==========================================

  const handleRemoveQualification = (
    qualification
  ) => {
    setFormData((prev) => ({
      ...prev,

      qualifications:
        prev.qualifications.filter(
          (item) =>
            item !== qualification
        ),
    }));
  };

  // ==========================================
  // ADD SLOT
  // ==========================================

  const handleAddSlot = () => {
    const slot = newSlot.trim();

    if (!slot) return;

    if (
      formData.availableSlots.includes(
        slot
      )
    ) {
      setError(
        "This slot already exists."
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,

      availableSlots: [
        ...prev.availableSlots,
        slot,
      ],
    }));

    setNewSlot("");
    setError("");
  };

  // ==========================================
  // REMOVE SLOT
  // ==========================================

  const handleRemoveSlot = (slot) => {
    setFormData((prev) => ({
      ...prev,

      availableSlots:
        prev.availableSlots.filter(
          (item) => item !== slot
        ),
    }));
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError(
        "Please login as a doctor."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // ======================================
      // VALIDATION
      // ======================================

      if (
        !formData.doctorName.trim()
      ) {
        throw new Error(
          "Doctor name is required."
        );
      }

      if (
        !formData.specialization.trim()
      ) {
        throw new Error(
          "Specialization is required."
        );
      }

      if (
        formData.experience === "" ||
        Number(formData.experience) < 0
      ) {
        throw new Error(
          "Please enter a valid experience."
        );
      }

      if (
        formData.consultationFee === "" ||
        Number(
          formData.consultationFee
        ) < 0
      ) {
        throw new Error(
          "Please enter a valid consultation fee."
        );
      }

      // ======================================
      // PROFILE DATA
      // ======================================

      const profileData = {
        doctorName:
          formData.doctorName.trim(),

        specialization:
          formData.specialization.trim(),

        qualifications:
          Array.isArray(
            formData.qualifications
          )
            ? formData.qualifications
            : [],

        experience:
          Number(formData.experience),

        consultationFee:
          Number(
            formData.consultationFee
          ),

        hospitalName:
          formData.hospitalName.trim(),

        profileImage:
          formData.profileImage.trim(),

        availableDays:
          Array.isArray(
            formData.availableDays
          )
            ? formData.availableDays
            : [],

        availableSlots:
          Array.isArray(
            formData.availableSlots
          )
            ? formData.availableSlots
            : [],
      };

      let result;

      // ======================================
      // CREATE
      // ======================================

      if (!doctor || !doctor._id) {
        result =
          await createDoctorProfile(
            userId,
            profileData
          );
      }

      // ======================================
      // UPDATE
      // ======================================

      else {
        result =
          await updateDoctorProfile(
            doctor._id,
            profileData
          );
      }

      // ======================================
      // ERROR
      // ======================================

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Failed to save doctor profile"
        );
      }

      // ======================================
      // UPDATE LOCAL STATE
      // ======================================

      setDoctor(result.data);

      setFormData({
        doctorName:
          result.data.doctorName || "",

        specialization:
          result.data.specialization || "",

        qualifications:
          Array.isArray(
            result.data.qualifications
          )
            ? result.data.qualifications
            : [],

        experience:
          result.data.experience ?? "",

        consultationFee:
          result.data.consultationFee ?? "",

        hospitalName:
          result.data.hospitalName || "",

        profileImage:
          result.data.profileImage || "",

        availableDays:
          Array.isArray(
            result.data.availableDays
          )
            ? result.data.availableDays
            : [],

        availableSlots:
          Array.isArray(
            result.data.availableSlots
          )
            ? result.data.availableSlots
            : [],
      });

      // ======================================
      // SUCCESS MESSAGE
      // ======================================

      setSuccess(
        doctor
          ? "Doctor profile updated successfully."
          : "Doctor profile created successfully."
      );
    } catch (error) {
      console.error(
        "Save doctor profile error:",
        error
      );

      setError(
        error?.message ||
          "Failed to save doctor profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // SESSION LOADING
  // ==========================================

  if (sessionLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#080D19]">
        <div className="flex items-center gap-3 text-[#94A3B8]">
          <Loader2
            size={25}
            className="animate-spin text-[#00C2B5]"
          />

          Loading session...
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!userId) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#080D19] p-6">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
          Please login as a doctor.
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#080D19]">
        <div className="flex items-center gap-3 text-[#94A3B8]">
          <Loader2
            size={25}
            className="animate-spin text-[#00C2B5]"
          />

          Loading profile...
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#080D19] p-4 text-white md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <UserRound
              size={23}
              className="text-[#00C2B5]"
            />

            <span className="text-sm font-medium text-[#00C2B5]">
              Doctor Dashboard
            </span>
          </div>

          <h1 className="text-2xl font-bold md:text-3xl">
            Profile Management
          </h1>

          <p className="mt-2 text-sm text-[#94A3B8]">
            Keep your professional information and
            consultation availability up to date.
          </p>
        </div>

        {/* Messages */}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            <CheckCircle2 size={18} />

            {success}
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle size={18} />

            {error}
          </div>
        )}

        {/* Professional Information */}

        <div className="mb-6 rounded-2xl border border-[#243247] bg-[#111827] p-5 md:p-6">
          <h2 className="mb-5 text-lg font-semibold">
            Professional Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            {/* Doctor Name */}

            <div>
              <label className="mb-2 block text-sm text-[#94A3B8]">
                Doctor Name
              </label>

              <input
                type="text"
                name="doctorName"
                value={
                  formData.doctorName
                }
                onChange={handleChange}
                placeholder="Dr. John Doe"
                className="w-full rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#64748B] focus:border-[#00A99D]"
              />
            </div>

            {/* Specialization */}

            <div>
              <label className="mb-2 block text-sm text-[#94A3B8]">
                Specialization
              </label>

              <input
                type="text"
                name="specialization"
                value={
                  formData.specialization
                }
                onChange={handleChange}
                placeholder="Cardiology"
                className="w-full rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#64748B] focus:border-[#00A99D]"
              />
            </div>

            {/* Hospital */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-[#94A3B8]">
                Hospital Name
              </label>

              <input
                type="text"
                name="hospitalName"
                value={
                  formData.hospitalName
                }
                onChange={handleChange}
                placeholder="Hospital Name"
                className="w-full rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#64748B] focus:border-[#00A99D]"
              />
            </div>

            {/* Qualifications */}

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm text-[#94A3B8]">
                <GraduationCap size={16} />

                Qualifications
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={
                    newQualification
                  }
                  onChange={(e) =>
                    setNewQualification(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter"
                    ) {
                      e.preventDefault();
                      handleAddQualification();
                    }
                  }}
                  placeholder="Example: MBBS"
                  className="flex-1 rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none placeholder:text-[#64748B] focus:border-[#00A99D]"
                />

                <button
                  type="button"
                  onClick={
                    handleAddQualification
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00C2B5]"
                >
                  <Plus size={17} />

                  Add
                </button>
              </div>

              {formData.qualifications.length >
                0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {formData.qualifications.map(
                    (qualification) => (
                      <div
                        key={
                          qualification
                        }
                        className="flex items-center gap-2 rounded-xl border border-[#29404F] bg-[#0B1220] px-3 py-2"
                      >
                        <GraduationCap
                          size={15}
                          className="text-[#00C2B5]"
                        />

                        <span className="text-sm text-[#E2E8F0]">
                          {
                            qualification
                          }
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveQualification(
                              qualification
                            )
                          }
                          className="ml-1 text-[#64748B] transition hover:text-red-400"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Experience */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-[#94A3B8]">
                <BriefcaseBusiness
                  size={16}
                />

                Experience
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  name="experience"
                  value={
                    formData.experience
                  }
                  onChange={handleChange}
                  placeholder="Example: 5"
                  className="w-full rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-[#64748B] focus:border-[#00A99D]"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#64748B]">
                  Years
                </span>
              </div>
            </div>

            {/* Consultation Fee */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-[#94A3B8]">
                <DollarSign size={16} />

                Consultation Fee
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                  $
                </span>

                <input
                  type="number"
                  min="0"
                  name="consultationFee"
                  value={
                    formData.consultationFee
                  }
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 pl-9 text-sm text-white outline-none transition placeholder:text-[#64748B] focus:border-[#00A99D]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Available Slots */}

        <div className="mb-6 rounded-2xl border border-[#243247] bg-[#111827] p-5 md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Available Slots
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the time slots when patients can
              book appointments.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Clock3
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
              />

              <input
                type="text"
                value={newSlot}
                onChange={(e) =>
                  setNewSlot(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    e.preventDefault();
                    handleAddSlot();
                  }
                }}
                placeholder="Example: 09:00 AM"
                className="w-full rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 pl-11 text-sm text-white outline-none placeholder:text-[#64748B] focus:border-[#00A99D]"
              />
            </div>

            <button
              type="button"
              onClick={handleAddSlot}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00C2B5]"
            >
              <Plus size={17} />

              Add Slot
            </button>
          </div>

          {formData.availableSlots.length >
          0 ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {formData.availableSlots.map(
                (slot) => (
                  <div
                    key={slot}
                    className="flex items-center gap-2 rounded-xl border border-[#29404F] bg-[#0B1220] px-3 py-2"
                  >
                    <Clock3
                      size={15}
                      className="text-[#00C2B5]"
                    />

                    <span className="text-sm text-[#E2E8F0]">
                      {slot}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveSlot(
                          slot
                        )
                      }
                      className="ml-1 text-[#64748B] transition hover:text-red-400"
                    >
                      <X size={15} />
                    </button>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-[#243247] px-4 py-8 text-center">
              <Clock3
                size={25}
                className="mx-auto mb-2 text-[#64748B]"
              />

              <p className="text-sm text-[#64748B]">
                No available slots added yet.
              </p>
            </div>
          )}
        </div>

        {/* Save */}

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00C2B5] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {saving ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Save size={18} />
            )}

            {saving
              ? "Saving..."
              : doctor
              ? "Save Changes"
              : "Create Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}