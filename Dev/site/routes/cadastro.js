const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');

router.post('/', (req, res, next) => {

    //Pegando os valores dos inputs do formulário de cadastro

    var representante = req.body.nomeRepresentante;
    var empresa = req.body.nomeEmpresa;
    var cnpj = req.body.cnpj
    var email = req.body.email;
    var telefone = req.body.telEmpresa;
    var senha = req.body.senha;

    console.log(representante, empresa, cnpj, email, telefone, senha);

    cadastro(representante, empresa, cnpj, email, telefone, senha, res);
});

//FUNÇÃO PRA CADASTRAR EMPRESA 
function cadastro(representante, empresa, cnpj, email, telefone, senha, res) {

    verificar(cnpj, email).then(resultado => {

        let criar = !resultado;
        console.log(`criar: ${criar}`);

        if (criar) {
            var stringSql = `insert into Client (name, compName, cnpj, email,phone, pswd) values ('${representante}', '${empresa}', '${cnpj}', '${email}','${telefone}', '${senha}')`;


            Database.query(stringSql).then(resultado => {
                res.status(200).send("ok");
                console.log("Empresa Cadastrada!");
            }).catch(error => {
                reject(error);
            });
        } else {
            res.status(200).send("Não Ok")
        }
    })
}


//FUNCAO PRA VERIFICAR SE CNPJ OU EMAIL JA ESTÁ CADSTRADO
function verificar(cnpj, email) {

    // A seguinte string  'stringSql' verifica se existe algum email ou cnpj que seja igual ao que o usuário está tentanto criar
    let querystring = `Select * from Client where cnpj = '${cnpj}' or email = '${email}'`; //email = '${email}' and
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {// É chamada a função para verificar esses dados
            // Caso ela de certo, continua as linhas abaixo
            let existe = results.recordsets[0].length > 0; // Caso oq vier do select no banco tiver como indice maior que 0, isso significa que há dados iguais ao que estão nos campos digitados pelo cliente

            resolve(existe); // Retorna as informações para quem chamou a função
            console.log("Informações verificadas!");
        }).catch(error => {// <-- Pega e trata se der algum erro 
            reject(error);// <-- Retorna o erro para quem chamou
        });
    });
}



module.exports = router;