const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');

router.post('/', (req, res, next) => {
    var sistema = req.body.idDispositivo;

    carregaTabela(sistema, res);
});


//FUNÇÃO PRA CARREGAR OS DADOS NA TBELA
function carregaTabela(selecionado, res) {

    let querystring = `delete from Device where idDevice = ${selecionado}`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            res.sendStatus(201);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
}
module.exports = router;
