const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors())

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const router = express.Router()

app.get("/", (req, res) => {
    res.send("Node JS running");
})

app.use('/api', routes);

mongoose.connect("mongodb://127.0.0.1:27017/mean_stack",{
    family: 4
}).then(() => {
    console.log("connection successfully ");
})
.catch((e)=>{
    console.log("error",e);
})

app.listen(PORT, () => {
    console.log("server is running at " + PORT);
})
