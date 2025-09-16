'use client'

import { useEffect, useState } from "react";
import axios from "axios";

import HomeSectionCard from "../HomeSectionCards/HomeSectionCard";

export default function ProductList({ params }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductByCategory = async () => {
      try {
        if (!params?.category) {
          console.warn("No category provided in params");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }

        // ✅ Route params ke naam match karo
        const { category, section, item } = params;

        let url = `http://localhost:8081/product/${category}`;
        if (section) url += `/${section}`;
        if (item) url += `/${item}`;

        console.log("Fetching from URL:", url);

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Products:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err.message);
      }
    };

    fetchProductByCategory();
  }, [params]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <HomeSectionCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
