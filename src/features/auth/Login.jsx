import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useLogin } from "./services/index";
import SignupPage from "./SignupPage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useAuth();
  console.log(user);

  // useEffect(() => {
  //   if (user) {
  //     console.log("Decrypted User:", user);
  //     console.log("User Role:", user.Role);
  //   }
  // }, [user]);

  // console.log("User Role:", user?.Role);
  const { login } = useAuth();
  const { mutate: sendLoginDetails } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    setIsSubmitting(true);

    sendLoginDetails(data, {
      onSuccess: (response) => {
        const user = response?.user;

        if (!user) {
          toast.error("Login failed");
          setIsSubmitting(false);
          return;
        }

        login(user);

        toast.dismiss();
        toast.success("Logged in successfully!");

        reset();
        setIsSubmitting(false);

        navigate("/");
      },
      // onSuccess: (response) => {
      //   const user = response?.user;
      //   const accessToken = response?.accessToken;

      //   if (!user || !accessToken) {
      //     toast.error("Login failed");
      //     setIsSubmitting(false);
      //     return;
      //   }

      //   login(user, accessToken);
      //   toast.dismiss();
      //   toast.success("Logged in successfully!");

      //   reset();
      //   setIsSubmitting(false);
      //   navigate("/");
      //   // if (user?.role == "admin") {
      //   //   console.log(user);
      //   //   navigate("/skf-action");
      //   // } else {
      //   //   navigate("/");
      //   // }
      // },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Invalid Email or Password",
        );

        setIsSubmitting(false);
      },
    });
  };
  return (
    <>
      <div className="py-12 lg:py-20 flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-black text-center mb-2">
            Admin Login
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Please enter your credentials to continue
          </p>

          {/* Email */}
          <label className="block mb-1 text-gray-700 font-medium">
            Email ID
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            {...register("email", {
              required: "Login ID is required",
            })}
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="block mt-4 mb-1 text-gray-700 font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  const trimmed = value.trim();
                  if (trimmed.length === 0) return "Password cannot be empty";
                  if (trimmed.length < 6) return "Minimum 6 characters";
                  return true;
                },
              })}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-black"
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}

          {/* Set Password */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-4 text-sm text-gray-500 hover:text-black underline"
          >
            Set Password
          </button>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 mt-6 px-4 py-2 rounded-lg text-lg font-medium transition ${
              isSubmitting
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
          {/* Register Link */}
          <div className="mt-6 flex items-center cursor-pointer justify-center">
            <p className="text-sm text-gray-500">Don&apos;t have an account?</p>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="ml-2 text-sm font-semibold text-black relative group transition-all duration-300"
            >
              Create Account
              <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </form>
      </div>

      {/* <style>{`
        .loader {
          border: 3px solid #e5e5e5;
          border-top: 3px solid #000;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style> */}
    </>
  );
};

export default Login;
