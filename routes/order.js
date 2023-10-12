import express from "express" 

import { isAuthenticated } from "../middlewares/auth.js"
import { AcceptOrder, RejectOrder, createOrder, filterOrder, getallOrderById, getallOrders } from "../controllers/order.js"

const router=express.Router()

router.post("/order/add-order",isAuthenticated,createOrder)
router.get("/order/get-order",isAuthenticated,getallOrders)
router.get("/order/filter",isAuthenticated,filterOrder)
router.get("/order/accept/:id",isAuthenticated,AcceptOrder)
router.get("/order/reject/:id",isAuthenticated,RejectOrder)
router.get("/order/getById/:id",isAuthenticated,getallOrderById)

export default router