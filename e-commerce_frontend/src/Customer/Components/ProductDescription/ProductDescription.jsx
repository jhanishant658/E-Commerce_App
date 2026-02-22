import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [adding, setAdding] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const user = JSON.parse(localStorage.getItem("User"));
  const userId = user?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://e-commerce-app-9vum.onrender.com/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const rating =
    product?.ratings?.length > 0
      ? product.ratings[0].rating
      : Math.floor(Math.random() * 5) + 1;

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

  const addToCart = async () => {
    if (!selectedSize) {
      toast.error("Select size first");
      return false;
    }

    setAdding(true);

    try {
      await axios.post(
        `https://e-commerce-app-9vum.onrender.com/cartitem/${userId}`,
        {
          productId: product.id,
          size: selectedSize,
          quantity: 1,
        }
      );
      toast.success("Added to cart");
      return true;
    } catch {
      toast.error("Failed");
      return false;
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    const ok = await addToCart();
    if (ok) navigate("/cart");
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Not found</div>;

  const images = [product.imageUrl, product.imageUrl, product.imageUrl];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto w-full p-6 flex-grow">

        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl">

          {/* LEFT IMAGE SECTION */}
          <div className="md:w-1/2 border-r border-gray-200 p-8 flex flex-col items-center">

            {/* MAIN IMAGE */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={images[activeImg]}
                alt={product.title}
                className="max-h-[420px] object-contain transition duration-500 hover:scale-110"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-6">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 object-contain border rounded-lg cursor-pointer transition
                  ${
                    activeImg === i
                      ? "border-indigo-600 scale-105"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
                />
              ))}
            </div>

            {/* STICKY BUY PANEL */}
            <div className="w-full mt-10 space-y-3 sticky bottom-0 bg-white pt-4">

              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:scale-[1.02] transition"
              >
                <BoltIcon /> Buy Now
              </button>

              <button
                onClick={addToCart}
                disabled={adding}
                className="w-full flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition"
              >
                <ShoppingCartIcon />
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="md:w-1/2 p-10 space-y-6">

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* RATING BADGE */}
            <div className="flex items-center gap-3">
              {renderStars(rating)}
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium">
                {rating}/5
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-green-600">
                ₹{product.discountedPrice}
              </span>

              <span className="line-through text-gray-400 text-lg">
                ₹{product.price}
              </span>

              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-semibold">
                {product.discountpercent} OFF
              </span>
            </div>

            {/* STOCK */}
            <div className="text-sm font-medium">
              {product.stock > 5 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-500">
                  Only {product.stock} left
                </span>
              )}
            </div>

            {/* DESC */}
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* SIZE */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Select Size</h3>

              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size.name}
                    disabled={size.quantity === 0}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-5 py-2 rounded-xl border font-semibold transition
                    ${
                      size.quantity === 0
                        ? "opacity-40 cursor-not-allowed"
                        : selectedSize === size.name
                        ? "bg-indigo-600 text-white scale-105"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* REVIEWS */}
            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">
                Customer Reviews
              </h2>

              {product.reviews?.length > 0 ? (
                product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="mb-4 p-4 bg-gray-50 rounded-xl border"
                  >
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        {review.user.firstname} {review.user.lastname}
                      </span>
                      <span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-2 italic text-gray-700">
                      "{review.review}"
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No reviews yet.</p>
              )}
            </div>

            <FAQPage />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDescription;