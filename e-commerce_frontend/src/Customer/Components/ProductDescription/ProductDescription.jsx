import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import Footer from "../Footer/Footer";
import FAQPage from "../../Pages/FaqPage";

const ProductDescription = () => {
  const { id } = useParams(); // 👈 route se id lo
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // API call
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const renderStars = (count) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) =>
        i < count ? (
          <StarIcon key={i} className="text-yellow-500" fontSize="small" />
        ) : (
          <StarBorderIcon key={i} className="text-gray-300" fontSize="small" />
        )
      )}
    </div>
  );

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center text-red-500">Product not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left side - Product Image with Buttons */}
        <div className="md:w-1/2 h-screen sticky top-0 flex flex-col justify-center items-center bg-white shadow-lg p-4">
          {/* Product Image */}
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-contain max-h-[450px] w-auto rounded-lg mb-4"
          />

          {/* Buttons below Image */}
          <div className="flex gap-4 w-full px-4">
            <button className="flex items-center justify-center gap-2 flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition">
              <ShoppingCartIcon /> Add to Cart
            </button>
            <button className="flex items-center justify-center gap-2 flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition">
              <BoltIcon />
              <Link to="/checkout">Buy Now</Link>
            </button>
          </div>
        </div>

        {/* Right side - Product Details & Reviews */}
        <div className="md:w-1/2 p-6 bg-white shadow-lg overflow-y-auto">
          {/* Product Header */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              {renderStars(product.ratings?.[0]?.rating || 0)}
              <span className="text-sm text-gray-500">
                ({product.ratings?.[0]?.rating || 0} / 5)
              </span>
            </div>
            <p className="text-2xl font-semibold text-green-700 mt-3">
              ₹{product.discountedPrice}{" "}
              <span className="line-through text-gray-500 text-lg">₹{product.price}</span>
              <span className="ml-2 text-red-500">({product.discountpercent} OFF)</span>
            </p>
          </div>

          {/* Product Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>
          
          {/* Reviews Section */}
          <div className="border-t border-gray-300 pt-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews?.length > 0 ? (
                product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-gray-50 rounded-lg shadow-md border hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {review.user.firstname} {review.user.lastname}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2 italic">"{review.review}"</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
              <div>
            <FAQPage/>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDescription;
