import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CarDetailPage = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [timeDifference, setTimeDifference] = useState({
    hours: 0,
    minutes: 0,
    totalHours: 0,
    isValid: false
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { carId } = useParams();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/vehicle/get/${carId}`);
        setVehicle(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load vehicle data. Please try again.");
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [carId]);

  // Calculate total price and time difference
  useEffect(() => {
    if (vehicle && startDateTime && endDateTime) {
      const startDateObj = new Date(startDateTime);
      const endDateObj = new Date(endDateTime);
      
      const diffInMs = endDateObj - startDateObj;
      const diffInHours = diffInMs / (1000 * 60 * 60);
      const hours = Math.floor(diffInHours);
      const minutes = Math.round((diffInHours - hours) * 60);

      const isValid = diffInMs >= 60 * 60 * 1000; // At least 1 hour

      setTimeDifference({
        hours,
        minutes,
        totalHours: diffInHours,
        isValid
      });

      const price = diffInHours * vehicle.pricePerHour;
      setTotalPrice(price);
    } else {
      setTimeDifference({
        hours: 0,
        minutes: 0,
        totalHours: 0,
        isValid: false
      });
    }
  }, [startDateTime, endDateTime, vehicle]);

  const handleStartDateTimeChange = (e) => {
    if (!isLoggedIn) {
      setNotification({
        open: true,
        message: "Please login to select dates",
        severity: "error",
      });
      return;
    }

    const selectedDateTime = e.target.value;
    const now = new Date();
    const selectedDate = new Date(selectedDateTime);

    // Check if selected time is in the past
    if (selectedDate < now) {
      setNotification({
        open: true,
        message: "Start date/time cannot be in the past",
        severity: "error",
      });
      return;
    }

    setStartDateTime(selectedDateTime);

    // Reset end time if it's before the new start time
    if (endDateTime && new Date(endDateTime) <= selectedDate) {
      setEndDateTime("");
    }
  };

  const handleEndDateTimeChange = (e) => {
    if (!isLoggedIn) {
      setNotification({
        open: true,
        message: "Please login to select dates",
        severity: "error",
      });
      return;
    }

    const selectedDateTime = e.target.value;
    const selectedDate = new Date(selectedDateTime);
    const startDate = new Date(startDateTime);

    if (!startDateTime) {
      setNotification({
        open: true,
        message: "Please select start date/time first",
        severity: "error",
      });
      return;
    }

    // Check if end time is at least 1 hour after start time
    if ((selectedDate - startDate) < 60 * 60 * 1000) {
      setNotification({
        open: true,
        message: "Minimum booking duration is 1 hour",
        severity: "error",
      });
      return;
    }

    setEndDateTime(selectedDateTime);
  };

  // Helper function to format minimum datetime for input
  const getMinDateTime = () => {
    const now = new Date();
    // Add 1 minute buffer to prevent selecting current minute that might become past
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16);
  };

  // Helper function to format minimum end datetime (1 hour after start)
  const getMinEndDateTime = () => {
    if (!startDateTime) return "";
    const startDate = new Date(startDateTime);
    startDate.setHours(startDate.getHours() + 1);
    return startDate.toISOString().slice(0, 16);
  };

  const handleBooking = async () => {
    if (!isLoggedIn) {
      setNotification({
        open: true,
        message: "Please login to book this vehicle",
        severity: "error",
      });
      navigate("/login");
      return;
    }

    if (vehicle.available <= 0) {
      setNotification({
        open: true,
        message: "Sorry, this vehicle is not available for booking",
        severity: "error",
      });
      return;
    }

    if (!startDateTime || !endDateTime) {
      setNotification({
        open: true,
        message: "Please select both start and end date/time",
        severity: "error",
      });
      return;
    }

    if (!timeDifference.isValid) {
      setNotification({
        open: true,
        message: "Minimum booking duration is 60 minutes",
        severity: "error",
      });
      return;
    }

    const vehicleData = {
      vehicleId: carId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      amount: totalPrice
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/payment",
        vehicleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        }
      );

      setNotification({
        open: true,
        message: "Booking successful! Redirecting to payment...",
        severity: "success",
      });

      localStorage.setItem("rentalId", response.data.rentalId);
      localStorage.setItem("amount", totalPrice)
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error("Error during payment:", error);
      setNotification({
        open: true,
        message: "Failed to process payment. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-xl">Loading vehicle details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const isVehicleAvailable = vehicle.available > 0;
  const isBookingDisabled = !timeDifference.isValid || !isVehicleAvailable || !isLoggedIn;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Navigation */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <span className="mr-1">←</span> Back to Search
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Vehicle Details */}
        <div className="md:col-span-2">
          {/* Vehicle Image */}
          <div className="rounded-xl overflow-hidden mb-6 shadow-lg">
            <img
              src={`http://localhost:4000/uploads/${vehicle.imageUrl.split("\\")[1]}`}
              alt={vehicle?.vehicleName}
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-xl shadow-lg mb-6">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{vehicle?.vehicleName}</h1>
                  <p className="text-gray-600 mb-4">
                    {vehicle?.type} • {vehicle?.model}
                  </p>
                </div>
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    isVehicleAvailable 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {isVehicleAvailable 
                      ? `Available: ${vehicle.available}` 
                      : "Not available"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <p className="text-gray-700 mb-4">{vehicle?.description}</p>

              <div className="border-t border-gray-200 my-4"></div>

              {/* Vehicle Features */}
              <h3 className="text-xl font-bold mb-4">Vehicle Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{vehicle?.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-medium">{vehicle?.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Seating Capacity</p>
                  <p className="font-medium">{vehicle?.passengerSeat} Adults</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Details */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-lg sticky top-5">
            <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

            {!isLoggedIn && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      You need to <button onClick={handleLoginRedirect} className="font-medium underline text-yellow-700 hover:text-yellow-600">login</button> to book this vehicle
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                isVehicleAvailable 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {isVehicleAvailable 
                  ? `Available: ${vehicle.available}` 
                  : "Not available"}
              </span>
              <p className="text-3xl font-bold text-blue-600">
                Rs {vehicle?.pricePerHour.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">per hour</p>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {/* Date and Time Selection */}
            <h3 className="text-lg font-bold mb-4">Trip Dates and Times</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={startDateTime}
                  onChange={handleStartDateTimeChange}
                  min={getMinDateTime()}
                  disabled={!isVehicleAvailable || !isLoggedIn}
                  className={`w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    !isVehicleAvailable || !isLoggedIn ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={endDateTime}
                  onChange={handleEndDateTimeChange}
                  min={getMinEndDateTime()}
                  disabled={!startDateTime || !isVehicleAvailable || !isLoggedIn}
                  className={`w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    !startDateTime || !isVehicleAvailable || !isLoggedIn ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>

            {/* Time Difference */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">Rental Duration</h3>
              {startDateTime && endDateTime ? (
                <>
                  <p>
                    {timeDifference.hours > 0 && `${timeDifference.hours} hour${timeDifference.hours !== 1 ? 's' : ''}`}
                    {timeDifference.minutes > 0 && ` ${timeDifference.minutes} minute${timeDifference.minutes !== 1 ? 's' : ''}`}
                  </p>
                  {!timeDifference.isValid && (
                    <p className="text-red-500 text-sm mt-1">
                      Minimum booking duration is 60 minutes
                    </p>
                  )}
                </>
              ) : (
                <p>Select dates to see duration</p>
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">Price Summary</h3>
              <div className="flex justify-between mb-2">
                <p className="text-sm">
                  Rs {vehicle?.pricePerHour.toLocaleString()} × {timeDifference.totalHours.toFixed(2)} hours
                </p>
                <p className="text-sm">Rs {totalPrice.toFixed(2)}</p>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between">
                <p className="font-bold">Total</p>
                <p className="font-bold">Rs {totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Booking Button */}
            <button
              onClick={handleBooking}
              disabled={isBookingDisabled}
              className={`w-full text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300 ${
                isBookingDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {!isLoggedIn ? "Login to Book" : isVehicleAvailable ? "Book Now" : "Not Available"}
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.open && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`${
              notification.severity === "success"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            } px-4 py-3 rounded border relative`}
          >
            <span className="absolute top-0 right-0 px-2 py-1 cursor-pointer" onClick={handleCloseNotification}>
              &times;
            </span>
            <p>{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;