import express from "express"
import { isAuthenticated } from "../middleware/auth.middleware.js"
import { askassistant, getUser } from "../controllers/user.controller.js"



const router = express.Router()

router.get("/me",
    isAuthenticated,
    getUser
)
router.post("/ai",
    // isAuthenticated,
    askassistant
)
export default router