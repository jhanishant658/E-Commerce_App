import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarosalData } from './MainCarosalData';



const items = MainCarosalData.map((item) => (
    <div className="item " role='presentation' data-value={item.alt} key={item.alt}>
        <img 
  src={item.image} 
  alt={item.alt} 
  className="cursor-pointer  w-full h-56 sm:h-72 md:h-80 lg:h-[400px] xl:h-[450px] object-cover" 
/>

        <h2 className="text-center mt-2">{item.caption}</h2>
    </div>
));

export default function MainCarosals() {
  return (
    <>
   <div >
  <AliceCarousel
    mouseTracking
    items={items}
    disableButtonsControls
    autoPlay
    autoPlayInterval={1000}
    infinite
    animationDuration={800}
    animationEasingFunction="ease-in-out"
    controlsStrategy="alternate"
  />

</div>
   
</>
  )
}
