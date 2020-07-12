const express = require('express');
const app = express();
const Order = require('../models/order');
const nodeMailer = require('nodemailer');
const {headers} = require('../milddlewares/milddelewares');
const { user_gmail, pass_gmail } = require('../config/config');

// =================================== Get all the Order
// ===================================
app.get('/order', headers, (req, res) => {

    Order
        .find({})
        .exec((err, order) => {
            if (err) {
                res
                    .status(500)
                    .json({ok: false, err})
            }
            Order.count({}, (err, conteo) => {
                res.json({ok: true, order, cuanto: conteo})
            })

        })
})

// =================================== Show a order
// ===================================
app.get('/order/find/:id', headers, (req, res) => {
    let id = req.params.id

    Order
        .findById({_id: id})
        .exec((err, order) => {
            if (err) {
                res
                    .status(400)
                    .json({ok: false, err})
            }

            if (!order) {
                res
                    .status(400)
                    .json({
                        ok: false,
                        err: {
                            message: 'this order does not exist'
                        }
                    })
            }
            res.json({ok: true, order})
        })
})

// =================================== Create a order
// ===================================
app.post('/order', (req, res) => {
    let body = req.body

    let order = new Order({
        name: body.name,
        lastName: body.lastName,
        address: body.address,
        departament: body.departament,
        location: body.location,
        telephone: body.telephone,
        email: body.email,
        description: body.description,
        available: true,
        products: body.products
    })

    order.save((err, orderDB) => {
        if (err) {
            res
                .status(500)
                .json({ok: false, err})
        }
        if (!orderDB) {
            res
                .status(400)
                .json({ok: false, err})
        }


        let htmlProduct = ''
        body.products.forEach((product)=>{
            htmlProduct += `
            <tr>
                <td><p>${ product.name }</p></td>
                <td>$ ${ product.priceUni }</td>
                <td>${ product.quality }</td>
                <td>$ ${ product.quality * product.priceUni }</td>
            </tr>
            `
        })

        let htmlOrder = `
            <h4>Datos de tu pedido</h4>
            <p>Tu pedido a sido recibido!!</p>
            <br>
            <ul>
                <li> Nombre y apellido: ${body.name} ${body.lastName}
                products</li>
                <li>Direccion: ${ body.address }</li>
                <li>Departamento: ${ body.departament }</li>
                <li>Localidad: ${ body.location }</li>
                <li>Email: ${ body.email }</li>
                <li>Telefono: ${ body.telephone }</li>
                <li>Descripcion: ${ body.description }</li>
            </ul>
            <br>
            <h4>Productos</h4>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${ htmlProduct }
                </tbody>
            </table>
        `
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: `${ user_gmail }`,
                pass: `${ pass_gmail}`
            }
        });

        let mailOptions = {
            to: `${ user_gmail }, ${ body.email }`,
            subject: 'Pedido - Panaderia',
            html: htmlOrder
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

        res.json({ok: true, order: orderDB})
    })
})

// =================================== Delete a order
// ===================================
app.delete('/order/delete/:id', (req, res) => {

    let id = req.params.id

    Order.findByIdAndDelete(id, (err, orderDB) => {
        if (err) {
            res
                .status(400)
                .json({ok: false, err})
        }

        if (!orderDB) {
            res
                .status(400)
                .json({
                    ok: false,
                    err: {
                        message: "This product doesn't exist"
                    }
                })
        }

        res.json({ok: true, message: "Order deleted"})

    })
})

// =================================== Edit a order
// ===================================
app.put('/order/edit/:id', (req, res) => {

    let id = req.params.id

    Order.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    }, (err, orderDB) => {
        if (err) {
            res
                .status(400)
                .json({ok: false, err})
        }

        if (!orderDB) {
            res
                .status(400)
                .json({ok: false, err})
        }

        res.json({ok: true, order: orderDB})
    })
})

module.exports = app;