import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Card, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function OrderRating({ orderId, savedRatings, setSavedRatings }) {
  const existingRating = savedRatings[orderId] || null;

  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(!!existingRating);

  useEffect(() => {
    if (existingRating) {
      setRatingValue(existingRating.rating);
      setReview(existingRating.review);
      setSubmitted(true);
    } else {
      setRatingValue(0);
      setReview("");
      setSubmitted(false);
    }
  }, [orderId, existingRating]);

  const handleSubmit = () => {
    if (ratingValue === 0) {
      alert("Please give a rating!");
      return;
    }

    setSavedRatings((prev) => ({
      ...prev,
      [orderId]: { rating: ratingValue, review },
    }));
    setSubmitted(true);
  };

  return (
    <Box>
      {!submitted ? (
        <Card className="p-4 bg-white shadow-md flex flex-col gap-3">
          <Typography variant="h6">Give your rating</Typography>
          <Box className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`cursor-pointer ${
                  star <= ratingValue ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRatingValue(star)}
              />
            ))}
          </Box>
          <TextField
            label="Write your review"
            multiline
            rows={3}
            variant="outlined"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Rating
          </Button>
        </Card>
      ) : (
        <Card className="p-4 bg-white shadow-md flex flex-col gap-2">
          <Box className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`${
                  star <= ratingValue ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </Box>
          {review && <Typography>{review}</Typography>}
        </Card>
      )}
    </Box>
  );
}
