import express from "express"
import payment from "../middlewares/payment.js"
const paymentRouter = express.Router()

paymentRouter.post("/payment",payment)


export default paymentRouter;