const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Follows = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId, ref: 'users',
            require: true,
            index: true
        },
        follow_id: {
            type: Schema.Types.ObjectId, ref: 'users',
            require: true,
            index: true
        },
        status:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('follows', Follows);