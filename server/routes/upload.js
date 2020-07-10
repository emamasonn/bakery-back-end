const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Imagen = require('../models/imagen')
const { headers } = require('../milddlewares/milddelewares');
const fs = require('fs')
const path = require('path')

app.use(fileUpload());

app.post('/upload/:tipo', headers, (req, res)=>{
    
    let tipo = req.params.tipo
    let nameImg = req.body.name
    let descriptionImg = req.body.description

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "File not found"
            }
        });
    }

    let tipoValido = ['user', 'product']
    if(tipoValido.indexOf(tipo) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The type of file is not valid'
            }
        })
    }
       
    let imgFile = req.files.imgFile;

    let extensionesValidas = ['jpg', 'png', 'gif', 'jpeg']
    let nameFile = imgFile.name.split('.')
    let extension = nameFile[nameFile.length - 1]

    if(extensionesValidas.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The extension of the file not is valid'
            }
        })
    }

    let nameFinish = `${nameImg}.${extension}`

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nameFinish}`)
    if(fs.existsSync(pathImagen)){
        Imagen.findOneAndDelete({name: nameFinish}, (err, imagen)=>{
            if(err){
                res.status(500).json({
                    ok: false,
                    err
                })
            }
        })
        fs.unlinkSync(pathImagen)
    }

    imgFile.mv(`uploads/${tipo}/${nameFinish}`, (err) => {
        if (err)
          return res.status(500).json({
                ok: false,
                err
          });

        let imagen = new Imagen({
            name: nameFinish,
            description: descriptionImg,
            extension: extension,
        })
        
        imagen.save((err, imagenDB)=>{
            if(err){
                res.status(500).json({
                    ok: false,
                    err
                })
            }
            if(!imagenDB){
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                imagen: imagenDB
            })
        })
    });
});

module.exports = app;