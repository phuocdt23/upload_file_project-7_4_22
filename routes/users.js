const express = require('express');
const multer = require('multer');
const router = express.Router();
const {join} = require('path');
const db = require(join(__dirname, '..','data','database'));


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
router.post('/profiles', upload.single('image'), async (req,res) =>{
  const fileImage = req.file;
  const userData = req.body;
  console.log(userData);
  // console.log("------------------------req.file-------------------------", fileImage);
  // console.log("------------------------req.body-------------------------", userData);
  await db.getDb().collection('users').insertOne({
    'name': userData.username,
    'path': fileImage.path
  })
  res.redirect('/');
})

module.exports = router;