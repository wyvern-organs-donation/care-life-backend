const nodemailer = require('nodemailer');


const sendConfirmationEmail = async (user) => {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "f13a141549952c",
            pass: "021b4c23021d2a"
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