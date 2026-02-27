import React, { useEffect, useState } from 'react'
import MainCarosals from '../Components/Carosals/MainCarosals'
import HomeSectionCarosal from '../Components/HomeSectionCarosals/HomeSectionCarsoal'
import Footer from '../Components/Footer/Footer'
import Navigation from '../Components/Navigation/Navigation'
import PromoSection from '../Components/PromoSection/PromoSection'
import CircularProgress from '@mui/material/CircularProgress'

const HomePage = () => {

  const [backendReady, setBackendReady] = useState(false)
  const [timeoutReached, setTimeoutReached] = useState(false)
  useEffect(() => {
      const alreadyAwake = sessionStorage.getItem("backendAwake")
       if (alreadyAwake === "true") { setBackendReady(true) ; 
               return  ; }
    const wakeBackend = async () => {

      let isReady = false;
      let attempts = 0;

      while ( !isReady && attempts < 5) {
        try {

          const res = await fetch("https://e-commerce-app-9vum.onrender.com/runApp")

          if (res.ok) {
            isReady = true;
            setBackendReady(true) ;
            // this will help you to not show loading screen again and again if user refreshes or comes back to homepage within same session
        sessionStorage.setItem("backendAwake", "true") // 🔐 mark awake
            break;
          }

        } catch (err) {
          console.log("Backend waking up...")
        }

        attempts++;
        await new Promise(res => setTimeout(res, 4000)) // wait 4 sec before retry
      }

      if (!isReady) {
        setTimeoutReached(true)
      }
    }

    wakeBackend()

  }, [])


  // ⏳ Loading Screen
  if (!backendReady) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-white">

        <CircularProgress size={60} />

        <p className="mt-6 text-gray-600 text-lg text-center px-6">
          Preparing your shopping experience...
        </p>

        <p className="text-sm text-gray-400 mt-2">
          First load may take a few seconds 🚀
        </p>

        {timeoutReached && (
          <p className="text-red-400 mt-4 text-center">
            Server is taking longer than expected.<br/>
            Please refresh the page.
          </p>
        )}

      </div>
    )
  }


  // ✅ Real UI loads only when backend is awake
  return (
    <>
      <Navigation/>

      <div className='MainCarosals mt-36 m-5'>
        <MainCarosals />
      </div>

      <PromoSection/>

      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        <HomeSectionCarosal sectionId={3}/>
        <HomeSectionCarosal sectionId={53}/>
      </div>

      <div className='Footer'>
        <Footer />
      </div>
    </>
  )
}

export default HomePage