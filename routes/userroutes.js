const express = require("express")

const router = express.Router()

const {registerUser, loginUser, currentUser} = require("../controllers/usercontroller")

const{ protect } = require("../middelwares/authmiddleware")

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", protect, currentUser)


module.exports = router