import React from 'react'
import BannerHome from '../BannerHome/BannerHome'
import Services from '../Services/Services'
import CustomerServices from '../CustomerServices/CustomerServices'
import Testimonials from '../Testimonials/Testimonials'
import ContactUs from '../ContactUs/ContactUs'

const Home = () => {
  return (
    <div>
        <BannerHome/>
        <Services/>
        <CustomerServices/>
        <Testimonials/>
        <ContactUs/>
    </div>
  )
}

export default Home