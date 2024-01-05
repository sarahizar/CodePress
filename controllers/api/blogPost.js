const express = require('express');
const Post = require('../../models/post');

const router = express.Router();

//Retrieves Blog Post for Homepage

router.get('/posts', async (req,res) => {
try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error'});
}
});

//Retrieves Blog Post By ID

router.get('posts/id:', async (req,res) => {
try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post){
        return res.status(404).json({message: 'Blog post not found'});
    }

    res.status(200).json(post);
} catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'})
}
});

/// Creates a New Blog Post

router.post('/create', async (req, res) => {
    try {
      const userId = req.user.id; 
  
      const postData = {
        title: req.body.title,
        content: req.body.content,
      };
  
      // Create a new post and associate it with the logged-in user
      const newPost = await Post.create({
        title: postData.title,
        content: postData.content,
        userId: userId,
      });
  
      res.status(201).json({ post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  ///Update an Existing Blog Post by ID

  router.put('/posts/:id', isAuth, async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      /// Check if the user is the author of the post

      if (post.userId !== req.session.userId) {
        return res.status(403).json({ message: 'Unauthorized to update this post' });
      }
  
      /// Update the post

      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
   ///Delete a Blog Post by ID 

   router.delete('/posts/:id', isAuth, async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      // Check if the user is the author of the post
      if (post.userId !== req.session.userId) {
        return res.status(403).json({ message: 'Unauthorized to delete this post' });
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