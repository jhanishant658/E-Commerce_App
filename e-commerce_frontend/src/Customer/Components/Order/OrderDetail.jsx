import React from "react";

export default function OrderDetail({ order }) {
  if (!order) return <p className="text-gray-500">Select an order to see details.</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Order #{order.orderId}
      </h2>

      {/* Product List */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Items:</h3>
        {order.products.map((product, index) => (
          <div
            key={`${order.orderId}-${product.id || index}`}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={product.image || "/placeholder.jpg"}
                alt={product.name || "Product"}
                className="w-14 h-14 object-cover rounded-md border"
              />
              <div>
                <p className="font-medium text-gray-800">{product.name || "N/A"}</p>
                <p className="text-sm text-gray-500">
                  Size: {product.size || "N/A"} | Qty: {product.quantity || 1}
                </p>
              </div>
            </div>
            <p className="font-semibold text-gray-700">
              ₹{((product.discountedPrice || product.price || 0) * (product.quantity || 1)).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-1">Delivery Address:</h3>
        <p className="text-gray-600">{order.address || "N/A"}</p>
        <p className="text-gray-600">Phone: {order.phone || "N/A"}</p>
      </div>

      {/* Total Amount */}
      <p className="text-lg font-bold text-gray-900">
        Total: ₹{(order.total || 0).toLocaleString()}
      </p>
      {order.discount > 0 && (
        <p className="text-sm text-green-600">
          You saved ₹{order.discount.toLocaleString()} on this order 🎉
        </p>
      )}
    </div>
  );
}
