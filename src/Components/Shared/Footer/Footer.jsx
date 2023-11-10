import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-[#F63E7B] py-[77px]">
      <div className="lg:mx-[135px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="ps-9 lg:ps-0 flex">
          <MdLocationOn className="text-white text-5xl mr-2" />
          <p className="text-white font-medium text-[16px]">
            H#000 (0th Floor), Road #00, New DOHS, Mohakhali, Dhaka, Bangladesh
          </p>
        </div>
        <div className="ps-9 lg:ps-0">
          <p className="mb-4 text-[20px] font-semibold text-white">COMPANY</p>
          <p className="mb-2 text-[16px] font-normal text-white">About </p>
          <p className="mb-2 text-[16px] font-normal text-white">Our Team</p>
          <p className="mb-2 text-[16px] font-normal text-white">
            Terms Conditions
          </p>
          <p className="mb-2 text-[16px] font-normal text-white">
            Submit Listing
          </p>
        </div>
        <div className="ps-9 lg:ps-0">
          <p className="mb-4 text-[20px] font-semibold text-white">
            Quick Links
          </p>
          <p className="mb-2 text-[16px] font-normal text-white">LEGAL</p>
          <p className="mb-2 text-[16px] font-normal text-white">Privacy</p>
          <p className="mb-2 text-[16px] font-normal text-white">
            Terms & Conditions
          </p>
        </div>
        <div className="ps-9 lg:ps-0">
          <p className="mb-4 text-[20px] font-semibold text-white">About us</p>
          <p className="text-[#D8D8D8] font-normal text-[16px] mb-3">
            H#000 (0th Floor), Road #00, New DOHS, Mohakhali, Dhaka, Bangladesh
          </p>
          <div className="flex space-x-3">
            <a
              href="https://www.linkedin.com/in/tanushri-das-06a520194/"
              target="_blank"
            >
              <FaLinkedin size={24} className="text-white" />
            </a>
            <a
              href="https://www.facebook.com/tanushri.das01?mibextid=ZbWKwL"
              target="_blank"
            >
              <FaFacebook size={24} className="text-white" />
            </a>

            <a
              href="https://www.linkedin.com/in/tanushri-das-06a520194/"
              target="_blank"
            >
              <FaYoutube size={24} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
