const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');

router.post('/', (req, res, next) => {
    var idCliente = req.body.idCliente;

    carregaComboSistema(res, idCliente);
});

//Função que faz a busca do sistema no Banco
function carregaComboSistema(res, clientID) {
    let querystring = `Select * from Server where FK_client  = ${clientID}`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            let existe = results.recordsets[0].length > 0;

            resolve(existe);
            console.log(results);
            res.send(results.recordset);
        }).catch(error => {
            console.log(error);
        });
    });
}

router.post('/consultaTotalDispositivos', (req, res, next) => {
    var idCliente = req.body.idCliente;

    sistemaDispositivos(res, idCliente);
});

function sistemaDispositivos(res, clientID) {
    let querystring = `SELECT s.idServer, count(idDevice) as totalDevices FROM Server as s inner join Device ON fk_server = s.idServer WHERE s.FK_client = ${clientID} group by s.idServer`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            let existe = results.recordsets[0].length > 0;

            resolve(existe);
            console.log(results);
            res.send(results.recordset);
        }).catch(error => {
            console.log(error);
        });
    });
}

router.post('/consultaComponentsAtual', (req, res, next) => {
    var sistema = req.body.codigosistema;

    componentesAtual(res, sistema);
});

function componentesAtual(res, codSistema) {
    let querystring = `select top 3 date_time, value, name from ServerComponents inner join ServerLog on idServerComponents = FK_ServerComponents where ServerComponents.FK_Server = ${codSistema} order by date_time desc`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            let existe = results.recordsets[0].length > 0;

            resolve(existe);
            console.log(results);
            res.send(results.recordset);
        }).catch(error => {
            console.log(error);
        });
    });
}

router.post('/consultaComponentesHistorico', (req, res, next) => {
    var sistema = req.body.codigosistema;
    var componente = req.body.componenteNome;

    var numeroDeDados = 30;
    let querystring = `select top ${numeroDeDados} date_time, value, name from ServerComponents inner join ServerLog on idServerComponents = FK_ServerComponents where ServerComponents.FK_Server = ${sistema} and name like '${componente}%' order by date_time desc`;

    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
            console.log(results)
            res.send(results.recordset);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
});


router.get('/consultaMaiorUtilizacao', (req, res, next) => {
    // var sistema = req.body.codigosistema;
    let querystring = `select name, count(*) as 'alertas' from ServerLog 
    inner join Server on 
    FK_Server = idServer where value > 90 group by name`;

    //let querystring = `select value, name from ServerLog inner join ServerComponents on idServerComponents = FK_ServerComponents where ServerLog.FK_Server = ${sistema} and value > 80`;
    console.log(querystring);
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
            console.log(results.recordset);
            res.send(results.recordset);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
});


router.post('/alertas', (req, res, next) => {
    var idCliente = req.body.idCliente;
    var valorAlerta = 90;
    let querystring = `select Server.name as 'serverName', value, ServerComponents.name as 'component', date_time as 'date' from ServerLog inner join ServerComponents on idServerComponents = FK_ServerComponents inner join Server on idServer = ServerLog.FK_Server where value > ${valorAlerta} and FK_client = ${idCliente}`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
            console.log(results.recordset);
            res.send(results.recordset);
        }).catch(error => {
            console.log(error);
        });
    });

});

router.post('/informacaoComponentes', (req, res, next) => {

    var sistema = req.body.codigosistema;

    let querystring = `SELECT * FROM ServerComponents where FK_Server = ${sistema}`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
            console.log(results);
            res.status(200).send(results.recordset);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

});

// ALTERAÇÃO DE SENHA
router.post('/alterarSenha', function (req, res, next) {

    var idClient = req.body.idCliente;
    var senha = req.body.password;

    let querystring = `UPDATE Client set 
         pswd = '${senha}'
          where idClient = ${idClient};`

    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
            console.log(results);
            res.status(200).send(results.recordset);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

});
module.exports = router;
