import React, { useState } from "react";

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

  const handleDeleteAddress = (id) => {
    setSavedAddresses(savedAddresses.filter((addr) => addr.id !== id));
  };

  const handleDeliverHere = (address) => {
    alert(
      `Delivering to: ${address.firstName} ${address.lastName}\n${address.address} - ${address.pincode}\nPhone: ${address.phone}`
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left - Saved Addresses */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Saved Addresses
        </h2>
        {savedAddresses.length === 0 ? (
          <p className="text-gray-500">No saved addresses.</p>
        ) : (
          savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="flex flex-col border rounded-lg p-3 mb-3 hover:shadow-md"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {addr.firstName} {addr.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {addr.address} - {addr.pincode}
                  </p>
                  <p className="text-gray-600 text-sm">Phone: {addr.phone}</p>
                  {addr.landmark && (
                    <p className="text-gray-500 text-sm">
                      Landmark: {addr.landmark}
                    </p>
                  )}
                  {addr.notes && (
                    <p className="text-gray-500 text-sm">Notes: {addr.notes}</p>
                  )}
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  onClick={() => handleDeleteAddress(addr.id)}
                >
                  Delete
                </button>
              </div>
              <button
                className="mt-3 bg-green-500 text-white py-1 rounded-lg hover:bg-green-600"
                onClick={() => handleDeliverHere(addr)}
              >
                Deliver Here
              </button>
            </div>
          ))
        )}
      </div>

      {/* Right - Add New Address */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
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
              className="border w-1/2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newAddress.lastName}
              onChange={handleInputChange}
              className="border w-1/2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <textarea
            name="address"
            placeholder="Full Address"
            value={newAddress.address}
            onChange={handleInputChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          ></textarea>
          <div className="flex gap-3">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={handleInputChange}
              className="border w-1/2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={handleInputChange}
              className="border w-1/2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={newAddress.landmark}
            onChange={handleInputChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="notes"
            placeholder="Delivery Notes (Optional)"
            value={newAddress.notes}
            onChange={handleInputChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3">
            <button
              className="bg-blue-500 text-white w-1/2 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleAddAddress}
            >
              Save Address
            </button>
            <button
              className="bg-green-500 text-white w-1/2 py-2 rounded-lg hover:bg-green-600"
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
