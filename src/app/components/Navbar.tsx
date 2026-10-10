import Link from "next/link";
import Image from "next/image";
import Navlinks from "./Navlinks";
import { connection } from "next/server";


const Navbar = async () => {
  await connection();
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
  <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      {" "}
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-3 py-2 sm:px-6">
        {" "}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          {" "}
          <Link href="/" className="shrink-0">
            {" "}
            <Image
              src="/Bazar_express_Logo-removebg-preview.png"
              alt="Express Bazar Logo"
              width={60}
              height={60}
              priority
              className="h-10 w-10 object-contain sm:h-14 sm:w-14"
            />{" "}
          </Link>
          <div className="min-w-0">
            <Link href="/">
              <h1 className="whitespace-nowrap text-base font-bold text-gray-800 sm:text-xl">
                Express <span className="text-red-800">Bazar</span>
              </h1>
            </Link>

            <p className="break-words text-[10px] text-gray-500 sm:text-xs">
              {date}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-green-600 hover:bg-green-50 hover:text-green-700 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-green-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-600/30 active:translate-y-0 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            সাইন আপ
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-full">
        <Navlinks />
       
      </div>
    </header>
  );
};

export default Navbar;
