const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// generate Token
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"});
}


// register user 
const registerUser = async (req, res) => {
  try{
    const {name, email, password} = req.body;

    const exist = await userModel.findOne({email})

    // validation
    if(exist) {
      return res.status(400).json("Email alredy exist");
    }

    if(!name||!email||!password) {
      return res.status(400).json("All fields are required")
    }

    if(!validator.isEmail(email)) {
      return res.status(400).json("invalid email")
    }

    if(!validator.isStrongPassword(password)) {
      return res.status(400).json("Passwrod must be contain a uppercase, lowercase, number, symbol and minimal 8 character")
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create an user
    const user = await userModel.create({name, email, password: hash});

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, password: user.password, token })
  }
  catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
};

module.exports = { registerUser } 