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
        console.log('Create Activity Request:', {
            body: req.body,
            user: req.user?.id
        });

        const { name, description, points, type } = req.body;

        // Validation
        if (!name || !points || !type) {
            console.log('Validation Error:', {
                missing: {
                    name: !name,
                    points: !points,
                    type: !type
                },
                received: req.body
            });
            return res.status(400).json({ 
                message: 'Please add all fields',
                missing: {
                    name: !name,
                    points: !points,
                    type: !type
                },
                received: req.body
            });
        }

        // Önce activity oluştur
        const activity = await Activity.create({
            name,
            description: description || name,
            points: Number(points),
            type,
            user: req.user.id
        });

        console.log('Activity Created:', activity);

        // Sonra log oluştur
        const log = await Log.create({
            user: req.user.id,
            points: 0,
            type: activity.type,
            action: 'create',
            description: activity.name
        });

        console.log('Log Created:', log);

        res.status(201).json(activity);
    } catch (error) {
        console.error('Create Activity Error:', {
            error: error.message,
            stack: error.stack,
            body: req.body,
            user: req.user?.id
        });
        res.status(500).json({ 
            message: 'Server Error',
            details: error.message
        });
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
        console.log('Delete Activity Request:', {
            id: req.params.id,
            user: req.user?.id
        });

        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            console.log('Activity not found:', req.params.id);
            return res.status(404).json({ message: 'Activity not found' });
        }

        if (activity.user.toString() !== req.user.id) {
            console.log('Unauthorized delete attempt:', {
                activityUser: activity.user,
                requestUser: req.user.id
            });
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Önce log oluştur
        const log = await Log.create({
            user: req.user.id,
            points: 0,
            type: activity.type,
            action: 'delete',
            description: activity.name
        });

        console.log('Delete Log Created:', log);

        // Sonra activity'yi sil
        await Activity.findByIdAndDelete(req.params.id);
        console.log('Activity Deleted:', req.params.id);

        res.json({ id: req.params.id });
    } catch (error) {
        console.error('Delete Activity Error:', {
            error: error.message,
            stack: error.stack,
            id: req.params.id,
            user: req.user?.id
        });
        res.status(500).json({ 
            message: 'Server Error',
            details: error.message
        });
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

        const { quantity = 1 } = req.body;
        const pointsToAdd = activity.type === 'positive' ? 
            activity.points * quantity : 
            -activity.points * quantity;

        // Update user points
        const user = await User.findById(req.user.id);
        user.totalPoints += pointsToAdd;
        await user.save();

        // Create log
        await Log.create({
            user: req.user.id,
            activity: activity._id,
            points: pointsToAdd,
            quantity,
            type: activity.type
        });

        res.json({ 
            activityId: activity._id,
            pointsEarned: pointsToAdd,
            newTotalPoints: user.totalPoints,
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