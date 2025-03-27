import React from "react";
import { Link } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="max-w-xs mx-auto flex flex-col justify-between h-full shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
        <img
          src={"http://localhost:4000/uploads/" + vehicle.imageUrl.split("\\")[1]}
          alt={vehicle.name}
          className="w-full h-48 object-contain aspect-video"
        />
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {vehicle.description}
          </p>
          <p className="text-lg font-semibold mt-2">
            Rs {vehicle.pricePerHour} / Hour
          </p>
        </div>
        <div className="p-4">
          {true ? (
            <Link to={"/cardetails/" + vehicle.id} className="no-underline">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300">
                Details
              </button>
            </Link>
          ) : (
            <button className="w-full border border-gray-400 text-gray-400 py-2 px-4 rounded cursor-not-allowed" disabled>
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}