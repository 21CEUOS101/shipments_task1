/* 
    Company Model.
    Company Name (string, required)
    Company Address (string, optional)
    Company Phone (string, optional)
    Company Email (string, optional)
    Company Website (string, optional)
    Number of Employees (integer, optional)
    Founded Date (date, optional)
    Industry Type (enum: "Technology", "Finance", "Healthcare", "Retail", "Other", required)
*/

const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    employees: {
        type: Number
    },
    founded: {
        type: Date
    },
    industry: {
        type: String,
        enum: ["Technology", "Finance", "Healthcare", "Retail", "Other"],
        required: true
    }
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;