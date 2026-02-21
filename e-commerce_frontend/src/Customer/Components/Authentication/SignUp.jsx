import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post("https://e-commerce-app-9vum.onrender.com//auth/signup", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      toast.success("Signup successful! Redirecting to login...");

      setTimeout(() => navigate("/signin"), 2000); // 2s delay
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-md shadow-xl p-8 dark:bg-gray-800/80 transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-col items-center">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign up to get started with your free account
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              First Name
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
              text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 
              dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              placeholder="John"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Last Name
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
              text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 
              dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              placeholder="Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
              text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 
              dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
              text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 
              dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              placeholder="+91 9876543210"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
              text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 
              dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
              text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 
              dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md 
            transition duration-300 hover:bg-indigo-500 hover:shadow-lg focus:outline-none 
            focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
