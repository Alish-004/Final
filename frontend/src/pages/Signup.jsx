import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  async function signup(e) {
    e.preventDefault();
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      contactNumber: phoneNumber.current.value,
      address: address.current.value,
    }

    try {
      const response = await axios.post("http://localhost:4000/signup", user, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = response.data.message;
      if (data === "true") {
        alert("Registered successfully");
        navigate("/login");
      } else {
        alert("Unable to register");
      }
    } catch (error) {
      alert("Server error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
          <p className="mt-2 text-blue-100">Start your journey with EasyRent today!</p>
        </div>

        <form onSubmit={signup} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* First Name Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="First Name"
                required
                ref={firstName}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>

            {/* Last Name Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Last Name"
                required
                ref={lastName}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              required
              ref={email}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              ref={password}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Phone Number Field */}
          <div className="relative">
            <input
              type="tel"
              placeholder="Phone Number"
              required
              ref={phoneNumber}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          {/* Address Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Address"
              required
              ref={address}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="px-6 pb-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a 
              href="/login" 
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;