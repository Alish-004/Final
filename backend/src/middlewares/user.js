
import jwt from 'jsonwebtoken';
const Secret_KEY = 'Alish';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export  async function registerUser (req,res){
    const email = req.body.email
    const password= req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const address = req.body.address
    const contactNumber  = req.body.contactNumber

    const user = {
        email,
        password,
        firstName,
        lastName,
        address,
        contactNumber,
    }

  
    const oldUser =await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    
    if(oldUser){
        res.send({
            message:"false"
        })
    }else{
    //@ts-ignore
    await prisma.user.create({data:user});
    res.send({
        message:"true"
    })
    }
}


export  async function login (req,res){
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password)
    
        const user =await prisma.user.findFirst({
            where:{
                email:email,
                password:password,
            }
        })
        if(user){
         const token =   jwt.sign({email:email},Secret_KEY);
         res.send({
            token:token,
            message:"true"
         });
        }else{
            res.send(
            {
                token:null,
                message:"wrong credentails"
            }
            )
        }
}

export function me(req,res){
    console.log("/me")
    const token = req.headers.token;
    console.log(token)
    const email = jwt.verify(Secret_KEY,token);
    req.send(email);
}

export default prisma;
