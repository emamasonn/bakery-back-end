const express = require('express');
const app = express();
const Order = require('../models/order');
const { headers } = require('../milddlewares/milddelewares');

//===================================
//Get all the Order
//===================================
app.get('/order', headers, (req, res)=> {

    Order.find({})
            .exec((err, order) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }
                Order.count({}, (err, conteo) => {
                    res.json({
                        ok: true,
                        order,
                        cuanto: conteo
                    })
                })
                
            })
})


//===================================
//Show a order 
//===================================
app.get('/order/find/:id', headers, (req, res)=> {
    let id = req.params.id
    
    Order.findById({_id: id})
            .exec((err, order) => {
                if(err){
                    res.status(400).json({
                    ok: false,
                    err
                    })
                }

                if(!order){
                    res.status(400).json({
                        ok: false,
                        err: {
                            message: 'this order does not exist'
                        }
                    })
                }
                res.json({
                    ok: true,
                    order
                })
            })
})
//===================================
//Create a order
//===================================
app.post('/order', (req, res)=> {
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
        products: [{name: 'nombre del producto', priceUni: 9, quality:  2}, {name: 'nombre del producto', priceUni: 10, quality:  3}],
    })

    order.save((err, orderDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                err
            })
        }
        if(!orderDB){
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            order: orderDB
        })
    })   
})

//===================================
//Edit a product
//===================================
/*app.put('/product/:id', (req, res)=> {
    
    let id = req.params.id

    Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}, (err, productDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!productDB){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            product: productDB
        })
    })
})
*/

//===================================
//Delete a order
//===================================
app.delete('/order/delete/:id', (req, res)=> {
    
    let id = req.params.id

    Order.findByIdAndDelete(id, (err, orderDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!orderDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: "This product doesn't exist"
                }
            })
        }

        res.json({
            ok: true,
            message: "Order deleted"
        })

    })
})

//===================================
//Edit a order
//===================================
app.put('/order/edit/:id', (req, res)=> {
    
    let id = req.params.id

    Order.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}, (err, orderDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!orderDB){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            order: orderDB
        })
    })
})

module.exports = app;