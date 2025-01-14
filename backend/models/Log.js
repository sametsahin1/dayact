const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    action: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete', 'complete']
    },
    points: Number,
    quantity: Number,
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Log', logSchema); 