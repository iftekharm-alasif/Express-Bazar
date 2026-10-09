const PriceDecreased = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );

  const data = await res.json();

  const toBanglaNumber = (number: number) =>
    number.toLocaleString("bn-BD");

  const decreasedProducts = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* শিরোনাম */}
<div className="mb-6">
  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className="shrink-0 text-green-600"
      aria-hidden="true"
    >
      <path d="m280-560 200 200 200-200H280Z" />
    </svg>

    আজকে যেসব পণ্যের দাম কমেছে
  </h2>

  
</div>

      {/* পণ্যের কার্ড */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decreasedProducts.map((incpro) => (
          <div
            key={incpro.id}
            className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-5"
          >
            {/* পণ্যের তথ্য */}
            <div className="flex items-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[32px] transition-colors duration-300 group-hover:bg-green-100">
                {incpro.image}
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <h3 className="truncate text-lg font-bold text-gray-800">
                  {incpro.nameBn}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {incpro.unit === "kg" ? "কেজি" : incpro.unit}
                </p>
              </div>
            </div>

            {/* বর্তমান দাম */}
            <div className="mt-5">
              <p className="text-sm text-gray-500">আজকের দাম</p>

              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  ৳{toBanglaNumber(incpro.today)}
                </span>

               
              </div>
            </div>

            {/* আগের দাম ও দাম কমার হার */}
            <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-gray-400">গতকালের দাম</p>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  ৳{toBanglaNumber(incpro.yesterday)}
                </p>
              </div>

              {/* দাম কমার হার */}
              <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2.5 py-1.5 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="m280-560 200 200 200-200H280Z" />
                </svg>

                <span className="text-sm font-bold">
                  {toBanglaNumber(incpro.change.pct)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceDecreased;