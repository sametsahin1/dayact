const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lütfen etkinlik adı girin'],
    },
    points: {
        type: Number,
        required: [true, 'Lütfen puan değeri girin'],
    },
    type: {
        type: String,
        enum: ['positive', 'negative'],
        required: [true, 'Lütfen etkinlik tipini belirtin'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema); 