const seedUsers = require('./user-seeds');
const seedBlogs = require('./blog-seeds');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  console.log('\n---- Users Seeded -----\n');

  await seedBlogs();
  console.log('\n---- Blogs Seeded -----\n');

  process.exit(0);
};

seedDatabase();
