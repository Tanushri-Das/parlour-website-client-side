import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useBooking from "../../../Hooks/useBooking";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BookingsList = () => {
  const [axiosSecure] = useAxiosSecure();
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
  const handleDelete = (booking) => {
    console.log(booking._id);
    Swal.fire({
      title: "Are you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${booking._id}`)
        .then((data) => {
          if (data.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Booking has been deleted.",
              icon: "success",
              timer: 3000, // Time in milliseconds (e.g., 3000ms = 3 seconds)
              showConfirmButton: false, // Hide the "OK" button
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="font-bold uppercase flex flex-col justify-center mt-16 items-center">
        <h3 className="text-3xl mb-6 block">Booking List</h3>
        <h6 className="text-xl font-medium">Total orders : {bookings.length}</h6>
      </div>
     
      <div className="mt-12">
      <table className="min-w-full divide-y divide-gray-200 text-center">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xl font-medium text-center">
              #
            </th>
            <th className="px-6 py-3 text-xl font-medium text-center">
              Name
            </th>
            <th className="px-6 py-3 text-center text-xl font-medium">
              Email
            </th>
            <th className="px-6 py-3 text-center text-xl font-medium">
              Service Name
            </th>
            <th className="px-6 py-3 text-center text-xl font-medium">
              Price
            </th>
            <th className="px-6 py-3 text-center text-xl font-medium">
              Action
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings?.map((booking, index) => (
            <tr key={index} className="bg-white">
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{booking.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{booking.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{booking.service}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{booking.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                {booking.paid ? (
                  "Paid"
                ) : (
                  <button
                    onClick={() => handleCheckout(booking)}
                    className="login-btn text-[16px] font-semibold text-white"
                  >
                    PAY
                  </button>
                )}
                <button onClick={() => handleDelete(booking)} className="bg-red-600 text-white text-lg px-4 py-3 rounded-lg ms-2">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default BookingsList;
