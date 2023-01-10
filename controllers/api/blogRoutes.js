const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//       // Get all projects and JOIN with user data
// router.get("/", async (req, res) => {
//     try {

//       const blogData = await Blog.findAll({
//         include: [
//           {
//             model: User,
//             attributes: ["username"],
//           },
//           {
//             model: Comment,
//             attributes: ['id', 'body', 'date_created', 'user_id'],
//           },
//         ],
//       });
  
//       // Serialize data so the template can read it
//       const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
//       // Pass serialized data and session flag into template
//       res.render("homepage", {
//         blogs,
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.update({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;


