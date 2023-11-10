import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Shared/Header/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import "./Login.css";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { login } = useAuth(); 
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    login(email, password).then((result) => {
      const user = result.user;
      console.log(user);

      Swal.fire({
        title: "Good job!",
        text: "You Login Successfully!",
        icon: "success",
        timer: 1500, 
        showConfirmButton: false, 
      });
      
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center my-16">
        <div className="w-full flex-shrink-0 lg:max-w-lg bg-base-100 mx-auto">
          <form onSubmit={handleLogin} className="form p-6 bg-white rounded-xl">
            <h1 className="text-black text-center text-3xl mb-6 font-bold">
              Login
            </h1>
            <div className="mb-3">
              <label className="block text-black text-[16px] font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
              />
            </div>
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <label className="block text-black text-[16px] font-semibold">
                  Password
                </label>
                <label className="block text-black text-[16px] font-semibold">
                  <a href="#" className="text-primary link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="form-input w-full"
                />

                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-black text-[16px] font-semibold mb-1">
                <LoadCanvasTemplate />
              </label>
              <input onBlur={handleValidateCaptcha}
                type="text"
                name="captcha"
                placeholder="type the captcha above"
                className="form-input"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                disabled={disabled}
                className="login-btn text-[16px] font-semibold text-white"
              >
                Login
              </button>
            </div>
            <p className="text-center login-account text-[16px] font-medium mt-4">
              Don’t have an account ?
              <Link to="/signup" className="create-account ms-1">
                Create an account
              </Link>
            </p>
          </form>

          <p className="text-center text-[16px] font-semibold my-5">Or</p>
          <SocialLogin/>
        </div>
      </div>
    </div>
  );
};

export default Login;
