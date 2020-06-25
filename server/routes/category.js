const express = require('express')
const app = express()
const Category = require('../models/category')

//===================================
//Get all the categories
//===================================
app.get('/category', (req, res)=> {
    
    Category.find({})
    .sort('name')
    .exec((err, categories) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categories,
            })
        })
})


//===================================
//Show a category
//===================================
app.get('/category/:id', (req, res)=> {
    let id = req.params.id
    Category.findById(id, (err, category) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!category){
            res.status(400).json({
                ok: false,
                err: {
                    message: 'There is no category'
                }
            })
        }
        res.json({
          ok: true,
          category  
        })
    })
})

//===================================
//Create a category
//===================================
app.post('/category', (req, res)=> {
    let body = req.body
    
    let category = new Category({
        name: body.name,
        description: body.description,
    })

    category.save((err, categoryDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                err
            })
        }
        if(!categoryDB){
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            category: categoryDB
        })
    })
})

//===================================
//Edit a category
//===================================
app.put('/category/:id', (req, res)=> {
    
    let id = req.params.id
    
    let dataCategory = {
        name: req.body.name,
        description: req.body.description,
    } 

    Category.findByIdAndUpdate(id, dataCategory, {new: true, runValidators: true}, (err, categoryDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!categoryDB){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: categoryDB
        })
    })
})

//===================================
//Delete a category
//===================================
app.delete('/category/:id', (req, res)=> {
    
    let id = req.params.id
    Category.findByIdAndRemove(id, (err, categoryDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!categoryDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: "This id does not exist"
                }
            })
        }

        res.json({
            ok: true,
            message: "this category was successfully deleted"
        })

    })

})


module.exports = app;