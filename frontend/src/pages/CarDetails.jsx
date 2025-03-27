import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const [hoursDifference, setHoursDifference] = useState(0);
  const { carId } = useParams();

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

  // Calculate total price and hours difference
  useEffect(() => {
    if (vehicle && startDateTime && endDateTime) {
      const startDateObj = new Date(startDateTime);
      const endDateObj = new Date(endDateTime);
      const timeDifference = endDateObj - startDateObj; // Difference in milliseconds
      const hours = Math.ceil(timeDifference / (1000 * 60 * 60)); // Convert to hours
      setHoursDifference(hours);

      // Calculate price based on hours and hourly rate
      const price = hours * vehicle.pricePerHour;
      setTotalPrice(price);
    }
  }, [startDateTime, endDateTime, vehicle]);

  // Handle booking
  const handleBooking = async () => {
    if (!startDateTime || !endDateTime) {
      setNotification({
        open: true,
        message: "Please select both start and end date/time",
        severity: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/payment",
        { amount: totalPrice },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNotification({
        open: true,
        message: "Booking successful! Redirecting to payment...",
        severity: "success",
      });

      // Redirect to the payment URL received from the API
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Navigation */}
      <div className="flex items-center mb-6">
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
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

            <div className="mb-6">
              {vehicle.available?
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                Available: {vehicle.available}
              </span>: <span className="inline-block bg-green-100 text-red-800 text-xs px-2 py-1 rounded-full mb-2">
                Not available
              </span>
}
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
                  onChange={(e) => setStartDateTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Hours Difference */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">Rental Duration</h3>
              <p>{hoursDifference} hours</p>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">Price Summary</h3>
              <div className="flex justify-between mb-2">
                <p className="text-sm">
                  Rs {vehicle?.pricePerHour.toLocaleString()} × {hoursDifference} hours
                </p>
                <p className="text-sm">Rs {totalPrice.toLocaleString()}</p>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between">
                <p className="font-bold">Total</p>
                <p className="font-bold">Rs {totalPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Booking Button */}
            <button
              onClick={handleBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300"
            >
              Book Now
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