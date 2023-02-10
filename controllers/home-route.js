const router = require("express").Router();
const { Comment, Blog, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
    if(req.session.logged_in){
    try {
      const userData = await User.findByPk(req.session.user_id, {
        include: [
          {
            model: Blog,
            attributes: ["id", "title", "content", "date_created"],
          },
        ],
      });
      const blogs = userData.dataValues.blogs.map((blog) =>
      blog.get({ plain: true })
      );
      console.log(blogs)
      const user = userData.dataValues;
      
    //   console.log(blogs)   
      res.render('dashboard', {
        user,
        blogs,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
    } else {
        console.log("no good")
    }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});
module.exports = router;
