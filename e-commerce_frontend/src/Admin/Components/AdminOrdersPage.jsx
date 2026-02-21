import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Box,
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Footer from "../../Customer/Components/Footer/Footer";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://e-commerce-app-9vum.onrender.com//order/getAllOrder");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    const newStatus = statusUpdates[orderId];
    if (!newStatus) return alert("Please select a status before updating!");

    try {
      await axios.patch(
        `https://e-commerce-app-9vum.onrender.com//order/updateOrder/${orderId}/${newStatus}`
      );
      alert("Order status updated!");
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / pageSize);
  const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <>
    <Box className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
      <Typography variant="h4" className="font-bold text-center">
        Admin - Manage Orders
      </Typography>

      {paginatedOrders.length === 0 ? (
        <Typography className="text-gray-500 text-center">
          No orders found
        </Typography>
      ) : (
        paginatedOrders.map((response) => {
          const order = response.order;
          const products = response.product || [];

          return (
            <Card key={order.id} className="shadow-md rounded-2xl">
              <CardContent>
                <Typography variant="h6" className="mb-2">
                  Order ID: #{order.id} |{" "}
                  <span className="capitalize text-blue-700 font-semibold">
                    {order.orderstatus}
                  </span>
                </Typography>

                <Typography className="text-sm mb-3 text-gray-600">
                  Customer: {order.user.firstname} {order.user.lastname} | Email:{" "}
                  {order.user.email}
                </Typography>

                {/* Product Table */}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Discounted</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((p, index) => {
                      const item = order.orderItems[index];
                      return (
                        <TableRow key={p.id}>
                          <TableCell className="flex gap-3 items-center">
                            <Avatar src={p.imageUrl} alt={p.title} />
                            {p.title}
                          </TableCell>
                          <TableCell>{item?.quantity}</TableCell>
                          <TableCell>₹{item?.price}</TableCell>
                          <TableCell>₹{item?.discountedPrice}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                <Typography className="mt-3 text-sm text-gray-600">
                  <strong>Shipping Address:</strong>{" "}
                  {order.shippingAddress.streetaddress},{" "}
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.zipcode}
                  <br />
                  Mobile: {order.shippingAddress.mobile}
                </Typography>

                {/* Status Update Section */}
                <Box className="flex items-center gap-4 mt-4">
                  <Select
                    value={statusUpdates[order.id] || order.orderstatus}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="Placed">
                      <InventoryIcon className="mr-2" /> Placed
                    </MenuItem>
                    <MenuItem value="Packed">
                      <PendingActionsIcon className="mr-2" /> Packed
                    </MenuItem>
                    <MenuItem value="Shipped">
                      <LocalShippingIcon className="mr-2" /> Shipped
                    </MenuItem>
                    <MenuItem value="Out for Delivery">
                      <DirectionsRunIcon className="mr-2" /> Out for Delivery
                    </MenuItem>
                    <MenuItem value="Delivered">
                      <CheckCircleIcon className="mr-2" /> Delivered
                    </MenuItem>
                  </Select>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateStatus(order.id)}
                  >
                    Update Status
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box className="flex justify-center gap-4 mt-6">
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Typography variant="body1">
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </Box>
      )}
      
    </Box>
    <Footer/>
    </>
  );
}
