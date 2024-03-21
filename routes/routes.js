const express = require('express');
const User = require('../controllers/userController');
const Auth = require('../middleware/AuthMiddleware');
const Post = require('../controllers/postController');

const router = express.Router();


/**
    * @openapi
    * '/api/login':
    *  post:
    *     tags:
    *     - User Controller
    *     summary: Login as a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - email
    *              - password
    *            properties:
    *              email:
    *                type: string
    *                default: "karthikvelou@optisolbusiness.com"
    *              password:
    *                type: string
    *                default: "12345"
    *     responses:
    *      201:
    *        description: Succesfully logged In
    *      409:
    *        description: Conflict
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
router.post('/login', User.login);

/** POST Methods */
/**
 * @openapi
 * '/api/user/register':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe 
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post('/register', User.register);

router.post('/my-account', User.myaccount);

router.get('/get-all-posts', Post.getAllPosts);

router.get('/get-post', Post.getPost);

router.post('/create-post', Auth, Post.createPosts);

router.put('/edit-post', Auth, Post.editPosts);

router.delete('/delete-post', Auth, Post.deletePost);

router.post('/add-comments', Auth, Post.addComments);

router.put('/edit-comments', Auth, Post.editComments);

router.delete('/delete-comments', Auth, Post.deleteComments);

module.exports = router;



