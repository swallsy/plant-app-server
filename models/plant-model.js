const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Plant = new Schema(
    {
        name: { type: String, required: true },
        window: { type: String, required: true },
        light: { type: String, required: true },
        watered: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('plants', Plant);