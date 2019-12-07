import express from 'express';
import deletar from '../querys/delete';

const router = express.Router();

router.post('/', (req, res, next) => {
    var sistema = req.body.idDispositivo;

    excluirDispositivo(sistema, res);
});

async function excluirDispositivo(selecionado, res) {

    try {
        let result = await deletar('Device', `idDevice = ${selecionado}`);
        if (result) {
            res.sendStatus(204);
        } else {
            res.sendStatus(500);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports = router;
