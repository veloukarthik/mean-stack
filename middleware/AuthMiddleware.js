const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Auth = async (req, res, next) => {


    try {
        const token = req.headers.authorization.split(" ");

        const secret = 'posts-login';

        const decoded = jwt.verify(token[1], secret);

        if (decoded) {
            const id = new mongoose.Types.ObjectId(decoded.id);

            const user = await User.find({_id:id});

            if(user.length > 0)
            {
                return next();
            }
            return res.status(401).json({'status':false,'message':'Unauthorized access'});
        }



    }
    catch (err) {
        return res.status(401).json({'status':false,'message':'Unauthorized access'})
    }



}

module.exports = Auth;