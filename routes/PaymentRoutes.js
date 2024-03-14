const express=require("express");
const { createPaymentController, webhooksController } = require("../controller/PaymentController");
const router=express.Router()

router.post('/',createPaymentController)
router.post('/webhook',express.raw({ type: "application/json" }),webhooksController)


exports.router=router;