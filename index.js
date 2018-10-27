const express = require('express');
const multer  = require('multer');
const Jimp = require('jimp');
const fs = require('fs');
const request = require('request');
const path = require('path');

const configDb = require('./knexfile.js') ;
const knex = require('knex')(configDb.production);

const uploadDir = 'uploads/';
const publicImgDir = 'docs/img/uploads/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage, fileFilter: function (req, file, cb) {
  const filetypes = /jpeg|jpg/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
}});

const { apiKey, apiSecret, PORT = 3000 } = process.env;
const extApiUrl = 'https://api.imagga.com/v1/';

const app = express();
app.use(express.static('docs'));

app.post('/upload', upload.single('foto'), function (req, res, next) {
  const currFile = req.file;
  const locFile = `${currFile.destination}${currFile.filename}`;
  const formData = {
    image: fs.createReadStream(locFile),
  };

  knex('files').insert({name: locFile}).then(newId => {
    const insertedId = newId[0];

    Jimp.read(locFile, (err, pict) => {
      if (err) throw err;

      pict.resize(300, Jimp.AUTO) // resize
        .quality(60) // set JPEG quality
        .write(`${publicImgDir}img300_${insertedId}.jpg`); // save
    });

    request.post({url:`${extApiUrl}content`, formData: formData},
      (err, response, body) => {
        if (err) throw err;

        const jBody = JSON.parse(body);
        const imagaId = jBody.uploaded && jBody.uploaded[0].id;
        knex('files').where('id', insertedId).update({'imagga_id': imagaId});
    }).auth(apiKey, apiSecret, true);
    
    res.json({insertedId});
  });
});

app.get('/image/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10);
  knex('files').where('id', id).then(data => {
    if (!data.length) {
      console.log(`not found ${id}`);
      res.status(404).send();
    }
    const imaggaId = data[0].imagga_id;

    knex('tags').where('file_id', id).then(data => {
      if (!data.length) {
        return request.get(`${extApiUrl}tagging?content=`+imaggaId, function (error, response, body) {
          res.json(JSON.parse(body));
          knex('tags').insert({ file_id: id, tags: body }).then(newId => {});
        }).auth(apiKey, apiSecret, true);    
      }

      res.json(JSON.parse(data[0].tags));
    });
  });
});

console.log(`App running on port ${PORT}`)
app.listen(PORT);
