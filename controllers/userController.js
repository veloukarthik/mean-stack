const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            let comparePassword = await bcrypt.compare(password, user.password);

            if (comparePassword) {
                let id = user._id

                let token = jwt.sign({ id }, 'posts-login', { expiresIn: maxAge });

                let tokenupdate = await User.findOneAndUpdate({ email: email }, { token: token }, { new: true }).select(['name', 'email', 'mobile', 'gender', 'token']);

                return res.json({ 'status': true, 'message': 'successfully logged in', 'data': tokenupdate });
            }
            return res.status(400).json({ 'status': false, 'message': 'Incorrect password' })
        }

        return res.status(400).json({ 'status': false, 'message': 'Incorrect email' });
    }
    catch (err) {
        return res.status(400).json({ 'status': false, 'message': err });
    }

}


const register = async (req, res) => {

    try {
        const { name, email, mobile, password, gender } = req.body;


        const check = await User.find({ email: email, mobile: mobile });

        const salt = await bcrypt.genSalt();

        let encryptPassword = await bcrypt.hash(password, salt);


        if (check.length > 0) {
            return res.status(400).json({ 'status': false, 'message': 'Users already exists' });
        }

        let user = await User.create({ name: name, email: email, mobile: mobile, password: encryptPassword, gender: gender })

        if (user) {

            let id = user._id;

            let token = jwt.sign({ id }, 'posts-login', { expiresIn: maxAge });

            await User.findOneAndUpdate({ email: email }, { token: token }, { new: true });

            return res.status(200).json({ 'status': true, 'message': "You account is registered successfully" });
        }
    }
    catch (err) {
        return res.status(400).json({ 'status': false, 'message': err });
    }

}

const getToken = (req) => {
    const token = req.headers.authorization.split(" ");

    const secret = 'posts-login';

    const decoded = jwt.verify(token[1], secret);

    return decoded.id;
}

const myaccount = async (req, res) => {

    try {
        let userId = getToken(req);

        let users = await User.findById(userId).select(['name', 'email', 'mobile', 'gender', 'token']);
        ;

        return res.status(200).json({ 'status': true, 'message': "You account details",'user':users });
    }
    catch (e) {
        return res.status(400).json({ 'status': false, 'message': e });
    }



}

module.exports = {
    login,
    register,
    myaccount
}