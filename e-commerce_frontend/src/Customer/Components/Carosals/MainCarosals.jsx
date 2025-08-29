import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCarosalData } from "./MainCarosalData";

const items = MainCarosalData.map((item) => (
  <div
    className="relative w-full rounded-xl overflow-hidden shadow-lg"
    role="presentation"
    data-value={item.alt}
    key={item.alt}
  >
    <img
      src={item.image}
      alt={item.alt}
      className="w-full h-56 sm:h-72 md:h-80 lg:h-[400px] xl:h-[450px] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
    />
    {item.caption && (
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
        <h2 className="text-white text-center text-lg sm:text-xl md:text-2xl font-semibold">
          {item.caption}
        </h2>
      </div>
    )}
  </div>
));

export default function MainCarosals() {
  return (
    <div className="max-w-full mx-auto my-6">
      <AliceCarousel
        mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
        animationDuration={800}
        animationEasingFunction="ease-in-out"
        controlsStrategy="alternate"
      />
    </div>
  );
}
