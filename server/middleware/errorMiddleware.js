// errorMiddleware.js

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);

    const errorResponse = {
        code: statusCode,
        message: err.message || 'Đã có lỗi xảy ra',
        // errors: err.errors // Thêm errors nếu có validation error
    };

    // Ghi log lỗi (tùy chọn)
    console.error(err);

    res.json(errorResponse);
};
