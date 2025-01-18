const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    points: {
        type: Number,
        required: [true, 'Please add points'],
        min: 0,
    },
    type: {
        type: String,
        enum: ['positive', 'negative'],
        required: [true, 'Please specify activity type'],
        default: 'positive'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema); 