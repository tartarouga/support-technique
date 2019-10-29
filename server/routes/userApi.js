var express = require("express");
var router = express.Router();
var User = require("./../models/userSchema");
var Admin = require("./../models/adminSchema");
var ChFront = require("./../models/ChefFrontSchema");
var ChBack = require("./../models/chefBackSchema");
var TechFront = require("./../models/techFrontSchema");
var TechBack = require("./../models/techBackSchema");
var Conseiller = require("./../models/conseillerSchema");
const bcrypt = require("bcryptjs");
var passport = require("passport");

router.post(
  "/addUser",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    if (req.body.role === "admin") {
      const admin = await Admin.create(req.body).catch(err => err);
      console.log(admin);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.admin = admin._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok" });
    }
    if (req.body.role === "chefFront") {
      const front = await ChFront.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.chefFront = front._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok" });
    }

    if (req.body.role === "chefBack") {
      const back = await ChBack.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.chefBack = back._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok" });
    }
    if (req.body.role === "techFront") {
      const front = await TechFront.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.techFront = front._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok" });
    }
    if (req.body.role === "techBack") {
      const back = await TechBack.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.techBack = back._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok" });
    }
    if (req.body.role === "conseiller") {
      const conseiller = await Conseiller.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.conseiller = conseiller._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok" });
    } else {
      res.send({ msg: "Error" });
    }
  }
);

// router.get(
//   "/profile",
//   passport.authenticate('bearer', { session: false }),
//   async (req, res) => {


//     //var role = req.user.role;
//     //console.log(role)
//     const result = await User.findOne(req.user._id)

//       //.populate(role)
//       .exec()
//       .catch(err => err);
//     res.json(result);
//   }
// );

router.post('/findemail', async (req, res) => {
  var result = await User.findOne({ email: req.body.email }).exec();
  if (result) {
    res.send({ emailExist: true });
  } else {
    res.send({ emailExist: false });
  }

})

// router.get(
//   "/profile",

//   async (req, res) => {
//     if (req.body.role === 'admin') {
//       const result = await Admin.findOne(req.user.admin._id).exec().catch(err => err);
//       res.send(result)
//     }
//     if (req.body.role === 'chefBack') {
//       const result = await ChBack.findOne(req.user.chefBack._id).exec().catch(err => err);
//       res.send(result)
//     }
//     if (req.body.role === 'chefFront') {
//       const result = await ChFront.findOne(req.user.chefFront._id).exec().catch(err => err);
//       res.send(result)
//     }
//     if (req.body.role === 'techBack') {
//       const result = await TechBack.findOne(req.user.techBack._id).exec().catch(err => err);
//       res.send(result)
//     }
//     if (req.body.role === 'techFront') {
//       const result = await TechFront.findOne(req.user.techFront._id).exec().catch(err => err);
//       res.send(result)
//     }
//     if (req.body.role === 'conseiller') {
//       const result = await Conseiller.findOne(req.user.conseiller._id).exec().catch(err => err);
//       res.send(result)
//     }




//   });


//     //var role = req.user.role;
//     //console.log(role)
//     const result = await User.findOne(req.user._id)

//       //.populate(role)
//       .exec()
//       .catch(err => err);
//     res.json(result);
//   }
// );

router.get('/getAllUser', passport.authenticate("bearer", { session: false }), async (req, res) => {
  var result = await User.find().exec()
  res.send({ data: result });
});

router.get('/getUserTechFront', passport.authenticate("bearer", { session: false }), async (req, res) => {
  var result = await User.find({ role: 'techBack' }).exec()
  res.send(result);
});










router.get('/getUserAdmin/:id', passport.authenticate("bearer", { session: false }), async (req, res) => {
  var result = await Admin.findById(req.params.id).exec()
  res.send(result);
})
router.get('/getUserChefBack/:id', passport.authenticate("bearer", { session: false }), async (req, res) => {
  var result = await ChBack.findById(req.params.id).exec()
  res.send(result);
})

router.post('/updateUser/:id', async (req, res) => {
  var result = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }).catch(err => err);
  res.send(result)
})










module.exports = router;
