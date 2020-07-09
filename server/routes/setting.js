const express = require('express');
const app = express();
const Setting = require('../models/setting');
const { headers } = require('../milddlewares/milddelewares');

//===================================
//Get all the setting
//===================================
app.get('/setting', headers, (req, res)=> {

    Setting.find({})
            .exec((err, setting) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }
                res.json({
                    ok: true,
                    setting,
                })
            })
})


//===================================
//Create a setting
//===================================
app.post('/setting', (req, res)=> {
    let body = req.body
    
    let setting = new Setting({
        name: body.name,
        linkFb: body.linkFb,
        linkIng: body.linkIng,
        directionCoordinates: body.directionCoordinates,
        direction: body.direction,
        attentionSchedule: {
            monday: '8 a 22 horas',
            tuesday: '8 a 22 horas',
            wednesday: '8 a 22 horas',
            thursday: '8 a 22 horas',
            friday: '8 a 22 horas',
            saturday: '8 a 22 horas',
            sunday: '8 a 22 horas',
        },//body.attentionSchedule, 
        telephone: body.telephone,
        email: body.email,
        notas: body.notas,
    })

    setting.save((err, settingDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                err
            })
        }
        if(!settingDB){
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            setting: settingDB
        })
    })   
})

//===================================
//Edit a setting
//===================================
app.put('/setting/edit/:id', (req, res)=> {
    
    let id = req.params.id

    Setting.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}, (err, settingDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!settingDB){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            setting: settingDB
        })
    })
})

//===================================
//Delete a setting
//===================================
app.delete('/setting/delete/:id', (req, res)=> {
    
    let id = req.params.id

    Setting.findByIdAndDelete(id, (err, settingDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!settingDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: "This store doesn't exist"
                }
            })
        }

        res.json({
            ok: true,
            message: "Store deleted"
        })

    })
})


module.exports = app;