// import React, { useState } from "react";
// import Swal from "sweetalert2";

// const MakeAdmin = () => {
//   const [email, setEmail] = useState(""); // State to capture email input

//   const handleMakeAdmin = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     const confirmed = await Swal.fire({
//       title: "Are you sure you want to make this user an admin?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, make admin",
//       cancelButtonText: "Cancel",
//     });

//     if (confirmed.isConfirmed) {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/users/admin/${email}`,
//           {
//             method: "PATCH",
//           }
//         );
//         const data = await response.json();

//         if (data.modifiedCount) {
//           refetch();
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "User has been made an admin",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         } else {
//           Swal.fire({
//             title: "Error",
//             text: "Unable to make the user an admin",
//             icon: "error",
//           });
//         }
//       } catch (error) {
//         Swal.fire({
//           title: "Error",
//           text: "An error occurred while making the user an admin",
//           icon: "error",
//         });
//       }

//       // After handling the form data, reset the input field
//       setEmail("");
//     }
//   };

//   return (
//     <div className="w-full flex-shrink-0 lg:max-w-lg bg-base-100 mx-auto my-16">
//       <h1 className="text-black text-center text-3xl mb-6 font-bold">Login</h1>
//       <form className="form p-6 bg-white rounded-xl" onSubmit={handleMakeAdmin}>
//         <div className="mb-3">
//           <label className="block text-black text-[16px] font-semibold mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="form-input"
//             value={email} // Bind input value to the email state
//             onChange={(e) => setEmail(e.target.value)} // Update email state on input change
//           />
//         </div>

//         <div className="flex justify-center mt-4">
//           <button
//             type="submit" // Set the button type to "submit"
//             className="login-btn text-[16px] font-semibold text-white"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MakeAdmin;

import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MakeAdmin = () => {
  const [email, setEmail] = useState(""); // State to capture email input
  const [axiosSecure] = useAxiosSecure();

  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    axiosSecure.patch(`/users/admin/${email}`)
    .then((data) => {
      console.log("make admin response:", data);
      setEmail("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User has been made an admin",
          showConfirmButton: false,
          timer: 1500,
        });
    })
    .catch((error) => {
      console.error("Error making user admin:", error);
      // You can also display an error Swal alert here if needed
    });
  
  };

  return (
    <div className="my-16">
      <h1 className="text-black text-center text-3xl mb-6 font-bold">
        Make Admin
      </h1>
      <form className="form p-6 bg-white rounded-xl w-full lg:w-3/4 mx-auto" onSubmit={handleMakeAdmin}>
        <div className="mb-3">
          <label className="block text-black text-[16px] font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            value={email} // Bind input value to the email state
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          />
        </div>

        <div className="flex justify-center mt-4">
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

export default MakeAdmin;
