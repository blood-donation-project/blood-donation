const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (file) => {
    try {
        if (file) {
            const b64 = Buffer.from(file.buffer).toString('base64');
            let dataURI = 'data:' + file.mimetype + ';base64,' + b64;

            const res = await cloudinary.uploader.upload(dataURI, {
                resource_type: 'auto',
                folder: 'posts',
            });
            return res;
        }
    } catch (error) {
        console.log('Failed to upload image');
        return Promise.reject(error);
    }
};

module.exports = uploadImageCloudinary;
