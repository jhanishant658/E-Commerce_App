import React from 'react'
import MainCarosals from '../Components/Carosals/MainCarosals'
import HomeSectionCarosal from '../Components/HomeSectionCarosals/HomeSectionCarsoal'
import Footer from '../Components/Footer/Footer'
import Navigation from '../Components/Navigation/Navigation'

const HomePage = () => {
  return (
    <>
      <Navigation/>
    <div className='MainCarosals mt-5 '>
    
       <MainCarosals />
      
       
    </div>
    <div className='space-y-10 py-20 flex flex-col justify-center px -5 lg:px-10'>
      <HomeSectionCarosal sectionName = {"Shoes"}/>
      <HomeSectionCarosal sectionName={"Kurta"}/>
    </div>
    <div className='Footer '>
      <Footer />
    </div>

    </>
  )
}

export default HomePage
