import { useEffect, useState } from "react";
import axios from "axios";
import HomeSectionCard from "../HomeSectionCards/HomeSectionCard";
import { useParams } from "react-router-dom";

export default function SearchProduct({ params }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
 const {searchTerm} = useParams() ; 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
       

        setLoading(true);

        const url = `https://e-commerce-app-9vum.onrender.com//product/search/${searchTerm}`;

        console.log("Fetching:", url);

        const res = await axios.get(url);

        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

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
