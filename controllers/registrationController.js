// async function register(req, res) {
//     try {
//         res.send("Register successful")
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// module.exports = register

//////////////////second class
const eamilValidation = require("../helpers/emailValidation");
const nameValidation = require("../helpers/nameValidation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

async function register(req, res) {
  try {
    const {
      firstName,
      lastName,
      eamil,
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

    if (!eamilValidation(eamil)) {
      return res.status(400).send({
        error: "Please inter a valid email",
      });
    }

     let existingMail = await User.find({eamil})

     if(existingMail.length > 0){
      return res.status(400).send({
        error: "Email already Exists",
      });
     }

    bcrypt.hash(password, 10, function (err, hash) {
      let userData = new User({
        firstName,
        lastName,
        eamil,
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
        email: userData.eamil
      })
    });
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = register;
