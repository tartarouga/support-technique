var express = require("express");
var router = express.Router();
var Client = require("./../models/clientSchema");
var User = require("./../models/userSchema");
const process = require('process')




const bcrypt = require("bcryptjs");
var multer = require('multer');

//configure multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + '.png')
        cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})

var upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }


})

router.post('/upload', upload.single('file'), async (req, res) => {
    const data = req.file
    console.log(data)
    res.send(data)
    // req.body will hold the text fields, if there were any
})

router.get('/file/:filename', (req, res) => {
    res.sendFile(process.cwd() + '/uploads/images/' + req.params.filename)
})

router.post("/addClient", async (req, res) => {
    const client = await Client.create(req.body).catch(err => err);
    const user = new User(req.body);

    user.password = bcrypt.hashSync(req.body.password, 10);

    user.role = "client";
    user.client = client._id;
    console.log(user)


    await user.save().catch(err => err);
    res.send({ msg: "ok" });

});






module.exports = router;