// Dependencies
const express = require("express")
const session = require("express-session")
const cors = require("cors")
const mongoose = require("mongoose")
const app = require("express")
const db = mongoose.connection

// Port
const PORT = process.env.PORT || 3000

//Database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/" + "garden"
require("dotenv").config()

//Connect to Mongo
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

//Error handling
db.on("error", (err) => console.log(err.message + " is Mongod not running?"))
db.on("connected", () => console.log("Mongo is connected at: " + MONGODB_URI))
db.on("disconnected", () => console.log("Mongo disconnected"))

//Open connection to mongo
db.on("open", ()=>{})

//Middleware
app.use(express.json())
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUnitialized: false,
    })
)

//CORS requirements
const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}
app.use(cors(corsOptions))

//Routes
const gardenController = require("./controllers/garden.js")
app.use("/garden", gardenController)

app.get("/", (req, res) => {
    res.redirect("/garden")
})

//Listener
app.listen(PORT, () => {
    console.log("Listening for the garden to grow at: ", PORT)
})