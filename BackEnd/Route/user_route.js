import express from "express"
import { SignUp,Login } from "../controller/user_controller.js"
const router =express.Router()

router.post("/SignUp",SignUp)
router.post("/Login",Login)

export default router