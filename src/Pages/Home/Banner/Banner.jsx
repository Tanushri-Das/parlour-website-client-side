import React from "react";
import "./Banner.css";
import bannerImg from "../../../images/parlour-banner.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="lg:mx-[135px] grid md:grid-cols-2 gap-8 items-center pb-9 pt-12 xl:pt-0 px-4 sm:px-6 lg:px-8">
      <div className="">
        <h1 className="text-5xl font-bold text-[#111430]">
          BEAUTY SALON FOR EVERY WOMEN
        </h1>
        <p className="mt-6 mb-7 text-[16px] banner-desc">
          Your destination for beauty and wellness . Discover the ultimate{" "} 
           beauty experience at our salon . Experience the difference
          today.
        </p>
        <Link
          className="login-btn text-[16px] font-semibold text-white"
          to="/login"
        >
          Get an Appointment
        </Link>
      </div>
      <div className="mt-12 justify-start">
        <img src={bannerImg} className="w-full " alt="" />
      </div>
    </div>
  );
};

export default Banner;
