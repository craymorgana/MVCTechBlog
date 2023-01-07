const router = require("express").Router();
const { User, Blog } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
	try {
		const blogData = await Blog.findAll({
			include: [
				{
					model: User,
					attributes: ["name"],
				},
			],
		});

		const blogs = blogData.map((blog) => blog.get({ plain: true }));

		res.render("homepage", {
			blogs,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ["password"] },
			include: [{ model: Blog }],
		});

		const user = userData.get({ plain: true });

		res.render("profile", {
			...user,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/create", withAuth, async (req, res) => {
	try {
		res.render("create", {
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/dashboard");
		return;
	}

	res.render("login");
});

// If the user is already logged in, redirect the request to another route
router.get("/signup", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/profile");
		return;
	}

	res.render("signup");
});

module.exports = router;
