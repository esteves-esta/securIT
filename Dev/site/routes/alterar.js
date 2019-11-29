const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');



router.post('/consultarDispositivo', (req, res, next) => {
    var idDevice = req.body.idDevice;

    let querystring = `Select Device.idDevice, Device.name, Device.description, model, DeviceStatus.description as 'status', DeviceType.name as 'type', Server.idServer from Device inner join DeviceStatus on fk_status = idStatus inner join DeviceType on fk_type = idType inner join Server on FK_Server = idServer where idDevice = ${idDevice};`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            let existe = results.recordsets[0].length > 0;

            resolve(existe);
            console.log(results);
            res.send(results.recordset);
        }).catch(error => {
            reject(error);
        });
    });
});

router.post('/consultarEmpresa', (req, res, next) => {
    var cdCliente = req.body.idCliente;
    console.log(cdCliente);
    // var idClient = req.body.idCliente;


    let querystring = `SELECT * FROM Client where idClient = ${cdCliente};`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            let existe = results.recordsets[0];

            resolve(existe);
            console.log(results);
            res.send(results.recordset);
        }).catch(error => {
            reject(error);
        });
    });

});


module.exports = router;