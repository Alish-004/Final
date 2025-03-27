import React from "react";
import { Typography, Box, Button, Avatar, Paper } from "@mui/material";

const UserProfile = () => {
  // Example user data (replace with actual data from your backend or state)
  const user = {
    name: "Alish Kumar Sunuwar",
    email: "alishple.com",
    avatarUrl: "",
    rentalHistory: [
      { id: 1, vehicle: "Toyota Camry", date: "2023-10-01", status: "Completed" },
      { id: 2, vehicle: "Honda Civic", date: "2023-09-15", status: "Completed" },
      { id: 3, vehicle: "Ford Mustang", date: "2023-08-20", status: "Cancelled" },
    ],
  };
  function logout(){
    localStorage.removeItem("token")
    window.location.href  ="/"
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
        {/* Profile Header */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Avatar
            alt={user.name}
            src={user.avatarUrl}
            sx={{ width: 100, height: 100, margin: "auto" }}
          />
          <Typography variant="h4" sx={{ marginTop: 2 }}>
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user.email}
          </Typography>
        </Box>

        {/* Rental History */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Rental History
        </Typography>
        {user.rentalHistory.length > 0 ? (
          user.rentalHistory.map((rental) => (
            <Box
              key={rental.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {rental.vehicle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {rental.date}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color:
                    rental.status === "Completed" ? "green" : rental.status === "Cancelled" ? "red" : "orange",
                }}
              >
                {rental.status}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No rental history found.
          </Typography>
        )}

        {/* Logout Button */}
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Button onClick={logout}  variant="contained" color="primary">
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile;