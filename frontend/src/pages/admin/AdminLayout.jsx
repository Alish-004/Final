import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaUsers, FaCar, FaCog, FaTachometerAlt, FaHistory, FaSignOutAlt, FaClock } from "react-icons/fa";

function Admin() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                </header>
                
                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { 
            path: "/admin/dashboard", 
            icon: <FaTachometerAlt />, 
            label: "Dashboard" 
        },
        { 
            path: "/admin/customers", 
            icon: <FaUsers />, 
            label: "Customers" 
        },
        { 
            path: "/admin/vehicles", 
            icon: <FaCar />, 
            label: "Vehicles" 
        },
        { 
            path: "/admin/extensions", 
            icon: <FaClock />, 
            label: "Extension Requests" 
        },
        { 
            path: "/admin/payment-history", 
            icon: <FaHistory />, 
            label: "Payment History" 
        },
        { 
            path: "/admin/settings", 
            icon: <FaCog />, 
            label: "Settings" 
        },
        { 
            path: "/admin/rentals", 
            icon: <FaCar/>, 
            label: "Rental History" 
        }
    ];

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return (
        <div className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col shadow-lg">
            <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
                Car Rental Admin
            </div>
            
            <nav className="flex-1 mt-4 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`
                            flex items-center p-3 px-4 
                            transition-all duration-300 
                            hover:bg-gray-700 
                            ${location.pathname === item.path 
                                ? 'bg-gray-700 border-r-4 border-blue-500' 
                                : ''}
                        `}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
            
            <div className="p-4 border-t border-gray-700">
                <button 
                    onClick={logout} 
                    className="
                        w-full flex items-center justify-center 
                        bg-red-600 hover:bg-red-700 
                        text-white py-2 rounded 
                        transition-colors duration-300
                    "
                >
                    <FaSignOutAlt className="mr-2" /> Logout
                </button>
            </div>
        </div>
    );
}






export default Admin;