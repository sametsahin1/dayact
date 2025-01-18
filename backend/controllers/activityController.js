const Activity = require('../models/Activity');
const User = require('../models/User');
const Log = require('../models/Log');

// Etkinlikleri getir
const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ user: req.user.id });
        res.json(activities);
    } catch (error) {
        console.error('Get Activities Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Etkinlik oluştur
const createActivity = async (req, res) => {
    try {
        console.log('Create Activity Request:', req.body);
        const { name, description, points } = req.body;

        if (!name || !description || !points) {
            console.log('Missing fields:', { name, description, points });
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const activity = await Activity.create({
            name,
            description,
            points,
            user: req.user.id
        });

        console.log('Activity created:', activity);
        res.status(201).json(activity);
    } catch (error) {
        console.error('Create Activity Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Etkinlik güncelle
const updateActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({ message: 'Etkinlik bulunamadı' });
        }

        // Etkinliğin sahibi olduğunu kontrol et
        if (activity.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Yetkiniz yok' });
        }

        const updatedActivity = await Activity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // Log oluştur
        await Log.create({
            userId: req.user.id,
            activityId: activity._id,
            action: 'update',
            description: `${activity.name} etkinliği güncellendi`,
        });

        res.json(updatedActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Etkinlik sil
const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        // Check for user
        if (activity.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await activity.remove();

        // Log oluştur
        await Log.create({
            userId: req.user.id,
            activityId: activity._id,
            action: 'delete',
            description: `${activity.name} etkinliği silindi`,
        });

        res.json({ id: req.params.id });
    } catch (error) {
        console.error('Delete Activity Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Etkinlik gerçekleştir
const completeActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        // Check for user
        if (activity.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { quantity } = req.body;
        const earnedPoints = activity.points * quantity;

        res.json({ 
            activityId: req.params.id,
            earnedPoints,
            quantity
        });
    } catch (error) {
        console.error('Complete Activity Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    completeActivity,
}; 