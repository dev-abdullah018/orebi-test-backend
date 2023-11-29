const emailValidation = require("../helpers/emailValidation");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function loginController (req,res){
    const {email, password} = req.body;

    if(!emailValidation(email)){
        return res.status(400).send({
            error: "Please enter a valid email address"
        })
    }

    let existingMail = await User.find({email})

    if(existingMail.length > 0) {
        bcrypt.compare(password, existingMail[0].password, function(err, result) {
           if(result){
            return res.json({
                Success : "Login Successfully",
                firstName: existingMail[0].firstName,
                lastName: existingMail[0].lastName,
            })
           }else{
            return res.status(400).send({
                error: "Password Not Matched"
            })
           }
        });
    }else{
        return res.status(400).send({
            error: "Email Not Matched"
        })
    }
}

module.exports = loginController;