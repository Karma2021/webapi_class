const mongoose = require("mongoose")

const bikeSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Bike', bikeSchema)