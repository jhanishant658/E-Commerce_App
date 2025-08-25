import React from 'react'
import MainCarosals from '../Components/Carosals/MainCarosals'
import HomeSectionCarosal from '../Components/HomeSectionCarosals/HomeSectionCarsoal'

const HomePage = () => {
  return (
    <>
    <div >
       <MainCarosals />
      
       
    </div>
    <div className='space-y-10 py-20 flex flex-col justify-center px -5 lg:px-10'>
      <HomeSectionCarosal />
      <HomeSectionCarosal />
    </div>
    </>
  )
}

export default HomePage
