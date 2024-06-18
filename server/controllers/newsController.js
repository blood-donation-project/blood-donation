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
            res.status(400).json({ error: 'No file provided' });
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
                        res.status(500).json({ error: error.message });
                    }
                    res.status(200).json({
                        uploaded: true,
                        url: result.secure_url,
                    });
                }
            )
        );
    },
    uploadImages: (req, res) => {
        const files = req.files;

        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const uploadedImages = {}; // Lưu trữ URL của ảnh đã tải lên

        // Hàm xử lý tải ảnh lên Cloudinary
        const uploadToCloudinary = (file, fieldName) => {
            return new Promise((resolve, reject) => {
                const bufferStream = new Readable();
                bufferStream.push(file.buffer);
                bufferStream.push(null);

                bufferStream.pipe(
                    cloudinary.uploader.upload_stream(
                        { folder: 'news_images' }, // Thư mục lưu trữ trên Cloudinary
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result.secure_url);
                            }
                        }
                    )
                );
            });
        };

        // Tải từng ảnh lên Cloudinary
        const uploadPromises = [];
        for (const fieldName in files) {
            const file = files[fieldName][0];
            uploadPromises.push(uploadToCloudinary(file, fieldName));
        }

        // Đợi tất cả ảnh tải lên xong
        Promise.all(uploadPromises)
            .then((results) => {
                for (let i = 0; i < results.length; i++) {
                    uploadedImages[Object.keys(files)[i]] = results[i];
                }
                res.status(200).json({ success: true, images: uploadedImages });
            })
            .catch((error) => {
                console.error('Error uploading images:', error);
                res.status(500).json({ error: 'Failed to upload images.' });
            });
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
