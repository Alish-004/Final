import React, { useState, useEffect } from "react";
import { Car, MapPin, Calendar, ArrowRight, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [vehicles, setVehicles] = useState([]);
  const [packages, setPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPackagesLoading, setIsPackagesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsPackagesLoading(true);
        
        // Fetch vehicles
        const vehiclesResponse = await fetch("http://localhost:4000/vehicle/get");
        if (!vehiclesResponse.ok) throw new Error("Failed to fetch vehicles");
        const vehiclesData = await vehiclesResponse.json();
        setVehicles(vehiclesData.slice(0, 6));

        // Fetch packages
        const packagesResponse = await fetch("http://localhost:4000/packages");
        if (!packagesResponse.ok) throw new Error("Failed to fetch packages");
        const packagesData = await packagesResponse.json();
        setPackages(packagesData.slice(0, 3)); // Get first 3 packages

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
        setIsPackagesLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-sliding functionality
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(autoSlideInterval);
    };
  }, [vehicles.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
  };

  const getVisibleVehicles = () => {
    if (vehicles.length === 0) return [];
    
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % vehicles.length;
      result.push(vehicles[index]);
    }
    return result;
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 flex justify-center">
            <img
              src="https://imgd.aeplcdn.com/642x336/n/q4eko3a_1582595.jpg?q=80"
              alt="BMW Car"
              className="max-w-full h-auto object-contain"
            />
          </div>

          <div className="md:w-1/2 text-left md:pl-12">
            <h1 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
              "Your Journey Begins Here – Rent the Perfect Ride Today!"
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Choose from a range of premium and budget vehicles for your travel needs. Book now and
              enjoy hassle-free rides tailored to your journey.
            </p>
            <Link 
              to="/vehicle" 
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors text-lg"
            >
              Book Now
              <ArrowRight className="ml-3" size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Vehicles Slider Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Featured Vehicles</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our top-rated vehicles available for rent
          </p>
          
          <div className="relative">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No vehicles available at the moment</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getVisibleVehicles().map((vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <div className="h-64 bg-gray-100">
                        {vehicle.imageUrl ? (
                          <img
                            src={`http://localhost:4000/${vehicle.imageUrl}`}
                            alt={vehicle.vehicleName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/placeholder-vehicle.jpg';
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-100">
                            <Car size={80} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-2xl font-semibold mb-2">{vehicle.vehicleName}</h3>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-gray-600">{vehicle.type}</span>
                          <span className="text-gray-600">{vehicle.model}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-medium text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {vehicle.fuelType}
                          </span>
                          <span className="font-bold text-lg text-blue-600">
                            Rs{vehicle.pricePerHour}/hour
                          </span>
                        </div>
                        <Link
                          to={`/vehicle`}
                          className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-blue-600 focus:outline-none z-10"
                  aria-label="Previous vehicle"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-blue-600 focus:outline-none z-10"
                  aria-label="Next vehicle"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/vehicle"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              View All Vehicles
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Our Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Car className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quality Vehicles</h3>
              <p className="text-gray-600">Our fleet includes well-maintained cars for all your travel needs.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Calendar className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Easy Booking</h3>
              <p className="text-gray-600">Simple booking process with flexible scheduling options.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <MapPin className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Nepal Coverage</h3>
              <p className="text-gray-600">Service available across major tourist destinations in Nepal.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Adventure Packages */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Our Adventure Packages</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover Nepal's breathtaking destinations with our curated travel packages
          </p>
          
          {isPackagesLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No packages available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((packageItem) => (
                <div 
                  key={packageItem._id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-56">
                    {packageItem.imageUrl ? (
                      <img 
                        src={`http://localhost:4000${packageItem.imageUrl}`}
                        alt={packageItem.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-package.jpg';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <MapPin size={80} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-3 left-4 text-2xl font-bold text-white">{packageItem.title}</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-gray-700 mb-4 whitespace-pre-line">
                      {packageItem.description || "No description available"}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xl font-bold text-blue-600">NPR: {packageItem.price}</span>
                      <Link 
                        to={`/packages/${packageItem._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                      >
                        Book Now
                        <ArrowRight className="ml-2" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Customer Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <p className="text-gray-700 mb-4">"The vehicle was in excellent condition and the staff was very helpful throughout our trip to Mustang. Highly recommend their service!"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-medium text-blue-600">RP</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Rajesh Puri</p>
                  <p className="text-sm text-gray-500">Kathmandu</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <p className="text-gray-700 mb-4">"The Pokhara package was perfect for our family vacation. Everything was well-organized and the driver was very knowledgeable."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-medium text-blue-600">SG</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Sunita Gurung</p>
                  <p className="text-sm text-gray-500">Pokhara</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <p className="text-gray-700 mb-4">"Booking was easy and the customer service was excellent. The car was clean and fuel-efficient. Will use their service again!"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-medium text-blue-600">AT</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Anil Thapa</p>
                  <p className="text-sm text-gray-500">Chitwan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-blue-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-blue-100 mb-8">Book your vehicle now and explore Nepal with comfort and style.</p>
          <Link 
            to="/vehicle" 
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            View Available Vehicles
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Rent A Car</h3>
              <p className="text-gray-300 mb-4">
                Your trusted partner for exploring the beauty of Nepal with comfort and style.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.666.636-1.226 1.153-1.772.5-.508 1.106-.902 1.772-1.153.637-.247 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Mail className="mr-2 text-blue-400 flex-shrink-0" size={18} />
                  <span>support@rentacar.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="mr-2 text-blue-400 flex-shrink-0" size={18} />
                  <span>+977 9829697282</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="mr-2 text-blue-400 flex-shrink-0" size={18} />
                  <span>12 Battisputali Street, Kathmandu, Nepal</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/vehicle" className="hover:text-blue-400 transition-colors">Our Vehicles</Link></li>
                <li><Link to="/packages" className="hover:text-blue-400 transition-colors">Adventure Packages</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          
        </div>
      </footer>
    </div>
  );
}