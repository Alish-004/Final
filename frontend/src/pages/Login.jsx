import React, { useState } from "react";
import axios from "axios";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  if(localStorage.getItem("token")){
    window.location.href = "/"
  }

  async function handleLogin(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post("http://localhost:4000/login", user, {
        headers: {
          "Content-type": "application/json"
        }
      });

      const token = response.data.token;
      const role = response.data.role
      if(token) {
        alert("Login successful");
        localStorage.setItem("token", token);
        if(role=="USER"){
          window.location.href = "/"
        }else{
          window.location.href = "/admin"
        }
      } else {
        alert("Invalid credentials");
      }
    } catch(error) {
      alert("Server error");
    }
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-vector/abstract-technology-particles-low-poly-background_1017-23831.jpg?semt=ais_hybrid')"
      }}
    >
      <div 
        className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-600">Welcome back! Please enter your details</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a 
              href="/forgot-password" 
              className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a 
              href="/signup" 
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;