"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

type SignInFormData = {
  email: string;
  password: string;
};

type SocialProvider = "google" | "github";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(
    null,
  );

  const handelingSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user: SignInFormData = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success("Sign-in successful!");
        window.location.href = "/";
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: SocialProvider) => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message);
        setSocialLoading(null);
      }
    } catch {
      toast.error(`${provider} sign-in failed. Please try again.`);
      setSocialLoading(null);
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
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        {/* Email Sign In */}
        <form onSubmit={handelingSignIn} className="space-y-5">
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
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#008744] focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || socialLoading !== null}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#008744] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007038] hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">
            OR CONTINUE WITH EMAIL
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social Sign In */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={socialLoading !== null || isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "google" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.72 7.18l7.19 5.59c4.2-3.88 6.57-9.6 6.57-17.24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.79l-7.19-5.59c-2 1.35-4.56 2.16-8.72 2.16-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
            )}
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={socialLoading !== null || isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "github" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.23-5.07-5.49 0-1.21.43-2.2 1.15-2.97-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.77 1.15 1.76 1.15 2.97 0 4.27-2.6 5.2-5.08 5.48.4.35.76 1.02.76 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
            )}
            Continue with GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-7 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#008744] transition hover:text-[#006b35]"
          >
            Sign up
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-gray-400">
          প্রতিদিনের বাজারদর, এক জায়গায়।
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
