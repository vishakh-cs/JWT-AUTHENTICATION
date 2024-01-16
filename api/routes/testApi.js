var express = require('express');
var router = express.Router();
const userController = require('../Controllers/UserController')



const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

router.post('/profileImg', upload.single('profileImg'), userController.profileImage);

router.post('/signup',userController.SignupUser)

router.post('/login',userController.loginUser)


module.exports = router;
