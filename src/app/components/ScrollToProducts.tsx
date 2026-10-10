"use client";

const ScrollToProducts = () => {
  const handleScroll = () => {
    document.getElementById("all-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      onClick={handleScroll}
      className="group rounded-xl bg-[#008744] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-900/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#007038] hover:shadow-lg hover:shadow-green-900/20 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008744]"
    >
      সব পণ্য দেখুন
    </button>
  );
};

export default ScrollToProducts;