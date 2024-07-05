import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddService = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    console.log(data.price);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { service_name, service_description, price } = data;
          const newService = {
            service_name,
            price: parseFloat(price),
            service_description,
            image: imgURL,
          };
          console.log(newService);
          axiosSecure.post("/services", newService).then((data) => {
            console.log("after posting new service", data.data);
            reset();
            if (data.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Service added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };
  console.log("img_hosting_token", img_hosting_token);
  return (
    <div className="my-16">
      <h1 className="text-black text-center text-3xl mb-6 font-bold">
        Add Service
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form p-6 bg-white rounded-xl w-full lg:w-3/4 mx-auto"
      >
        <div className="mb-3">
          <label className="block text-black text-lg font-semibold mb-1">
            Service Title *
          </label>
          <input
            type="text"
            placeholder="Enter title"
            className="form-input text-base"
            {...register("service_name", { required: true, maxLength: 90 })}
          />
        </div>
        <div className="mb-3">
          <label className="block text-black text-lg font-semibold mb-1">
            Price *
          </label>
          <input
            type="text"
            placeholder="Enter Price"
            className="form-input text-base"
            {...register("price", { required: true, maxLength: 90 })}
          />
        </div>
        <div className="mb-3">
          <label className="block text-black text-lg font-semibold mb-1">
            Description *
          </label>
          <textarea
            className="form-input h-40 text-base"
            placeholder="Enter Designation"
            {...register("service_description", { required: true })}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-black text-lg font-semibold mb-1">
            Image *
          </label>
          <input
            type="file"
            className="text-base"
            {...register("image", { required: true })}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit" // Set the button type to "submit"
            className="login-btn text-[16px] font-semibold text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
