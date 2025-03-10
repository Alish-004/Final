import React from "react";
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from "@mui/material";

function Settings() {
  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* General Settings */}
      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          General Settings
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Dark Mode"
        />
        <FormControlLabel
          control={<Switch />}
          label="Enable Email Notifications"
        />
      </Paper>

      {/* User Permissions */}
      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          User Permissions
        </Typography>
        <TextField
          fullWidth
          label="Admin Role"
          defaultValue="Admin"
          margin="normal"
          disabled
        />
        <TextField
          fullWidth
          label="User Role"
          defaultValue="User"
          margin="normal"
          disabled
        />
      </Paper>

      {/* Notifications */}
      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Push Notifications"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable SMS Notifications"
        />
      </Paper>

      {/* Save Button */}
      <Button variant="contained" color="primary">
        Save Changes
      </Button>
    </Box>
  );
}

export default Settings;