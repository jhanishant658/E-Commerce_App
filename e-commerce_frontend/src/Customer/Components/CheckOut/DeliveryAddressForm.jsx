import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DeliveryAddressForm() {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    mobile: "",
    userId: 1, // hardcoded for now, later from logged-in user
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    const { firstname, lastname, streetaddress, city, state, zipcode, country, mobile } =
      newAddress;

    if (!firstname || !lastname || !streetaddress || !city || !state || !zipcode || !country || !mobile) {
      alert("Please fill in all required fields.");
      return;
    }

    // Add to local state onlysetSavedAddresses([...savedAddresses, newAddress]);
    

    // Reset form
    setNewAddress({
      firstname: "",
      lastname: "",
      streetaddress: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      mobile: "",
      userId: 1,
    });

    alert("Address saved successfully ✅");
  };

  const handleDeliverHere = (address) => {
    // Save selected address in localStorage ONLY on Deliver Here
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    console.log("Selected Address:", address);
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
          savedAddresses.map((addr, index) => (
            <div
              key={index}
              className="flex flex-col border rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {addr.firstname} {addr.lastname}
                  </h3>
                  <p className="text-gray-700">
                    {addr.streetaddress}, {addr.city}, {addr.state} - {addr.zipcode}
                  </p>
                  <p className="text-gray-700">
                    {addr.country} | Phone: {addr.mobile}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSavedAddresses(savedAddresses.filter((_, i) => i !== index))
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
              name="firstname"
              placeholder="First Name"
              value={newAddress.firstname}
              onChange={handleInputChange}
              className="border w-1/2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={newAddress.lastname}
              onChange={handleInputChange}
              className="border w-1/2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>
          <input
            type="text"
            name="streetaddress"
            placeholder="Street Address"
            value={newAddress.streetaddress}
            onChange={handleInputChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <div className="flex gap-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newAddress.city}
              onChange={handleInputChange}
              className="border w-1/3 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={newAddress.state}
              onChange={handleInputChange}
              className="border w-1/3 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              value={newAddress.zipcode}
              onChange={handleInputChange}
              className="border w-1/3 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={newAddress.country}
            onChange={handleInputChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={newAddress.mobile}
            onChange={handleInputChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />

          <div className="flex gap-3 mt-2">
            <button
              className="bg-blue-500 text-white w-1/2 py-3 rounded-lg hover:bg-blue-600 font-semibold shadow-md transition"
              onClick={handleSaveAddress}
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
