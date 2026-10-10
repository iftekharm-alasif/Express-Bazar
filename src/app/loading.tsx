const Loading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4">
      {/* Spinner */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-100 border-t-[#008744]" />

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
          <span className="text-3xl">🛒</span>
        </div>
      </div>

      {/* Brand */}
      <h2 className="mt-6 text-xl font-extrabold tracking-tight text-gray-900">
        Express <span className="text-[#008744]">Bazar</span>
      </h2>

      <p className="mt-2 text-sm text-gray-500">
         তথ্য লোড হচ্ছে...
      </p>

      {/* Animated Dots */}
      <div className="mt-5 flex items-center gap-1.5">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#008744]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#008744] [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#008744] [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default Loading;