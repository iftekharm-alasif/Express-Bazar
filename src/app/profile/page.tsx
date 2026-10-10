"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  UserRound,
  Mail,
  ShieldCheck,
  Pencil,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "../lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  const handleEditProfile = () => {
    setName(user?.name || "");
    setImageUrl(user?.image || "");
    setImageError(false);
    setPreviewError(false);
    setMessage("");
    setIsError(false);
    setIsEditing(true);
  };

  const handleUpdateProfile = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter your name.");
      setIsError(true);
      return;
    }

    setIsSaving(true);
    setMessage("");
    setIsError(false);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || null,
      });

      if (error) {
        setMessage(error.message || "Profile update failed.");
        setIsError(true);
        return;
      }

      setImageError(false);
      setPreviewError(false);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      setMessage("Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setIsSaving(false);
    }
  };

  // Session check cholakalin loading dekhabe
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-[#008744]" />
      </div>
    );
  }

  // Login kora na thakle kono section dekhabe na
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50/80 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-7">
          <p className="text-sm font-bold tracking-widest text-[#008744]">
            BAZAR EXPRESS
          </p>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
          <div className="h-28 bg-gradient-to-r from-[#006b36] via-[#008744] to-[#21a366] sm:h-36" />

          <div className="px-5 pb-7 sm:px-8 sm:pb-9">
            <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-sm">
                {user.image && !imageError ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#008744] text-4xl font-bold text-white">
                    {initial}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isEditing) {
                    setIsEditing(false);
                    setMessage("");
                  } else {
                    handleEditProfile();
                  }
                }}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#008744] hover:bg-green-50 hover:text-[#008744]"
              >
                <Pencil size={16} />
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>

            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {user.name || "User"}
                </h2>

                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-[#008744]">
                  <ShieldCheck size={14} />
                  Customer
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Welcome to Bazar Express!
              </p>
            </div>

            {message && (
              <div
                className={`mt-5 flex items-start gap-2 rounded-lg p-3 text-sm ${
                  isError
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {!isError && (
                  <CheckCircle2 size={18} className="shrink-0" />
                )}
                <p>{message}</p>
              </div>
            )}

            {isEditing && (
              <form
                onSubmit={handleUpdateProfile}
                className="mt-7 space-y-5 rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:p-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Your Profile
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your name and profile picture.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#008744] focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="imageUrl"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Profile Image URL
                  </label>

                  <input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setPreviewError(false);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#008744] focus:ring-2 focus:ring-green-100"
                  />

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Paste a direct image URL. Leave it empty to remove your
                    current profile picture.
                  </p>

                  {imageUrl.trim() && (
                    <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                      {previewError ? (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                          <UserRound size={24} />
                        </div>
                      ) : (
                        <img
                          src={imageUrl}
                          alt="Image preview"
                          referrerPolicy="no-referrer"
                          onError={() => setPreviewError(true)}
                          onLoad={() => setPreviewError(false)}
                          className="h-14 w-14 shrink-0 rounded-lg border border-gray-100 object-cover"
                        />
                      )}

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Image Preview
                        </p>
                        <p className="text-xs text-gray-500">
                          {previewError
                            ? "This image URL could not be loaded."
                            : "Preview of your profile picture."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#008744] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#007038] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving && (
                      <span className="loading loading-spinner loading-sm" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setMessage("");
                    }}
                    disabled={isSaving}
                    className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="my-7 border-t border-gray-100" />

            <section>
              <h3 className="text-base font-semibold text-gray-900">
                Personal Information
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <UserRound size={17} />
                    <span className="text-sm">Full Name</span>
                  </div>

                  <p className="mt-3 break-words text-sm font-semibold text-gray-900">
                    {user.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail size={17} />
                    <span className="text-sm">Email Address</span>
                  </div>

                  <p className="mt-3 break-all text-sm font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-8 border-t border-gray-100 pt-5">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#008744]"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;