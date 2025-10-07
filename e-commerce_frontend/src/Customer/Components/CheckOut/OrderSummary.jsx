import React, { useState ,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderSummary({selectedAddress}) {
  const location = useLocation();
  const navigate = useNavigate();
 

  const [cartItems, setCartItems] = useState([ ]);
  useEffect(() => {
    const fetchCart = async () => {
  const user = JSON.parse(localStorage.getItem("User"));
  
  const token = localStorage.getItem("token");
        if (!user) {
          console.log("No user");
          return;
        }
        if (!token) {
          console.log("No token");
          return;
        }
  
        console.log("User:", user);
  
        const userId = user.id;
  
        try {
          const res = await axios.get(`http://localhost:8081/usercart/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Attach JWT here
            },
          });
  
          const items = (res.data.cartItems || []).map((item) => ({
            id: item.id,
            name: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
            imageUrl: item.product.imageUrl,
          }));
  
          setCartItems(items);
        } catch (err) {
          console.error("Error fetching cart:", err.response?.data || err.message);
        }
      };
  
      fetchCart();
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
