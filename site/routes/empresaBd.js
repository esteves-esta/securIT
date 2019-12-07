import express from 'express';
import consulta from '../querys/select';
import inserir from '../querys/insert';
import atualizar from '../querys/update';

const router = express.Router();

router.post('/', (req, res, next) => {

    //Pegando os valores dos inputs do formulário de cadastro
    let empresa = {
        representante: req.body.nomeRepresentante,
        nome: req.body.nomeEmpresa,
        cnpj: req.body.cnp,
        email: req.body.email,
        senha: req.body.senha,
    }
    cadastrar(empresa, res);
});

async function cadastrar(empresa, res) {
    // verificar se email ou senha já são cadastrados
    const filter = `where cnpj = '${empresa.cnpj}' or email = '${empresa.email}'`;
    const resultado = await consulta('*', 'Client', filter, res);

    // se resultado for false então cadastrar
    if (!resultado) {
        const colunas = `name, compName, cnpj, email, pswd`;
        const values = `'${empresa.representante}', '${empresa.nome}', '${empresa.cnpj}', '${empresa.email}', '${empresa.senha}'`;
        const response = await inserir('Client', colunas, values);
        if (!!response) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500);
    }
}

router.post('/consultarEmpresa', async (req, res, next) => {
    try {
        var cdCliente = req.body.idCliente;
        const filter = `where idClient = '${cdCliente}'`;
        const resposta = await consulta('*', 'Client', filter);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }

    } catch (err) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
});


router.post('/alterar', (req, res, next) => {

    let empresa = {
        idUsuario: req.body.idCliente,
        empresa: req.body.nomeEmpresa,
        representante: req.body.representante,
        cnpj: req.body.cnpj,
        email: req.body.email,
        telefone: req.body.telefone,
        senha: req.body.password
    }
    alterar(empresa, res);
});


async function alterar(empresa, res) {
    try {
        let mudanca = `compName = '${empresa.idUsuario}', name = '${empresa.representante}', cnpj = '${empresa.cnpj}', 
        phone = '${empresa.telefone}', email = '${empresa.email}', pswd = '${empresa.senha}'`;
        let filtro = `idClient = '${empresa.idUsuario}'`;
        let alterando = await atualizar("Client", mudanca, filtro);

        if (alterando) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = router;