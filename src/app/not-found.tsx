import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* 404 Illustration */}
        <div className="relative mx-auto mb-8 flex h-44 w-44 items-center justify-center rounded-full bg-green-50">
          <span className="text-7xl font-extrabold tracking-tight text-[#008744]/20">
            404
          </span>

          <div className="absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-[#008744] text-white shadow-lg shadow-green-200">
            <Search size={30} strokeWidth={1.8} />
          </div>
        </div>

        {/* Error Message */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#008744]">
          Page Not Found
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          লিংকটি ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#008744] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007038] hover:shadow-md"
          >
            <Home size={18} />
             <ArrowLeft size={18} />
            হোম পেজে ফিরে যান
          </Link>

          
        </div>

        {/* Footer Branding */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-gray-900 transition-colors hover:text-[#008744]"
          >
            Express <span className="text-[#008744]">Bazar</span>
          </Link>

          <p className="mt-1 text-xs text-gray-400">
            প্রতিদিনের বাজারদর, এক জায়গায়।
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;