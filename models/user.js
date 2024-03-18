const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        require: true,
        index: true
    },
    mobile: {
        type: Number,
        require: true,
        index: true
    },
    email: {
        type: String,
        require: true,
        index: true
    },
    password: {
        type: String,
        require: true,
    },
    gender:{
        type:String,
    },
    token:{
        type:String,
        require:true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('users', User);