import React from 'react'
import OrdersPage from './OrderPage'
import Footer from '../Footer/Footer'
import Navigation from '../Navigation/Navigation'

export default function Order() {
  return (
    <div>
    <Navigation/>
    <div className='mt-20'>
      <OrdersPage/>
      </div>
      <Footer/>
    </div>
  )
}
