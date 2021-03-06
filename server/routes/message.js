const express = require('express');
const app = express();
const Message = require('../models/message');
const nodeMailer = require('nodemailer');
const { headers } = require('../milddlewares/milddelewares');
const { user_gmail, pass_gmail } = require('../config/config');

//===================================
//Get all the message
//===================================
app.get('/message', headers, (req, res)=> {

    Message.find({})
            .exec((err, messages) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }
                res.json({
                    ok: true,
                    messages,
                })
            })
})


//===================================
//Create a message
//===================================
app.post('/message', headers, (req, res)=> {
    let body = req.body
    
    let message = new Message({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        telephone: body.telephone,
        message: body.message,
    })

    let htmlMessage = `
        <h3>Mensaje de consulta</h3>
        <br>
        <p>${ body.message }</p>
        <br>
        <h4>Datos de la consulta</h4>
        <lu>
            <li>Nombre: ${ body.name} ${ body.lastName}</li>
            <li>Email: ${ body.email}</li>
            <li>Telefono: ${ body.telephone}</li>
        </lu>
        <br>
    `

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: user_gmail,
            pass: pass_gmail,
        }
    });

    let mailOptions = {
        to: user_gmail,
        subject: 'Consulta - Panaderia',
        html: htmlMessage,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);

        message.save((err, messageDB)=>{
            if(err){
                res.status(500).json({
                    ok: false,
                    err
                })
            }
            if(!messageDB){
                res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                message: messageDB
            })
        })
    }); 
})

//===================================
//Delete a message
//===================================
app.delete('/message/delete/:id', headers, (req, res)=> {
    
    let id = req.params.id

    Message.findByIdAndDelete(id, (err, messageDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!messageDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: "This message doesn't exist"
                }
            })
        }

        res.json({
            ok: true,
            message: "Message deleted"
        })

    })
})


//===================================
//Change the status of the message
//===================================
app.put('/message/change-status/:id', headers, (req, res)=> {
    
    let id = req.params.id
    let answeredStatus = req.body.answered 
    
    Message.findByIdAndUpdate(id, {answered: answeredStatus}, (err, messageDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!messageDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: "This message doesn't exist"
                }
            })
        }

        res.json({
            ok: true,
            message: "The message changed its status"
        })

    })
})


module.exports = app;