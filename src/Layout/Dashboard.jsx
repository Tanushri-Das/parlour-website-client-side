import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendar,
  FaSwatchbook,
  FaBars,
  FaShoppingBag,
  FaUtensils,
  FaListUl,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { MdReviews } from "react-icons/md";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  // Function to check if the screen width is below a certain breakpoint
  const isSmallScreen = () => window.innerWidth <= 640; // You can adjust the breakpoint as needed

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#d1a054] ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4 h-screen`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 gap-4 relative">
          <ul>
            {/* Sidebar content here */}
            <li className="mb-5">
              <NavLink
                to="/dashboard/bookservice"
                activeClassName="active-link"
                className="uppercase flex"
              >
                {isSmallScreen() ? (
                  <FaShoppingCart className="text-lg mt-[2px] me-3" />
                ) : (
                  <>
                    <FaShoppingCart className="text-lg mt-[2px] me-3" />
                    {open && "Book"}
                  </>
                )}
              </NavLink>
            </li>
            <li className="mb-5">
              <NavLink
                to="/dashboard/bookingList"
                activeClassName="active-link"
                className="uppercase flex"
              >
                {isSmallScreen() ? (
                  <FaShoppingBag className="text-lg mt-[2px] me-3" />
                ) : (
                  <>
                    <FaShoppingBag className="text-lg mt-[2px] me-3" />
                    {open && "Booking List"}
                  </>
                )}
              </NavLink>
            </li>
            
            <li className="mb-5">
              <NavLink
                to="/dashboard/review"
                activeClassName="active-link"
                className="uppercase flex"
              >
                {isSmallScreen() ? (
                  <FaShoppingBag className="text-lg mt-[2px] me-3" />
                ) : (
                  <>
                    <FaShoppingBag className="text-lg mt-[2px] me-3" />
                    {open && "Review"}
                  </>
                )}
              </NavLink>
            </li>
            <div className="divider"></div>
            <li className="mb-5">
              <NavLink
                to="/"
                activeClassName="active-link"
                className="uppercase flex"
              >
                {isSmallScreen() ? (
                  <AiFillHome className="text-lg mt-[2px] me-3" />
                ) : (
                  <>
                    <AiFillHome className="text-lg mt-[2px] me-3" />
                    {open && "Home"}
                  </>
                )}
              </NavLink>
            </li>
            
          </ul>
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
