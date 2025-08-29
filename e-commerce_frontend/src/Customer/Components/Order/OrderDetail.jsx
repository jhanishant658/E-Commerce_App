import React from "react";

export default function OrderDetail({ order }) {
  if (!order) return <p className="text-gray-500">Select an order to see details.</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Order #{order.id} Details
      </h2>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Items:</h3>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-gray-600 mb-1">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-1">Delivery Address:</h3>
        <p className="text-gray-600">{order.address}</p>
        <p className="text-gray-600">Phone: {order.phone}</p>
      </div>

      <p className="font-semibold text-gray-800">
        Total: ₹{order.total.toLocaleString()}
      </p>
    </div>
  );
}
