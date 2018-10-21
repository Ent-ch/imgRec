const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const exifJs = require('exif-js');
const ExifImage = require('exif').ExifImage;

const app = express();
app.use(express.static('docs'));

app.post('/upload', upload.single('foto'), function (req, res, next) {
  const currFile = req.file;
  const locFile = `${currFile.destination}${currFile.filename}`;
  console.log(locFile);
  // exifJs.readFromBinaryFile(, function() {
  //   const allMetaData = exifJs.getAllTags(this);
  //   console.log(allMetaData);
  // });
  try {
    new ExifImage({ image : locFile }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData); // Do something with your data!
    });
} catch (error) {
    console.log('Error: ' + error.message);
}

})

app.listen(3000);
