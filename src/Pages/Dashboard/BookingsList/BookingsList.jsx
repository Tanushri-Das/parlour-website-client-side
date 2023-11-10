import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useBooking from "../../../Hooks/useBooking";

const BookingsList = () => {
  const [bookings, refetch] = useBooking();
  const navigate = useNavigate();

  const handleCheckout = (booking) => {
    if (booking && booking.price !== undefined && booking.service) {
      const servicePrice = booking.price;
      const serviceName = booking.service;

      // Encode the service name to ensure it's URL-safe
      const encodedServiceName = encodeURIComponent(serviceName);

      console.log("Booking Price: ", servicePrice);
      navigate(
        `/dashboard/payment/${booking._id}?price=${servicePrice}&name=${encodedServiceName}`
      );
    } else {
      // Handle the case where booking data, price, or name is not available
      console.error("Booking data, price, or name is not available.");
    }
  };

  return (
    <div className="my-12">
      <h5 className="text-[22px] font-medium text-center mb-6">Service List</h5>
      <h5 className="text-2xl text">Total orders: {bookings.length}</h5>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-center text-lg font-semibold uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-center text-lg font-semibold uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-center text-lg font-semibold uppercase tracking-wider">
              Service Name
            </th>
            <th className="px-6 py-3 text-center text-lg font-semibold uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-center text-lg font-semibold uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings?.map((booking, index) => (
            <tr key={index} className="bg-white">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {booking.paid ? (
                  "Paid"
                ) : (
                  <button
                    onClick={() => handleCheckout(booking)}
                    className="login-btn text-[16px] font-semibold text-white"
                  >
                    PAY Money
                  </button>
                )}
                <button className="bg-red-600 text-white text-lg px-4 py-3 rounded-lg ms-2">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
