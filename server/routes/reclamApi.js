var express = require("express");
var router = express.Router();
var Reclam = require("./../models/reclamationSchema");
var Client = require("./../models/clientSchema");
const bcrypt = require("bcryptjs");
var passport = require("passport");


router.post(
    "/addReclam",
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {

        const reclam = new Reclam(req.body);


        var result = await reclam.save().catch(err => err);
        res.send(result);
    });


router.get('/getAllReclam', passport.authenticate("bearer", { session: false }), async (req, res) => {
    var result = await Reclam.find().populate('client').exec()
    res.send({ data: result });
});


module.exports = router;