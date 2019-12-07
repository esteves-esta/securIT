var express = require('express');
var router = express.Router();
const Database = require('../Database');
const config = require('../config');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
