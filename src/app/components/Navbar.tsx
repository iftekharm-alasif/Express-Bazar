import Link from "next/link";
import Image from "next/image";
import Navlinks from "./Navlinks";
import { connection } from "next/server";
import UserProfile from "./UserProfile";

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
        <UserProfile></UserProfile>
      </div>
      <div className="w-full max-w-full">
        <Navlinks />
      </div>
    </header>
  );
};

export default Navbar;
