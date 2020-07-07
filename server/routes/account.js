const express = require('express');
const app = express();
const Account = require('../models/account');
const { headers } = require('../milddlewares/milddelewares');

//===================================
//Get all the account
//===================================
app.get('/account', headers, (req, res)=> {

    Account.find({})
            .populate('img', 'name')
            .exec((err, account) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }
                res.json({
                    ok: true,
                    account,
                })
            })
})


//===================================
//Create a account
//===================================
app.post('/account', (req, res)=> {
    let body = req.body
    
    let account = new Account({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        telephone: body.telephone,
        img: body.img,
    })

    account.save((err, accountDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                err
            })
        }
        if(!accountDB){
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            account: accountDB
        })
    })   
})

//===================================
//Edit a account
//===================================
app.put('/account/edit/:id', (req, res)=> {
    
    let id = req.params.id

    Account.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}, (err, accountDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!accountDB){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            account: accountDB
        })
    })
})


module.exports = app;