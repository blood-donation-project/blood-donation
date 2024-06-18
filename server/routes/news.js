const express = require('express');
const newsController = require('../controllers/newsController');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
require('dotenv').config();

router.post('/upload-image', upload.single('image'), newsController.uploadImg);
router.post(
    '/upload-images',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'backgroundImage', maxCount: 1 },
    ]),
    newsController.uploadImages
);
router.post('/upload-news', newsController.uploadNews);

module.exports = router;
