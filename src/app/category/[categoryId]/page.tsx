import React from "react";
export const instant = false;
import SortProducts from "./SortProducts";

const CategoryDetails = async ({ params }) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
  );

  const data = await res.json();

  const toBanglaNumber = (number: number) =>
    number.toLocaleString("bn-BD");

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      {/* Category Header */}
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:mb-6 sm:gap-4 sm:p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl sm:h-14 sm:w-14 sm:text-4xl">
          {data[0]?.categoryIcon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
            {data[0]?.categoryNameBn}
          </h3>

          <h4 className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm lg:text-base">
            {toBanglaNumber(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </h4>
        </div>
      </div>
 {
    <SortProducts data={data} />
 }
    </div>
  );
};

export default CategoryDetails;