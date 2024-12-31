// import React from "react";
// import { Container, Box, Typography, TextField, Button, Grid, Paper, Link } from "@mui/material";

// const VehicleRentalLoginPage = () => {
//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, boxShadow: 10 }}>
//         <Box textAlign="center" mb={3}>
//           <Typography variant="h4" gutterBottom color="primary">
//             Welcome Back to EasyRent
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//             Login to rent your dream vehicle today!
//           </Typography>
//         </Box>

//         <form>
//           {/* Email Field */}
//           <Box mb={3}>
//             <TextField
//               fullWidth
//               label="Email Address"
//               variant="outlined"
//               type="email"
//               required
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "8px", // Rounded corners for input
//                 },
//               }}
//             />
//           </Box>

//           {/* Password Field */}
//           <Box mb={3}>
//             <TextField
//               fullWidth
//               label="Password"
//               variant="outlined"
//               type="password"
//               required
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "8px", // Rounded corners for input
//                 },
//               }}
//             />
//           </Box>

//           {/* Login Button */}
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             type="submit"
//             sx={{
//               paddingY: 1,
//               borderRadius: "8px", // Rounded corners
//               "&:hover": {
//                 backgroundColor: "#f5a623", // Custom hover color
//               },
//             }}
//           >
//             Login
//           </Button>
//         </form>

//         {/* Links for Sign Up and Forgot Password */}
//         <Grid container justifyContent="space-between" mt={2}>
//           <Grid item>
//             <Link href="/signup" underline="hover" color="primary">
//               Don't have an account? Sign Up
//             </Link>
//           </Grid>
//           <Grid item>
//             <Link href="/forgot-password" underline="hover" color="primary">
//               Forgot Password?
//             </Link>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default VehicleRentalLoginPage;

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

// Background image URL
const backgroundImage = "https://img.freepik.com/free-vector/abstract-technology-particles-low-poly-background_1017-23831.jpg?semt=ais_hybrid";

const LoginContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover", // Ensures the image covers the entire screen
  backgroundPosition: "center", // Centers the image
  backgroundRepeat: "no-repeat", // Prevents tiling of the image
}));

const LoginCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for contrast
  borderRadius: "10px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "100%",
  maxWidth: "400px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 50px rgba(0, 0, 0, 0.15)",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  color: "#333",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#00b4d8",
  color: "#fff",
  width: "100%",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#0083b0",
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#00b4d8",
  },
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <CustomTextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <CustomTextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CustomButton type="submit">Log In</CustomButton>
        </form>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Don't have an account? <a href="/signup" style={{ color: "#00b4d8" }}>Sign Up</a>
        </Typography>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;




