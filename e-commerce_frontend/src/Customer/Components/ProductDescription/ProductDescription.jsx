import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import Footer from "../Footer/Footer";

const ProductDescription = () => {
  const product = {
    id: 8,
    title: "Focus Carry Pouch",
    href: "#",
    price: 32,
    image:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg",
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
    color: "Gray",
    description:
      "Compact, stylish, and durable — the Focus Carry Pouch is perfect for keeping essentials safe and organized. Its premium fabric and smart design make it a great everyday companion.",
    rating: 4,
  };

  const reviews = [
    { product_id: 8, name: "Amit Sharma", rating: 5, date: "Jan 12, 2025", comment: "Amazing product, very high quality and super durable!" },
    { product_id: 8, name: "Priya Verma", rating: 4, date: "Jan 10, 2025", comment: "Value for money. Packaging was also very neat and safe." },
    { product_id: 8, name: "Rahul Singh", rating: 3, date: "Jan 8, 2025", comment: "Decent product but delivery took longer than expected." },
    { product_id: 8, name: "Neha Gupta", rating: 5, date: "Jan 5, 2025", comment: "Loved it! Perfect size and comfortable to use every day." },
    { product_id: 8, name: "Sanjay Kumar", rating: 4, date: "Jan 3, 2025", comment: "Looks exactly as shown in the images, great build quality." },
    { product_id: 8, name: "Pooja Mishra", rating: 5, date: "Dec 30, 2024", comment: "Five stars from me! Totally satisfied." },
    { product_id: 8, name: "Ravi Mehta", rating: 4, date: "Dec 28, 2024", comment: "Great support from customer care. Highly recommended." },
    { product_id: 8, name: "Sneha Kapoor", rating: 5, date: "Dec 25, 2024", comment: "The pouch material feels premium and classy." },
    { product_id: 8, name: "Vikas Yadav", rating: 3, date: "Dec 20, 2024", comment: "Average experience, could have been better." },
    { product_id: 8, name: "Manish Chauhan", rating: 5, date: "Dec 18, 2024", comment: "Worth every penny! Definitely buying more products." },
  ];

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

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left side - Product Image with Buttons */}
        <div className="md:w-1/2 h-screen sticky top-0 flex flex-col justify-center items-center bg-white shadow-lg p-4">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="object-contain max-h-[450px] w-auto rounded-lg mb-4"
          />

          {/* Buttons below Image */}
          <div className="flex gap-4 w-full px-4">
            <button className="flex items-center justify-center gap-2 flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition">
              <ShoppingCartIcon /> Add to Cart
            </button>
            <button className="flex items-center justify-center gap-2 flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition">
              <BoltIcon /> Buy Now
            </button>
          </div>
        </div>

        {/* Right side - Product Details & Reviews */}
        <div className="md:w-1/2 p-6 bg-white shadow-lg overflow-y-auto">
          {/* Product Header */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-500">({product.rating} / 5)</span>
            </div>
            <p className="text-2xl font-semibold text-green-700 mt-3">
              ₹{product.price}
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
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-md border hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  {renderStars(review.rating)}
                  <p className="text-gray-700 mt-2 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default ProductDescription;
