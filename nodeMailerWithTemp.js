require("dotenv").config();
var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path')
var sender = process.env.EMAIL_ADDRESS
var password = process.env.EMAIL_PASSWORD


var transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: sender,
        pass: password
    }
});


exports.sendEmail = (obj) => {
    return transporter.sendMail(obj);
};

exports.loadTemplate = (templateName, contexts) => {
    let template = new EmailTemplate(path.join(__dirname, 'mailTemplates', templateName));
    return Promise.all(contexts.map((context) => {
        console.log("context")
        console.log(context)
        return new Promise((resolve, reject) => {
            template.render(context, (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result,
                    context,
                });
            });
        })
    }));
};

