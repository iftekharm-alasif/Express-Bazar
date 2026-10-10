"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ProductChange {
  dir: "up" | "down" | "same";
  pct: number;
}

interface Product {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  change: ProductChange;
}

const Marquee = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async (): Promise<void> => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error: unknown) {
        console.error("Product fetch error:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-white py-2 shadow-sm transition-colors duration-300 hover:bg-gray-50">
      <MarqueeText direction="right" duration={8}>
        <div className="flex items-center">
          {products.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
              <Link
                key={product.id}
                href={`/details/${product.id}`}
                className="mr-5 inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl border border-transparent px-2 text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-green-300 hover:bg-green-50 hover:text-green-800 hover:shadow-lg sm:mr-8 sm:text-base"
              >
                <span className="text-lg transition-transform duration-300 hover:scale-110">
                  {product.image}
                </span>

                <span className="transition-colors duration-300">
                  {product.nameBn}
                </span>

                <span className="font-bold text-gray-900">
                  ৳{product.today.toLocaleString("bn-BD")}
                </span>

                <span className="text-xs text-gray-500 sm:text-sm">
                  টাকা/কেজি
                </span>

                <span
                  className={`inline-flex items-center font-semibold ${
                    isUp
                      ? "text-red-600"
                      : isDown
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {isUp ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35"
                      width="35"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="m280-400 200-200 200 200H280Z" />
                    </svg>
                  ) : isDown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35"
                      width="35"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M480-360 280-560h400L480-360Z" />
                    </svg>
                  ) : null}

                  {product.change.pct.toLocaleString("bn-BD")}%
                </span>
              </Link>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;