import React from "react";
import "./Banner.css";
import bannerImg from "../../../images/parlour-banner.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="lg:ml-[135px] lg:me-[217px] border border-red-500 md:flex justify-around items-center pb-9">
      <div className="border border-red-500">
        <h1 className="text-5xl font-bold text-[#111430]">
          BEAUTY SALON <br /> FOR EVERY WOMEN
        </h1>
        <p className="mt-6 mb-7 text-[16px] banner-desc">
          Your destination for beauty and wellness . Discover the <br /> ultimate{" "} 
           beauty experience at our salon . Experience the <br /> difference
          today.
        </p>
        <Link
          className="login-btn text-[16px] font-semibold text-white"
          to="/login"
        >
          Get an Appointment
        </Link>
      </div>
      <div className="mt-12 border border-red-500 justify-start">
        <img src={bannerImg} className="w-full " alt="" />
      </div>
    </div>
  );
};

export default Banner;
