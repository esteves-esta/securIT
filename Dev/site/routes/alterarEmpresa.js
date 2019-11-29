const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');

router.post('/', (req, res, next) => {

    var idClient = req.body.idCliente;
    var empresa = req.body.nomeEmpresa;
    var representante = req.body.representante;
    var cnpj = req.body.cnpj;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var senha = req.body.password;



    updateEmpresa(idClient, representante, empresa, cnpj, email, telefone, senha, res);

});

function updateEmpresa(idClient, representante, empresa, cnpj, email, telefone, senha, res) {
    console.log(empresa + "==" + representante + "==" + cnpj + "==" + email + "==" + telefone + "==" + senha);
    let querystring = `UPDATE Client SET  name = '${representante}', compName = '${empresa}', cnpj = '${cnpj}', phone = '${telefone}', email = '${email}', pswd = '${senha}' where idClient = ${idClient}`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
            res.sendStatus(201);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

}
//FUNÇÃO PRA CARREGAR OS DADOS NA TBELA
function carregaTabela(selecionado, res) {

    let querystring = `UPDATE FROM Server where idSever = ${selecionado}`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            res.sendStatus(201);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
}
module.exports = router;
