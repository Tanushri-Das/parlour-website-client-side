import React from "react";

const ServiceCard = ({ service }) => {
  console.log(service);
  const { service_name, price, service_description, icon } = service;
  return (
    <div className="card flex flex-col justify-center items-center pt-9 pb-5 px-10">
      <img src={icon} alt="" />
      <h4 className="text-[20px] font-semibold services-name py-[18px]">
        {service_name}
      </h4>
      <p className="text-[20px] font-medium price pb-[8px]">${price}</p>
      <p className="text-base services-desc text-center">
        {service_description}
      </p>
    </div>
  );
};

export default ServiceCard;
