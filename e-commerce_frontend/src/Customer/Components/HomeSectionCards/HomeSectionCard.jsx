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

  // Map backend fields to UI expected fields
  const imageSrc = product.imageUrl
  const name = product.title
  const price = product.discountedPrice || product.price

  return (
    <>
      {/* Product Card */}
      <div
        key={product.id}
        className="group relative mt-6 mb-6 p-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      >
        {/* Product Image */}
        <div className="overflow-hidden rounded-xl">
          <img
            alt={name}
            src={imageSrc}
            className="aspect-square w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info Section */}
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color || ''}</p>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
          </div>
          <p className="text-base font-bold text-indigo-600">₹{price}</p>
        </div>

        {/* Quick Overview Button */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition-colors duration-300"
          >
            Quick Overview
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
              <div className="relative flex w-full flex-col md:flex-row items-start overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-lg gap-6">
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Product Image */}
                <img
                  alt={name}
                  src={imageSrc}
                  className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover md:w-1/2"
                />

                {/* Product Details */}
                <div className="flex w-full flex-col md:w-1/2 gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                  <p className="text-2xl text-gray-900">₹{price}</p>

                  {/* Ratings */}
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          (product.rating || 0) > rating ? 'text-yellow-500' : 'text-gray-300',
                          'h-5 w-5'
                        )}
                      />
                    ))}
                    {product.numberOfRatings > 0 && (
                      <span className="ml-2 text-sm font-medium text-indigo-600">
                        {product.numberOfRatings} ratings
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 mt-4">
                    <button className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition">
                      Add to Bag
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full text-center rounded-lg border border-indigo-600 px-6 py-3 text-indigo-600 font-medium hover:bg-indigo-50 transition"
                    >
                      View Full Detail
                    </Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
