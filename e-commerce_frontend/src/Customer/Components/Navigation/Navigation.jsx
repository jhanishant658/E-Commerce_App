'use client'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogBackdrop, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

// MUI Icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/category',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/category',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/category' },
            { name: 'Dresses', href: '/category' },
            { name: 'Pants', href: '/category' },
            { name: 'Denim', href: '/category' },
            { name: 'Sweaters', href: '/category' },
            { name: 'T-Shirts', href: '/category' },
            { name: 'Jackets', href: '/category' },
            { name: 'Activewear', href: '/category' },
            { name: 'Browse All', href: '/category' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '/category',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '/category',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt: 'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/category' },
            { name: 'Pants', href: '/category' },
            { name: 'Sweaters', href: '/category' },
            { name: 'T-Shirts', href: '/category' },
            { name: 'Jackets', href: '/category' },
            { name: 'Activewear', href: '/category' },
            { name: 'Browse All', href: '/category' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'My Orders', href: '/order' },
    { name: 'Stores', href: '/stores' },
  ],
}

export default function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="bg-white border-b border-gray-200">
        {/* Mobile menu */}
        <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-linear" />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white p-6 shadow-xl transition duration-300 ease-in-out">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Mobile menu tabs */}
              <TabGroup className="mt-6">
                <div className="border-b border-gray-200">
                  <TabList className="-mb-px flex space-x-6">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className="flex-1 border-b-2 border-transparent px-1 py-2 text-base font-semibold whitespace-nowrap text-gray-900 transition-colors duration-200 data-selected:border-indigo-600 data-selected:text-indigo-600 hover:text-indigo-600"
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </TabList>
                </div>
                <TabPanels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <TabPanel key={category.name} className="space-y-8 pt-6">
                      {/* Featured */}
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative text-sm">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Link to={`/${category.name}/${item.name}`} className="mt-4 block font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                              {item.name}
                            </Link>
                          </div>
                        ))}
                      </div>

                      {/* Sections */}
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p className="font-semibold text-gray-900">{section.name}</p>
                          <ul className="mt-4 flex flex-col space-y-3">
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <Link to={`/${category.name}/${section.name}/${item.name}`} className="-m-2 block p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>

              {/* Pages */}
              <div className="space-y-4 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Account */}
              <div className="space-y-4 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link to="/signin" className="-m-2 block p-2 font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                    Sign in
                  </Link>
                </div>
                <div className="flow-root">
                  <Link to="/signup" className="-m-2 block p-2 font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                    Create account
                  </Link>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Desktop header */}
        <header className="relative bg-white">
          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-20 items-center">
                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden hover:text-gray-600"
                >
                  <MenuOutlinedIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link to="/">
                    <img
                      alt="Reform"
                      src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
                      width={158}
                      height={48}
                      className="max-h-12 w-full object-contain"
                    />
                  </Link>
                </div>

                {/* Desktop navigation */}
                <PopoverGroup className="hidden lg:ml-12 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-10">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        <div className="relative flex">
                          <PopoverButton className="group relative flex items-center justify-center text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200 data-open:text-indigo-600">
                            {category.name}
                            <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-transform duration-200 group-data-[open]:rotate-180" />
                          </PopoverButton>
                        </div>
                        <PopoverPanel className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-600 shadow-lg">
                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                {/* Featured */}
                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                  {category.featured.map((item) => (
                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                      <Link to={`/${category.name}/${item.name}`} className="mt-6 block font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                                        {item.name}
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                                {/* Sections */}
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p className="font-semibold text-gray-900">{section.name}</p>
                                      <ul className="mt-4 space-y-3">
                                        {section.items.map((item) => (
                                          <li key={item.name} className="flex">
                                            <Link to={`/${category.name}/${section.name}/${item.name}`} className="hover:text-indigo-600 transition-colors duration-200">
                                              {item.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    ))}
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        to={page.href}
                        className="flex items-center text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </PopoverGroup>

                {/* Right section */}
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-8">
                    <Link to="/signin" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                      Sign in
                    </Link>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-300" />
                    <Link to="/signup" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                      Create account
                    </Link>
                  </div>
                  
                  {/* Icons */}
                  <div className="flex items-center space-x-6 ml-6">
                    {/* Search Icon */}
                    <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 lg:hidden">
                      <SearchOutlinedIcon className="size-6" />
                    </button>

                    {/* Account Icon */}
                    <Link to="/profile" className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 hidden lg:block">
                      <PersonOutlineOutlinedIcon className="size-6" />
                    </Link>

                    {/* Wishlist Icon */}
                    <Link to="/wishlist" className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 hidden lg:block">
                      <FavoriteBorderOutlinedIcon className="size-6" />
                    </Link>

                    {/* Cart Icon */}
                    <Link to="/cart" className="group -m-2 flex items-center p-2">
                      <ShoppingBagOutlinedIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200"
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">
                        3
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}