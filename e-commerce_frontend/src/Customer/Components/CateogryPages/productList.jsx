'use client'

import HomeSectionCard from "../HomeSectionCards/HomeSectionCard"

const products = [

  {
    id: 1,
     product_type:'t-shirt',
    name: 'Earthen Bottle',
    quantity:10 , 
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    color: 'White' ,
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    rating: 4,
  },
  {
    id: 2,
     product_type:'t-shirt',
    name: 'Nomad Tumbler',
      quantity:10 ,
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    color: 'Green' ,
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    rating: 4,
  },
  {
    id: 3,
     product_type:'t-shirt',
    name: 'Focus Paper Refill',
      quantity:10 ,
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    color: 'White' ,
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    rating: 5,
  },
  {
    id: 4,
     product_type:'t-shirt',
    name: 'Machined Mechanical Pencil',
      quantity:10 ,
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black' ,
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    rating: 4,
  },
  {
    id: 5,
     product_type:'t-shirt',
    name: 'Focus Card Tray',
      quantity:10 ,
    href: '#',
    price: '$64',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
    color: 'Brown' ,
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    rating: 4
  },
  {
    id: 6,
     product_type:'t-shirt',
    name: 'Focus Multi-Pack',
      quantity:10 ,
    href: '#',
    price: '$39',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg',
    imageAlt: 'Stack of 3 small drab green cardboard paper card refill boxes with white text.',
    color: 'Green' ,
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    rating: 5,
  },
  {
    id: 7,
     product_type:'t-shirt',
    name: 'Brass Scissors',
      quantity:10 ,
    href: '#',
    price: '$50',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg',
    imageAlt: 'Brass scissors with geometric design, black steel finger holes, and included upright brass stand.',
    color: 'Brass' ,
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    rating: 3,
  },
  {
    id: 8,
     product_type:'t-shirt',
    name: 'Focus Carry Pouch',
      quantity:10 ,
    href: '#',
    price: '$32',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg',
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
    color: 'Gray' ,
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    rating: 4,
  },

]


export default function ProductList() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            
            <HomeSectionCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}