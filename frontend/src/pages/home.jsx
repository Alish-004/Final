import React from "react";
import { Car, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const adventurePackages = [
    {
      id: 1,
      title: "Mustang",
      details: "3 Night 4 days\nFooding and lodging\nVehicle: Offroad\nStarts from Kathmandu",
      price: "Npr: 16,000",
      image: "https://i.ytimg.com/vi/8cDvYXCZad8/maxresdefault.jpg",
    },
    {
      id: 2,
      title: "Pokhara",
      details: "2 Night 3 days\nFooding and lodging\nVehicle: Scorpio\nStarts from Kathmandu",
      price: "Npr: 14,000",
      image: "https://tripjive.com/wp-content/uploads/2024/09/Top-10-Things-to-Do-in-Pokhara.jpg",
    },
    {
      id: 3,
      title: "Lumbini",
      details: "2 Night 3 days\nFooding and lodging\nVehicle: Deluxe Bus\nStarts from Kathmandu",
      price: "Npr: 15,000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSZ-sTZ0TbKEcityxP1Z0tpOxzYqgwi7G4RQ&s",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          {/* Left Column - Car Image */}
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img
              src="https://imgd.aeplcdn.com/642x336/n/q4eko3a_1582595.jpg?q=80"
              alt="BMW Car"
              className="max-w-full h-auto object-contain"
            />
          </div>

          {/* Right Column - Text and Button */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              "Your Journey Begins Here – Rent the Perfect Ride Today!"
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Choose from a range of premium and budget vehicles for your travel needs. Book now and
              enjoy hassle-free rides tailored to your journey.
            </p>
            <Link 
              to="/vehicle" 
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Book Now
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Adventure Packages */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Adventure Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adventurePackages.map((packageItem) => (
              <div 
                key={packageItem.id} 
                className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105"
              >
                <img 
                  src={packageItem.image} 
                  alt={packageItem.title} 
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{packageItem.title}</h3>
                  
                  <div className="text-gray-600 mb-4 whitespace-pre-line">
                    {packageItem.details}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-semibold text-blue-600">{packageItem.price}</span>
                    <Link 
                      to="/vehicle" 
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          
          <div className="mb-4">
            <p className="text-gray-300">
              Email: support@rentacar.com | Phone: +977 9829697282
            </p>
            <p className="text-gray-300">
              Address: 12 Battisputali Street, Kathmandu, Nepal
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 mt-6">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Rent A Car. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}