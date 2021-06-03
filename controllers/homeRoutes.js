const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// localhost:3001/
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: Comment }, { model: User }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

///can remove but wait to see if user types 3001/login
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    console.log('LOGGED IN: ' + req.session.loggedIn);
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
