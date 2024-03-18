const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

const getToken = (req) => {
    const token = req.headers.authorization.split(" ");

    const secret = 'posts-login';

    const decoded = jwt.verify(token[1], secret);

    return decoded.id;
}

const getPosts = async (req, res) => {

    try {
        let post = await Post.find({});

        return res.json({ 'status': true, 'message': 'successfully logged in', 'data': post });
    }
    catch (err) {
        return res.status(400).json({ 'status': false, 'message': err });
    }

}

const createPosts = async (req, res) => {
    try {

        const { title, body } = req.body

        let user_id = getToken(req);

        let post = await Post.create({ title: title, body: body, user_id: user_id });

        if (post) {
            return res.json({ 'status': true, 'message': 'successfully posts created', 'data': post });
        }

        return res.json({ 'status': false, 'message': 'Issue post creation' }).status(200);

    }
    catch (err) {
        return res.status(400).json({ 'status': false, 'message': err });
    }
}

const editPosts = async (req, res) => {
    try {

        const { id, title, body } = req.body

        let user_id = getToken(req);

        let check = await Post.find({ user_id: user_id, _id: id });

        if (check.length > 0) {
            let update = await Post.findOneAndUpdate({ _id: id }, { title: title, body: body, user_id: user_id }, { new: true });
            if (update) {
                return res.json({ 'status': true, 'message': 'successfully posts updated', 'data': update }).exec;
            }
            return res.json({ 'status': true, 'message': 'posts not updated successfully' });
        }

        return res.status(200).json({ 'status': false, 'message': 'Posts data not found' });

    }
    catch (err) {
        return res.status(400).json({ 'status': false, 'message': err });
    }
}

const deletePost = async (req, res) => {
    try {

        const { id } = req.body

        let user_id = getToken(req);

        let check = await Post.find({ user_id: user_id, _id: id });

        if (check.length > 0) {
            let deletePosts = await Post.findOneAndDelete({ _id: id }, { new: true });

            if (deletePosts) {
                return res.json({ 'status': true, 'message': 'successfully posts deleted' });
            }
            return res.json({ 'status': true, 'message': 'posts not deleted successfully' }).exec;
        }

        return res.status(200).json({ 'status': false, 'message': 'Posts data not found' });

    }
    catch (err) {
        return res.status(400).json({ 'status': false, 'message': err });
    }
}


module.exports = {
    getPosts,
    createPosts,
    editPosts,
    deletePost
}