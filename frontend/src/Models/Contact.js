/*
    Contact Model:
    Contact Name (string, required)
    Contact Email (string, required)
    Contact Phone (string, optional)
    Date of Birth (date, optional)
    Contact Type (enum: "Primary", "Secondary", "Other", required)
*/

import * as yup from 'yup';

const phoneRegExp = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

const Contact = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    dob: yup.date(),
    type: yup.string().oneOf(["Primary", "Secondary", "Other"]).required()
});

export default Contact;