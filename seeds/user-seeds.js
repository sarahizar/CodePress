const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // Add more users as needed
];

const seedUsers = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, { individualHooks: true });

  console.log('User seed data inserted successfully');
  process.exit(0);
};

seedUsers();