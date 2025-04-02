import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, LogOut, Calendar, Check, MapPin, Phone, Mail } from "lucide-react";
import { useRecoilState } from "recoil";
import { userSelector } from "../store/atoms";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useRecoilState(userSelector);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:4000/rental/rentals", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Filter only completed rentals and set them
        const completedRentals = (response.data.data || []).filter(
          rental => rental.status.toLowerCase() === "completed"
        );
        setRentals(completedRentals);
        setError(null);
      } catch (err) {
        console.error("Error fetching rentals:", err);
        setError(err.response?.data?.message || "Failed to load rental history");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href ="/"
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotal = (pricePerHour, startTime, endTime) => {
    const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
    return (hours * pricePerHour).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-all hover:scale-[1.01]">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-center relative">
          <div className="absolute top-4 right-4">
            <button 
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
          
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 rounded-full bg-blue-400 flex items-center justify-center text-white shadow-lg">
              <User size={64} />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            {user?.firstName} {user?.lastName}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 text-blue-100 mt-4">
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span className="text-sm">{user?.contactNumber}</span>
            </div>
            {user?.address && (
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-sm">{user.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Rental History */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Calendar className="mr-4 text-blue-600" size={28} />
             Rental History
          </h3>

          {loading ? (
            <div className="text-center bg-gray-100 rounded-xl p-8">
              <p className="text-gray-500 text-lg">Loading rentals...</p>
            </div>
          ) : error ? (
            <div className="text-center bg-gray-100 rounded-xl p-8">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : rentals.length > 0 ? (
            <div className="space-y-4">
              {rentals.map((rental) => (
                <div 
                  key={rental.id} 
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">
                          {rental.vehicle.vehicleName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {rental.vehicle.company} • {rental.vehicle.model}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        <Check className="text-green-600" size={16} />
                        Completed
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Start Date</span>
                        <span className="font-medium">{formatDate(rental.startTime)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">End Date</span>
                        <span className="font-medium">{formatDate(rental.endTime)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Price</span>
                        <span className="font-medium">Rs. {rental.vehicle.pricePerHour}/hour</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-gray-100 rounded-xl p-8">
              <p className="text-gray-500 text-lg">No completed rentals found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;