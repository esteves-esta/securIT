import express from 'express';
import consulta from '../querys/select';

const router = express.Router();

router.post('/', async (req, res, next) => {

    const email = req.body.email;
    const senha = req.body.password;

    const filter = `where email='${email}' and pswd='${senha}'`;

    const resposta = await consulta('*', 'Client', filter);
    if (resposta) {
        res.send(resposta);
        console.log(resposta);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;