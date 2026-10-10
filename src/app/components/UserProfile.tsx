"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";

const UserProfile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const initial = user?.name?.charAt(0).toUpperCase() || "U";
  const handleSignOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/";
      },
    },
  });
};



  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2 sm:gap-3">
                    {/* User Profile */}
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 sm:gap-3 group"
                    >
                        {/* User Name */}
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-gray-500">
                                Welcome
                            </p>

                            <h2 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:opacity-70 transition">
                                {user.name}
                            </h2>
                        </div>

                        {/* User Avatar */}
                        {user.image ? (
                            <img 
                                src={user.image}
                                alt={user.name || "User"}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200 group-hover:opacity-80 transition"
                            />
                        ) : (
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold group-hover:opacity-80 transition">
                                {initial}
                            </div>
                        )}
                    </Link>

                    {/* Sign Out */}
                    <button
                        onClick={handleSignOut}
                        className="btn btn-sm sm:btn-md btn-outline"
                    >
                        Sign Out
                    </button>
                </div>
      ) : (
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="whitespace-nowrap text-xs font-medium text-gray-700 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="whitespace-nowrap rounded-lg bg-[#008744] px-3 py-2 text-xs font-medium text-white transition duration-200 hover:bg-[#007038] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;