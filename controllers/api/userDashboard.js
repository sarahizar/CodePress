const express = require('express');
const Post = require('../models/Post');
const isAuth = require('../middleware/auth');

const router = express.Router();

///Retrieve a List of Blog Posts Created by the Logged-in User

router.get('/dashboard/posts', isAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.session.userId }, 
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

///Retrieve a Specific Post Created by the Logged-in User 

router.get('/dashboard/posts/:id', isAuth, async (req, res) => {
    try {
      const post = await Post.findOne({
        where: { id: req.params.id, userId: req.session.userId }, // Assuming user ID is stored in the session
      });
  
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  ///Create a New Blog Post for the Logged-in User 

  router.post('/dashboard/posts', isAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.userId, // Assuming user ID is stored in the session
      });
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  /// Update a Blog Post Created by the Logged-in User 

  router.put('/dashboard/posts/:id', isAuth, async (req, res) => {
    try {
      const post = await Post.findOne({
        where: { id: req.params.id, userId: req.session.userId }, 
      });
  
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      // Update the post
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  /// Delete a Blog Post Created by the Logged-in User

  router.delete('/dashboard/posts/:id', isAuth, async (req, res) => {
    try {
    
      const post = await Post.findOne({
        where: { id: req.params.id, userId: req.session.userId },
      });
  
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      // Delete the post
      await post.destroy();
  
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;