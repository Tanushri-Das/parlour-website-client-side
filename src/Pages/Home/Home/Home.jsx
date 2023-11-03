import React from 'react'
import BannerHome from '../BannerHome/BannerHome'
import Services from '../Services/Services'
import CustomerServices from '../CustomerServices/CustomerServices'
import Testimonials from '../Testimonials/Testimonials'

const Home = () => {
  return (
    <div>
        <BannerHome/>
        <Services/>
        <CustomerServices/>
        <Testimonials/>
    </div>
  )
}

export default Home