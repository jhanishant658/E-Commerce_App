import React from "react";

export default function OrderCard({ order, onClick, isSelected }) {
  return (
    <div
      className={`cursor-pointer border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300
        ${isSelected ? "border-blue-500 bg-blue-50" : "bg-white"}`}
      onClick={() => onClick(order)}
    >
      {/* Product Thumbnails */}
      <div className="flex items-center gap-3 mb-3">
        {order.products.slice(0, 2).map((product, index) => (
          <img
            key={product.id || `${order.id}-${index}`}
            src={product.image || "/placeholder.jpg"}
            alt={product.name || "Product"}
            className="w-12 h-12 object-cover rounded-md border"
          />
        ))}
        {order.products.length > 2 && (
          <span className="text-xs text-gray-500">
            +{order.products.length - 2} more
          </span>
        )}
      </div>

      {/* Order Info */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-800">Order #{order.orderId}</span>
        <span className="text-sm text-gray-500">
          {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
        </span>
      </div>

      {/* Price + Status */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-700 font-medium">
          ₹{order.total?.toLocaleString() ?? 0}
        </span>
        <span
          className={`text-sm font-semibold ${
            order.status.toUpperCase() === "DELIVERED"
              ? "text-green-600"
              : order.status.toUpperCase() === "SHIPPED"
              ? "text-blue-600"
              : order.status.toUpperCase() === "PLACED"
              ? "text-orange-600"
              : order.status.toUpperCase() === "PACKED"
              ? "text-yellow-600"
              : order.status.toUpperCase() === "OUT FOR DELIVERY"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {order.status.toUpperCase() || "UNKNOWN"}
        </span>
      </div>
    </div>
  );
}
