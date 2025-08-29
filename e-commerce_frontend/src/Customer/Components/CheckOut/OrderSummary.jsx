import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedAddress = location.state?.selectedAddress;

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 2999, quantity: 1 },
    { id: 2, name: "Smart Watch", price: 4999, quantity: 2 },
    { id: 3, name: "Gaming Mouse", price: 1999, quantity: 1 },
  ]);

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
  const tax = totalPrice * 0.18;
  const grandTotal = totalPrice + tax;

  // Navigate to payment step
  const handlePlaceOrder = () => {
    navigate(`?step=3`, {
      state: {
        selectedAddress: selectedAddress,
        orderSummary: { cartItems, totalPrice, tax, grandTotal },
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Delivery Address */}
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Delivery Address
        </h2>
        {selectedAddress ? (
          <div className="text-gray-700">
            <p>
              <span className="font-semibold">
                {selectedAddress.firstName} {selectedAddress.lastName}
              </span>
            </p>
            <p>{selectedAddress.address}</p>
            <p>Pincode: {selectedAddress.pincode}</p>
            <p>Phone: {selectedAddress.phone}</p>
          </div>
        ) : (
          <p className="text-gray-500">
            No address selected. Go back and choose one.
          </p>
        )}
      </div>

      {/* Order Details */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart Items */}
        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Cart</h2>
          {cartItems.map((item) => (
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
          ))}
        </div>

        {/* Order Summary */}
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

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-lg font-semibold shadow-md transition"
          >
            Place Order
          </button>
        </div>
      </div>
      
    </div>
  );
}
