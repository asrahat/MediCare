"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Trash2,
  Ban,
  CheckCircle2,
  Shield,
  UserRound,
  Loader2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  deleteUser,
  getAllUsers,
  suspendUser,
  unsuspendUser,
} from "@/lib/actions/adminUser";
import Image from "next/image";

const ManageUsers = () => {
  const { data: session } = authClient.useSession();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [brokenImages, setBrokenImages] = useState({});

  const currentUserId = session?.user?.id;

  // =====================================================
  // GET USER ID
  // =====================================================

  const getUserId = (user) => {
    if (!user) return null;

    if (user.id) {
      return String(user.id);
    }

    if (user._id) {
      return String(user._id);
    }

    return null;
  };

  // =====================================================
  // GET USER IMAGE
  // =====================================================

  const getUserImage = (user) => {
    if (!user) return null;

    const image =
      user.image ||
      user.profileImage ||
      user.photoURL ||
      user.avatar ||
      null;

    if (
      typeof image !== "string" ||
      !image.trim()
    ) {
      return null;
    }

    return image.trim();
  };

  // =====================================================
  // GET USER INITIALS
  // =====================================================

  const getUserInitials = (user) => {
    const name =
      user?.name?.trim();

    if (name) {
      const words = name.split(/\s+/);

      if (words.length >= 2) {
        return (
          words[0].charAt(0) +
          words[words.length - 1].charAt(0)
        ).toUpperCase();
      }

      return name
        .substring(0, 2)
        .toUpperCase();
    }

    const email =
      user?.email?.trim();

    if (email) {
      return email
        .substring(0, 2)
        .toUpperCase();
    }

    return "U";
  };

  // =====================================================
  // IMAGE ERROR HANDLER
  // =====================================================

  const handleImageError = (userId) => {
    if (!userId) return;

    setBrokenImages((prev) => ({
      ...prev,
      [userId]: true,
    }));
  };

  // =====================================================
  // LOAD USERS
  // =====================================================

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const result = await getAllUsers({
        searchValue: search,
        limit: 100,
        offset: 0,
      });

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Failed to load users"
        );
      }

      const loadedUsers =
        result?.data || [];

      console.log(
        "USERS RECEIVED FROM BACKEND:",
        loadedUsers
      );

      loadedUsers.forEach((user) => {
        console.log(
          "USER IMAGE:",
          {
            name: user?.name,
            image: user?.image,
            profileImage:
              user?.profileImage,
            photoURL:
              user?.photoURL,
            avatar:
              user?.avatar,
          }
        );
      });

      setUsers(loadedUsers);

      // Reset broken image state
      setBrokenImages({});
    } catch (error) {
      console.error(
        "Load users error:",
        error
      );

      setError(
        error?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (session?.user) {
      loadUsers();
    }
  }, [session?.user?.id]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = async (e) => {
    e.preventDefault();

    await loadUsers();
  };

  // =====================================================
  // SUSPEND USER
  // =====================================================

  const handleSuspend = async (user) => {
    const userId =
      getUserId(user);

    console.log(
      "SUSPEND USER:",
      user
    );

    console.log(
      "SUSPEND USER ID:",
      userId
    );

    if (!userId) {
      setError(
        "User ID is missing. Please check the user data returned by the backend."
      );

      return;
    }

    if (
      String(userId) ===
      String(currentUserId)
    ) {
      setError(
        "You cannot suspend your own admin account."
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to suspend ${
          user.name ||
          user.email
        }?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(userId);

      setError("");
      setSuccess("");

      console.log(
        "CALLING SUSPEND API WITH:",
        userId
      );

      const result =
        await suspendUser(
          userId
        );

      console.log(
        "SUSPEND API RESULT:",
        result
      );

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Failed to suspend user"
        );
      }

      setUsers((prev) =>
        prev.map((item) => {
          const itemId =
            getUserId(item);

          if (
            String(itemId) ===
            String(userId)
          ) {
            return {
              ...item,
              banned: true,
              banReason:
                "Suspended by administrator",
            };
          }

          return item;
        })
      );

      setSuccess(
        "User suspended successfully."
      );
    } catch (error) {
      console.error(
        "Suspend user error:",
        error
      );

      setError(
        error?.message ||
          "Failed to suspend user"
      );
    } finally {
      setActionId(null);
    }
  };

  // =====================================================
  // UNSUSPEND USER
  // =====================================================

  const handleUnsuspend =
    async (user) => {
      const userId =
        getUserId(user);

      console.log(
        "UNSUSPEND USER:",
        user
      );

      console.log(
        "UNSUSPEND USER ID:",
        userId
      );

      if (!userId) {
        setError(
          "User ID is missing. Please check the user data returned by the backend."
        );

        return;
      }

      try {
        setActionId(userId);

        setError("");
        setSuccess("");

        console.log(
          "CALLING UNSUSPEND API WITH:",
          userId
        );

        const result =
          await unsuspendUser(
            userId
          );

        console.log(
          "UNSUSPEND API RESULT:",
          result
        );

        if (!result?.success) {
          throw new Error(
            result?.message ||
              "Failed to unsuspend user"
          );
        }

        setUsers((prev) =>
          prev.map((item) => {
            const itemId =
              getUserId(item);

            if (
              String(itemId) ===
              String(userId)
            ) {
              return {
                ...item,
                banned: false,
                banReason: null,
              };
            }

            return item;
          })
        );

        setSuccess(
          "User unsuspended successfully."
        );
      } catch (error) {
        console.error(
          "Unsuspend user error:",
          error
        );

        setError(
          error?.message ||
            "Failed to unsuspend user"
        );
      } finally {
        setActionId(null);
      }
    };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = async (user) => {
    const userId =
      getUserId(user);

    console.log(
      "DELETE USER:",
      user
    );

    console.log(
      "DELETE USER ID:",
      userId
    );

    if (!userId) {
      setError(
        "User ID is missing. Please check the user data returned by the backend."
      );

      return;
    }

    if (
      String(userId) ===
      String(currentUserId)
    ) {
      setError(
        "You cannot delete your own admin account."
      );

      return;
    }

    const confirmed =
      window.confirm(
        `WARNING: This will permanently delete ${
          user.name ||
          user.email
        } from the authentication database.

This action cannot be undone.

Continue?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(userId);

      setError("");
      setSuccess("");

      console.log(
        "CALLING DELETE API WITH:",
        userId
      );

      const result =
        await deleteUser(
          userId
        );

      console.log(
        "DELETE API RESULT:",
        result
      );

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Failed to delete user"
        );
      }

      setUsers((prev) =>
        prev.filter((item) => {
          const itemId =
            getUserId(item);

          return (
            String(itemId) !==
            String(userId)
          );
        })
      );

      setSuccess(
        "User permanently deleted from the database."
      );
    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );

      setError(
        error?.message ||
          "Failed to delete user"
      );
    } finally {
      setActionId(null);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#080D19] px-4 py-6 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00A99D]/10">

                <Shield
                  size={20}
                  className="text-[#00C2B5]"
                />

              </div>

              <h1 className="text-2xl font-bold">
                Manage Users
              </h1>

            </div>

            <p className="text-sm text-[#94A3B8]">
              View and manage all registered
              MediCare users.
            </p>

          </div>

          <button
            type="button"
            onClick={loadUsers}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#243247] bg-[#111827] px-4 py-2.5 text-sm font-semibold text-[#E2E8F0] transition hover:border-[#00A99D]/50 hover:bg-[#0B1220] disabled:cursor-not-allowed disabled:opacity-50"
          >

            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">

            <AlertTriangle size={18} />

            <span>
              {error}
            </span>

          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">

            <CheckCircle2 size={18} />

            <span>
              {success}
            </span>

          </div>
        )}

        {/* =================================================
            SEARCH
        ================================================= */}

        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search users by name or email..."
              className="w-full rounded-xl border border-[#243247] bg-[#111827] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#64748B] focus:border-[#00A99D]"
            />

          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#00A99D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00B8AA]"
          >
            Search
          </button>

        </form>

        {/* =================================================
            USERS TABLE
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-[#243247] bg-[#111827]">

          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className="hidden border-b border-[#243247] bg-[#0B1220] px-6 py-4 lg:grid lg:grid-cols-[2fr_2fr_1fr_1fr_1.5fr] lg:gap-4">

            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              User
            </p>

            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Email
            </p>

            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Role
            </p>

            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Status
            </p>

            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Actions
            </p>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="flex min-h-60 items-center justify-center">

              <div className="flex items-center gap-3 text-[#94A3B8]">

                <Loader2
                  size={22}
                  className="animate-spin text-[#00C2B5]"
                />

                Loading users...

              </div>

            </div>

          ) : users.length === 0 ? (

            /* =================================================
                NO USERS
            ================================================= */

            <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">

              <UserRound
                size={40}
                className="mb-3 text-[#475569]"
              />

              <h3 className="font-semibold text-white">
                No users found
              </h3>

              <p className="mt-1 text-sm text-[#64748B]">
                There are no users matching
                your search.
              </p>

            </div>

          ) : (

            /* =================================================
                USER LIST
            ================================================= */

            <div className="divide-y divide-[#243247]">

              {users.map((user) => {

                const userId =
                  getUserId(user);

                const userImage =
                  getUserImage(user);

                const initials =
                  getUserInitials(user);

                const imageBroken =
                  Boolean(
                    brokenImages[userId]
                  );

                const isCurrentUser =
                  String(userId) ===
                  String(
                    currentUserId
                  );

                const isActionLoading =
                  String(actionId) ===
                  String(userId);

                return (
                  <div
                    key={
                      userId ||
                      `${user.email}-${user.name}`
                    }
                    className="px-6 py-5 transition hover:bg-white/[0.02]"
                  >

                    <div className="grid items-center gap-4 lg:grid-cols-[2fr_2fr_1fr_1fr_1.5fr]">

                      {/* =================================================
                          USER
                      ================================================= */}

                      <div className="flex items-center gap-3">

                        {/* PROFILE IMAGE */}

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#29404F] bg-[#0B1220]">

                          {userImage &&
                          !imageBroken ? (

                            <Image
                            width={18}
                            height={18}
                              src={userImage}
                              alt={
                                user.name ||
                                "User"
                              }
                              className="h-full w-full object-cover"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={() =>
                                handleImageError(
                                  userId
                                )
                              }
                            />

                          ) : (

                            <span className="text-sm font-bold text-[#00C2B5]">
                              {initials}
                            </span>

                          )}

                        </div>

                        {/* USER INFORMATION */}

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-white">
                            {user.name ||
                              "Unnamed User"}
                          </p>

                          <p className="truncate text-xs text-[#64748B]">
                            ID:{" "}
                            {userId ||
                              "No ID"}
                          </p>

                        </div>

                      </div>

                      {/* =================================================
                          EMAIL
                      ================================================= */}

                      <div className="min-w-0 text-sm text-[#CBD5E1]">

                        <p className="truncate">
                          {user.email ||
                            "No email"}
                        </p>

                      </div>

                      {/* =================================================
                          ROLE
                      ================================================= */}

                      <div>

                        <span
                          className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold uppercase ${
                            user.role ===
                            "admin"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : user.role ===
                                "doctor"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-[#00A99D]/10 text-[#00C2B5]"
                          }`}
                        >
                          {user.role ||
                            "patient"}
                        </span>

                      </div>

                      {/* =================================================
                          STATUS
                      ================================================= */}

                      <div>

                        {user.banned ? (

                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400">

                            <Ban size={12} />

                            Suspended

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">

                            <CheckCircle2
                              size={12}
                            />

                            Active

                          </span>

                        )}

                      </div>

                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <div className="flex flex-wrap gap-2">

                        {/* SUSPEND / UNSUSPEND */}

                        {user.banned ? (

                          <button
                            type="button"
                            onClick={() =>
                              handleUnsuspend(
                                user
                              )
                            }
                            disabled={
                              !userId ||
                              isActionLoading ||
                              isCurrentUser
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                          >

                            {isActionLoading ? (

                              <Loader2
                                size={14}
                                className="animate-spin"
                              />

                            ) : (

                              <CheckCircle2
                                size={14}
                              />

                            )}

                            Unsuspend

                          </button>

                        ) : (

                          <button
                            type="button"
                            onClick={() =>
                              handleSuspend(
                                user
                              )
                            }
                            disabled={
                              !userId ||
                              isActionLoading ||
                              isCurrentUser
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-400 transition hover:bg-orange-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                          >

                            {isActionLoading ? (

                              <Loader2
                                size={14}
                                className="animate-spin"
                              />

                            ) : (

                              <Ban size={14} />

                            )}

                            Suspend

                          </button>

                        )}

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              user
                            )
                          }
                          disabled={
                            !userId ||
                            isActionLoading ||
                            isCurrentUser
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                        >

                          {isActionLoading ? (

                            <Loader2
                              size={14}
                              className="animate-spin"
                            />

                          ) : (

                            <Trash2
                              size={14}
                            />

                          )}

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>

        {/* =================================================
            INFORMATION
        ================================================= */}

        <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B]">

          <Shield size={14} />

          <span>
            Suspended users cannot sign in.
            Deleted users are permanently
            removed from the authentication
            database.
          </span>

        </div>

      </div>

    </div>
  );
};

export default ManageUsers;