const sequelize = require('../config/connection');
const { Post } = require('../models');

const postSeedData = [
  {
    title: 'Post 1 Title',
    content: 'Content for post 1.',
    userId: 1,
  },
  {
    title: 'Post 2 Title',
    content: 'Content for post 2.',
    userId: 2,
  },
];

const seedPosts = async () => {
  await Post.bulkCreate(postSeedData);

  console.log('Post seed data inserted successfully');
  process.exit(0);
};

seedPosts();