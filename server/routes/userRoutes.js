const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post('/', upload.array('images', 10), createUser);
router.get('/', verifyToken, getAllUsers);

module.exports = router;
