import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const BookingsList = () => {
  const [allBookings, setAllBookings] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => setAllBookings(data));
  }, []);

  const handleDelete = (booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookings/${booking._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // Filter out the deleted booking from the state
              setAllBookings((bookings) =>
                bookings.filter((b) => b._id !== booking._id)
              );
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="my-12">
      <h5 className="text-[22px] font-medium text-center mb-6">Service List</h5>
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
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
              Current Booking Status
            </th>
            <th className="px-6 py-3 text-center text-lg font-semibold uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {allBookings.map((booking, index) => (
            <tr key={index} className="bg-white">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">pending</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to="/dashboard/payment">
                  <button className="bg-green-600 text-white text-lg px-4 py-3 rounded-lg">
                    PAY
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(booking)}
                  className="bg-red-600 text-white text-lg px-4 py-3 rounded-lg ms-2"
                >
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
