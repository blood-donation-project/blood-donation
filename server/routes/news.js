const express = require('express');
const newsController = require('../controllers/newsController');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
require('dotenv').config();

router.post('/upload-image', upload.single('upload'), newsController.uploadImg);
router.post('/upload-news', newsController.uploadNews);

module.exports = router;
