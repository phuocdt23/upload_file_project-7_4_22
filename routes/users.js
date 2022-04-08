const express = require('express');
const multer = require('multer');
const router = express.Router();

const diskStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'images');
  } ,
  filename: function(req, file, cb){
    console.log(file);
    cb(null, Date.now() + file.originalname);
  }
})
const upload = multer({ storage: diskStorage});

router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});
router.post('/profiles', upload.single('image'), (req,res) =>{
  const fileImage = req.file;
  const userData = req.body;
  console.log("fileImage-----------------");
  console.log(fileImage);
  console.log("userData-----------------");
  console.log(userData);
  res.redirect('/');
})

module.exports = router;