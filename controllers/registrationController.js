
const emailValidation = require("../helpers/emailValidation");
const nameValidation = require("../helpers/nameValidation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sendEmail = require("../helpers/sendEmail");
const otpTemplate = require("../helpers/otpTemplate");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const { generateToken } = require("../helpers/token");

async function registrationController(req, res) {
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
      birthYear,
      birthMonth,
      birthDate,
    } = req.body;

    if (!nameValidation(firstName)) {
      return res.status(400).send({
        error: "First Name is Not Valid",
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

    let existingMail = await User.find({ email });

    if (existingMail.length > 0) {
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
        birthYear,
        birthMonth,
        birthDate,
      });

      userData.save();

      const token = generateToken(
        {
          id: userData._id.toString(),
        },
        "30m"
      );

      const generator2 = aleaRNGFactory(Date.now());
      let randomOTP = generator2.uInt32().toString().substring(0, 4);
      let randomOTPStore = await User.findOneAndUpdate(
        { email },
        { $set: { randomOTP: randomOTP } },
        { new: true }
      );
      sendEmail(email, randomOTPStore, otpTemplate);

      res.json({
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        token: token,
        birthYear: userData.birthYear,
        birthMonth: userData.birthMonth,
        birthDate: userData.birthDate,
        success: "Registration Successful",
      });
    });
  } catch (error) {
    res.send(error.message);
  }
}
module.exports = registrationController;
