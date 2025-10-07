import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function OrderDetails() {
  const location = useLocation();
  const { cartItems } = location.state || {};
  const [SelectedAddress, setSelectedAddress] = useState(null);

useEffect(() => {
  const fetchAddress = async () => {
     const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  console.log("Saved Address:", savedAddress);
  setSelectedAddress(savedAddress);
  };

  fetchAddress();
 
}, []);

// Ye run hoga jab selectedAddress update hoga
useEffect(() => {
  console.log("Updated SelectedAddress:", selectedAddress);
}, [selectedAddress]);


  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = totalPrice * 0.18;
  const grandTotal = totalPrice + tax;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Delivery Address */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Delivery Address
        </h2>
        {SelectedAddress ? (
          <div className="text-gray-600">
            <p>
              {SelectedAddress.firstname} {SelectedAddress.lastname}
            </p>
            <p>
              {SelectedAddress.streetaddress}, {SelectedAddress.city}, {SelectedAddress.state}
            </p>
            <p>Pincode: {SelectedAddress.zipcode}</p>
            <p>Phone: {SelectedAddress.mobile}</p>
          </div>
        ) : (
          <p className="text-red-500">No address selected</p>
        )}
      </div>

      {/* Ordered Items */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Ordered Items
        </h2>
        {cartItems?.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Total Payable
        </h2>
        <div className="flex justify-between py-2">
          <span>Subtotal</span>
          <span>₹{totalPrice?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Tax (18%)</span>
          <span>₹{tax?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 font-bold text-gray-800 border-t mt-2 pt-2">
          <span>Total</span>
          <span>₹{grandTotal?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
