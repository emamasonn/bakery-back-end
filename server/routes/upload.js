const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs')
const path = require('path')
app.use(fileUpload());

//api para cargar la imagen post

//api para obtener la lista de imagenes get

//api para modificar la imagen

//api para eliminar una imagen

app.post('/upload', (req, res)=>{
    
    let tipo = req.params.tipo
    let id = req.params.id

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "El archivo no pudo ser cargado"
            }
        });
    }
       
    let archivo = req.files.archivo;

    let extensionesValidas = ['jpg', 'png', 'gif', 'jpeg']
    let nombreArchivo = archivo.name.split('.')
    let extension = nombreArchivo[nombreArchivo.length - 1]

    if(extensionesValidas.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La extension no es valida'
            }
        })
    }

    let nombreFinal = `${id}-${new Date().getMilliseconds()}.${extension}`

    archivo.mv(`uploads/${nombreFinal}`, (err) => {
        if (err)
          return res.status(500).json({
                ok: false,
                err
          });

        //imagenProducto(id, res, nombreFinal)  
        
    });
});

/*function borrarImagen(nombreImagen, tipo){
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`)
    if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen)
    }
}*/
module.exports = app;