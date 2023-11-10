import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const AddReview = () => {
  const { user } = useAuth();
  console.log(user.displayName);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
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
          const { name, designation,rateus, review } = data;
          const newReview = {
            name,
            designation,
            rateus,
            review,
            image: imgURL,
          };
          console.log(newReview);
          axiosSecure.post("/reviews", newReview)
          .then((data) => {
            console.log("after posting new review", data.data);
            reset();
            if (data.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review added successfully",
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
    <div className="my-12">
      <h5 className="rate-text text-center mb-6">Give Review</h5>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 p-10 w-1/2 form mx-auto"
      >
        <div className="form-control w-full mb-3">
          <label className="label">
            <span className="label-text text-lg">Username</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            value={user.displayName}
            className="form-input w-full text-[16px] font-medium mt-1"
          />
        </div>
        <div className="form-control w-full mb-3">
          <label className="label">
            <span className="label-text text-lg">
              Company’s name & Designation
            </span>
          </label>
          <input
            type="text"
            {...register("designation", { required: true })}
            placeholder="Company’s name, Designation"
            className="form-input w-full text-[16px] font-medium mt-1"
          />
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
        <div className="form-control w-full mb-3">
          <label className="label">
            <span className="label-text text-lg">Rate Us</span>
          </label>
          <select
            className="form-input w-full text-[16px] font-medium mt-1"
            {...register("rateus", { required: true })}
          >
            <option>1</option>
            <option>2</option>
            <option>2.5</option>
            <option>3</option>
            <option>3.5</option>
            <option>4</option>
            <option>4.5</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-lg">Description</span>
          </label>
          <textarea
            className="form-input w-full text-[16px] font-medium mt-1 h-24"
            placeholder="Review in detail"
            {...register("review", { required: true })}
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button className="btn login-btn text-white font-bold mt-8 text-base">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
