const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const User = require('../models/user');
const ObjectId = require('mongoose').ObjectId;
const Comments = require('../models/comments');

const getToken = (req) => {
    const token = req.headers.authorization.split(" ");

    const secret = 'posts-login';

    const decoded = jwt.verify(token[1], secret);

    return decoded.id;
}

const getAllPosts = async (req, res) => {

    try {
        let post = await Post.aggregate([
            {
                $lookup:
                {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ]);

        return res.json({ 'status': true, 'message': 'successfully logged in', 'data': post });
    }
    catch (err) {
        return res.status(400).json({ 'status': false, 'message': err });
    }

}

const getPost = async (req, res) => {


    const { id } = req.body;

    let post = await Post.findById(id).populate('user_id', ['name', 'email', 'mobile']).exec();


    if (post) {
        let post_id = id;
        let comments = await Comments.find({ post_id: post_id }).populate('user_id', ['name', 'email', 'mobile']); //
        return res.json({ 'status': true, 'message': 'posts data available', data: { 'post': post, 'comments': comments } });

    }

    return res.json({ 'status': true, 'message': 'posts data not available' });


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
            return res.json({ 'status': true, 'message': 'posts not deleted successfully' });
        }

        return res.status(200).json({ 'status': false, 'message': 'Posts data not found' });

    }
    catch (err) {
        return res.status(400).json({ 'status': false, 'message': err });
    }
}

const addComments = (req, res) => {

    const { comment, post_id } = req.body;

    let user_id = getToken(req);

    let addComment = Comments.create({ comment: comment, user_id: user_id, post_id: post_id });

    return res.json({ 'status': true, 'message': 'successfully comments added', 'data': addComment });

}

const editComments = async (req, res) => {

    const { id, comment, post_id } = req.body;

    let user_id = getToken(req);

    let check = await Comments.findOne({ _id: id });

    if (check) {
        let updateComments = await Comments.findOneAndUpdate({ _id: id }, { comment: comment, user_id: user_id, post_id: post_id }, { new: true });

        return res.json({ 'status': true, 'message': 'successfully comments updated', 'data': updateComments });
    }

    return res.json({ 'status': true, 'message': 'comments not found' });

}

const deleteComments = async (req, res) => {
    const { id } = req.body;

    let user_id = getToken(req);

    let check = await Comments.findOne({ _id: id });

    if (check) {
        let deleteComment = await Comments.findOneAndDelete({ _id: id, user_id: user_id }, { new: true });

        if (deleteComment) {
            return res.json({ 'status': true, 'message': 'successfully comments deleted' });
        }
    }

    return res.json({ 'status': true, 'message': 'comments not found' });

}


module.exports = {
    getAllPosts,
    getPost,
    createPosts,
    editPosts,
    deletePost,
    addComments,
    editComments,
    deleteComments
}