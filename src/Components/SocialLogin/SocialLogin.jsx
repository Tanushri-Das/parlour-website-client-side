import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            title: "Good job!",
            text: "Congratulations! Sign Up Successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          navigate(from, { replace: true });
        });
    });
  };
  
  return (
    <div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleGoogleSignIn}
          className="google-btn flex items-center py-4"
        >
          <FaGoogle className="ms-[7px]" />
          <p className="ms-[111px] text-[16px] font-semibold">
            Continue with Google
          </p>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
