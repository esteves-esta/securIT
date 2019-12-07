const express = require('express');
const router = express.Router();
const Database = require('../Database');
const config = require('../config');


const nodemailer = require('nodemailer');

router.post('/enviarEmail', function (req, res, next) {


    // dados da SecurIT q vai enviar
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,  // 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "securitbrasil@gmail.com",
            pass: "securit123"
        },
        tls: { rejectUnauthorized: false }
    });

    // dados do usuario q vamos enviar

    var email = req.body.email; // email do usuario
    const mailOptions = {// email q será enviado
        from: 'securitbrasil@gmail.com',
        to: email,
        subject: 'Redefinição de senha',
        html: `<h1>Redefinição de senha</h1> <br>
    <p>Clique <a href=" http://localhost:3000/dashboard/AlterarSenha.html">aqui</a> para acessar a página de redefinição de senha.</b></p>
   
    '<small>Para mais informações, entrar em contato com a central de atendimento. </small>' 
    `};

    //colocar o url da tela no html
    // Autentifica se foi enviado e envia notificação
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.sendStatus(500);

        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send(info.response);
        }
    });
});



module.exports = router;

// Informações importantes
// https://support.google.com/mail/answer/7126229?p=BadCredentials&visit_id=636952698331422303-2710741373&rd=2#cantsignin
//https://support.google.com/accounts/answer/185833?hl=pt-BR
//https://myaccount.google.com/lesssecureapps?utm_source=google-account&utm_medium=web