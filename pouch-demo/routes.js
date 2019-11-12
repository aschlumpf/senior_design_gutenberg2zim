const express = require("express")
const router = express.Router()
var PouchDB = require('pouchdb');
var db = new PouchDB('data');

router.get("/", function(req, res) {
	res.render("layouts/main");
});

router.post("/add", function(req, res) {
    const body = req.body;
    db.put({
        _id: body.id,
        "name": body.name,
        "age": body.age
    }).then(function(response) {
        console.log("db response:", response);
        res.json(response);
    }).catch(function(error) {
        console.log("db error:", error);
        res.status(500).json(error);
    })
})

router.get("/find", function(req, res) {
    const body = req.body;
    db.get(body.id).then(function(doc) {
        console.log("db get response:", doc);
        res.json(doc);
    }).catch(function(err) {
        console.log("db get error:", err);
        res.status(500).json(err);
    });
})

module.exports = router;