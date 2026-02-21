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
        const user = JSON.parse(localStorage.getItem("User"));
        const userId = user?.id;

        const res = await axios.get(
          `https://e-commerce-app-9vum.onrender.com//order/orderhistory/${userId}`
        );

        const fetchedOrders = res.data.map((response) => {
          const order = response.order;

          const products = (response.product || []).map((prod, index) => {
            const item = order.orderItems[index] || {};
            return {
              id: prod.id,
              name: prod.title,
              price: prod.price,
              discountedPrice: prod.discountedPrice || prod.price,
              size: item.size || "N/A",
              quantity: item.quantity || 1,
              image: prod.imageUrl || "/placeholder.jpg",
            };
          });

          return {
            orderId: order.orderId,
            id: order.id,
            status: order.orderstatus,
            date: order.orderDate || order.createdAt,
            total: order.totalAmount || 0,
            discount: order.totalDiscount || 0,
            address: order.shippingAddress
              ? `${order.shippingAddress.streetaddress}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zipcode}`
              : "N/A",
            phone: order.shippingAddress?.mobile || "N/A",
            products: products,
          };
        });

        setOrders(fetchedOrders);
        setSelectedOrder(fetchedOrders[0]);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex gap-6 p-6 max-w-7xl mx-auto h-[80vh] overflow-hidden scrollbar-hide">
      {/* Left Scroll Section */}
      <div className="w-1/3 flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide">
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

      {/* Right Scroll Section */}
      <div className="w-2/3 flex flex-col gap-6 overflow-y-auto pl-2 scrollbar-hide">
        {selectedOrder ? (
          <>
            <OrderDetail order={selectedOrder} />
            <OrderTracker key={selectedOrder.id} status={selectedOrder.status} />
            <OrderRating
              orderId={selectedOrder.id}
              savedRatings={ratings}
              setSavedRatings={setRatings}
            />
          </>
        ) : (
          <p className="text-gray-500 text-center">
            Select an order to view details
          </p>
        )}
      </div>
    </div>
  );
}
