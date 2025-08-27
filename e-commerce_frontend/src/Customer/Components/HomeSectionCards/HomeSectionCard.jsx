'use client'

import React, { useState } from 'react'
import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import ProductDescription from '../ProductDescription/ProductDescription';



// Helper for joining classes safely
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

  return (
    <>
      {/* Product Card */}
      <div
        key={product.id}
        className="group relative mt-6 p-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      >
        {/* Product Image */}
        <div className="overflow-hidden rounded-xl">
          <img
            alt={product.imageAlt || product.name}
            src={product.imageSrc}
            className="aspect-square w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info Section */}
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color || ''}</p>
          </div>
          <p className="text-base font-bold text-indigo-600">{product.price}</p>
        </div>

        {/* Hover Button Below Info */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-indigo-700 transition-colors duration-300"
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
              <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-lg">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Modal Content */}
                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  {/* Product Image */}
                  <img
                    alt={product.imageAlt || product.name}
                    src={product.imageSrc}
                    className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                  />

                  {/* Product Details */}
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>

                    {/* Price */}
                    <section className="mt-2">
                      <p className="text-2xl text-gray-900">{product.price}</p>

                      {/* Ratings */}
                      <div className="mt-4 flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                product.rating > rating ? 'text-yellow-500' : 'text-gray-200',
                                'size-5 shrink-0'
                              )}
                            />
                          ))}
                        </div>
                        {product.reviewCount && (
                          <a
                            href="#"
                            className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            {product.reviewCount} reviews
                          </a>
                        )}
                      </div>
                    </section>

                    {/* Colors */}
                    {product.colors?.length > 0 && (
                      <section className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">Colors</h3>
                        <div className="mt-3 flex items-center gap-x-3">
                          {product.colors.map((color) => (
                            <div
                              key={color.id}
                              className="flex rounded-full outline outline-1 outline-gray-300"
                            >
                              <div
                                className={classNames(
                                  color.classes,
                                  'size-8 rounded-full border border-gray-300'
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col gap-3">
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to Bag
                      </button>
                      <button
                        type="button"
                        
                        className="flex w-full items-center justify-center rounded-md border border-indigo-600 px-8 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 transition"
                        on Click={() => <ProductDescription  product={product}/>}
                      >
                       <Link to={`/product/${product.id}`} 
                        className="w-full text-center">
                     View Full Detail
                    </Link>
                      </button>
                    </div>
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
