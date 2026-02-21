import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import Footer from "../Footer/Footer";
import FAQPage from "../../Pages/FaqPage";
import { toast } from "react-hot-toast";

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [adding, setAdding] = useState(false);
   const user = JSON.parse(localStorage.getItem("User"));
  const userId = user?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://e-commerce-app-9vum.onrender.com//products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    setAdding(true);
    try {
      const payload = {
        productId: product.id,
        size: selectedSize,
        quantity: 1,
      };

      await axios.post(`https://e-commerce-app-9vum.onrender.com//cartitem/${userId}`, payload);
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart!");
    } finally {
      setAdding(false);
    }
  };

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
        {/* Left side - Product Image */}
        <div className="md:w-1/2 h-auto md:h-screen sticky top-0 flex flex-col justify-center items-center bg-white shadow-lg p-4">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-contain max-h-[450px] w-auto rounded-lg mb-4"
          />

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 w-full px-4">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex items-center justify-center gap-2 flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition disabled:opacity-50"
            >
              <ShoppingCartIcon /> {adding ? "Adding..." : "Add to Cart"}
            </button>
            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition text-center"
            >
              <BoltIcon /> Buy Now
            </Link>
          </div>
        </div>

        {/* Right side - Product Details */}
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

          {/* Sizes Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  className={`px-4 py-2 rounded-lg border font-medium transition ${
                    selectedSize === size.name
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews */}
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
                <FAQPage />
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
