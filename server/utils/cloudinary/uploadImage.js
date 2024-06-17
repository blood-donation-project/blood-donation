const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dyg9mjslg',
    api_key: '947927373397717',
    api_secret: '1Coo7lbrn3shr3p4IGq8b0VCvBY',
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
