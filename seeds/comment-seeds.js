const sequelize = require('../config/connection');
const { Comment } = require('../models');

const commentSeedData = [
  {
    text: 'Comment on post 1.',
    userId: 2, // Use existing user IDs
    postId: 1, // Use existing post IDs
  },
  {
    text: 'Comment on post 2.',
    userId: 1,
    postId: 2,
  },
 
];

const seedComments = async () => {
  await Comment.bulkCreate(commentSeedData);

  console.log('Comment seed data inserted successfully');
  process.exit(0);
};

seedComments();