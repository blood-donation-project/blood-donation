import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dyg9mjslg',
    api_key: '947927373397717',
    api_secret: '1Coo7lbrn3shr3p4IGq8b0VCvBY',
});

const handleDeleteImage = async (file) => {
    try {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.log('Xóa hình ảnh thất bại:', error);
            } else {
                console.log('Kết quả xóa hình ảnh:', result);
            }
        });
    } catch (error) {
        console.log('Failed to upload image');
        return Promise.reject(error);
    }
};

export default handleDeleteImage;
