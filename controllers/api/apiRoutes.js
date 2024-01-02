const express = require('express');
const router = express.Router();
const blogPosts = require('./blogPosts');
const commentRoute = require('./commentRoute');
const userDashboard = require('./userDashboard');
const userAuth = require('./userAuth');

// Blog Post API routes
router.use('/posts', blogPosts);

// Comment API routes
router.use('/posts/:postId/comments', commentRoute);

// Dashboard API routes
router.use('/dashboard', userDashboard);

// User Authentication API routes
router.use('/auth', userAuth);

module.exports = router;