import React from "react";
import facial from "../../../images/facial.png";
import "./CustomerServices.css";
import CountUp from "react-countup";
import { FaPlus } from "react-icons/fa";

const CustomerServices = () => {
  return (
    <div className="bg-[#FFF8F5] border border-red-500">
      <div className="lg:mx-[135px] border border-red-500 pt-[127px] pb-[152px] md:grid md:grid-cols-2 gap-8 items-center">
        <div className="border border-red-500">
          <img src={facial} className="w-full" alt="" />
        </div>
        <div className="mt-12 lg:mt-0 border border-red-500 px-4 lg:px-0">
          <h2 className="handle text-[34px] font-semibold mb-8">
            Let us handle your screen{" "}
            <span className="professional">Professionally</span>.
          </h2>
          <p className="mb-[69px]">
            With well-written codes, we build amazing apps for all platforms,
            mobile and web apps in general ipsum. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Purus commodo ipsum.
          </p>
          <div className="flex items-center">
            <div>
              <div className="flex">
                <CountUp
                  end={500}
                  duration={5}
                  className="professional text-[42px] font-bold"
                />
                <FaPlus className="text-[42px] font-bold professional" />
              </div>

              <h5 className="text-[16px] counter mt-2">Happy Customer</h5>
            </div>
            <div className="ms-16 xl:ms-28">
              <div className="flex">
                <CountUp
                  end={16}
                  duration={5}
                  className="professional text-[42px] font-bold"
                />
                <FaPlus className="text-[42px] font-bold professional" />
              </div>

              <h5 className="text-[16px] counter mt-2">Total Services</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServices;
