"use client";

import React, { useEffect, useState } from "react";

interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

const Navlinks = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        // console.log("Categories:", data);

        setCategories(data);
      } catch (error) {
        console.error("Categories fetch error:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <nav className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:gap-3 sm:px-6">
        {categories.map((navcata) => (
          <a
            href="#"
            key={navcata.id}
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-green-100 hover:text-green-700"
          >
            <span className="text-base">{navcata.icon}</span>
            <span>{navcata.nameBn}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;