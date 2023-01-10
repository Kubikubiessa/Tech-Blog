const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get("/", async (req, res) => {
//     try {
//       // Get all projects and JOIN with user data
//       const commentData = await Comment.findAll({
//         include: [
//           {
//             model: User,
//             attributes: ["name"],
//           },
//           {
//             model: Blog,
//             attributes: ['id', 'body', 'date_created', 'user_id'],
//           },
//         ],
//       });
  
//       // Serialize data so the template can read it
//       const comments = commentData.map((comment) => comment.get({ plain: true }));
  
//       // Pass serialized data and session flag into template
//       res.render("homepage", {
//         comments,
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.update({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;


