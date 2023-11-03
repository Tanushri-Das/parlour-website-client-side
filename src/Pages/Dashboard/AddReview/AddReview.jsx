import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  console.log(user.displayName);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { name, designation,rateus, review } = data;
    const newReview = {
      name,
      designation,
      rateus,
      review,
    };
    console.log(newReview);
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          Swal.fire({
            title: "Good job!",
            text: "Booking add Successfully!",
            icon: "success",
            timer: 1500, // Timer in milliseconds (1.5 seconds in this case)
          });
            navigate("/");
        }
      });
  };
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
            className="form-input w-full text-[16px] font-medium mt-1 h-40"
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
