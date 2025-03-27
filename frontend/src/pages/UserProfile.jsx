import React from "react";
import { User, LogOut, Calendar, Check, X } from "lucide-react";

const UserProfile = () => {
  // Example user data (replace with actual data from your backend or state)
  const user = {
    name: "Alish Kumar Sunuwar",
    email: "alish@example.com",
    avatarUrl: "",
    rentalHistory: [
      { id: 1, vehicle: "Toyota Camry", date: "2023-10-01", status: "Completed" },
      { id: 2, vehicle: "Honda Civic", date: "2023-09-15", status: "Completed" },
      { id: 3, vehicle: "Ford Mustang", date: "2023-08-20", status: "Cancelled" },
    ],
  };

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "text-green-600";
      case "Cancelled": return "text-red-600";
      default: return "text-yellow-600";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Completed": return <Check className="text-green-600" size={20} />;
      case "Cancelled": return <X className="text-red-600" size={20} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-600 p-6 text-center">
          <div className="relative inline-block mb-4">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-white">
                <User size={48} />
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-blue-100 mt-1">{user.email}</p>
        </div>

        {/* Rental History */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="mr-3 text-blue-600" size={24} />
            Rental History
          </h3>

          {user.rentalHistory.length > 0 ? (
            <div className="space-y-4">
              {user.rentalHistory.map((rental) => (
                <div 
                  key={rental.id} 
                  className="bg-gray-100 rounded-lg p-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                >
                  <div>
                    <p className="font-bold text-gray-800">{rental.vehicle}</p>
                    <p className="text-sm text-gray-600">{rental.date}</p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(rental.status)}
                    <span className={`ml-2 font-medium ${getStatusColor(rental.status)}`}>
                      {rental.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">
              <p>No rental history found.</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200 text-center">
          <button 
            onClick={logout}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto space-x-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;