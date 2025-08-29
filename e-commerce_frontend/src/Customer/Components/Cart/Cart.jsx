import React, { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      user_id: 1,
      name: "Wireless Headphones",
      price: 2999,
      quantity: 1,
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg",
    },
    {
      id: 2,
      user_id: 1,
      name: "Smart Watch",
      price: 4999,
      quantity: 2,
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg",
    },
    {
      id: 3,
      user_id: 1,
      name: "Bluetooth Speaker",
      price: 1999,
      quantity: 1,
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg",
    },
  ]);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(500);
  const [message, setMessage] = useState("");

  // Function to update quantity and auto-remove if 0
  const updateQuantity = (id, action) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  action === "increase"
                    ? item.quantity + 1
                    : item.quantity - 1, // Decrease normally
              }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity <= 0
    );
  };

  // Function to remove item manually
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Apply coupon logic
  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NISH1000") {
      setDiscount(1000);
      setMessage("Coupon applied! ₹1000 discount added.");
    } else {
      setMessage("Invalid coupon code!");
      setDiscount(500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Cart Items */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-4">
          <h1 className="text-2xl font-bold border-b pb-4 mb-4 text-gray-800">
            My Cart ({cartItems.length})
          </h1>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4 hover:bg-gray-50 transition"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg border"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-blue-600 font-bold">₹{item.price}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, "decrease")}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "increase")}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg py-6">
              Your cart is empty 😢
            </p>
          )}
        </div>

        {/* Right Side - Price Summary */}
        <div className="bg-white shadow-lg rounded-xl p-4 h-fit sticky top-6">
          <h2 className="text-xl font-bold border-b pb-3 mb-4 text-gray-800">
            Price Details
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">-₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{total - discount}</span>
            </div>
          </div>

          {/* Coupon Input */}
          <div className="mt-6">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full border rounded-lg p-2 mb-2"
            />
            <button
              onClick={applyCoupon}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Apply Coupon
            </button>
            {message && (
              <p
                className={`mt-2 text-sm ${
                  message.includes("Invalid") ? "text-red-500" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          {/* Checkout Button */}
          <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
