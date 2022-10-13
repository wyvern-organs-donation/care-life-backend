const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();


const sendConfirmationEmail = async (user) => {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var message = {
        from: "norepley@wyver.com.br",
        to: user.email,
        subject: "Confirmação de cadastro - Wyver",
        text: `Prezado(a) ${user.name}. \n\nBem-vindo(a) à Wyver! \n\nClique no botão abaixo para confirmar seu e-mail e concluir seu cadastro:  \n\nEste link tem validade de 24h. Recomendamos que você realize a confirmação assim que receber este e-mail.`,
        html: `Prezado(a) ${user.name}. <br><br>Bem-vindo(a) à Wyver!<br><br>Clique no botão abaixo para confirmar seu e-mail e concluir seu cadastro:<br><br>Este link tem validade de 24h. Recomendamos que você realize a confirmação assim que receber este e-mail.`
    };

    transport.sendMail(message, function (err) {
        if (err) console.log(err)
        return err
    })
};

module.exports = sendConfirmationEmail;