import React from "react";
import Image from "next/image";
import { connection } from "next/server";
import Link from "next/link";
import ScrollToProducts from "./ScrollToProducts";

const TodayMarket = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section  className="mt-10 p-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10 md:flex-row md:p-12">
        {/* Left Side: Text Section */}
        <div className="flex-1 space-y-5">
          {/* Date Badge */}
          <div className="inline-block rounded-full bg-[#E5F2E8] px-4 py-1.5 text-sm font-medium text-[#008744]">
            {date}
          </div>

          {/* Heading */}
          <h1 className="text-3xl leading-snug font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <div  className="pt-2">
  <ScrollToProducts />
</div>
        </div>

        {/* Right Side: Image Section */}
        <div className="flex w-full shrink-0 items-center justify-center md:w-80 lg:w-96">
          <Image
            src="/bazar-hero.png"
            alt="Market Basket"
            width={400}
            height={400}
            priority
            className="h-auto w-full max-w-[280px] object-contain sm:max-w-[320px] md:max-w-none"
          />
        </div>
      </div>
    </section>
  );
};

export default TodayMarket;
