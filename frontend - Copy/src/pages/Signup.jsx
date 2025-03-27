import React, { useRef } from "react";
import { Container, Box, Typography, TextField, Button, Link, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const navigate = useNavigate();

   async function signup(e) {
    e.preventDefault();
    // console.log("First Name:", firstName.current.value);
    // console.log("Last Name:", lastName.current.value);
    // console.log("Email:", email.current.value);
    // console.log("Password:", password.current.value);
    // console.log("Phone Number:", phoneNumber.current.value);
    // console.log("Address:", address.current.value);
    const user  = {
      firstName:firstName.current.value,
      lastName:lastName.current.value,
      email:email.current.value,
      password:password.current.value,
      contactNumber:phoneNumber.current.value,
      address:address.current.value,
    }

    try{
   const response = await axios.post("http://localhost:4000/signup",user, {
      headers:{
      "Content-Type":"application/json"
      }
    })

    const data = response.data.message;
    if(data=="true"){
      alert("Registered successfully")
      navigate("/login")

    }else{
      alert("Unable to register")
    }
  }catch(error){
    alert("Server error")
  }

  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Start your journey with EasyRent today!
          </Typography>
        </Box>

        <form onSubmit={signup}>
          {/* First Name Field */}
          <Box mb={3}>
            <TextField fullWidth label="First Name" variant="outlined" required inputRef={firstName} />
          </Box>

          {/* Last Name Field */}
          <Box mb={3}>
            <TextField fullWidth label="Last Name" variant="outlined" required inputRef={lastName} />
          </Box>

          {/* Email Field */}
          <Box mb={3}>
            <TextField fullWidth label="Email" variant="outlined" type="email" required inputRef={email} />
          </Box>

          {/* Password Field */}
          <Box mb={3}>
            <TextField fullWidth label="Password" variant="outlined" type="password" required inputRef={password} />
          </Box>

          {/* Phone Number Field */}
          <Box mb={3}>
            <TextField fullWidth label="Phone Number" variant="outlined" required inputRef={phoneNumber} />
          </Box>

          {/* Address Field */}
          <Box mb={3}>
            <TextField fullWidth label="Address" variant="outlined" required inputRef={address} />
          </Box>

          {/* Submit Button */}
          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ paddingY: 1, borderRadius: "8px" }}>
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <Grid container justifyContent="center" mt={2}>
          <Grid item>
            <Link href="/login" underline="hover" color="primary">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;
