const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.disable("x-powered-by");

let corsOptions = {
    origin: ['localhost:3000','localhost:5000'] // Compliant
};

app.use(cors(corsOptions))

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Node JS running");
})

app.use('/api', routes);

mongoose.connect(MONGO_URI, {
    family: 4
}).then(() => {
    console.log("connection successfully ");
})
    .catch((e) => {
        console.log("error", e);
    })

app.listen(PORT, () => {
    console.log("server is running at " + PORT);
})
