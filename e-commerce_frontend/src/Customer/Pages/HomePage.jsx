import React from 'react'
import MainCarosals from '../Components/Carosals/MainCarosals'
import HomeSectionCarosal from '../Components/HomeSectionCarosals/HomeSectionCarsoal'
import Footer from '../Components/Footer/Footer'
import Navigation from '../Components/Navigation/Navigation'
import PromoSection from '../Components/PromoSection/PromoSection'

const HomePage = () => {
  return (
    <>
      <Navigation/>
         <div className='MainCarosals mt-36 m-5 '>
      <MainCarosals />
    </div>
      <PromoSection/>
 
    <div className='space-y-10 py-20 flex flex-col justify-center px -5 lg:px-10'>
      <HomeSectionCarosal sectionName = {"Shoes"}/>
      <HomeSectionCarosal sectionName={"Ear Buds"}/>
      <HomeSectionCarosal sectionName= {"Smartphone"}/>
    </div>
    <div className='Footer '>
      <Footer />
    </div>

    </>
  )
}

export default HomePage
