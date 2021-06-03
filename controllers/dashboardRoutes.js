const router = require('express').Router();
const { User } = require('../models');
const { Blog } = require('../models');
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

//dashboard view user posts, add new posts, edit posts

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { userId: req.session.userId },
      include: [{ model: User }, { model: Comment }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { userId: req.session.userId },
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('editpost', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
