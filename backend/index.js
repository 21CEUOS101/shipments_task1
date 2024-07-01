const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({path : './.env'});
const url = process.env.MONGODB_CONNECT_URL;

mongoose.connect(url, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());

app.use('/api', require('./Routers/router'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});