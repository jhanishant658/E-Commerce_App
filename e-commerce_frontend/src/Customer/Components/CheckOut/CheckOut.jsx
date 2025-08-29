import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";
import Signin from "../Authentication/Signin";

const steps = ["Address", "Order Summary", "Payment"];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const querySearch = new URLSearchParams(location.search);
  const stepFromUrl = parseInt(querySearch.get("step")) || 1;

  const [activeStep, setActiveStep] = useState(stepFromUrl);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Sync URL param and state
  useEffect(() => {
    setActiveStep(stepFromUrl);
  }, [stepFromUrl]);

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

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <DeliveryAddressForm onDeliverHere={handleAddressSelection} />;
      case 2:
        return <OrderSummary deliveryAddress={selectedAddress} />;
      case 3:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Gateway
            </h2>
            <p className="text-gray-600 mb-6">
              This is where your payment integration will go.
            </p>
            <Button
              variant="contained"
              color="success"
              onClick={() => alert("Payment Successful!")}
            >
              Pay Now
            </Button>
          </div>
        );
      default:
        return <Signin />;
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
