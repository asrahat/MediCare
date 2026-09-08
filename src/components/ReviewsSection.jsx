"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Plus,
  Pencil,
  Trash2,
  X,
  Stethoscope,
  MessageSquare,
  ChevronDown,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Button, Select, Label, ListBox } from "@heroui/react";

import { getDoctors } from "@/lib/api/doctors";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "@/lib/api/reviews";

// =====================================================
// Rating Stars
// =====================================================

const RatingStars = ({
  value = 0,
  interactive = false,
  onChange,
  size = 20,
}) => {
  const rating = Number(value) || 0;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating;

        if (interactive) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange?.(star)}
              aria-label={`Rate ${star} star${
                star > 1 ? "s" : ""
              }`}
              className="rounded-lg p-1 transition-all duration-200 hover:scale-110 hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
            >
              <Star
                size={size}
                strokeWidth={1.8}
                className={
                  filled
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-zinc-600"
                }
              />
            </button>
          );
        }

        return (
          <Star
            key={star}
            size={size}
            strokeWidth={1.8}
            className={
              filled
                ? "fill-yellow-400 text-yellow-400"
                : "text-zinc-700"
            }
          />
        );
      })}
    </div>
  );
};

// =====================================================
// Main Component
// =====================================================

export default function ReviewsSection() {
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const [formData, setFormData] = useState({
    doctorId: "",
    rating: 0,
    comment: "",
  });

  // =====================================================
  // Reset Form
  // =====================================================

  const resetForm = () => {
    setFormData({
      doctorId: "",
      rating: 0,
      comment: "",
    });

    setEditingReview(null);
  };

  // =====================================================
  // Load Reviews
  // =====================================================

  const loadReviews = async () => {
    try {
      const response = await getReviews();

      console.log("Reviews response:", response);

      const reviewList =
        response?.data ||
        response?.reviews ||
        [];

      setReviews(Array.isArray(reviewList) ? reviewList : []);
    } catch (error) {
      console.error("Failed to load reviews:", error);
    }
  };

  // =====================================================
  // Load Doctors
  // =====================================================

  const loadDoctors = async () => {
    try {
      const response = await getDoctors();

      console.log("Doctors response:", response);

      const doctorList =
        response?.data ||
        response?.doctors ||
        [];

      setDoctors(
        Array.isArray(doctorList)
          ? doctorList
          : []
      );
    } catch (error) {
      console.error("Failed to load doctors:", error);
    }
  };

  // =====================================================
  // Initial Load
  // =====================================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        await Promise.all([
          loadDoctors(),
          loadReviews(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // =====================================================
  // Escape Key
  // =====================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !submitting) {
        handleCloseModal();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, submitting]);

  // =====================================================
  // Open Create
  // =====================================================

  const handleOpenCreate = () => {
    resetForm();
    setIsOpen(true);
  };

  // =====================================================
  // Open Edit
  // =====================================================

  const handleOpenEdit = (review) => {
    console.log("Editing review:", review);

    setEditingReview(review);

    setFormData({
      doctorId: review?.doctorId
        ? String(review.doctorId)
        : "",
      rating: Number(review?.rating) || 0,
      comment: review?.comment || "",
    });

    setIsOpen(true);
  };

  // =====================================================
  // Close Modal
  // =====================================================

  const handleCloseModal = () => {
    if (submitting) return;

    setIsOpen(false);

    resetForm();
  };

  // =====================================================
  // Backdrop Click
  // =====================================================

  const handleBackdropClick = (event) => {
    if (
      event.target === event.currentTarget &&
      !submitting
    ) {
      handleCloseModal();
    }
  };

  // =====================================================
  // Submit Review
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    const doctorId = String(
      formData.doctorId || ""
    ).trim();

    const rating = Number(formData.rating);

    const comment = String(
      formData.comment || ""
    ).trim();

    // -----------------------------
    // Validation
    // -----------------------------

    if (!doctorId) {
      alert("Please select a doctor.");
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      alert("Please select a rating from 1 to 5.");
      return;
    }

    if (!comment) {
      alert("Please write your review.");
      return;
    }

    if (comment.length > 500) {
      alert(
        "Review cannot be longer than 500 characters."
      );
      return;
    }

    // -----------------------------
    // Payload
    // -----------------------------

    const payload = {
      doctorId,
      rating,
      comment,
    };

    console.log("Review payload:", payload);

    try {
      setSubmitting(true);

      // =================================================
      // UPDATE
      // =================================================

      if (editingReview?._id) {
        const reviewId = String(
          editingReview._id
        );

        console.log(
          "Updating review:",
          reviewId
        );

        const response = await updateReview(
          reviewId,
          payload
        );

        console.log(
          "Update review response:",
          response
        );

        // Always refresh from backend
        // so UI represents database state.
        await loadReviews();

        setIsOpen(false);
        resetForm();

        alert("Review updated successfully.");

        return;
      }

      // =================================================
      // CREATE
      // =================================================

      console.log("Creating review:", payload);

      const response = await createReview(
        payload
      );

      console.log(
        "Create review response:",
        response
      );

      // Always reload after create.
      await loadReviews();

      setIsOpen(false);
      resetForm();

      alert("Review published successfully.");
    } catch (error) {
      console.error(
        "Review submit error:",
        error
      );

      alert(
        error?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // Delete Review
  // =====================================================

  const handleDelete = async (reviewId) => {
    if (!reviewId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(reviewId);

      console.log(
        "Deleting review:",
        reviewId
      );

      await deleteReview(String(reviewId));

      setReviews((prev) =>
        prev.filter(
          (review) =>
            String(review._id) !==
            String(reviewId)
        )
      );

      alert("Review deleted successfully.");
    } catch (error) {
      console.error(
        "Delete review error:",
        error
      );

      alert(
        error?.message ||
          "Failed to delete review."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // Find Doctor
  // =====================================================

  const getDoctor = (doctorId) => {
    if (!doctorId) return null;

    return doctors.find(
      (doctor) =>
        String(doctor._id) ===
        String(doctorId)
    );
  };

  // =====================================================
  // Get Selected Doctor
  // =====================================================

  const selectedDoctor = getDoctor(
    formData.doctorId
  );

  // =====================================================
  // Verified Doctors
  // =====================================================

  const verifiedDoctors = doctors.filter(
    (doctor) =>
      doctor.verificationStatus === "verified"
  );

  // =====================================================
  // Loading UI
  // =====================================================

  if (loading) {
    return (
      <section className="w-full bg-zinc-950 py-12 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-8 w-44 animate-pulse rounded-lg bg-zinc-800" />
              <div className="h-4 w-72 animate-pulse rounded bg-zinc-900" />
            </div>

            <div className="h-11 w-40 animate-pulse rounded-xl bg-zinc-900" />
          </div>

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-2xl border border-zinc-900 bg-zinc-900/70"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <section className="min-h-screen w-full bg-zinc-950 py-12 text-zinc-100">
        <div className="mx-auto max-w-5xl px-6">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10">
                  <MessageSquare
                    size={19}
                    className="text-purple-400"
                  />
                </div>

                <span className="text-sm font-medium text-purple-400">
                  Your Feedback
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                My Reviews
              </h2>

              <p className="mt-2 text-zinc-500">
                Share your experience and help others
                choose the right doctor.
              </p>
            </div>

            <Button
              onPress={handleOpenCreate}
              className="group h-11 rounded-xl bg-purple-600 px-5 font-medium text-white shadow-lg shadow-purple-600/10 transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-purple-600/20"
            >
              <Plus
                size={18}
                className="transition-transform group-hover:rotate-90"
              />
              Write New Review
            </Button>
          </div>

          {/* =================================================
              SUMMARY CARD
          ================================================= */}

          {reviews.length > 0 && (
            <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-gradient-to-r from-purple-500/[0.07] to-zinc-900/60 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10">
                  <Star
                    size={23}
                    className="fill-yellow-400 text-yellow-400"
                  />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Your Reviews
                  </p>

                  <p className="text-sm text-zinc-500">
                    {reviews.length}{" "}
                    {reviews.length === 1
                      ? "review"
                      : "reviews"}{" "}
                    shared
                  </p>
                </div>
              </div>

              <div className="text-sm text-zinc-500">
                Keep sharing your experience with
                your healthcare providers.
              </div>
            </div>
          )}

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {reviews.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-10 text-center sm:p-14">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-600/10 blur-3xl" />

              <div className="relative mx-auto flex max-w-md flex-col items-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
                  <MessageSquare
                    size={29}
                    className="text-purple-400"
                  />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  No reviews yet
                </h3>

                <p className="mt-2 leading-6 text-zinc-500">
                  You have not shared any feedback yet.
                  Tell others about your experience
                  with your doctor.
                </p>

                <Button
                  onPress={handleOpenCreate}
                  className="mt-6 rounded-xl bg-purple-600 px-5 text-white hover:bg-purple-500"
                >
                  <Plus size={18} />
                  Write Your First Review
                </Button>
              </div>
            </div>
          ) : (
            /* =================================================
                REVIEW LIST
            ================================================= */

            <div className="space-y-5">
              {reviews.map((review) => {
                const doctor = getDoctor(
                  review.doctorId
                );

                const reviewId = review._id;

                return (
                  <article
                    key={reviewId}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    {/* Top accent */}

                    <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-purple-500 via-purple-500/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    {/* Doctor + Actions */}

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-center gap-4">
                        {doctor?.profileImage ? (
                          <img
                            src={doctor.profileImage}
                            alt={
                              doctor.doctorName ||
                              "Doctor"
                            }
                            className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-1 ring-zinc-800"
                          />
                        ) : (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-800 ring-1 ring-zinc-700">
                            <Stethoscope
                              size={24}
                              className="text-zinc-500"
                            />
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-semibold text-white">
                            {doctor?.doctorName ||
                              review.doctorName ||
                              "Doctor"}
                          </h3>

                          <p className="mt-0.5 text-sm text-zinc-500">
                            {doctor?.specialization ||
                              review.specialization ||
                              "Medical Specialist"}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEdit(review)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
                          aria-label="Edit review"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(reviewId)
                          }
                          disabled={
                            deletingId === reviewId
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label="Delete review"
                        >
                          {deletingId === reviewId ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Divider */}

                    <div className="my-5 h-px bg-zinc-800/80" />

                    {/* Rating */}

                    <div className="flex items-center gap-3">
                      <RatingStars
                        value={review.rating}
                        size={18}
                      />

                      <span className="rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Comment */}

                    <p className="mt-4 text-[15px] leading-7 text-zinc-300">
                      {review.comment}
                    </p>

                    {/* Date */}

                    {review.createdAt && (
                      <p className="mt-4 text-xs text-zinc-600">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CUSTOM MODAL
      ===================================================== */}

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onMouseDown={handleBackdropClick}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="relative overflow-hidden border-b border-zinc-800 px-6 py-6">
              <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                    {editingReview ? (
                      <Pencil
                        size={20}
                        className="text-purple-400"
                      />
                    ) : (
                      <Sparkles
                        size={20}
                        className="text-purple-400"
                      />
                    )}
                  </div>

                  <div>
                    <h2
                      id="review-modal-title"
                      className="text-xl font-bold text-white"
                    >
                      {editingReview
                        ? "Update Your Review"
                        : "Write a Review"}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      {editingReview
                        ? "Make changes to your feedback."
                        : "Share your experience with a doctor."}
                    </p>
                  </div>
                </div>

                {/* Native button.
                    No HeroUI Dialog here. */}

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  aria-label="Close modal"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* =================================================
                FORM BODY
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="overflow-y-auto px-6 py-6">
                <div className="space-y-7">

                  {/* =================================================
                      DOCTOR SELECT
                  ================================================= */}

                  <div>
                    <Label className="mb-2 block text-sm font-medium text-zinc-300">
                      Doctor
                    </Label>

                    <Select
                      selectedKey={
                        formData.doctorId || null
                      }
                      onSelectionChange={(key) => {
                        const doctorId = key
                          ? String(key)
                          : "";

                        setFormData((prev) => ({
                          ...prev,
                          doctorId,
                        }));
                      }}
                      isDisabled={submitting}
                    >
                      <Select.Trigger className="h-14 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-left text-white transition hover:border-zinc-700">
                        <Select.Value>
                          {() => {
                            if (!selectedDoctor) {
                              return (
                                <span className="text-zinc-500">
                                  Select a doctor
                                </span>
                              );
                            }

                            return (
                              <div className="flex items-center gap-3">
                                {selectedDoctor.profileImage ? (
                                  <img
                                    src={
                                      selectedDoctor.profileImage
                                    }
                                    alt=""
                                    className="h-8 w-8 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
                                    <Stethoscope
                                      size={15}
                                      className="text-zinc-500"
                                    />
                                  </div>
                                )}

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-white">
                                    {
                                      selectedDoctor.doctorName
                                    }
                                  </p>

                                  <p className="truncate text-xs text-zinc-500">
                                    {
                                      selectedDoctor.specialization
                                    }
                                  </p>
                                </div>
                              </div>
                            );
                          }}
                        </Select.Value>

                        <Select.Indicator>
                          <ChevronDown
                            size={17}
                          />
                        </Select.Indicator>
                      </Select.Trigger>

                      <Select.Popover className="max-h-72 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                        <ListBox>
                          {verifiedDoctors.length ===
                          0 ? (
                            <div className="px-4 py-5 text-center text-sm text-zinc-500">
                              No verified doctors
                              available.
                            </div>
                          ) : (
                            verifiedDoctors.map(
                              (doctor) => (
                                <ListBox.Item
                                  key={doctor._id}
                                  id={String(
                                    doctor._id
                                  )}
                                  textValue={
                                    doctor.doctorName
                                  }
                                  className="rounded-lg"
                                >
                                  <div className="flex w-full items-center gap-3 py-1">
                                    {doctor.profileImage ? (
                                      <img
                                        src={
                                          doctor.profileImage
                                        }
                                        alt=""
                                        className="h-9 w-9 rounded-lg object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
                                        <Stethoscope
                                          size={16}
                                          className="text-zinc-500"
                                        />
                                      </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-white">
                                        {
                                          doctor.doctorName
                                        }
                                      </p>

                                      <p className="truncate text-xs text-zinc-500">
                                        {
                                          doctor.specialization
                                        }
                                      </p>
                                    </div>

                                    <ListBox.ItemIndicator>
                                      <Check
                                        size={17}
                                        className="text-purple-400"
                                      />
                                    </ListBox.ItemIndicator>
                                  </div>
                                </ListBox.Item>
                              )
                            )
                          )}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* =================================================
                      RATING
                  ================================================= */}

                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-zinc-300">
                        Your Rating
                      </Label>

                      {formData.rating > 0 && (
                        <span className="text-xs text-zinc-500">
                          {formData.rating === 5
                            ? "Excellent"
                            : formData.rating === 4
                            ? "Very Good"
                            : formData.rating === 3
                            ? "Good"
                            : formData.rating === 2
                            ? "Fair"
                            : "Poor"}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                      <div className="flex items-center justify-between">
                        <RatingStars
                          value={
                            formData.rating
                          }
                          interactive
                          size={31}
                          onChange={(rating) => {
                            if (!submitting) {
                              setFormData(
                                (prev) => ({
                                  ...prev,
                                  rating,
                                })
                              );
                            }
                          }}
                        />

                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">
                            {formData.rating ||
                              "—"}
                          </span>

                          <span className="text-sm text-zinc-600">
                            /5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      COMMENT
                  ================================================= */}

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label
                        htmlFor="review-comment"
                        className="text-sm font-medium text-zinc-300"
                      >
                        Your Review
                      </Label>

                      <span
                        className={`text-xs ${
                          formData.comment.length >
                          450
                            ? "text-yellow-400"
                            : "text-zinc-600"
                        }`}
                      >
                        {formData.comment.length}/500
                      </span>
                    </div>

                    <textarea
                      id="review-comment"
                      value={formData.comment}
                      onChange={(event) => {
                        const value =
                          event.target.value;

                        if (value.length <= 500) {
                          setFormData((prev) => ({
                            ...prev,
                            comment: value,
                          }));
                        }
                      }}
                      rows={6}
                      disabled={submitting}
                      placeholder="Tell us about your experience with this doctor..."
                      className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 hover:border-zinc-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  {/* Selected doctor preview */}

                  {selectedDoctor && (
                    <div className="flex items-center gap-3 rounded-xl border border-purple-500/10 bg-purple-500/[0.04] p-3">
                      {selectedDoctor.profileImage ? (
                        <img
                          src={
                            selectedDoctor.profileImage
                          }
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                          <Stethoscope
                            size={17}
                            className="text-zinc-500"
                          />
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-medium text-white">
                          {selectedDoctor.doctorName}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {
                            selectedDoctor.specialization
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-5">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submitting}
                    className="h-11 rounded-xl border border-zinc-800 bg-zinc-900 px-5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/10 transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                        {editingReview
                          ? "Updating..."
                          : "Publishing..."}
                      </>
                    ) : (
                      <>
                        {editingReview ? (
                          <Pencil size={17} />
                        ) : (
                          <Plus size={17} />
                        )}

                        {editingReview
                          ? "Update Review"
                          : "Publish Review"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}