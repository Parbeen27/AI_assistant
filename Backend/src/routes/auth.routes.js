import express from "express"
import { login, logout, refreshToken, registerUser }  from "../controllers/auth.controller.js"
const router = express.Router()

router.post("/signup",registerUser)
router.post("/login",login)
router.post("/logout",logout)
router.post("/refresh",refreshToken)


export default router