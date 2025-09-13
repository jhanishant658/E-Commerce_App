import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "./OrderCard";
import OrderDetail from "./OrderDetail";
import OrderTracker from "./OrderTracker";
import OrderRating from "./OrderRatingPage";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // User object localStorage se nikaal rahe hai
        const user = JSON.parse(localStorage.getItem("User"));
        if (!user) return;

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8081/order/orderhistory/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // JWT token bhejna zaruri hai
            },
          }
        );

        const fetchedOrders = res.data.map((order) => ({
          id: order.id,
          status: order.orderstatus,
          date: order.orderDate || order.createdAt,
          total: order.totalAmount,
          address: `${order.shippingAddress.streetaddress}, ${order.shippingAddress.city}`,
          phone: order.shippingAddress.mobile,
          items: order.orderItems.map((item) => ({
            name: `Product ID: ${item.id}`, // TODO: agar product ka naam chahiye to backend me join karna hoga
            price: item.price,
            quantity: item.quantity,
          })),
        }));

        setOrders(fetchedOrders);
        if (fetchedOrders.length > 0) {
          setSelectedOrder(fetchedOrders[0]); // pehla order default select ho jaye
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex gap-6 p-6">
      {/* Order List */}
      <div className="w-1/3 flex flex-col gap-3">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found</p>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={setSelectedOrder}
              isSelected={selectedOrder?.id === order.id}
            />
          ))
        )}
      </div>

      {/* Order Details + Tracker + Rating */}
      <div className="w-2/3 flex flex-col gap-6">
        {selectedOrder ? (
          <>
            <OrderDetail order={selectedOrder} />
            <OrderTracker status={selectedOrder.status} />
            <OrderRating
              orderId={selectedOrder.id}
              savedRatings={ratings}
              setSavedRatings={setRatings}
            />
          </>
        ) : (
          <p className="text-gray-500 text-center">Select an order to view details</p>
        )}
      </div>
    </div>
  );
}
