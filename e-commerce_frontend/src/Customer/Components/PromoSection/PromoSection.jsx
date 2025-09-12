import { motion } from "framer-motion";

export default function PromoSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="pt-16 pb-32 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          {/* Text Section */}
          <motion.div
            className="sm:max-w-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight">
              ☀️ Summer styles are finally here
            </h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              Discover our new summer collection – designed to keep you stylish
              and comfortable even in the hottest days.
            </p>
          </motion.div>

          {/* Image Grid */}
          <div className="mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <motion.div
                className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-6 lg:space-x-8">
                  {[[
                    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg",
                    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg",
                  ], [
                    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg",
                    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg",
                    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg",
                  ], [
                    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg",
                    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg",
                  ]].map((column, columnIndex) => (
                    <div key={columnIndex} className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {column.map((img, i) => (
                        <motion.div
                          key={i}
                          className="h-64 w-44 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <img
                            src={img}
                            alt=""
                            className="size-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="#"
              className="inline-block mt-10 rounded-full bg-indigo-600 px-8 py-3 text-center font-semibold text-white shadow-lg hover:shadow-2xl hover:bg-indigo-700 transition transform hover:-translate-y-1"
              whileTap={{ scale: 0.95 }}
            >
              🛍️ Shop Collection
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
