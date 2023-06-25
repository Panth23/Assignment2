// Import
let mongoose = require('mongoose');

// Create a model class
let BusinessContactModel = mongoose.Schema(
    {
        name: String,
        number: Number,
        email: String   
    },
    {
        collection: "BusinessContact"
    }
);

module.exports = mongoose.model("BusinessContact", BusinessContactModel);