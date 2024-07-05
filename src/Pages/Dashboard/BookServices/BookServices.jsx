import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useServices from "../../../Hooks/useServices";

const BookServices = () => {
  const { user } = useContext(AuthContext);
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { services } = useServices();
  const handleServiceChange = (event) => {
    const selectedServiceName = event.target.value;

    // Find the selected service in your services array
    const selectedServiceObj = services.find(
      (service) => service.service_name === selectedServiceName
    );

    if (selectedServiceObj) {
      setSelectedServicePrice(selectedServiceObj.price);
    } else {
      setSelectedServicePrice(0); // Set the price to 0 if the service is not found
    }
  };

  const onSubmit = (data) => {
    const { name, email, service } = data;
    const selectedServiceObj = services.find((s) => s.service_name === service);

    if (!selectedServiceObj) {
      // Handle the case when the selected service is not found
      return;
    }

    const newBooking = {
      name,
      email,
      service: selectedServiceObj.service_name,
      price: selectedServicePrice,
      serviceId: selectedServiceObj._id, // Set the serviceId to the _id of the selected service
    };
    console.log(newBooking);

    // Reset the selectedServicePrice to $0 after form submission
    setSelectedServicePrice(0);
    axiosSecure.post("/bookings", newBooking).then(() => {
      reset();
      Swal.fire({
        title: "Good job!",
        text: "Booking add Successfully!",
        icon: "success",
        timer: 1500,
      });
    });
  };

  return (
    <div>
      <div className="font-bold uppercase flex justify-center mt-16 items-center">
        <h3 className="text-3xl">Book Service</h3>
      </div>
      <div className="w-full flex-shrink-0 sm:max-w-lg bg-white mx-auto mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 form bg-white rounded-xl"
        >
          <div className="mb-3">
            <label className="block text-black text-lg font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              value={user.displayName}
              className="form-input font-normal"
            />
          </div>
          <div className="form-control w-full mb-3">
            <label className="block text-black text-lg font-semibold mb-1">
              User Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              value={user.email}
              className="form-input font-normal"
            />
          </div>
          <div className="form-control w-full mb-3">
            <label className="block text-black text-lg font-semibold mb-1">
              Services
            </label>
            <select
              className="form-input font-normal"
              {...register("service", { required: true })}
              onChange={handleServiceChange}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service._id} value={service.service_name}>
                  {service.service_name}
                </option>
              ))}
            </select>
          </div>

          {/* Input field to display the selected service price */}
          <div className="w-full">
            <label className="block text-black text-lg font-semibold mb-1">
              Service Price
            </label>
            <input
              type="text"
              value={`$${selectedServicePrice}`}
              readOnly
              className="form-input font-normal"
            />
          </div>

          <div className="flex justify-center">
            <button className="btn login-btn text-white font-bold mt-8 text-base">
              Book Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookServices;
