const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');

router.post('/', (req, res, next) => {

    var email = req.body.email;
    var senha = req.body.password;
    logar(email, senha, res);
});

function logar(email, senha, res) {


    let querystring = `Select * from Client where email= '${email}' and pswd= '${senha}'`
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
            console.log(results.recordset);
            res.send(results.recordset);
        });

    })
}


module.exports = router;