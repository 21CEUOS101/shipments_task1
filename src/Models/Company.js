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

import * as yup from 'yup';

const Company = yup.object().shape({
    name: yup.string().required(),
    address: yup.string(),
    phone: yup.string(),
    email: yup.string().email(),
    website: yup.string().url(),
    employees: yup.number().integer(),
    founded: yup.date(),
    industry: yup.string().oneOf(["Technology", "Finance", "Healthcare", "Retail", "Other"]).required()
});

export default Company;