import React from "react";

const ServiceCard = ({ service }) => {

  const { service_name, price, service_description, image } = service;
  return (
    <div className="card flex flex-col justify-center items-center shadow-lg rounded-xl">
      <img src={image} alt="" className="rounded-lg h-36 pt-3"/>
      <h4 className="text-[20px] font-semibold services-name py-[18px]">
        {service_name}
      </h4>
      <p className="text-[20px] font-medium price pb-[8px]">${price}</p>
      <p className="text-[15px] services-desc font-normal text-center px-2 pb-4">
        {service_description}
      </p>
    </div>
  );
};

export default ServiceCard;
