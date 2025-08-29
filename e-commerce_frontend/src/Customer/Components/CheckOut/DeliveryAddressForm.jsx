import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DeliveryAddressForm() {
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      firstName: "Nishant",
      lastName: "Jha",
      address: "123 MG Road, Bangalore, Karnataka",
      pincode: "560001",
      phone: "9876543210",
      landmark: "Near Metro Station",
      notes: "Ring the bell twice",
    },
    {
      id: 2,
      firstName: "Ravi",
      lastName: "Kumar",
      address: "45 IT Park, Pune, Maharashtra",
      pincode: "411001",
      phone: "9876501234",
      landmark: "Opposite Cafe Coffee Day",
      notes: "Call before delivery",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    phone: "",
    landmark: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    const { firstName, lastName, address, pincode, phone } = newAddress;
    if (!firstName || !lastName || !address || !pincode || !phone) {
      alert("Please fill in all required fields.");
      return;
    }
    setSavedAddresses([
      ...savedAddresses,
      { id: savedAddresses.length + 1, ...newAddress },
    ]);
    setNewAddress({
      firstName: "",
      lastName: "",
      address: "",
      pincode: "",
      phone: "",
      landmark: "",
      notes: "",
    });
  };

  const handleDeliverHere = (address) => {
    navigate("/checkout?step=2", { state: { selectedAddress: address } });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Saved Addresses */}
      <div className="w-full md:w-1/2 bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Saved Addresses
        </h2>
        {savedAddresses.length === 0 ? (
          <p className="text-gray-500">No saved addresses.</p>
        ) : (
          savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="flex flex-col border rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {addr.firstName} {addr.lastName}
                  </h3>
                  <p className="text-gray-700">{addr.address} - {addr.pincode}</p>
                  <p className="text-gray-700">Phone: {addr.phone}</p>
                  {addr.landmark && <p className="text-gray-500">Landmark: {addr.landmark}</p>}
                  {addr.notes && <p className="text-gray-500">Notes: {addr.notes}</p>}
                </div>
                <button
                  onClick={() =>
                    setSavedAddresses(savedAddresses.filter((a) => a.id !== addr.id))
                  }
                  className="text-red-500 hover:text-red-600 ml-2 p-2 rounded-full transition"
                  title="Delete Address"
                >
                  <DeleteOutlineIcon />
                </button>
              </div>
              <button
                onClick={() => handleDeliverHere(addr)}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
              >
                Deliver Here
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add New Address */}
      <div className="w-full md:w-1/2 bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add New Address
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newAddress.firstName}
              onChange={handleInputChange}
              className="border w-1/2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newAddress.lastName}
              onChange={handleInputChange}
              className="border w-1/2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>
          <textarea
            name="address"
            placeholder="Full Address"
            value={newAddress.address}
            onChange={handleInputChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            rows="3"
          ></textarea>
          <div className="flex gap-3">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={handleInputChange}
              className="border w-1/2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={handleInputChange}
              className="border w-1/2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={newAddress.landmark}
            onChange={handleInputChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <input
            type="text"
            name="notes"
            placeholder="Delivery Notes (Optional)"
            value={newAddress.notes}
            onChange={handleInputChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <div className="flex gap-3 mt-2">
            <button
              className="bg-blue-500 text-white w-1/2 py-3 rounded-lg hover:bg-blue-600 font-semibold shadow-md transition"
              onClick={handleAddAddress}
            >
              Save Address
            </button>
            <button
              className="bg-green-500 text-white w-1/2 py-3 rounded-lg hover:bg-green-600 font-semibold shadow-md transition"
              onClick={() => handleDeliverHere(newAddress)}
            >
              Deliver Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
