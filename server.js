const express = require ("express")
const errorHandler = require("./middelwares/errorHandler")
const {protect} = require("./middelwares/authmiddleware")
const connectDb = require("./config/dbConnection")
const bodyParser = require("body-parser")

const dotenv = require("dotenv")
dotenv.config()

connectDb()

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(bodyParser.json());

app.use("/api/contacts", require("./routes/contactroutes"))
app.use("/api/users", require("./routes/userroutes"))
app.use(protect)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`the serve is runnung on the port ${port}`)
})

console.log("this is awesome")

