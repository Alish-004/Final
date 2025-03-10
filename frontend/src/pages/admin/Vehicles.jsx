import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Modal,
  Box,
  TextField,
  Snackbar,
  Alert,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function Vehicles() {
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
    pricePerHour: "",
    image: null,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch vehicles when the component mounts
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:4000/vehicle/get");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  // Handle modal open/close
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewVehicle({
      vehicleName: "",
      type: "",
      model: "",
      company: "",
      fuelType: "",
      passengerSeat: "",
      pricePerHour: "",
      image: null,
    });
  };

  const handleEditModalOpen = (vehicle) => {
    setCurrentVehicle(vehicle);
    setNewVehicle(vehicle);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setCurrentVehicle(null);
    setNewVehicle({
      vehicleName: "",
      type: "",
      model: "",
      company: "",
      fuelType: "",
      passengerSeat: "",
      pricePerHour: "",
      image: null,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setNewVehicle({ ...newVehicle, image: e.target.files[0] });
  };

  // Handle form submission for adding a vehicle
  const handleAddVehicle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vehicleName", newVehicle.vehicleName);
    formData.append("type", newVehicle.type);
    formData.append("model", newVehicle.model);
    formData.append("company", newVehicle.company);
    formData.append("fuelType", newVehicle.fuelType);
    formData.append("passengerSeat", newVehicle.passengerSeat);
    formData.append("pricePerHour", newVehicle.pricePerHour);
    formData.append("image", newVehicle.image);

    try {
      const response = await fetch("http://localhost:4000/vehicle/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add vehicle");
      }

      const data = await response.json();
      setVehicles([...vehicles, data]);

      setSnackbarMessage("Vehicle added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      handleCloseModal();
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setSnackbarMessage("Failed to add vehicle. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Handle form submission for editing a vehicle
  const handleEditVehicle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vehicleName", newVehicle.vehicleName);
    formData.append("type", newVehicle.type);
    formData.append("model", newVehicle.model);
    formData.append("company", newVehicle.company);
    formData.append("fuelType", newVehicle.fuelType);
    formData.append("passengerSeat", newVehicle.passengerSeat);
    formData.append("pricePerHour", newVehicle.pricePerHour);
    if (newVehicle.image) {
      formData.append("image", newVehicle.image);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/vehicle/update/${currentVehicle.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update vehicle");
      }

      const data = await response.json();
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === currentVehicle.id ? data : vehicle
        )
      );

      setSnackbarMessage("Vehicle updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      handleEditModalClose();
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setSnackbarMessage("Failed to update vehicle. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Handle deleting a vehicle
  const handleDeleteVehicle = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/vehicle/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete vehicle");
      }

      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));

      setSnackbarMessage("Vehicle deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      setSnackbarMessage("Failed to delete vehicle. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Vehicles ({vehicles.length})
      </Typography>

      {/* Add Vehicle Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "2rem" }}
      >
        Add New Vehicle
      </Button>

      {/* Vehicle Cards Grid */}
      <Grid container spacing={3}>
        {vehicles.map((vehicle) => (
          <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {/* Vehicle Image */}
              {vehicle.imageUrl && (
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    objectFit: "cover",
                  }}
                  image={`http://localhost:4000/${vehicle.imageUrl}`}
                  alt={vehicle.vehicleName}
                />
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Vehicle Name */}
                <Typography variant="h6" component="div" gutterBottom>
                  {vehicle.vehicleName}
                </Typography>

                {/* Vehicle Details */}
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Type:</strong> {vehicle.type}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Model:</strong> {vehicle.model}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Company:</strong> {vehicle.company}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Fuel Type:</strong> {vehicle.fuelType}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Seats:</strong> {vehicle.passengerSeat}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Price:</strong> ${vehicle.pricePerHour}/hour
                </Typography>

                {/* Edit and Delete Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditModalOpen(vehicle)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Vehicle Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Vehicle
          </Typography>
          <form onSubmit={handleAddVehicle}>
            <TextField
              fullWidth
              label="Vehicle Name"
              name="vehicleName"
              value={newVehicle.vehicleName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Type"
              name="type"
              value={newVehicle.type}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Model"
              name="model"
              value={newVehicle.model}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={newVehicle.company}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fuel Type"
              name="fuelType"
              value={newVehicle.fuelType}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Passenger Seats"
              name="passengerSeat"
              value={newVehicle.passengerSeat}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Price Per Hour"
              name="pricePerHour"
              value={newVehicle.pricePerHour}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              style={{ marginTop: "1rem" }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Add Vehicle
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Edit Vehicle Modal */}
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Vehicle
          </Typography>
          <form onSubmit={handleEditVehicle}>
            <TextField
              fullWidth
              label="Vehicle Name"
              name="vehicleName"
              value={newVehicle.vehicleName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Type"
              name="type"
              value={newVehicle.type}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Model"
              name="model"
              value={newVehicle.model}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={newVehicle.company}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fuel Type"
              name="fuelType"
              value={newVehicle.fuelType}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Passenger Seats"
              name="passengerSeat"
              value={newVehicle.passengerSeat}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Price Per Hour"
              name="pricePerHour"
              value={newVehicle.pricePerHour}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              style={{ marginTop: "1rem" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Update Vehicle
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Vehicles;