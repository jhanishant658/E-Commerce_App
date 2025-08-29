import React from 'react'
import OrdersPage from './OrderPage'
import Footer from '../Footer/Footer'
import Navigation from '../Navigation/Navigation'

export default function Order() {
  return (
    <div>
    <Navigation/>
      <OrdersPage/>
      <Footer/>
    </div>
  )
}
