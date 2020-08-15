const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const Imagen = require('../models/imagen');
const { headers } = require('../milddlewares/milddelewares');

app.get('/imagen/:img', headers, (req, res) => {
  let img = req.params.img;

  let pathImagen = path.resolve(__dirname, `../../uploads/${img}`);
  if (fs.existsSync(pathImagen)) {
    res.sendFile(pathImagen);
  } else {
    let noImagenPath = path.resolve(__dirname, '../assets/imgnofound.png');
    res.sendFile(noImagenPath);
  }
});

app.get('/imagen/product', headers, (req, res) => {
  Imagen.find({}).exec((err, images) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    }
    Imagen.count({}, (err, conteo) => {
      res.json({
        ok: true,
        images,
        quality: conteo,
      });
    });
  });
});

app.put('/imagen/product/:name', (req, res) => {
  let nameImg = req.params.name;
  let name = req.body.name;
  let description = req.body.description;

  let nameFile = nameImg.split('.');
  let extension = nameFile[nameFile.length - 1];

  let dataNew = {
    name: `${name}.${extension}`,
    description,
  };

  let pathImagen = path.resolve(__dirname, `../../uploads/product/${nameImg}`);

  if (fs.existsSync(pathImagen)) {
    Imagen.findOneAndUpdate({ name: nameImg }, dataNew, (err, imagenDB) => {
      if (err) {
        res.status(400).json({
          ok: false,
          err,
        });
      }
      if (!imagenDB) {
        res.status(400).json({
          ok: false,
          err,
        });
      }

      let pathNew = path.resolve(
        __dirname,
        `../../uploads/product/${name + '.' + imagenDB.extension}`
      );
      fs.renameSync(pathImagen, pathNew);

      res.json({
        ok: true,
        imagen: imagenDB,
      });
    });
  } else {
    res.json({
      ok: false,
      messagge: 'The path is not valid',
    });
  }
});

app.delete('/imagen/:name', headers, (req, res) => {
  let name = req.params.name;

  let pathImagen = path.resolve(__dirname, `../../uploads/product/${name}`);
  if (fs.existsSync(pathImagen)) {
    Imagen.findOneAndDelete({ name }, (err, imagen) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
        });
      }
      fs.unlinkSync(pathImagen);
      res.json({
        ok: true,
        messagge: 'The image is deleted',
        imagen,
      });
    });
  } else {
    res.json({
      ok: false,
      messagge: 'The image was not found',
    });
  }
});

module.exports = app;
