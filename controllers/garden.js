//Dependencies
const express = require("express")
const garden = express.Router()

const Garden = require("../models/garden.js")

//Routes
garden.get("/", (req, res) => {
    res.send("<h1>Travis' Garden</h1>")
    // Garden.find({}, (err, foundGardens) => {
    //     if (err) {
    //         res.status(400).json({"Error": err.message})
    //     }
    //     res.status(200).json(foundGardens)
    // })
})

module.exports = garden