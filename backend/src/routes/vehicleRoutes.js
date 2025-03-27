import express from "express"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import upload from "../config/multerConfig.js";
const router = express.Router();



router.get("/get", async (req,res)=>{
  const vehicles = await prisma.vehicle.findMany();
   res.json(vehicles);
})
// POST endpoint to save a vehicle
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    // Extract vehicle data from the request body
    const {
      vehicleName,
      type,
      model,
      company,
      fuelType,
      passengerSeat,
      pricePerHour,
      description,
      available
    } = req.body;

    // Get the uploaded file path
    const imageUrl = req.file ? req.file.path : null;

    // Validate required fields
    if (
      !vehicleName ||
      !type ||
      !model ||
      !company ||
      !fuelType ||
      !passengerSeat ||
      !pricePerHour ||
      !imageUrl
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save the vehicle to the database
    const newVehicle = await prisma.vehicle.create({
      data: {
        vehicleName,
        type,
        model,
        company,
        fuelType,
        passengerSeat:parseInt(passengerSeat),
        imageUrl,
        pricePerHour:parseInt(pricePerHour),
        description,
        available:parseInt(available),
        rented:0 
      },
    });

    // Return the saved vehicle as a response
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Error saving vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/get/:id",async function (req,res) {
  const id = parseInt(req.params['id']);
  const vehicle =await prisma.vehicle.findFirst({where:{
    id:id
  }})

  res.send(vehicle)
})

export default router