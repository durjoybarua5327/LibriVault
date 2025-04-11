import express from "express"
import { SignUp } from "../controller/user_controller.js"
const router =express.Router()

router.post("/SignUp",SignUp)

export default router