const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');

router.post('/', (req, res, next) => {

    // var idClient = req.body.idCliente;

    var newPassword = req.body.novaSenha;
    var emailCliente = req.body.email;




    updateSenha(emailCliente, newPassword, res);

});

function updateSenha(emailCliente, newPassword, res) {

    let querystring = `UPDATE Client SET   pswd = '${newPassword}' where email = ${emailCliente}`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
            res.sendStatus(201);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

}








module.exports = router;
