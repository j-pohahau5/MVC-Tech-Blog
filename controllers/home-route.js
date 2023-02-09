const router = require("express").Router();
const { Comment, Blog, User } = require("../models");

router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll();

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.get('/', async (req, res) => {
//     try {
//       const dbProjectsData = await Project.findAll();
//       const projects = dbProjectsData.map((project) => project.get({plain: true}))
//       res.render('homepage', {
//         projects,
//         logged_in: req.session.logged_in
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
  
//   });

// router.get("/blog/:id", async (req, res) => {
//   try {
//     const dbBlogData = await Blog.findByPk(req.params.id, {
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "text", "date", "user_id"],
//           include: [
//             {
//               model: User,
//               attributes: ["id", "username"],
//             },
//           ],
//         },
//         {
//           model: User,
//           attributes: ["id", "username"],
//         },
//       ],
//     });

//     const blog = dbBlogData.get({ plain: true });
//     res.render("blog", { blog, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


  
//   router.get('/profile', withAuth, async (req, res) => {
//     console.log(req.session.logged_in);
//     try {
//       const dbUserData = await User.findByPk(req.session.user_id, {
//         include: [
//           {
//             model: Project,
//             attributes: ['id', 'name', 'description', 'needed_funding', 'date_created'],
//           },
//         ],
//       });
//       const projects = dbUserData.dataValues.projects.map((project) =>
//         project.get({ plain: true })
//       );
//       const user = dbUserData.dataValues;
//       res.render('profile', {
//         user,
//         projects,
//         logged_in: req.session.logged_in
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/project/:id', async (req, res) => {
//     try {
//       const dbProjectData = await Project.findByPk(req.params.id);
//       const project = dbProjectData.get({plain: true});
//       console.log(project)
//       res.render('project', {
//         project,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//       res.redirect('/profile');
//       return;
//     }
//     res.render('login');
//   });
  
  

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
