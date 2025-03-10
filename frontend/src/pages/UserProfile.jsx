import React from "react";
import { Typography, Box, Button, Avatar, Paper } from "@mui/material";

const UserProfile = () => {
  // Example user data (replace with actual data from your backend or state)
  const user = {
    name: "Alish Kumar Sunuwar",
    email: "alishple.com",
    avatarUrl: "data:image/jpeg;base64,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",
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