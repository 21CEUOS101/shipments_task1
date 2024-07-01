/*
    Contact Model:
    Contact Name (string, required)
    Contact Email (string, required)
    Contact Phone (string, optional)
    Date of Birth (date, optional)
    Contact Type (enum: "Primary", "Secondary", "Other", required)
*/

import yup from 'yup';

const Contact = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string(),
    dob: yup.date(),
    type: yup.string().oneOf(["Primary", "Secondary", "Other"]).required()
});

export default Contact;