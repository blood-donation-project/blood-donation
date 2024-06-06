const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        content: { type: String, require: true },
        images: [{ type: String }],
        approve: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const News = mongoose.model('News', newsSchema);

module.exports = News;
