import { PrismaClient } from '@prisma/client';
import express, { response } from "express"
const router  = express.Router();
const prisma = new PrismaClient();


router.get("/user", getAllCustomers)



router.get("/rentals", getVehicleRentals)

async function getAllCustomers (req,res) {
    const users = [];
    const response =  await prisma.user.findMany({
        where:{
            role:"USER"
        }
    }) ;  
    console.log(response)
     res.send(response);

}


async function getVehicleRentals(req,res) {
    const  response = await prisma.rental.findMany({
        include:{
            user:true,
        }
    })

    res.send(response)
    
}

export default router;