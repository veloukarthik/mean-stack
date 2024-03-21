const express = require('express');
const User = require('../controllers/userController');
const Auth = require('../middleware/AuthMiddleware');
const Post = require('../controllers/postController');

const router = express.Router();

router.post('/login', User.login);

router.post('/register', User.register);

router.post('/my-account', User.myaccount);

router.get('/get-all-posts', Post.getAllPosts);

router.get('/get-post',Post.getPost);

router.post('/create-post', Auth, Post.createPosts);

router.put('/edit-post', Auth, Post.editPosts);

router.delete('/delete-post', Auth, Post.deletePost);

router.post('/add-comments',Auth,Post.addComments);

router.put('/edit-comments',Auth,Post.editComments);

router.delete('/delete-comments',Auth,Post.deleteComments);

module.exports = router;



