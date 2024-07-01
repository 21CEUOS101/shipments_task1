/*
    Contact Model:
    Contact Name (string, required)
    Contact Email (string, required)
    Contact Phone (string, optional)
    Date of Birth (date, optional)
    Contact Type (enum: "Primary", "Secondary", "Other", required)
*/

const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    dob: {
        type: Date
    },
    type: {
        type: String,
        enum: ["Primary", "Secondary", "Other"],
        required: true
    }
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;