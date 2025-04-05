import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes, FaPlus } from "react-icons/fa";

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {vehicle.imageUrl && (
        <img
          src={`http://localhost:4000/${vehicle.imageUrl}`}
          alt={vehicle.vehicleName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-vehicle.jpg';
          }}
        />
      )}

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {vehicle.vehicleName}
        </h2>

        <div className="space-y-2 text-gray-600 mb-4">
          <div className="flex items-center">
            <span className="font-medium w-24">Type:</span>
            <span className="flex-1">{vehicle.type}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">Model:</span>
            <span className="flex-1">{vehicle.model}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">Available:</span>
            <span className="flex-1 font-semibold">{vehicle.available}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">Price:</span>
            <span className="flex-1 font-semibold text-blue-600">
              Rs{vehicle.pricePerHour}/hour
            </span>
          </div>
          <div className="pt-2">
            <p className="text-sm text-gray-500 line-clamp-2">
              {vehicle.description}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 border-t pt-3">
          <button
            onClick={() => onEdit(vehicle)}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
            aria-label="Edit vehicle"
          >
            <FaEdit className="text-lg" />
          </button>
          <button
            onClick={() => onDelete(vehicle.id)}
            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
            aria-label="Delete vehicle"
          >
            <FaTrash className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

const VehicleForm = ({ vehicle, onInputChange, onFileChange, onSubmit, onCancel, isEditing = false }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name*</label>
          <input
            type="text"
            name="vehicleName"
            value={vehicle.vehicleName}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
          <input
            type="text"
            name="type"
            value={vehicle.type}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model*</label>
          <input
            type="text"
            name="model"
            value={vehicle.model}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
          <input
            type="text"
            name="company"
            value={vehicle.company}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type*</label>
          <select
            name="fuelType"
            value={vehicle.fuelType}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Seats*</label>
          <input
            type="number"
            name="passengerSeat"
            value={vehicle.passengerSeat}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Available Count*</label>
          <input
            type="number"
            name="available"
            value={vehicle.available}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price/Hour ($)*</label>
          <input
            type="number"
            name="pricePerHour"
            value={vehicle.pricePerHour}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image{!isEditing && '*'}</label>
          <input
            type="file"
            name="image"
            onChange={onFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required={!isEditing}
            accept="image/*"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={vehicle.description}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center"
        >
          {isEditing ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </div>
    </form>
  );
};

const Snackbar = ({ open, message, severity, onClose }) => {
  if (!open) return null;

  const bgColor = severity === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = severity === "success" ? "text-green-800" : "text-red-800";
  const borderColor = severity === "success" ? "border-green-200" : "border-red-200";

  return (
    <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-md shadow-lg ${bgColor} ${textColor} border ${borderColor}`}>
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button 
          onClick={onClose}
          className="ml-4 text-lg font-semibold focus:outline-none"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    vehicleName: "",
    type: "",
    model: "",
    company: "",
    fuelType: "",
    passengerSeat: "",
    available: 1,
    pricePerHour: "",
    image: null,
    description: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:4000/vehicle/get");
        if (!response.ok) throw new Error("Failed to fetch vehicles");
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        showSnackbar("Error fetching vehicles", "error");
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleEditModalOpen = (vehicle) => {
    setCurrentVehicle(vehicle);
    setNewVehicle({
      vehicleName: vehicle.vehicleName,
      type: vehicle.type,
      model: vehicle.model,
      company: vehicle.company,
      fuelType: vehicle.fuelType,
      passengerSeat: vehicle.passengerSeat,
      available: vehicle.available,
      pricePerHour: vehicle.pricePerHour,
      image: null,
      description: vehicle.description,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setCurrentVehicle(null);
    resetForm();
  };

  const resetForm = () => {
    setNewVehicle({
      vehicleName: "",
      type: "",
      model: "",
      company: "",
      fuelType: "",
      passengerSeat: "",
      available: 1,
      pricePerHour: "",
      image: null,
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewVehicle(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const createFormData = (vehicle) => {
    const formData = new FormData();
    formData.append("vehicleName", vehicle.vehicleName);
    formData.append("type", vehicle.type);
    formData.append("model", vehicle.model);
    formData.append("company", vehicle.company);
    formData.append("fuelType", vehicle.fuelType);
    formData.append("passengerSeat", vehicle.passengerSeat);
    formData.append("available", vehicle.available);
    formData.append("pricePerHour", vehicle.pricePerHour);
    formData.append("description", vehicle.description);
    if (vehicle.image) formData.append("image", vehicle.image);
    return formData;
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    const formData = createFormData(newVehicle);

    try {
      const response = await fetch("http://localhost:4000/vehicle/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add vehicle");
      }

      const data = await response.json();
      setVehicles(prev => [...prev, data]);
      showSnackbar("Vehicle added successfully!");
      handleCloseModal();
    } catch (error) {
      showSnackbar(error.message || "Failed to add vehicle", "error");
      console.error("Error adding vehicle:", error);
    }
  };

  const handleEditVehicle = async (e) => {
    e.preventDefault();
    const formData = createFormData(newVehicle);

    try {
      const response = await fetch(
        `http://localhost:4000/vehicle/update/${currentVehicle.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update vehicle");
      }

      const data = await response.json();
      setVehicles(prev => 
        prev.map(vehicle => vehicle.id === currentVehicle.id ? data : vehicle)
      );
      showSnackbar("Vehicle updated successfully!");
      handleEditModalClose();
    } catch (error) {
      showSnackbar(error.message || "Failed to update vehicle", "error");
      console.error("Error updating vehicle:", error);
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const response = await fetch(`http://localhost:4000/vehicle/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete vehicle");
      }

      setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
      showSnackbar("Vehicle deleted successfully!");
    } catch (error) {
      showSnackbar(error.message || "Failed to delete vehicle", "error");
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Vehicles ({vehicles.length})
        </h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
        >
          <FaPlus /> Add New Vehicle
        </button>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">No vehicles found. Add your first vehicle!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={handleEditModalOpen}
              onDelete={handleDeleteVehicle}
            />
          ))}
        </div>
      )}

      {/* Add Vehicle Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Add New Vehicle</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <VehicleForm
                vehicle={newVehicle}
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
                onSubmit={handleAddVehicle}
                onCancel={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Vehicle Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Vehicle</h2>
                <button
                  onClick={handleEditModalClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <VehicleForm
                vehicle={newVehicle}
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
                onSubmit={handleEditVehicle}
                onCancel={handleEditModalClose}
                isEditing={true}
              />
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default Vehicles;