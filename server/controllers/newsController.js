const News = require('../models/News');
const { v2: cloudinary } = require('cloudinary');
const { Readable } = require('stream');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const newsController = {
    uploadImg: (req, res) => {
        const file = req.file;
        console.log('Req body ', req.file);
        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }
        const bufferStream = new Readable();
        bufferStream.push(file.buffer);
        console.log(bufferStream);
        bufferStream.push(null);

        bufferStream.pipe(
            cloudinary.uploader.upload_stream(
                { folder: 'news_images' },
                (error, result) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    res.status(200).json({
                        uploaded: true,
                        url: result.secure_url,
                    });
                }
            )
        );
    },
    uploadNews: async (req, res) => {
        const { title, content, images } = req.body;
        try {
            const news = new News({
                title,
                content,
                images,
            });
            await news.save();

            res.status(200).json({
                message: 'News saved successfully',
                news: news,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = newsController;
