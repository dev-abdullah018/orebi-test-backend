const User = require("../models/userModel")

async function matchOTP (req,res){
    const {randomOTP, email} = req.body;

    const existingMail = await User.find({email})

    if(existingMail[0].randomOTP === randomOTP){

        setTimeout(async () => {
         await User.findOneAndUpdate({ email }, { $unset: { randomOTP: "" } });
           console.log("OTP removed for user:", email);
          }, 30*1000);

        return res.send({
            message: "OTP Matched"
        })
        
    }else{
        return res.send({
            message: "OTP Not Matched"
        })
    }
}

module.exports = matchOTP

