const express = require('express');
const Comment = require('../../models/comment');
const isAuth = require('../../utils/auth');

const router = express.Router();

///Retrieves comments for a specific blog post

router.put('/posts/:postId/comments/:commentId', isAuth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user is the author of the comment
    if (comment.userId !== req.session.userId) {
      return res.status(403).json({ message: 'Unauthorized to update this comment' });
    }

    // Update the comment
    comment.content = req.body.content || comment.content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

///Add a New Comment to a Blog Post

router.post('/posts/:postId/comments', isAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        content: req.body.content,
        postId: req.params.postId,
        userId: req.session.userId, // Assuming user ID is stored in the session
      });
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  ///Update a Comment

  router.put('/posts/:postId/comments/:commentId', isAuth, async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Check if the user is the author of the comment
      if (comment.userId !== req.session.userId) {
        return res.status(403).json({ message: 'Unauthorized to update this comment' });
      }
  
      // Update the comment
      comment.content = req.body.content || comment.content;
      await comment.save();
  
      res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  ///Delete a Comment
  
  router.delete('/posts/:postId/comments/:commentId', isAuth, async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Check if the user is the author of the comment
      if (comment.userId !== req.session.userId) {
        return res.status(403).json({ message: 'Unauthorized to delete this comment' });
      }
  
      // Delete the comment
      await comment.destroy();
  
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;