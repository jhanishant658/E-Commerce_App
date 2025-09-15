import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";
import axios from "axios";

const steps = ["Address", "Order Summary", "Payment"];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const querySearch = new URLSearchParams(location.search);
  const stepFromUrl = parseInt(querySearch.get("step")) || 1;

  const [activeStep, setActiveStep] = useState(stepFromUrl);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // ✅ Sync URL param and state
  useEffect(() => {
    setActiveStep(stepFromUrl);
  }, [stepFromUrl]);

  // ✅ Address selection → step 2
  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    navigate(`?step=2`);
  };

  const handleBack = () => {
    if (activeStep > 1) {
      const prevStep = activeStep - 1;
      navigate(`?step=${prevStep}`);
    }
  };

  // ✅ Payment Function
  const handlePayment = async () => {
    try {
      const amount = location.state?.orderSummary?.grandTotal || 0;

      const orderResponse = await axios.post(
        "http://localhost:8081/payment/create-order",
        { amount }
      );

      const { key, orderId, amount: razorAmount, currency } =
        orderResponse.data;

      const options = {
        key,
        amount: razorAmount,
        currency,
        name: "My E-Commerce",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          console.log("✅ Payment Success:", response);

          try {
           const user = JSON.parse(localStorage.getItem("User"));
            const userId = user?.id;
            const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
console.log(savedAddress);
            // ✅ Place Order After Payment
            const res = await axios.post(
              `http://localhost:8081/order/${userId}`,
              savedAddress
            );

            console.log("✅ Order Placed:", res.data);
            alert("Payment Successful! Your Order is Placed.");
            navigate("/order");
          } catch (err) {
            console.error("❌ Order Placement Failed:", err);
            alert("Payment done but order not placed. Contact support.");
          }
        },
        prefill: {
          name: selectedAddress?.firstName || "Customer",
          email: "customer@example.com",
          contact: selectedAddress?.phone || "9999999999",
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Error initiating payment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // ✅ Render Steps
  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <DeliveryAddressForm onDeliverHere={handleAddressSelection} />;
      case 2:
        return (
          <OrderSummary
            deliveryAddress={selectedAddress}
            onProceed={() => navigate(`?step=3`)}
          />
        );
      case 3:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Gateway
            </h2>
            <p className="text-gray-600 mb-6">
              Click below to pay securely using Razorpay.
            </p>
            <Button variant="contained" color="success" onClick={handlePayment}>
              Pay Now
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-5 lg:mt-10 px-6 lg:px-20">
      <Box sx={{ width: "100%" }}>
        {/* Stepper */}
        <Stepper activeStep={activeStep - 1}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Back Button */}
        {activeStep > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mt: 3,
              mb: 4,
            }}
          >
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleBack}
              sx={{ textTransform: "none" }}
            >
              ← Back
            </Button>
          </Box>
        )}

        {/* Step Content */}
        <div>{renderStepContent()}</div>
      </Box>
    </div>
  );
}
