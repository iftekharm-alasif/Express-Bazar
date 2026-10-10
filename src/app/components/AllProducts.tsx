import Link from "next/link";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );

  const data = await res.json();

  const toBanglaNumber = (number: number) =>
    number.toLocaleString("bn-BD");

  return (
    <section id="all-products" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          সকল পণ্য
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          বাজারের সব পণ্যের বর্তমান দাম দেখুন
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <Link
            key={product.id}
            href={`/details/${product.id}`}
            className="group flex cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-5"
          >
            {/* Product Information */}
            <div className="flex items-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[32px] transition-colors group-hover:bg-green-100">
                {product.image}
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <h3 className="truncate text-lg font-bold text-gray-800">
                  {product.nameBn}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                </p>
              </div>
            </div>

            {/* Current Price */}
            <div className="mt-5">
              <p className="text-sm text-gray-500">বর্তমান দাম</p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                ৳{toBanglaNumber(product.today)}
              </p>
            </div>

            {/* Price Change */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-gray-400">গতকালের দাম</p>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  ৳{toBanglaNumber(product.yesterday)}
                </p>
              </div>

              <div
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 ${
                  product.change.dir === "up"
                    ? "bg-red-50 text-red-600"
                    : product.change.dir === "down"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {product.change.dir !== "same" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                    className={
                      product.change.dir === "up" ? "" : "rotate-180"
                    }
                    aria-hidden="true"
                  >
                    <path d="m280-400 200-200 200 200H280Z" />
                  </svg>
                )}

                <span className="text-sm font-bold">
                  {product.change.dir === "up"
                    ? "+"
                    : product.change.dir === "down"
                      ? "−"
                      : ""}
                  {toBanglaNumber(product.change.pct)}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;