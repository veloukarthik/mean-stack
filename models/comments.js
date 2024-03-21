const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const Comments = new Schema(
    {
        comment:{
            type: String,
            index:true
        },
        user_id: {
            type: Schema.Types.ObjectId, ref: 'users',
            require: true,
            index: true
        },
        post_id: {
            type: Schema.Types.ObjectId, ref: 'posts',
            require: true,
            index: true
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('comments', Comments);