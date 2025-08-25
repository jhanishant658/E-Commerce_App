import React, { useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCards/HomeSectionCard';
import { Button } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in white.",
    price: '$35',
    color: 'Aspen White',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: "Front of men's Basic Tee in dark gray.",
    price: '$35',
    color: 'Charcoal',
  },
  {
    id: 4,
    name: 'Artwork Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    price: '$35',
    color: 'Iso Dots',
  },
  {
    id: 5,
    name: 'Artwork Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    price: '$35',
    color: 'Iso Dots',
  },
  {
    id: 6,
    name: 'Artwork Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    price: '$35',
    color: 'Iso Dots',
  },
];

export default function HomeSectionCarousel() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 4 },
  };

  const items = products.map((product) => (
    <HomeSectionCard key={product.id} product={product} />
  ));

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
        Customers also purchased
      </h2>

      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        activeIndex={activeIndex}
        onSlideChanged={(e) => setActiveIndex(e.item)}
      />

      {/* Left Button */}
      {activeIndex > 0 && (
        <Button
          variant="contained"
          onClick={slidePrev}
          style={{
            position: 'absolute',
            top: '50%',
            left: '0.5rem',
            transform: 'translateY(-50%) rotate(90deg)',
            zIndex: 10,
            backgroundColor: '#f1f5f9', // light gray background
            color: '#000', // black arrow color
            boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
          }}
          aria-label="Previous"
        >
          <KeyboardDoubleArrowLeftIcon style={{ transform: 'rotate(-90deg)' }} />
        </Button>
      )}

      {/* Right Button */}
      {activeIndex < products.length - 4 && (
        <Button
          variant="contained"
          onClick={slideNext}
          style={{
            position: 'absolute',
            top: '50%',
            right: '0.5rem',
            transform: 'translateY(-50%) rotate(-90deg)',
            zIndex: 10,
            backgroundColor: '#f1f5f9',
            color: '#000',
            boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
          }}
          aria-label="Next"
        >
          <KeyboardDoubleArrowLeftIcon style={{ transform: 'rotate(-90deg)' }} />
        </Button>
      )}
    </div>
  );
}
