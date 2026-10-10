"use client";

import Link from "next/link";
import { useState } from "react";

const SortProducts = ({ data }) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = [...data].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.today - b.today;
    }

    if (sortOrder === "high-to-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <div>
      {/* Sorting Section */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-600">
          মোট {data.length}টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="whitespace-nowrap text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="max-w-[210px] cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition-all hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Sorted Products */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:gap-5">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/details/${product.id}`}
            className="group relative flex min-h-[165px] cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:min-h-[180px] sm:rounded-2xl sm:p-4 lg:p-5"
          >
            {/* Product Information */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-xl transition-colors duration-300 group-hover:bg-green-100 sm:h-14 sm:w-14 sm:rounded-xl sm:text-[32px]">
                {product.image}
              </div>

              <div className="min-w-0 flex-1 pt-0.5 sm:pt-1">
                <h3 className="truncate text-sm font-bold text-gray-800 sm:text-lg">
                  {product.nameBn}
                </h3>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="mt-3 sm:mt-5">
              <p className="text-xs text-gray-500 sm:text-sm">
                আজকের দাম
              </p>

              <span className="mt-1 block text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                ৳{Number(product.today).toLocaleString("bn-BD")}
              </span>
            </div>

            {/* Yesterday's Price & Change */}
            <div className="mt-auto flex items-end justify-between gap-2 border-t border-gray-100 pt-3">
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400 sm:text-xs">
                  গতকালের দাম
                </p>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  ৳{Number(product.yesterday).toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1 rounded-lg bg-green-50 px-2 py-1.5 text-green-600 sm:px-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="m280-560 200 200 200-200H280Z" />
                </svg>

                <span className="text-xs font-bold sm:text-sm">
                  {Number(product.change.pct).toLocaleString("bn-BD")}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SortProducts;