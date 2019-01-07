const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const request = require('request');

const app = express();

// body parser 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// view engine

// static folder
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {

    if (!req.body.captcha) {
        return res.json({
            "success": false,
            "msg": "Please select captcha"
        })
    }

    // secret key
    const secretKey = '6Lcds4MUAAAAAOCbPCNlPTIN7TeB_ArRBn7SKFpR';

    // verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    // request to verifyUrl
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);
        console.log(body);

        // if not successful
        if (body.success !== undefined && !body.success) {
            return res.json({
                "success": false,
                "msg": "Failed captcha verification"
            })
        }

        // return res.json({
        //     "success": true,
        //     "msg": "Captcha passed"
        // })

        // if successful
        const output = `
            <p>You have a new contact request</p>
            <h3>Contact details</h3>
            <p>First Name: ${req.body.f_name}</p>
            <p>Last Name: ${req.body.s_name}</p>
            <p>Email: ${req.body.email}</p>
            <h3>Message:</h3>
            <p> ${req.body.message}</p>
        `;

        let transporter = nodemailer.createTransport({
            host: 'serwer1316757.home.pl',
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'luszczek.sebastian@awesome-ind.com', // generated ethereal user
                pass: 'utkow1991' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Nodemailer contact" <luszczek.sebastian@awesome-ind.com>', // sender address
            to: 'luszczeksebastian@gmail.com', // list of receivers
            subject: 'Node contact request', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            transporter.close();

        });

    });
})

app.listen(3000, () => {
    console.log('Server started.....');
})