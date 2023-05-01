const asyncHandler = require("express-async-handler")

const bcrypt = require("bcrypt")
const {generateToken} = require("../jwthelper")
const User = require("../models/userModel")

//@desc register the user
//@route Post/api/users/register
//@access public
const registerUser = asyncHandler(async (req, res)=>{
    const {username, useremail, userpassword} = req.body
    if(!username || !useremail || !userpassword){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({ useremail })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered!")
    }
    //hash password 
    const hashedPassword = await bcrypt.hash(userpassword,10)
    console.log("Hashed Password", hashedPassword)

    const user = await User.create({
        username,
        useremail,
        userpassword: hashedPassword,
    })
    console.log(`user created ${user}`)
    if (user) {
        // Generate a JWT token
        const token = generateToken(user._id);
    
        res.status(201).json({
          _id: user._id,
          useremail: user.useremail,
          token, // Include the token in the response
        });
      } else {
        res.status(400)
        throw new Error("User not found.")
      }
      res.json({message: "Register the user."})
    });
    
   
//@desc login the user
//@route post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res)=>{
    const {useremail, userpassword} = req.body

    //to check email and password are provide or not
    if(!useremail || !userpassword){
        res.status(400)
        throw new Error("Email and Password required.")
    }

    //find user through email
    const user = await User.findOne({useremail})

    //check if user exist
    if (!user) {
        res.status(401)
        throw new Error("Invalid  Email or Password.")
    }

    const isPasswordMatch = await bcrypt.compare(userpassword, user.userpassword)

    //to check password is correct
    if (isPasswordMatch) {
        const token = generateToken(user._id);
        res.status(200).json({
            message: "User logged in successfully",
            _id: user._id,
            useremail: user.useremail,
            token,
        })
     console.log("user logged in.")
    }else{
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
    
})

//@desc current user info
//@route Get /api/users/current
//@access private, logged in user can enter
const currentUser = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user.id)

    if (user) {
        console.log("User:", user)
        res.status(200).json({
            _id: user._id,
            username: user.username,
            useremail: user.useremail
        })
    }else {
        res.status(404)
        throw new Error("User not Found")
    }
    res.json({message: "current user information."})
})

module.exports = {registerUser, loginUser, currentUser}