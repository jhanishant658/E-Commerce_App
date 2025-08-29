import React, { useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCards/HomeSectionCard';
import { Button } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const products = [
  {
    id: 1,
    product_type: 't-shirt',
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    color: 'White',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla!',
    rating: 4,
  },
  {
    id: 2,
    product_type: 't-shirt',
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    color: 'Green',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla!',
    rating: 4,
  },
  {
    id: 3,
    product_type: 't-shirt',
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    color: 'White',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla!',
    rating: 5,
  },
  {
    id: 4,
    product_type: 't-shirt',
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla!',
    rating: 4,
  },
  {
    id: 5,
    product_type: 't-shirt',
    name: 'Focus Card Tray',
    href: '#',
    price: '$64',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
    color: 'Brown',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla!',
    rating: 4,
  },
  {
    id: 6,
    product_type: 't-shirt',
    name: 'Focus Multi-Pack',
    href: '#',
    price: '$39',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg',
    imageAlt:
      'Stack of 3 small drab green cardboard paper card refill boxes with white text.',
    color: 'Green',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla!',
    rating: 5,
  },
  {
    id: 7,
    product_type: 't-shirt',
    name: 'Brass Scissors',
    href: '#',
    price: '$50',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg',
    imageAlt:
      'Brass scissors with geometric design, black steel finger holes, and included upright brass stand.',
    color: 'Brass',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla!',
    rating: 3,
  },
  {
    id: 8,
    product_type: 't-shirt',
    name: 'Focus Carry Pouch',
    href: '#',
    price: '$32',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
    color: 'Gray',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla!',
    rating: 4,
  },
];

export default function HomeSectionCarousel({ sectionName }) {
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
