import React from "react";

export default function OrderCard({ order, onClick, selected }) {
  return (
    <div
      className={`cursor-pointer border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300
      ${selected ? "border-blue-500 bg-blue-50" : "bg-white"}`}
      onClick={() => onClick(order)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800">Order #{order.id}</span>
        <span className="text-sm text-gray-500">{order.date}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-700">₹{order.total.toLocaleString()}</span>
        <span
          className={`text-sm font-semibold ${
            order.status === "Delivered"
              ? "text-green-600"
              : order.status === "Shipped"
              ? "text-blue-600"
              : "text-gray-600"
          }`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
}
