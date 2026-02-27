import { useEffect, useState } from "react";
import axios from "axios";
import HomeSectionCard from "../HomeSectionCards/HomeSectionCard";

export default function ProductList({ params, filters }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // 🟢 First sanitize filters
        const minPrice = filters.minPrice ?? 0;
        const maxPrice = filters.maxPrice ?? 100000;

        // 🟢 Avoid request if no category is selected
        if (!params.level1) {
          console.warn("No category selected, skipping product fetch");
          setProducts([]);
          return;
        }

        setLoading(true);

        const url = `https://e-commerce-app-9vum.onrender.com/products/filter?level1=${params.level1}&level2=${params.level2 || ''}&level3=${params.level3 || ''}&colors=${filters.colors.join(',')}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${filters.discountRange?.min || ''}&maxDiscount=${filters.discountRange?.max || ''}&sortBy=${filters.sortBy || ''}`;

        

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params, filters]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
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
