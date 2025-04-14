import { PrismaClient } from '@prisma/client';
import express, { response } from "express"
const router  = express.Router();
const prisma = new PrismaClient();


router.get("/user", getAllCustomers)


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


export default router;