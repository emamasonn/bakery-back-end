const express = require('express');
const app = express();
const Product = require('../models/product');
const { headers } = require('../milddlewares/milddelewares');

//===================================
//Get all the products
//===================================
app.get('/product', headers, (req, res)=> {
    let begin = Number(req.query.desde) || 0
    let end = Number(req.query.limite) || 15

    Product.find({})
            .skip(begin)
            .limit(end)
            .populate('img', 'name')
            .exec((err, product) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }
                Product.count({}, (err, conteo) => {
                    res.json({
                        ok: true,
                        product,
                        cuanto: conteo
                    })
                })
                
            })
})


//===================================
//Show a product 
//===================================
app.get('/product/:id', headers, (req, res)=> {
    let id = req.params.id

    Product.findById({_id: id})
            .populate('img', 'name')
            .exec((err, product) => {
                if(err){
                    res.status(400).json({
                    ok: false,
                    err
                    })
                }

                if(!product){
                    res.status(400).json({
                        ok: false,
                        err: {
                            message: 'this product does not exist'
                        }
                    })
                }
                res.json({
                    ok: true,
                    product: product
                })
            })
})
//===================================
//Search a product
//===================================
app.get('/product/search/:termino', headers, (req, res)=>{
    
    let termino = req.params.termino
    let regex = new RegExp(termino, 'i')
    
    Product.find({name: regex})
        .populate('img', 'name')
        .exec((err, product)=>{
            if(err){
                res.status(400).json({
                ok: false,
                err
                })
            }
            res.json({
                ok: true,
                product  
            })
        })
})


//===================================
//Create a product
//===================================
app.post('/product', headers, (req, res)=> {
    let body = req.body
    
    let product = new Product({
        name: body.name,
        priceUni: body.priceUni,
        description: body.description,
        available: body.available,
        category: body.category,
        img: body.imagen,
    })

    product.save((err, productDB)=>{
        if(err){
            res.status(500).json({
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

//===================================
//Edit a product
//===================================
app.put('/product/:id', headers, (req, res)=> {
    
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

//===================================
//Delete a product
//===================================
app.delete('/product/:id', headers, (req, res)=> {
    
    let id = req.params.id

    Product.findByIdAndUpdate(id, {available: false}, (err, productDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!productDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: "This product doesn't exist"
                }
            })
        }

        res.json({
            ok: true,
            message: "Product deleted"
        })

    })
})

//===================================
//Show products for categories
//===================================
app.get('/product/find/:category', headers, (req, res)=> {
    let category = req.params.category
    Product.find({category: category})
            .populate('img', 'name')
            .exec((err, product) => {
                if(err){
                    res.status(400).json({
                    ok: false,
                    err
                    })
                }

                if(!product){
                    res.status(400).json({
                        ok: false,
                        err: {
                            message: 'This product does not exist'
                        }
                    })
                }
                res.json({
                    ok: true,
                    product
                })
            })
})

module.exports = app;