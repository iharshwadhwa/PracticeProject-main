const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middleware/jwtMiddlewares");

// Register User Function
const registerUser = asyncHandler(async (req, res) => {
    const { email, firstname, lastname, age, bloodgroup, gender, phonenumber, password } = req.body;

    if (!firstname || !lastname || !age || !bloodgroup || !gender || !email || !password || !phonenumber) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        firstname,
        lastname,
        age,
        bloodgroup,
        gender,
        phonenumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
});

// Login User Function
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
        // Generate a token with the user's ID
        const token = generateToken({ id: foundUser.id });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

const userProfile=asyncHandler(async(req,res)=>{
    // const {email}=req.body

    const id=req.user.id

    const user=await User.findById(id)
    // console.log(user.age)
    res.send({user})
})


const updateUser=asyncHandler(async(req,res)=>{
    const {firstname, email, age, phonenumber}=req.body

    const user=User.findOne({email})

    const updatedUser=await User.findOneAndUpdate(
        {email}, //filter by email
        {firstname,age,phonenumber},
        {new:true}

    );

    res.json({user:updateUser})
    console.log("user has been updated successfully")
})




// Export the functions
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.userProfile=userProfile;
exports.updateUser=updateUser;
