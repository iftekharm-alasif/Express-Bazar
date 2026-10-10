import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
export const instant = false;

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
};

type Props = {
  params: Promise<{
    detailsId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { detailsId } = await params;

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data: Product[] = await res.json();

  const product = data.find(
    (item) => item.id === Number(detailsId),
  );

  if (!product) {
    notFound();
  }

  const toBanglaNumber = (number: number) =>
    number.toLocaleString("bn-BD");

  const markets = product.markets ?? [];

  const highestPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const lowestPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) =>
          total + (market.min + market.max) / 2,
        0,
      ) / markets.length
    : 0;

  const unitName =
    product.unit === "kg" ? "কেজি" : product.unit;

  return (
    <main className="min-h-screen bg-gray-50/80">
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Product Overview */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:rounded-3xl">
          <div className="p-5 sm:p-7 lg:p-9">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-4xl sm:h-24 sm:w-24 sm:text-6xl">
                {product.image}
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-green-700 sm:text-sm">
                  পণ্যের বিস্তারিত
                </p>

                <h1 className="break-words text-xl font-extrabold leading-snug text-gray-900 sm:text-3xl lg:text-4xl">
                  {product.nameBn}
                </h1>

                <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                  প্রতি {unitName}
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-5 sm:mt-8 sm:p-7">
              <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-green-100/60 blur-2xl" />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium text-gray-600 sm:text-base">
                    আজকের বাজারদর
                  </p>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-green-700 sm:text-sm">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    বর্তমান দাম
                  </span>
                </div>

                <p className="mt-3 break-words text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  ৳{toBanglaNumber(product.today)}
                  <span className="ml-2 text-sm font-medium text-gray-500 sm:text-base">
                    / {unitName}
                  </span>
                </p>

                <div
                  className={`mt-4 inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold sm:text-sm ${
                    product.change.dir === "up"
                      ? "bg-red-50 text-red-600"
                      : product.change.dir === "down"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span>
                    {product.change.dir === "up"
                      ? "▲ দাম বেড়েছে"
                      : product.change.dir === "down"
                        ? "▼ দাম কমেছে"
                        : "দামের পরিবর্তন নেই"}
                  </span>

                  <span>
                    {toBanglaNumber(
                      Math.abs(product.change.pct),
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Price Comparison */}
            <div className="mt-8 sm:mt-10">
              <div className="mb-4 sm:mb-5">
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  দামের তুলনা
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                  বিভিন্ন বাজারের দামের ভিত্তিতে তুলনা
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {/* Highest Price */}
                <div className="group rounded-2xl border border-red-100 bg-white p-4 transition-all duration-200 hover:border-red-200 hover:shadow-md sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500 sm:text-sm">
                        সর্বোচ্চ দাম
                      </p>

                      <p className="mt-1 break-words text-xl font-extrabold text-red-600 sm:text-2xl">
                        ৳{toBanglaNumber(highestPrice)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    প্রতি {unitName}
                  </p>
                </div>

                {/* Lowest Price */}
                <div className="group rounded-2xl border border-green-100 bg-white p-4 transition-all duration-200 hover:border-green-200 hover:shadow-md sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500 sm:text-sm">
                        সর্বনিম্ন দাম
                      </p>

                      <p className="mt-1 break-words text-xl font-extrabold text-green-700 sm:text-2xl">
                        ৳{toBanglaNumber(lowestPrice)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    প্রতি {unitName}
                  </p>
                </div>

                {/* Average Price */}
                <div className="group rounded-2xl border border-blue-100 bg-white p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-md sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 3v18" />
                        <path d="M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500 sm:text-sm">
                        গড় দাম
                      </p>

                      <p className="mt-1 break-words text-xl font-extrabold text-blue-700 sm:text-2xl">
                        ৳{toBanglaNumber(Math.round(averagePrice))}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    প্রতি {unitName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market-wise Prices */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-green-700 sm:text-sm">
                বাজারভিত্তিক মূল্য
              </p>

              <h2 className="text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl lg:text-3xl">
                বিভিন্ন বাজারে {product.nameBn}-এর দাম
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                বিভাগ ও বাজার অনুযায়ী সর্বনিম্ন এবং সর্বোচ্চ দাম তুলনা করুন।
              </p>
            </div>

            <span className="w-fit shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600">
              মোট {toBanglaNumber(markets.length)}টি বাজার
            </span>
          </div>

          {markets.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {markets.map((market, index) => (
                <article
                  key={`${market.market}-${index}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700 transition-colors group-hover:bg-green-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 21h18" />
                          <path d="M5 21V7l8-4v18" />
                          <path d="M19 21V11l-6-4" />
                          <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <h3 className="break-words font-bold leading-snug text-gray-900 sm:text-lg">
                          {market.market}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          {market.division} বিভাগ
                        </p>
                      </div>
                    </div>

                  
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                    <div className="min-w-0 rounded-xl bg-green-50/70 p-3 sm:p-4">
                      <p className="text-xs leading-5 text-gray-500 sm:text-sm">
                        সর্বনিম্ন দাম
                      </p>

                      <p className="mt-1 break-words text-lg font-extrabold text-green-700 sm:text-xl">
                        ৳{toBanglaNumber(market.min)}
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-gray-50 p-3 sm:p-4">
                      <p className="text-xs leading-5 text-gray-500 sm:text-sm">
                        সর্বোচ্চ দাম
                      </p>

                      <p className="mt-1 break-words text-lg font-extrabold text-red-500 sm:text-xl">
                        ৳{toBanglaNumber(market.max)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-400">
                      প্রতি {unitName}
                    </p>

                 <Link href={'/'}>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 transition-transform group-hover:translate-x-0.5">
                      Express Bazar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span></Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
              <p className="font-semibold text-gray-700">
                এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
              </p>
              <p className="mt-2 text-sm text-gray-500">
                পরে আবার চেষ্টা করুন।
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white px-4 py-4 sm:px-5">
          <p className="text-xs leading-5 text-gray-500 sm:text-sm">
            <span className="font-semibold text-gray-700">
              দ্রষ্টব্য:
            </span>{" "}
            বাজারভেদে পণ্যের দাম পরিবর্তিত হতে পারে। কেনার আগে সংশ্লিষ্ট বাজারে দাম যাচাই করে নিন।
          </p>
        </div>
      </section>
    </main>
  );
};

export default Page;