const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Post = new Schema({
    title: {
        type: String,
        require: true,
        index: true
    },
    body: {
        type: String,
        require: true,
        index: true
    },
    image:{
        type: String,
        require: false,
        index: true
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'users',
        require: true,
        index: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('posts', Post);