const multer = require("multer");

const uploadSingleImage = (path) => {
    return multer({
        storage: multer.memoryStorage(),
        fileFilter: function (req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Only image files are allowed!'));
            }
            cb(null, true);
        },
    });
};

module.exports =  uploadSingleImage;
