import React, { useRef, useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCards/HomeSectionCard';
import { Button } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import axios from 'axios';

export default function HomeSectionCarousel({ sectionName }) {
  const [products, setProducts] = useState([]);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProductByCategory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:8081/products/category/${sectionName}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched Products:", res.data); // 👀 check response in console
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err.message);
      }
    };

    fetchProductByCategory();
  }, [sectionName]);

  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 4 },
  };

  const items = products.map((product) => (
    <div key={product.id} className="px-2">
      <HomeSectionCard product={product} />
    </div>
  ));

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20">
      {/* Section Heading */}
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">
        {sectionName || 'Customers also purchased'}
      </h2>

      {/* Carousel */}
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        activeIndex={activeIndex}
        onSlideChanged={(e) => setActiveIndex(e.item)}
        infinite
      />

      {/* Navigation Buttons */}
      {activeIndex > 0 && (
        <Button
          variant="contained"
          onClick={slidePrev}
          style={{
            position: 'absolute',
            top: '50%',
            left: '1rem',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: '#ffffff',
            color: '#1e293b',
            boxShadow: '0px 3px 10px rgba(0,0,0,0.15)',
            borderRadius: '50%',
            minWidth: '40px',
            height: '40px',
          }}
          aria-label="Previous"
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
      )}

      {activeIndex < products.length - 4 && (
        <Button
          variant="contained"
          onClick={slideNext}
          style={{
            position: 'absolute',
            top: '50%',
            right: '1rem',
            transform: 'translateY(-50%) rotate(180deg)',
            zIndex: 10,
            backgroundColor: '#ffffff',
            color: '#1e293b',
            boxShadow: '0px 3px 10px rgba(0,0,0,0.15)',
            borderRadius: '50%',
            minWidth: '40px',
            height: '40px',
          }}
          aria-label="Next"
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
      )}
    </div>
  );
}
