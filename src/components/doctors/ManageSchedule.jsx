"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Edit3,
  Plus,
  Trash2,
  X,
  Loader2,
  Save,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  getDoctorSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "@/lib/actions/schedule";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TIME_SLOTS = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
];

const emptyForm = {
  day: "",
  slots: [],
};

export default function ManageSchedule() {
  const { data: session } = authClient.useSession();

  const doctorId = session?.user?.id;

  const [schedules, setSchedules] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingSchedule, setEditingSchedule] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!doctorId) return;

    loadSchedules();
  }, [doctorId]);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getDoctorSchedules(doctorId);

      setSchedules(result?.data || []);
    } catch (error) {
      console.error(error);

      setError(
        error?.message || "Failed to load schedules"
      );
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingSchedule(null);

    setForm({
      day: "",
      slots: [],
    });

    setError("");
    setSuccess("");

    setModalOpen(true);
  };

  const openEditModal = (schedule) => {
    setEditingSchedule(schedule);

    setForm({
      day: schedule.day,
      slots: schedule.slots || [],
    });

    setError("");
    setSuccess("");

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingSchedule(null);

    setForm(emptyForm);
  };

  const handleSlotChange = (slot) => {
    setForm((prev) => {
      const exists = prev.slots.includes(slot);

      return {
        ...prev,
        slots: exists
          ? prev.slots.filter((item) => item !== slot)
          : [...prev.slots, slot],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.day) {
      setError("Please select a day.");
      return;
    }

    if (form.slots.length === 0) {
      setError("Please select at least one time slot.");
      return;
    }

    try {
      setSaving(true);

      if (editingSchedule) {
        await updateSchedule(editingSchedule._id, {
          day: form.day,
          slots: form.slots,
        });

        setSuccess("Schedule updated successfully.");
      } else {
        await createSchedule({
          doctorId,
          day: form.day,
          slots: form.slots,
        });

        setSuccess("Schedule added successfully.");
      }

      await loadSchedules();

      setModalOpen(false);

      setEditingSchedule(null);

      setForm(emptyForm);
    } catch (error) {
      console.error(error);

      setError(
        error?.message || "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this schedule?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      await deleteSchedule(id);

      setSchedules((prev) =>
        prev.filter((schedule) => schedule._id !== id)
      );

      setSuccess("Schedule removed successfully.");
    } catch (error) {
      console.error(error);

      setError(
        error?.message || "Failed to remove schedule."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getDayIndex = (day) => {
    return DAYS.indexOf(day);
  };

  const sortedSchedules = [...schedules].sort(
    (a, b) => getDayIndex(a.day) - getDayIndex(b.day)
  );

  if (!doctorId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin text-[#00C2B5]" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080D19] p-4 text-white md:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <CalendarDays
              size={24}
              className="text-[#00C2B5]"
            />

            <span className="text-sm font-medium text-[#00C2B5]">
              Doctor Dashboard
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Manage Schedule
          </h1>

          <p className="mt-2 text-sm text-[#94A3B8]">
            Manage your available days and consultation time slots.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00C2B5]"
        >
          <Plus size={18} />
          Add Schedule
        </button>
      </div>

      {/* Messages */}
      {success && (
        <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {error && !modalOpen && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-[350px] items-center justify-center">
          <div className="flex items-center gap-3 text-[#94A3B8]">
            <Loader2
              size={24}
              className="animate-spin text-[#00C2B5]"
            />

            Loading schedules...
          </div>
        </div>
      ) : schedules.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-[#243247] bg-[#111827] p-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00C2B5]/10">
            <CalendarDays
              size={30}
              className="text-[#00C2B5]"
            />
          </div>

          <h2 className="text-xl font-semibold">
            No schedules yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-[#94A3B8]">
            Add your available days and consultation time slots so
            patients can book appointments with you.
          </p>

          <button
            onClick={openAddModal}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00A99D] px-5 py-3 text-sm font-semibold transition hover:bg-[#00C2B5]"
          >
            <Plus size={18} />
            Add Your First Schedule
          </button>
        </div>
      ) : (
        /* Schedule Cards */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {sortedSchedules.map((schedule) => (
            <div
              key={schedule._id}
              className="rounded-2xl border border-[#243247] bg-[#111827] p-5 transition hover:border-[#29404F]"
            >
              {/* Card Header */}
              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00C2B5]/10">
                    <CalendarDays
                      size={21}
                      className="text-[#00C2B5]"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {schedule.day}
                    </h3>

                    <p className="text-xs text-[#64748B]">
                      {schedule.slots?.length || 0} time slots
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">

                  <button
                    onClick={() => openEditModal(schedule)}
                    className="rounded-lg p-2 text-[#94A3B8] transition hover:bg-[#0B1220] hover:text-[#00C2B5]"
                    title="Edit schedule"
                  >
                    <Edit3 size={17} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(schedule._id)
                    }
                    disabled={deletingId === schedule._id}
                    className="rounded-lg p-2 text-[#94A3B8] transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    title="Remove schedule"
                  >
                    {deletingId === schedule._id ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={17} />
                    )}
                  </button>

                </div>
              </div>

              {/* Slots */}
              <div className="space-y-2">

                <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#64748B]">
                  <Clock3 size={14} />
                  Available Slots
                </div>

                <div className="flex flex-wrap gap-2">

                  {schedule.slots?.map((slot) => (
                    <span
                      key={slot}
                      className="rounded-lg border border-[#29404F] bg-[#0B1220] px-3 py-2 text-xs font-medium text-[#E2E8F0]"
                    >
                      {slot}
                    </span>
                  ))}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-[#243247] bg-[#111827] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#243247] px-5 py-4">

              <div>
                <h2 className="text-lg font-semibold">
                  {editingSchedule
                    ? "Update Schedule"
                    : "Add Schedule"}
                </h2>

                <p className="mt-1 text-xs text-[#64748B]">
                  Select a day and your available consultation slots.
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-[#94A3B8] transition hover:bg-[#0B1220] hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(90vh-140px)] overflow-y-auto p-5"
            >

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Day */}
              <div className="mb-6">

                <label className="mb-2 block text-sm font-medium text-[#E2E8F0]">
                  Available Day
                </label>

                <select
                  value={form.day}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      day: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#29404F] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00C2B5]"
                >
                  <option value="">
                    Select a day
                  </option>

                  {DAYS.map((day) => (
                    <option
                      key={day}
                      value={day}
                    >
                      {day}
                    </option>
                  ))}
                </select>

              </div>

              {/* Time Slots */}
              <div>

                <div className="mb-3 flex items-center justify-between">

                  <label className="text-sm font-medium text-[#E2E8F0]">
                    Consultation Time Slots
                  </label>

                  <span className="text-xs text-[#00C2B5]">
                    {form.slots.length} selected
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">

                  {TIME_SLOTS.map((slot) => {
                    const selected =
                      form.slots.includes(slot);

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() =>
                          handleSlotChange(slot)
                        }
                        className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition ${
                          selected
                            ? "border-[#00C2B5] bg-[#00C2B5]/15 text-[#00C2B5]"
                            : "border-[#29404F] bg-[#0B1220] text-[#94A3B8] hover:border-[#00A99D] hover:text-white"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}

                </div>

              </div>

              {/* Footer */}
              <div className="mt-7 flex justify-end gap-3 border-t border-[#243247] pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-[#29404F] px-5 py-2.5 text-sm font-medium text-[#94A3B8] transition hover:bg-[#0B1220] hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-[#00A99D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00C2B5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      {editingSchedule ? (
                        <Save size={17} />
                      ) : (
                        <Plus size={17} />
                      )}

                      {editingSchedule
                        ? "Update Schedule"
                        : "Add Schedule"}
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}