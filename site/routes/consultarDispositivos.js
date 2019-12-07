const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');

router.post('/', (req, res, next) => {
    var sistema = req.body.sistema;
    console.log("======================" + req.body.sistema);
    carregaTabela(sistema, res);
});


//FUNÇÃO PRA CARREGAR OS DADOS NA TBELA
function carregaTabela(selecionado, res) {

    let querystring = `Select Device.idDevice, Device.name, Device.description, model, DeviceStatus.description as 'status', DeviceType.name as 'type' from Device inner join DeviceStatus on fk_status = idStatus inner join DeviceType on fk_type = idType where fk_server = '${selecionado}'
                        `;
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
}
module.exports = router;
