const express = require('express');

const router = express.Router();

const ContactSchema = require('../Models/Contact');
const CompanySchema = require('../Models/Company');

// one single router to add both company and contact data to the database
router.post('/add', async (req, res) => {
    try {
        const { company, contact } = req.body;
        const newCompany = new CompanySchema(company);
        const newContact = new ContactSchema(contact);

        await newCompany.save();
        await newContact.save();
        res.status(201).send({ newCompany, newContact });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

module.exports = router;