const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');

router.post('/', (req, res, next) => {

    //Pegando os valores dos inputs do formulário de cadastro
    var dispositivo = req.body.nomeDispositivo;
    var tipoDispositivo = req.body.tipoDispositivo
    var modeloDispositivo = req.body.modeloDispositivo;
    var descricao = req.body.localDispositivo + " " + req.body.salaDispositivo;
    var nomeSistema = req.body.nomeSistema;
    var idSistema = req.body.sistema;
    var idCliente = req.body.idCliente;
    // console.log(dispositivo, tipoDispositivo, modeloDispositivo, andarDispositivo);
    cadastrarDevice(dispositivo, descricao, modeloDispositivo, nomeSistema, res, idCliente, tipoDispositivo, idSistema);
});

function cadastrarDevice(name, description, model, nomeSistema, res, idCliente, tipoDispositivo, idSistema) {

    verificarIdDevice(name)
        .then(resultado => {
            let criar = !resultado;

            console.log(`Dispositio pode ser criado: ${criar}`);

            var sistema = "";
            let type = "";

            adicionarTipo(tipoDispositivo)
                .then(r => {
                    type = r
                }).finally(() => {
                    if (criar) {
                        // SE A PESSOA NÃO SELECIONOU DA COMBO BOX VAI ADICIONAR O SERVIDOR//SISTEMA
                        if (idSistema == "Selecione o Sistema") {
                            adicionarServidor(nomeSistema, idCliente).
                                then(r => {
                                    sistema = r;
                                    console.log("Sistema cadastrado " + sistema)

                                    var stringSql = `insert into Device (name, description, model, fk_type, fk_server, fk_status) values ('${name}', '${description}', '${model}', ${type} , '${sistema}', 1)`;
                                    Database.query(stringSql).then(resultado => {
                                        res.status(200).send("ok");

                                        console.log("Dispositivo Cadastrado!");
                                    });

                                });
                        }
                        else {
                            // QUANDO USUARIO SELECIONOU UM SISTEMA JÁ CADASTRADO
                            var stringSql = `insert into Device (name, description, model, fk_type, fk_server, fk_status) values ('${name}', '${description}', '${model}', ${type} , '${idSistema}', 1)`;
                            Database.query(stringSql).then(resultado => {
                                res.status(200).send("ok");
                                console.log("Dispositivo Cadastrado!");
                            });
                        }
                    } else {
                        res.status(200).send("Não Ok")
                    }
                })

        }).catch(error => {
            console.log(error);
        });
}

// PESQUISA O TIPO SE EXISTIR RETORNA O ID
// SE NÃO EXISTIR ADICIONA O TIPO AO BANCO DE DADOS E RETORNA O ID ADICIONADO
function adicionarTipo(name) {
    let querystring = `Select * from DeviceType where name = '${name}'`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            let existe = results.recordsets[0].length > 0;
            if (!existe) {
                querystring = `Insert into DeviceType (name) values ('${name}') `;

                Database.query(querystring).then(results => {

                    let existindo = results.rowsAffected.length > 0;
                    if (existindo) {
                        let querystring = `SELECT top 1 idType FROM DeviceType ORDER BY idType DESC`;

                        Database.query(querystring).then(results => {
                            let existe = results.recordsets[0];
                            console.log("Tipo cadastrado!");
                            resolve(existe[0].idType);
                        });

                    }

                }).catch(error => {
                    reject(error);
                });

            } else {
                console.log("Tipo encontrado!");
                resolve(results.recordset[0].idType);
            }
        }).catch(error => {
            reject(error);
        });
    });

}

// FUNÇÃO PARA ADICIONAR SISTEMA E RETORNA VALOR DA ID DO SISTEMA CADASTRADO
function adicionarServidor(name, idClient) {
    let querystring = `Insert into Server (name, FK_client) values ('${name}', ${idClient})`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {


        }).then(() => {
            let querystring = `SELECT top 1 idServer FROM SERVER ORDER BY idServer DESC`;

            Database.query(querystring).then(results => {
                let existe = results.recordsets[0];
                console.log("Sistema cadastrado!");
                resolve(existe[0].idServer);
            });

        }).catch(error => {
            reject(error);
        });
    });
}

//FUNÇÃO QUE VERIFICA SE O DISPOSITIVO JÁ ESTÁ CADASTRADO NO SISTEMA
function verificarIdDevice(name) {

    let querystring = `Select * from Device where name = '${name}'`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {

            let existe = results.recordsets[0].length > 0;

            resolve(existe);
            console.log("Dispositivo verificado!");
        }).catch(error => {
            reject(error);
        });
    });
}


router.post('/alterar', (req, res, next) => {
    var idDevice = req.body.idDevice;
    var modelo = req.body.modeloDispositivo;
    var descricao = req.body.localDispositivo + " " + req.body.salaDispositivo;
    var nome = req.body.nomeDispositivo;

    var tipoDispositivo = req.body.tipoDispositivo

    var idSistema = req.body.sistema;
    let type = "";

    adicionarTipo(tipoDispositivo)
        .then(r => {
            type = r;
        }).finally(() => {
            if (type != "") {

                let querystring = `update Device set name='${nome}', description='${descricao}', model='${modelo}', fk_server=${idSistema}, fk_type=${type} where idDevice = ${idDevice};`;
                return new Promise((resolve, reject) => {
                    Database.query(querystring).then(results => {
                        res.sendStatus(201);
                    }).catch(error => {
                        res.status(500).send(error);
                    });
                });
            }

        });
});


module.exports = router;
