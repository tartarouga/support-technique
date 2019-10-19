var express = require("express");
var router = express.Router();
var Client = require("./../models/clientSchema");
var User = require("./../models/userSchema");


const bcrypt = require("bcryptjs");


router.post("/addClient", async (req, res) => {
    const client = await Client.create(req.body).catch(err => err);
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.role = "client";
    user.client = client._id;
    await user.save().catch(err => err);
    res.send({ msg: "ok" });



});


module.exports = router;