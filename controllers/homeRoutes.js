const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
//get all blogs if signed-in
router.get("/", async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ['id', 'body', 'date_created', 'user_id'],
        },
      ],
    });

    //  data plain as array so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass data and session into hbs template
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a single blog
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "body", "date_created", "user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get dashboard after login. Using withAuth middleware to prevent unauthorized access 
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Getting logged in user based on the session ID via PK
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    //passing data as string to template
    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

//get login page
router.get("/login", (req, res) => {
  // If already logged in, redirect the request to the dashboard route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});
router.get("/create", withAuth, async (req, res) => {
  try {
    const newPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "body", "date_created"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "body",
            "post_id",
            "user_id",
            "date_created",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const posts = newPostData.map((post) => post.get({ plain: true }));
    res.render("create-blog", { posts, logged_in: true });
  } catch (error) {
    res.status(500).json(error);
  }
});
//get to the create-a-blog endpoint
// router.get("/create", withAuth, async (req, res) => { 
//   try {
//     const newBlogData = await Blog.
//   }
//   res.render("homepage", { logged_in: req.session.logged_in });
// });
// get to the edit blog endpoint
router.get("/edit/:id", withAuth, async  (req, res) => {
  try {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "body", "date_created"],
    include: [
      {
        model: Comment,
        attributes: ["id", "body", "blog_id", "user_id","date_created"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
  res.render("edit-blog", {
    logged_in: req.session.logged_in,
    blog_id: req.params.id,
  });
} catch (error) {
  res.status(500).json(error);
}
});

module.exports = router;
