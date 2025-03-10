import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#1f2937",
        color: "#ffffff",
        textAlign: "center",
        padding: "1rem",
        marginTop: "auto",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Vehicle Rental. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;