var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();


router.get("/send-email", async (req, res) => {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "13572c818f22cf",
          pass: "d52c3351c18cfd"
        }
    });

    var message = {
        from: "norepley@celke.com.br",
        to: "gilvania@celke.com.br",
        subject: "Confirmação de cadastro - Wyver",
        text: "Prezado(a) Gilvânia. \n\nBem-vindo(a) à Wyver! \n\nClique no botão abaixo para confirmar seu e-mail e concluir seu cadastro:  \n\nEste link tem validade de 24h. Recomendamos que você realize a confirmação assim que receber este e-mail.",
        html: "Prezado(a) Gilvânia. <br><br>Bem-vindo(a) à Wyver!<br><br>Clique no botão abaixo para confirmar seu e-mail e concluir seu cadastro:<br><br>Este link tem validade de 24h. Recomendamos que você realize a confirmação assim que receber este e-mail."
    };

    transport.sendMail(message, function (err) {
        if (err) return res.status(400).json({
            erro: true,
            mensagem: "Erro: E-mail não enviado com sucesso!"
        });
    })

    return res.json({
        erro: false,
        mensagem: "E-mail enviado com sucesso!"
    });

});

module.exports = router;