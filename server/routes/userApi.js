require('dotenv').config();
const uuidv4 = require('uuid/v4');


var express = require("express");
var router = express.Router();
var User = require("./../models/userSchema");
var Admin = require("./../models/adminSchema");
var ChFront = require("./../models/ChefFrontSchema");
var ChBack = require("./../models/chefBackSchema");
var TechFront = require("./../models/techFrontSchema");
var TechBack = require("./../models/techBackSchema");
var Conseiller = require("./../models/conseillerSchema");
var Settings = require("./../models/settings");
const bcrypt = require("bcryptjs");
var passport = require("passport");
var multer = require('multer');
const nodemailer = require('nodemailer');

const conn = false;





//configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
})

var upload = multer({ storage: storage })

// ************************function sendmail****************************/
function sendMail(user, person, code, userId) {
  const link = ` http://localhost:4200/activation/${code}/${userId}`;
  console.log(user)
  const post = `
  Hi,${person.name} ${person.lastname} <br>Your account has been successfully created.<br>please click on this <a href="${link}">link</a> to activate it.<br>`

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: 'kamounmehdi1@gmail.com', // TODO: email sender
    to: user.email, // TODO: email receiver
    subject: 'new account nodemailer - Test',
    html: post
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else
      console.log('Email sent!!!');
  });
}
// fin sendmail***************************************************************



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
      res.send({ msg: "ok add admin" });
      sendMail(user, admin);

    } else if (req.body.role === "chefFront") {
      const front = await ChFront.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.chefFront = front._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok" });

      sendMail(user, front);

    } else if (req.body.role === "chefBack") {
      const back = await ChBack.create(req.body).catch(err => err);
      const user = new User(req.body);

      if (user._id) {
        const code = uuidv4().replace(/-/g, '');
        const settingConfig = {
          userId: user._id,
          code: code
        }

        user.password = bcrypt.hashSync(req.body.password, 10);
        user.chefBack = back._id;
        await user.save().catch(err => err);
        const creatSetting = await Settings.create(settingConfig).catch(err => err)
        sendMail(user, back, code, user._id);
        res.send({ msg: "ok chef back add", data: user, creatSetting });
      }





    } else if (req.body.role === "techFront") {
      const front = await TechFront.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.techFront = front._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok techfront add" });
      sendMail(user, front);
    } else if (req.body.role === "techBack") {
      const back = await TechBack.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.techBack = back._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok techback add" });
      sendMail(user, back);
    } else if (req.body.role === "conseiller") {
      const conseiller = await Conseiller.create(req.body).catch(err => err);
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.conseiller = conseiller._id;
      await user.save().catch(err => err);
      res.send({ msg: "ok conseiller add" });
      sendMail(user, conseiller);
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

//upload user image
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.send({ msg: 'file received' })
// })

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
  res.send({ data: result });
});

router.get('/getUserClient', passport.authenticate("bearer", { session: false }), async (req, res) => {
  var result = await User.find({ role: 'client' }).exec()
  res.send({ data: result });
});

router.get('/getUserConseiller', passport.authenticate("bearer", { session: false }), async (req, res) => {
  var result = await User.find({ role: 'conseiller' }).exec()
  res.send({ data: result });
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
router.post('/updateUserMail/:id', async (req, res) => {
  var result = await User.findByIdAndUpdate({ _id: req.params.id }, { status: 'active' }).catch(err => err);
  res.send(result)
})


router.get('/activeAccount/:code/:userId', async (req, res) => {
  console.log(req.params.userId)
  const activate = await User.findByIdAndUpdate(req.params.userId, { $set: { status: 'active' } }).catch(err => err);
  const remove = await Settings.findOneAndRemove({ code: req.params.code }).catch(err => err);
  res.send({ activate, remove, msg: 'succes' });


})



router.get('/connected/:userId', passport.authenticate("bearer", { session: false }), async (req, res) => {

  const connected = await User.findByIdAndUpdate(req.params.userId, { $set: { connected: true } }).catch(err => err);
  res.send({ msg: 'connected' })
})

router.get('/disconnected/:userId', async (req, res) => {

  const disconnected = await User.findByIdAndUpdate(req.params.userId, { $set: { connected: false } }).catch(err => err);
  res.send({ msg: 'disconnected' })
})





module.exports = router;
