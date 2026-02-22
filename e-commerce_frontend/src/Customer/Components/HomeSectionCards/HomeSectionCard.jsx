'use client'

import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HomeSectionCard({ product }) {
  const [open, setOpen] = useState(false)

  if (!product) {
    return (
      <div className="p-4 text-center text-sm text-red-500 border rounded-md">
        Product data is missing
      </div>
    )
  }

  // Map backend fields
  const imageSrc = product.imageUrl
  const name = product.title
  const brand = product.brand
  const price = product.discountedPrice || product.price
  const originalPrice = product.price
  const discountPercent = product.discountpercent
  const color = product.color
  const description = product.description
  const sizes = product.sizes || []
  const stock = product.stock

  // Ratings
  const averageRating = product.ratings.length
    ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length
    : Math.floor(Math.random() * 5) + 1 // Fallback to random rating if no ratings available

  const numberOfRatings = product.ratings.length

  return (
    <>
      {/* Product Card */}
      <div
        key={product.id}
        onClick={() => setOpen(true)}
        className="group relative mt-6 mb-6 p-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer"
      >
        {/* Product Image */}
        <div className="overflow-hidden rounded-xl bg-gray-50">
          <img
            alt={name}
            src={imageSrc}
            className="h-64 w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info Section */}
        <div className="mt-4 flex flex-col gap-1">
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>

          <p className="text-sm text-gray-500">{brand}</p>
          <p className="text-sm text-gray-500">{color}</p>

          {/* Ratings */}
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  averageRating > rating ? 'text-yellow-500' : 'text-gray-300',
                  'h-4 w-4'
                )}
              />
            ))}

            {numberOfRatings > 0 && (
              <span className="ml-1 text-xs text-indigo-600">
                {numberOfRatings} ratings
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex gap-2 items-center">
            <p className="text-indigo-600 font-bold">₹{price}</p>

            {discountPercent && (
              <p className="text-gray-500 line-through text-sm">
                ₹{originalPrice}
              </p>
            )}

            {discountPercent && (
              <p className="text-green-600 text-sm font-medium">
                {discountPercent} OFF
              </p>
            )}
          </div>

          <p className="text-sm text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <span
                key={size.name}
                className="border px-2 py-1 rounded text-xs bg-gray-100"
              >
                {size.name} ({size.quantity})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl transform rounded-2xl bg-white shadow-2xl transition-all">
            
            {/* Inner Content */}
            <div className="relative flex flex-col md:flex-row gap-6 p-6 overflow-y-auto max-h-[90vh]">

              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {/* Image */}
              <div className="w-full md:w-1/2 bg-gray-50 rounded-xl flex items-center justify-center">
                <img
                  alt={name}
                  src={imageSrc}
                  className="max-h-[350px] object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex w-full md:w-1/2 flex-col gap-3">

                <h2 className="text-2xl font-bold text-gray-900">
                  {name}
                </h2>

                <p className="text-sm text-gray-500">{brand}</p>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{price}
                  </p>

                  {discountPercent && (
                    <span className="line-through text-gray-400">
                      ₹{originalPrice}
                    </span>
                  )}

                  {discountPercent && (
                    <span className="text-green-600 text-sm font-medium">
                      {discountPercent} OFF
                    </span>
                  )}
                </div>

                <p className="text-gray-500">{color}</p>
                <p className="text-sm text-gray-600">{description}</p>

                {/* Ratings */}
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        averageRating > rating ? 'text-yellow-500' : 'text-gray-300',
                        'h-5 w-5'
                      )}
                    />
                  ))}
                  {numberOfRatings > 0 && (
                    <span className="text-sm font-medium text-indigo-600">
                      {numberOfRatings} ratings
                    </span>
                  )}
                </div>

                {/* Sizes */}
                {sizes.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {sizes.map((size) => (
                      <span
                        key={size.name}
                        className="border px-3 py-1 rounded-lg text-sm bg-gray-100 hover:bg-indigo-100 cursor-pointer transition"
                      >
                        {size.name} ({size.quantity})
                      </span>
                    ))}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-4">

                  <Link
                    to={`/product/${product.id}`}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center"
                  >
                    Add to Bag
                  </Link>

                  <Link
                    to={`/product/${product.id}`}
                    className="w-full text-center rounded-xl border border-indigo-600 px-6 py-3 text-indigo-600 font-medium hover:bg-indigo-50 transition"
                  >
                    View Full Detail
                  </Link>

                </div>

              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}