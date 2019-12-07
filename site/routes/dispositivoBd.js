import express from 'express';
import consulta from '../querys/select';
import atualizar from '../querys/update';
import inserir from '../querys/insert';

const router = express.Router();

router.post('/pesquisarDispositivo', async (req, res, next) => {
    const idDevice = req.body.idDevice;

    const columns = `Device.idDevice, Device.name, Device.description, model, DeviceStatus.description as 'status', DeviceType.name as 'type', Server.idServer`;
    const table = `Device inner join DeviceStatus on fk_status = idStatus inner join DeviceType on fk_type = idType inner join Server on FK_Server = idServer `;
    const filter = `where idDevice = ${idDevice}`;

    let resultado = await consulta(columns, table, filter);
    if (resultado) {
        res.status(200).send(resultado);
    } else {
        res.sendStatus(500);
    }
});

router.post('/pesquisarDispositivosDoSistema', async (req, res, next) => {
    let sistema = req.body.sistema;

    const columns = `Device.idDevice, Device.name, Device.description, model, DeviceStatus.description as 'status', DeviceType.name as 'type'`;
    const table = `Device inner join DeviceStatus on fk_status = idStatus inner join DeviceType on fk_type = idType`;
    const filter = `where fk_server = '${sistema}'`;

    let resultado = await consulta(columns, table, filter);
    if (resultado) {
        res.status(200).send(resultado);
    } else {
        res.sendStatus(500);
    }
});

router.post('/inserirDispositivo', (req, res, next) => {

    //Pegando os valores dos inputs do formulário de cadastro
    let dispositivo = {
        idCliente: req.body.idCliente,
        idSistema: req.body.sistema,
        sistema: req.body.nomeSistema,
        nome: req.body.nomeDispositivo,
        tipo: req.body.tipoDispositivo,
        idTipo: "",
        modelo: req.body.modeloDispositivo,
        descricao: `${req.body.localDispositivo} ${req.body.salaDispositivo}`,
    }

    cadastrar(dispositivo, res);
});


async function verificaDispositivoExiste(idCliente, name) {
    // verificar se dispositivo já foi cadastrado
    // ERROR TREAMENT SQL
    let filter = `as d inner join Server as s on idServer = fk_server 
    where fk_client = ${idCliente} and d.name = '${name}'`;
    return await consulta('*', 'Device', filter);
}

async function isTipo(tipoDispositivo) {
    let filter = `where name = '${tipoDispositivo}'`;
    return await consulta('*', 'DeviceType', filter);
}

async function insereTipo(tipoDispositivo) {
    let insereTipo = await inserir('DeviceType', `name`, `'${tipoDispositivo}'`);
    if (insereTipo) {
        let pesquisaIdTipo = await consulta('top 1 idType', 'DeviceType', 'ORDER BY idType DESC');
        return pesquisaIdTipo[0].idType;
    } else {
        return false;
    }
}

async function insereDispositivo(info) {
    const colunas = 'name, description, model, fk_type, fk_server, fk_status';
    let valores = `'${info.nome}', '${info.descricao}', '${info.modelo}', ${info.idTipo} , '${info.idSistema}', 1`;
    return await inserir('Device', colunas, valores);
}

// FUNÇÃO PARA ADICIONAR SISTEMA E RETORNA VALOR DA ID DO SISTEMA CADASTRADO
async function adicionarServidor(name, idClient) {
    const colunas = `name, FK_client`;
    const values = `'${name}', ${idClient}`;
    const insere = await inserir('Server', colunas, values);
    if (insere) {
        const consultarTop = await consulta('top 1 idServer',
            'SERVER', 'ORDER BY idServer DESC');
        return consultarTop[0].idServer;
    } else {
        return false;
    }
}


async function cadastrar(dispositivo, res) {
    try {
        // VERIFICA SE DISPOSITIVO JÁ EXISTE PARA ESSE CLIENTE
        let pesquisaDispositivo = await verificaDispositivoExiste(dispositivo.idCliente, dispositivo.nome);
        if (!pesquisaDispositivo) {
            // verificar se TIPO do dispositivo existe

            let pesquisaTipo = await isTipo(dispositivo.tipo);
            if (pesquisaTipo) {
                dispositivo.idTipo = pesquisaTipo[0].idType;
            } else {
                // insere TIPO na tabela
                dispositivo.idTipo = await insereTipo(dispositivo.tipo);
            }

            if (dispositivo.sistema !== undefined && dispositivo.sistema != "") {
                dispositivo.idSistema = await adicionarServidor(dispositivo.sistema, dispositivo.idCliente)
            }


            let resultado = await insereDispositivo(dispositivo);

            if (resultado) {
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        }
        else {
            res.sendStatus(500);
        }

    } catch (error) {
        res.sendStatus(500);
    }
}



router.post('/alterar', (req, res, next) => {
    let info = {
        idDevice: req.body.idDevice,
        idSistema: req.body.sistema,
        nome: req.body.nomeDispositivo,
        tipo: req.body.tipoDispositivo,
        idTipo: "",
        modelo: req.body.modeloDispositivo,
        descricao: `${req.body.localDispositivo} ${req.body.salaDispositivo}`
    }

    alterarD(info, res);
});

async function alterarD(info, res) {
    try {
        // verificar se TIPO do dispositivo existe

        let pesquisaTipo = await isTipo(info.tipo);

        if (pesquisaTipo) {
            info.idTipo = pesquisaTipo[0].idType;
        } else {
            // insere TIPO na tabela
            info.idTipo = await insereTipo(info.tipo);
        }

        let change = `name='${info.nome}', description='${info.descricao}', model='${info.modelo}', fk_server=${info.idSistema}, fk_type=${info.idTipo}`;
        let ff = `idDevice = ${info.idDevice}`;
        let resposta = await atualizar('Device', change, ff);
        if (resposta) {
            res.sendStatus(200);
        }
        else {
            res.status(500).send(error);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = router;
