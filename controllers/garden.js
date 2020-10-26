//Dependencies
const express = require("express")
const garden = express.Router()

//Routes
garden.get("/", (req, res) => {
    res.send("Oh hell yeah! Garden Time!")
})

module.exports = garden