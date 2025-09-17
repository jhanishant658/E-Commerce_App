'use client'
import Footer from '../Footer/Footer'
import { useState } from 'react'
import {
  Dialog, DialogBackdrop, DialogPanel, Disclosure,
  DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductList from './productList'
import { useParams } from 'react-router-dom'

const sortOptions = [
   { name: 'Discount: Low to High', value: 'discountAsc', current: false },
  { name: 'Discount :High to Low', value: 'discountDesc', current: false },
  { name: 'Price: Low to High', value: 'priceDesc', current: false },
  { name: 'Price: High to Low', value: 'priceDesc', current: false },
]

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: ['White','Beige','Blue','Brown','Green','Purple']
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      '0 - 100','100 - 200','200 - 300','300 - 400','400 - 500',
      '500 - 600','600 - 700','700 - 800','800 - 900','900 - 1000'
    ]
  },
  {
    id: 'discount',
    name: 'Discount',
    options: ['10% - 20%','30% - 40%','50% - 60%','70% - 80%','90% - 100%']
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Category() {
  const params = useParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // 🟢 Selected filters ka state
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    minPrice: null,
    maxPrice: null,
    discountRange: null,
    sortBy: null,
  })

  // 🟢 Checkbox toggle handler
  const handleFilterChange = (sectionId, option) => {
    setSelectedFilters((prev) => {
      if (sectionId === "color") {
        let newColors = prev.colors.includes(option)
          ? prev.colors.filter(c => c !== option)
          : [...prev.colors, option]
        return { ...prev, colors: newColors }
      }

      if (sectionId === "price") {
        const [min, max] = option.split('-').map(v => v.trim())
        return { ...prev, minPrice: min, maxPrice: max }
      }

      if (sectionId === "discount") {
        const [min, max] = option.replace('%','').split('-').map(v => v.trim())
        return { ...prev, discountRange: { min, max } }
      }

      return prev
    })
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>
          {/* Sort Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDownIcon className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"/>
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option.value}>
                    <button
                      onClick={() => setSelectedFilters((prev) => ({ ...prev, sortBy: option.value }))}
                      className={classNames(option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                        'block px-4 py-2 text-sm hover:bg-gray-100')}
                    >
                      {option.name}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filter Sidebar */}
            <form className="hidden lg:block">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon className="size-5 group-data-open:hidden" />
                        <MinusIcon className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {section.options.map((option, idx) => (
                        <div key={option} className="flex gap-3">
                          <input
                            type="checkbox"
                            id={`${section.id}-${idx}`}
                            checked={
                              section.id === "color"
                                ? selectedFilters.colors.includes(option)
                                : section.id === "price"
                                  ? `${selectedFilters.minPrice} - ${selectedFilters.maxPrice}` === option
                                  : section.id === "discount"
                                    ? `${selectedFilters.discountRange?.min}% - ${selectedFilters.discountRange?.max}%` === option
                                    : false
                            }
                            onChange={() => handleFilterChange(section.id, option)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                          />
                          <label htmlFor={`${section.id}-${idx}`} className="text-sm text-gray-600">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ProductList params={params} filters={selectedFilters} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
