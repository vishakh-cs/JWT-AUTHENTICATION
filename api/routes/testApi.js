var express = require('express');
var router = express.Router();
const userController = require('../Controllers/UserController')
const adminController = require('../Controllers/AdminController')
const verifyToken = require('../middleware/Authmiddleware')
const path = require('path');
const fs = require('fs');


const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadDir = 'public/uploads';

      // Check if the directory exists, and create it if it doesn't
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Set the destination to the upload directory
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });


router.post('/profileImg', upload.single('profileImg'), userController.profileImage);

router.post('/signup',userController.SignupUser)

router.post('/login',userController.loginUser)

router.post('/logout',userController.logout)

router.post('/admin',adminController.adminLogin)


router.delete('/delete/:userId',adminController.deleteUser)

router.post('/block/:userId',adminController.blockUser)

router.post('/checkEmail', adminController.checkEmailAvailability);




module.exports = router;
