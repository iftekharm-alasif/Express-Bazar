"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { authClient } from "../lib/auth-client";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
};

const SignUpPage = () => {
  const handelingSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user: SignUpFormData = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      imageUrl: String(formData.get("imageUrl") || ""),
    };

    try {
      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.imageUrl || undefined,
        callbackURL: "/",
      });

   if (error) {
  console.log(error);
  return;
}

if (data) {
  window.location.href = "/";
}
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 sm:p-8">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 block text-center text-2xl font-bold text-gray-900"
        >
          Express <span className="text-[#008744]">Bazar</span>
        </Link>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Express Bazar-এর সঙ্গে যাত্রা শুরু করুন
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handelingSignUp} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="আপনার পুরো নাম লিখুন"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#008744] focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#008744] focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#008744] focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Profile Image{" "}
              <span className="text-gray-400">(Optional)</span>
            </label>

            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-green-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#008744] hover:file:bg-green-200 focus:border-[#008744] focus:ring-4 focus:ring-green-100"
            />

            <div className="my-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/profile.jpg"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#008744] focus:bg-white focus:ring-4 focus:ring-green-100"
            />

            <p className="mt-2 text-xs text-gray-400">
              ছবি upload করুন অথবা image link দিন। দুটোই optional।
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#008744] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007038] hover:shadow-md active:translate-y-0"
          >
            Create Account
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-7 text-center text-sm text-gray-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#008744] transition-colors hover:text-[#006b35]"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-gray-400">
          প্রতিদিনের বাজারদর, এক জায়গায়।
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;