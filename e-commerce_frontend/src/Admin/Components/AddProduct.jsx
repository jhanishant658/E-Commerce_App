import { useState } from "react";
import axios from "axios";
import { CheckCircle, Error as ErrorIcon, AddCircle, RemoveCircle } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateProductPage() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    discountpercent: "",
    quantity: "",
    brand: "",
    color: "",
    sizes: [
      { name: "S", quantity: "" },
      { name: "M", quantity: "" },
      { name: "L", quantity: "" },
      { name: "XL", quantity: "" },
    ],
    imageUrl: "",
    firstlevelCategory: "",
    secondlevelCategory: "",
    thirdlevelCategory: "",
    stock: "",
  });

  const [popup, setPopup] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...product.sizes];
    updatedSizes[index][field] = value;
    setProduct({ ...product, sizes: updatedSizes });
  };

  const addSize = () => {
    setProduct({
      ...product,
      sizes: [...product.sizes, { name: "", quantity: "" }],
    });
  };

  const removeSize = (index) => {
    const updatedSizes = product.sizes.filter((_, i) => i !== index);
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://e-commerce-app-9vum.onrender.com/admin/products", {
        ...product,
        price: Number(product.price),
        discountedPrice: Number(product.discountedPrice),
        quantity: Number(product.quantity),
        stock: Number(product.stock),
        sizes: product.sizes.map((s) => ({
          name: s.name,
          quantity: Number(s.quantity),
        })),
      });

      setPopup({ message: "Product added successfully!", type: "success" });

      // Reset form
      setProduct({
        title: "",
        description: "",
        price: "",
        discountedPrice: "",
        discountpercent: "",
        quantity: "",
        brand: "",
        color: "",
        sizes: [
          { name: "S", quantity: "" },
          { name: "M", quantity: "" },
          { name: "L", quantity: "" },
          { name: "XL", quantity: "" },
        ],
        imageUrl: "",
        firstlevelCategory: "",
        secondlevelCategory: "",
        thirdlevelCategory: "",
        stock: "",
      });
    } catch (err) {
      setPopup({ message: "Failed to add product!", type: "error" });
    }
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛒 Create Product
      </h2>

      {/* Animated Popup */}
      <AnimatePresence>
        {popup.message && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 text-white z-50 ${
              popup.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {popup.type === "success" ? <CheckCircle /> : <ErrorIcon />}
            <span className="font-medium">{popup.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white shadow-lg rounded-2xl p-6"
      >
        {[
          { name: "title", placeholder: "Product Title" },
          { name: "brand", placeholder: "Brand" },
          { name: "price", placeholder: "Price", type: "number" },
          { name: "discountedPrice", placeholder: "Discounted Price", type: "number" },
          { name: "discountpercent", placeholder: "Discount Percent (e.g. 20%)" },
          { name: "quantity", placeholder: "Quantity", type: "number" },
          { name: "stock", placeholder: "Stock", type: "number" },
          { name: "color", placeholder: "Color" },
          { name: "firstlevelCategory", placeholder: "First Level Category" },
          { name: "secondlevelCategory", placeholder: "Second Level Category" },
          { name: "thirdlevelCategory", placeholder: "Third Level Category" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            value={product[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            required={["title", "brand", "price", "discountedPrice", "quantity", "stock", "firstlevelCategory"].includes(field.name)}
          />
        ))}

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 p-3 rounded-lg col-span-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="border border-gray-300 p-3 rounded-lg col-span-2"
        />

        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-3">📏 Sizes</h3>
          {product.sizes.map((size, index) => (
            <div key={index} className="flex gap-3 mb-2">
              <input
                type="text"
                placeholder="Size Name"
                value={size.name}
                onChange={(e) => handleSizeChange(index, "name", e.target.value)}
                className="border p-2 rounded-lg w-1/3"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={size.quantity}
                onChange={(e) =>
                  handleSizeChange(index, "quantity", e.target.value)
                }
                className="border p-2 rounded-lg w-1/3"
              />
              {index > 3 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <RemoveCircle />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="flex items-center text-blue-500 mt-2 hover:underline"
          >
            <AddCircle className="mr-1" /> Add Size
          </button>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          ➕ Create Product
        </button>
      </form>
    </div>
  );
}
