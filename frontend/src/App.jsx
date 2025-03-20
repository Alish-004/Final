import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/home";
import LoginPage from "./pages/Login";
import SignUp from "./pages/Signup";
import VehicleRental from "./pages/vehicle";
import AboutUs from "./pages/Aboutus";
import ContactUs from "./pages/contactus";
import BlogPage from "./pages/blog";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/admin/Dashboard";
import Customers from "./pages/admin/Customers";
import Vehicles from "./pages/admin/Vehicles";
import Admin from "./pages/admin/AdminLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Settings from "./pages/admin/Settings";
import PaymentHistory from "./pages/admin/PaymentHistory";
import CarDetailPage from "./pages/CarDetails";

function App() {
  const location = useLocation(); // Get the current route location

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar (not shown on admin routes) */}
      {!isAdminRoute && <Navbar />}

      {/* Routes */}
      <div style={{ flex: 1, marginTop: isAdminRoute ? "0" : "80px" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/vehicle" element={<VehicleRental />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route  path="/cardetails/:carId" element={<CarDetailPage/>} ></Route>
          <Route path="/admin" element={<Admin />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="vehicles" element={<Vehicles />} />
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>

      {/* Footer (not shown on admin routes) */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}



export default App;