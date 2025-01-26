const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    type: {
        type: String,
        enum: ['positive', 'negative'],
        required: true
    },
    action: {
        type: String,
        enum: ['create', 'delete', 'complete', 'update'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Log', logSchema); 