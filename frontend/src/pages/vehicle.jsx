import React, { useState, useEffect } from "react";
import { Search, Car, Filter } from "lucide-react";
import VehicleCard from "../components/VehicleCard";

const VehicleRental = () => {
  // State for vehicles and filters
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Fetch vehicles from backend when component mounts
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch("http://localhost:4000/vehicle/get");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        console.log(data);
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    }
    fetchVehicles();
  }, []);

  // Filter vehicles based on search and price
  useEffect(() => {
    let result = vehicles;
    
    if (searchTerm) {
      result = result.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter) {
      result = result.filter(vehicle => {
        switch(priceFilter) {
          case 'low':
            return vehicle.pricePerHour < 50;
          case 'medium':
            return vehicle.pricePerHour >= 50 && vehicle.pricePerHour < 100;
          case 'high':
            return vehicle.pricePerHour >= 100;
          default:
            return true;
        }
      });
    }

    setFilteredVehicles(result);
  }, [searchTerm, priceFilter, vehicles]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Car className="text-blue-600" size={40} />
            Choose Your Perfect Ride
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse fleet of vehicles. From compact cars to luxury SUVs, we have the perfect vehicle for your journey.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search vehicles by name or type" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          {/* Price Filter */}
          <div className="relative w-full max-w-md">
            <select 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="low">Budget Friendly (Under Rs50/hour)</option>
              <option value="medium">Mid-Range (Rs50-Rs100/hour)</option>
              <option value="high">Luxury (Rs100+/hour)</option>
            </select>
            <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No vehicles found matching your search.</p>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleRental;