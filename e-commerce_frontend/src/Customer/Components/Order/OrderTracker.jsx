import React, { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box, Typography } from "@mui/material";

const steps = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export default function OrderTracker({ status }) {
  const statusIndex = steps.findIndex((s) => s === status);
  const [animatedStep, setAnimatedStep] = useState(0);

  useEffect(() => {
    if (statusIndex < 0) return;
    let currentStep = 0;
    setAnimatedStep(0); // reset animation for new status

    const interval = setInterval(() => {
      if (currentStep > statusIndex) {
        clearInterval(interval);
        setAnimatedStep(statusIndex); // final step
      } else {
        setAnimatedStep(currentStep);
        currentStep++;
      }
    }, 500);

    return () => clearInterval(interval); // cleanup on unmount / status change
  }, [statusIndex]); // depend only on current status

  return (
    <Box className="bg-white shadow-md rounded-xl p-6 w-full">
      <Typography variant="h6" className="mb-4 font-semibold text-center">
        Track Your Order
      </Typography>

      <Stepper activeStep={animatedStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              icon={
                index <= animatedStep ? (
                  <CheckCircleIcon className="text-green-600" />
                ) : (
                  <RadioButtonUncheckedIcon className="text-gray-400" />
                )
              }
            >
              <Typography
                className={`${
                  index <= animatedStep ? "text-gray-900 font-medium" : "text-gray-500"
                } text-sm`}
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
