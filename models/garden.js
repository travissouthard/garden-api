const mongoose = require("mongoose")
const { stringify } = require("querystring")

const gardenSchema = mongoose.Schema({
    title: {type: String, unique: true},
    posts: {type: Array},
    tags: {type: Array},
    imageUrl: {type: String},
}, {timestamps: true})

module.exports = mongoose.model("Garden", gardenSchema)