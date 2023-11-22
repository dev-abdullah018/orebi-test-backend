require('dotenv').config()
const express = require('express')
// const {readdirSync} = require('fs')
const cors = require('cors')
const dbConnection = require('./config/dbConfig')
const routers = require('./routes')
const app = express()

// connection to database
dbConnection()

// middleware
app.use(cors())
app.use(express.json())

// // routes
// readdirSync('./routes').map((x)=>app.use('/api', require(`./routes/${x}`)))

// routes
app.use(routers)

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


