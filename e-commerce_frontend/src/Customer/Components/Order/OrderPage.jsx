import React, { useState } from "react";
import OrderCard from "./OrderCard";
import OrderDetail from "./OrderDetail";
import OrderTracker from "./OrderTracker";
import OrderRating from "./OrderRatingPage";


export default function OrdersPage() {
  const orders = [
     {
      id: 87,
      status: "Shipped",
      date: "2025-08-29",
      total: 8997,
      address: "123 MG Road, Bangalore",
      phone: "9876543210",
      items: [
        { name: "Headphones", price: 2999, quantity: 1 },
        { name: "Smart Watch", price: 4999, quantity: 1 },
        { name: "Mouse", price: 1999, quantity: 1 },
      ],
    }, {
      id: 91,
      status: "Shipped",
      date: "2025-08-29",
      total: 8997,
      address: "123 MG Road, Bangalore",
      phone: "9876543210",
      items: [
        { name: "Headphones", price: 2999, quantity: 1 },
        { name: "Smart Watch", price: 4999, quantity: 1 },
        { name: "Mouse", price: 1999, quantity: 1 },
      ],
    }, {
      id: 99,
      status: "Shipped",
      date: "2025-08-29",
      total: 8997,
      address: "123 MG Road, Bangalore",
      phone: "9876543210",
      items: [
        { name: "Headphones", price: 2999, quantity: 1 },
        { name: "Smart Watch", price: 4999, quantity: 1 },
        { name: "Mouse", price: 1999, quantity: 1 },
      ],
    }, {
      id: 100,
      status: "Shipped",
      date: "2025-08-29",
      total: 8997,
      address: "123 MG Road, Bangalore",
      phone: "9876543210",
      items: [
        { name: "Headphones", price: 2999, quantity: 1 },
        { name: "Smart Watch", price: 4999, quantity: 1 },
        { name: "Mouse", price: 1999, quantity: 1 },
      ],
    },
    {
      id: 101,
      status: "Shipped",
      date: "2025-08-29",
      total: 8997,
      address: "123 MG Road, Bangalore",
      phone: "9876543210",
      items: [
        { name: "Headphones", price: 2999, quantity: 1 },
        { name: "Smart Watch", price: 4999, quantity: 1 },
        { name: "Mouse", price: 1999, quantity: 1 },
      ],
    },
    {
      id: 102,
      status: "Delivered",
      date: "2025-08-25",
      total: 4999,
      address: "45 IT Park, Pune",
      phone: "9876501234",
      items: [{ name: "Smart Watch", price: 4999, quantity: 1 }],
    },
  ];

  // Default top order selected
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  // Ratings state per order
  const [ratings, setRatings] = useState({});

  return (
    <div className="flex gap-6 p-6">
      {/* Order List */}
      <div className="w-1/3 flex flex-col gap-3">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onClick={setSelectedOrder}
            isSelected={selectedOrder?.id === order.id}
          />
        ))}
      </div>

      {/* Order Details + Tracker + Rating */}
      <div className="w-2/3 flex flex-col gap-6">
        <OrderDetail order={selectedOrder} />
        {selectedOrder && (
          <>
            <OrderTracker status={selectedOrder.status} />
            <OrderRating
              orderId={selectedOrder.id}
              savedRatings={ratings}
              setSavedRatings={setRatings}
            />
          </>
        )}
        
      </div>

    </div>
  );
}
