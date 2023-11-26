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

    bcrypt.hash(password, 10, function (err, hash) {
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
      userData.save()
      res.json({
        success: "Registration Successful",
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      })
    });
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = register;
