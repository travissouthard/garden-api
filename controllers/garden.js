//Dependencies
const express = require("express")
const garden = express.Router()

const Garden = require("../models/garden.js")

////////
//Routes
////////

//Index
garden.get("/", (req, res) => {
    Garden.find({}, (err, foundGarden) => {
        if (err) {
            res.status(400).json({"Error": err.message})
        }
        res.status(200).json(foundGarden)
    })
})

//New
garden.post("/", (req, res) => {
    Garden.create(req.body, (err, createdPlot) => {
        if (err) {
            res.status(400).json({"Error": err.message})
        }
        res.status(200).json(createdPlot)
    })
})

//Update whole plot
garden.put("/:id", (req, res) => {
    Garden.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, updatedPlot) => {
        if (err) {
            res.status(400).json({"Error": err.message})
        }
        res.status(200).json(updatedPlot)
    })
})

//Add posts (Updates posts within plot)
garden.put("/post/:plotName", async (req, res) => {
    let foundPlot = await Garden.findOne({title: req.params.plotName})
    foundPlot.posts.push(req.body)
    await foundPlot.save()
    res.status(200).json(foundPlot)
})

//Delete posts
garden.put("/:plotName/:index", async (req, res) => {
    let foundPlot = await Garden.findOne({title: req.params.plotName})
    foundPlot.posts.splice(req.params.index, 1)
    await foundPlot.save()
    res.status(200).json(foundPlot)
})

//Delete whole plots
garden.delete("/:id", (req, res) => {
    Garden.findByIdAndDelete(req.params.id, (err, deletedGarden) => {
        if (err) {
            res.status(400).json({"Error": err.message})
        }
        res.status(200).json(deletedGarden)
    })
})

/////////
// Export
module.exports = garden