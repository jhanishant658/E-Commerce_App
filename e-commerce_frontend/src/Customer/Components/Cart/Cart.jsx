import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Navigation from "../Navigation/Navigation";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(500);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem("User"));
      const token = localStorage.getItem("token");

      if (!user || !token) return;

      try {
        const res = await axios.get(`http://localhost:8081/usercart/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const items = (res.data.cartItems || []).map((item) => ({
          id: item.id,
          name: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl,
        }));

        setCart(items);
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err.message);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (id, action, quantity) => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const token = localStorage.getItem("token");

      if (!user || !token) return;

      const newQuantity = action === "increase" ? quantity + 1 : quantity - 1;
      if (newQuantity <= 0) return;

      const res = await axios.patch(
        `http://localhost:8081/cartitem/${user.id}/${id}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const items = (res.data.cartItems || []).map((item) => ({
        id: item.id,
        name: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
      }));

      setCart(items);
    } catch (err) {
      console.error("Error updating quantity:", err.response?.data || err.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const token = localStorage.getItem("token");

      if (!user || !token) return;

      await axios.delete(`http://localhost:8081/cartItem/${user.id}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NISH1000") {
      setDiscount(1000);
      setMessage("✅ Coupon applied! ₹1000 discount added.");
    } else {
      setMessage("❌ Invalid coupon code!");
      setDiscount(500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <Navigation/>
      <div className="mt-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Cart Items */}
        <div className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
          <h1 className="text-3xl font-bold border-b pb-4 mb-4 text-gray-800 flex items-center gap-2">
            <ShoppingBagIcon className="text-orange-500" />
            My Cart ({cart.length})
          </h1>

          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4 hover:bg-gray-50 rounded-xl px-3 transition-all"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg border shadow-md object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-900">{item.name}</h2>
                    <p className="text-blue-600 font-bold text-lg">₹{item.price}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm hover:scale-105 flex items-center gap-1 transition"
                    >
                      <DeleteIcon fontSize="small" /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2 shadow">
                  <button
                    onClick={() => updateQuantity(item.id, "decrease", item.quantity)}
                    className="hover:bg-gray-300 p-1 rounded-full transition"
                  >
                    <RemoveIcon />
                  </button>
                  <span className="font-bold text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "increase", item.quantity)}
                    className="hover:bg-gray-300 p-1 rounded-full transition"
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <RemoveShoppingCartIcon style={{ fontSize: 60 }} />
              <p className="text-lg mt-2">Your cart is empty 😢</p>
            </div>
          )}
        </div>

        {/* Right Side - Price Summary */}
        <div className="bg-white shadow-xl rounded-2xl p-5 h-fit sticky top-6 border border-gray-200">
          <h2 className="text-xl font-bold border-b pb-3 mb-4 text-gray-800">
            Price Details
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Price ({cart.length} items)</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">-₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{total - discount}</span>
            </div>
          </div>

          {/* Coupon Input */}
          <div className="mt-6">
            <div className="flex items-center border rounded-lg px-2 mb-2">
              <LocalOfferIcon className="text-blue-500" />
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full p-2 outline-none"
              />
            </div>
            <button
              onClick={applyCoupon}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 shadow-md transition"
            >
              Apply Coupon
            </button>
            {message && (
              <p
                className={`mt-2 text-sm font-medium ${
                  message.includes("Invalid") ? "text-red-500" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          {/* Checkout Button */}
          <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-orange-600 hover:scale-[1.02] transition">
            <Link to="/checkout">Place Order</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
