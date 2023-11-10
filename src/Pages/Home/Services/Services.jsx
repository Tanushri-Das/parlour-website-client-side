import React from "react";
import "./Services.css";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
import useServices from "../../../Hooks/useServices";

const Services = () => {

  const { services } = useServices();

  return (
    <div className="mt-[92px] mb-[54px] lg:mx-[135px]">
      <h2 className="awesome text-4xl font-bold text-center mb-[72px]">
        Our Awesome <span className="services">Services</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 px-3 md:px-5 lg:px-0">
        {services?.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
      
    </div>
  );
};

export default Services;
