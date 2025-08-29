import React, { useState, useEffect } from "react";

export default function OrderSummary() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 2999, quantity: 1 },
    { id: 2, name: "Smart Watch", price: 4999, quantity: 2 },
    { id: 3, name: "Gaming Mouse", price: 1999, quantity: 1 },
  ]);

  // Mock address from backend
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setDeliveryAddress({
        firstName: "John",
        lastName: "Doe",
        address: "123 MG Road, Bangalore, Karnataka",
        pincode: "560001",
        phone: "9876543210",
      });
    }, 1000);
  }, []);

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  type === "increase" ? item.quantity + 1 : item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = totalPrice * 0.18; // 18% GST
  const grandTotal = totalPrice + tax;

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Delivery Address */}
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Delivery Address
        </h2>
        {deliveryAddress ? (
          <div className="text-gray-700">
            <p>
              <span className="font-semibold">
                {deliveryAddress.firstName} {deliveryAddress.lastName}
              </span>
            </p>
            <p>{deliveryAddress.address}</p>
            <p>Pincode: {deliveryAddress.pincode}</p>
            <p>Phone: {deliveryAddress.phone}</p>
          </div>
        ) : (
          <p className="text-gray-500">Fetching delivery address...</p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Cart Items */}
        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Your Cart
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded-lg p-3 mb-3 hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    ₹{item.price.toLocaleString()} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, "decrease")}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "increase")}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <div className="font-semibold text-gray-700">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right - Order Summary */}
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h2>
          <div className="flex justify-between py-2 text-gray-700">
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 text-gray-700">
            <span>Tax (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-gray-800 border-t mt-2 pt-2">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
          <button
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={() => alert("Proceeding to Checkout...")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
