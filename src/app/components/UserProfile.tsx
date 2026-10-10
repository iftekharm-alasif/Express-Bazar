"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { UserRound, LogOut, ChevronDown } from "lucide-react";

const UserProfile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() =>
                                setIsDropdownOpen(!isDropdownOpen)
                            }
                            aria-expanded={isDropdownOpen}
                            aria-label="Open profile menu"
                            className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-200 hover:bg-gray-100 sm:px-3"
                        >
                            {/* User Name */}
                            <div className="hidden text-right sm:block">
                                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                                    Welcome
                                </p>

                                <h2 className="max-w-32 truncate text-sm font-semibold text-gray-800 transition-colors group-hover:text-[#008744] md:max-w-40">
                                    {user.name}
                                </h2>
                            </div>

                            {/* User Avatar */}
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-sm ring-1 ring-gray-200 transition-all duration-200 group-hover:ring-[#008744]">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || "User"}
                                        referrerPolicy="no-referrer"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[#008744] text-sm font-semibold text-white">
                                        {initial}
                                    </div>
                                )}
                            </div>

                            {/* Dropdown Arrow */}
                            <ChevronDown
                                size={16}
                                className={`hidden text-gray-400 transition-transform duration-200 sm:block ${
                                    isDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg shadow-gray-200/60">
                                {/* Edit Profile */}
                                <Link
                                    href="/profile"
                                    onClick={() =>
                                        setIsDropdownOpen(false)
                                    }
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-[#008744]"
                                >
                                    <UserRound size={17} />
                                    Edit Profile
                                </Link>

                                <div className="my-1 border-t border-gray-100" />

                                {/* Logout */}
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* Sign In / Sign Up */
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <Link
                        href="/signin"
                        className="whitespace-nowrap text-xs font-medium text-gray-700 transition-colors hover:text-[#008744] sm:text-sm"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="whitespace-nowrap rounded-lg bg-[#008744] px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#007038] hover:shadow-md active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserProfile;