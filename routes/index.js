const express = require('express')
const apiRoutes = require('./api')
const router = express.Router()

const api = process.env.BASE_URL

router.use(api, apiRoutes)

router.use(api, (req, res) => {
    res.send("No api routes found")
})


module.exports = router

// _.get("/user", (req,res)=>{
//   res.send("This is a user")
// })