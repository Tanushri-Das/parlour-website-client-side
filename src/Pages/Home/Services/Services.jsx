import React, { useEffect, useState } from "react";
import "./Services.css";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";

const Services = () => {
  const [services,setServices]=useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/services")
    .then(res=>res.json())
    .then(data=>setServices(data))
  },[])

  return (
    <div className="mt-[92px] mb-[54px] lg:mx-[135px]">
      <h2 className="awesome text-4xl font-bold text-center mb-[72px]">
        Our Awesome <span className="services">Services</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <div className="flex justify-center">
      <Link
        className="login-btn text-[16px] font-semibold text-white"
        to="/login"
      >
        Explore more
      </Link>
      </div>
    </div>
  );
};

export default Services;
