import express from 'express';
import consulta from '../querys/select';

const router = express.Router();

router.post('/', (req, res, next) => {
    let idCliente = req.body.idCliente;
    consultarSistemas(res, idCliente);
});

//Função que faz a busca do sistema no Banco
async function consultarSistemas(res, clientID) {
    try {
        let resposta = await consulta("*", "Server", ` where FK_client  = ${clientID}`);

        if (!!resposta) {
            res.status(200).send(resposta);
        }
        else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }
    }
    catch (error) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
}


router.post('/pesquisarDispositivo', async (req, res, next) => {
    try {
        const idDevice = req.body.idDevice;
        const columns = `Device.idDevice, Device.name, Device.description, model, DeviceStatus.description as 'status', DeviceType.name as 'type', Server.idServer`;
        const table = `Device inner join DeviceStatus on fk_status = idStatus inner join DeviceType on fk_type = idType inner join Server on FK_Server = idServer `;
        const filter = `where idDevice = ${idDevice};`;

        let resposta = await consulta(columns, table, filter);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }
    }
    catch (error) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
});

router.post('/pesquisarDispositivosDoSistema', async (req, res, next) => {
    try {
        let sistema = req.body.sistema;
        const columns = `Device.idDevice, Device.name, Device.description, model, DeviceStatus.description as 'status', DeviceType.name as 'type'`;
        const table = `Device inner join DeviceStatus on fk_status = idStatus inner join DeviceType on fk_type = idType`;
        const filter = `where fk_server = '${sistema}'`;

        let resposta = await consulta(columns, table, filter);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }
    }
    catch (error) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
});


router.post('/consultaTotalDispositivos', async (req, res, next) => {
    let idCliente = req.body.idCliente;
    try {
        const columns = `s.idServer, count(idDevice) as totalDevices`;
        const table = `Server as s inner join Device ON fk_server = s.idServer`;
        const filter = `WHERE s.FK_client = ${idCliente} group by s.idServer`;

        let resposta = await consulta(columns, table, filter);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }
    }
    catch (error) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
});

router.post('/consultaComponentsAtual', async (req, res, next) => {
    let codSistema = req.body.codigosistema;
    try {
        const columns = `top 3 date_time, value, name`;
        const table = `ServerComponents inner join ServerLog on idServerComponents = FK_ServerComponents`;
        const filter = `where ServerComponents.FK_Server = ${codSistema} order by date_time desc`;

        let resposta = await consulta(columns, table, filter);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }
    }
    catch (error) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
});


router.post('/consultaComponentesHistorico', async (req, res, next) => {
    try {
        let sistema = req.body.codigosistema;
        let componente = req.body.componenteNome;
        let numeroDeDados = 30;

        const columns = `top ${numeroDeDados} date_time, value, name`;
        const table = `ServerComponents inner join ServerLog on idServerComponents = FK_ServerComponents`;
        const filter = `where ServerComponents.FK_Server = ${sistema} and name like '${componente}%' order by date_time desc`;

        let resposta = await consulta(columns, table, filter);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }
    }
    catch (error) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
});


router.get('/consultaMaiorUtilizacao', async (req, res, next) => {

    try {
        const columns = `name, count(*) as 'alertas'`;
        const table = `ServerLog inner join Server on FK_Server = idServer `;
        const filter = `where value > 90 group by name`;

        let resposta = await consulta(columns, table, filter);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }
    }
    catch (error) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
});


router.post('/alertas', async (req, res, next) => {
    try {
        let idCliente = req.body.idCliente;
        let valorAlerta = 90;

        const columns = `Server.name as 'serverName', value, ServerComponents.name as 'component', date_time as 'date'`;
        const table = `ServerLog inner join ServerComponents on idServerComponents = FK_ServerComponents inner join Server on idServer = ServerLog.FK_Server`;
        const filter = `where value > ${valorAlerta} and FK_client = ${idCliente}`;

        let resposta = await consulta(columns, table, filter);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            var erro = `Erro: não existem dados`;
            res.status(500).send(erro);
        }
    }
    catch (error) {
        var erro = `Erro: ${error}`;
        res.status(500).send(erro);
    }
});

router.post('/informacaoComponentes', async (req, res, next) => {

    try {
        let sistema = req.body.codigosistema;
        const columns = `*`;
        const table = `ServerComponents`;
        const filter = `where FK_Server = ${sistema}`;

        let resposta = await consulta(columns, table, filter);
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


module.exports = router;
