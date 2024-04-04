const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const Bookmarks = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId, ref: 'users',
            require: true,
            index: true
        },
        post_id: {
            type: Schema.Types.ObjectId, ref: 'posts',
            require: true,
            index: true
        },
        status:{
            type:Boolean,
            default:true
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('bookmarks', Bookmarks);