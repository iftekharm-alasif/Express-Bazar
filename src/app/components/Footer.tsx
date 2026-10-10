import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-8 sm:flex-row sm:justify-between sm:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-gray-900 transition-colors duration-200 hover:text-[#008744]"
        >
          Express <span className="text-red-800">Bazar</span>
        </Link>

        <p className="text-center text-sm text-gray-500">
          প্রতিদিনের বাজারদর, এক জায়গায়।
        </p>

        <p className="text-xs text-gray-400 sm:text-sm">
          © 2026 Express Bazar
        </p>
      </div>
    </footer>
  );
};

export default Footer;