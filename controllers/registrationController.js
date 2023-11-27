// async function register(req, res) {
//     try {
//         res.send("Register successful")
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// module.exports = register

//////////////////second class
const emailValidation = require("../helpers/emailValidation");
const nameValidation = require("../helpers/nameValidation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sendEmail = require("../helpers/sendEmail");
const otpTemplate = require("../helpers/otpTemplate");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

async function register(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      telephone,
      address,
      city,
      postCode,
      country,
      state,
    } = req.body;

    if (!nameValidation(firstName)) {
      return res.status(400).send({
        error: "Fisrt Name is Not Valid",
      });
    }

    if (!nameValidation(lastName)) {
      return res.status(400).send({
        error: "Last Name is Not Valid",
      });
    }

    if (!emailValidation(email)) {
      return res.status(400).send({
        error: "Please inter a valid email",
      });
    }

     let existingMail = await User.find({email})

     if(existingMail.length > 0){
      return res.status(400).send({
        error: "Email already Exists",
      });
     }

    bcrypt.hash(password, 10, async function (err, hash) {
      let userData = new User({
        firstName,
        lastName,
        email,
        password: hash,
        telephone,
        address,
        city,
        postCode,
        country,
        state,
      });
    
      userData.save();
      
      const generator2 = aleaRNGFactory(Date.now());
       let randomOTP = generator2.uInt32().toString().substring(0,4)
       let randomOTPStore = await User.findOneAndUpdate({email}, {$set: {randomOTP : randomOTP}}, {new: true})
      sendEmail(email, randomOTPStore , otpTemplate)
      
      setTimeout(async () => {
        // Update user record to remove OTP
        await User.updateOne({ email }, { $unset: { randomOTP: "" } });
        console.log("OTP removed for user:", email);
      }, 5 * 60 * 1000);
  
      res.json({
        success: "Registration Successful",
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      })
    })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}
module.exports = register;
