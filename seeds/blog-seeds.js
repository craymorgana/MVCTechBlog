const { Blog } = require("../models");

const blogData = [
	{
		id: 1,
		title: "Why MVC is so important",
		content:
			"MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
		user_id: 1,
	},
	{
		id: 2,
		title: "Object-Relational Mapping",
		content: `I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!`,
		user_id: 2,
	},
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;