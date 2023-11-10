import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
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
  FaUserPlus,
  FaPlus,
  FaGripHorizontal,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { MdReviews } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  // const isAdmin = true;
  const [isAdmin]=useAdmin()

  // Function to check if the screen width is below a certain breakpoint
  const isSmallScreen = () => window.innerWidth <= 640; // You can adjust the breakpoint as needed

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#F63E7B] ${
          open ? "w-72" : "w-16"
        } duration-500 text-white font-semibold px-4 h-screen`}
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
            {isAdmin ? (
              <>
              <li className="mb-5">
                  <NavLink
                    to="/dashboard/orderList"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <FaShoppingBag className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <FaShoppingBag className="text-lg mt-[2px] me-3" />
                        {open && "Order List"}
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/allusers"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <FaUsers className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <FaUsers className="text-lg mt-[2px] me-3" />
                        {open && "Users"}
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/makeAdmin"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <FaUserPlus className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <FaUserPlus className="text-lg mt-[2px] me-3" />
                        {open && "Make Admin"}
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/addService"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <FaPlus className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <FaPlus className="text-lg mt-[2px] me-3" />
                        {open && "Add Service"}
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/manageServices"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <FaGripHorizontal className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <FaGripHorizontal className="text-lg mt-[2px] me-3" />
                        {open && "Manage Services"}
                      </>
                    )}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
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
                      <MdReviews className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <MdReviews className="text-lg mt-[2px] me-3" />
                        {open && "Review"}
                      </>
                    )}
                  </NavLink>
                </li>
              </>
            )}

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
      <div className="m-3 text-xl text-gray-900 font-semibold md:w-3/4 mx-auto">
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
