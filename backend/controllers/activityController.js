const Activity = require('../models/Activity');
const User = require('../models/User');
const Log = require('../models/Log');

// Etkinlikleri getir
const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.id });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Etkinlik oluştur
const createActivity = async (req, res) => {
    try {
        const { name, points, type } = req.body;

        if (!name || !points || !type) {
            return res.status(400).json({ message: 'Lütfen tüm alanları doldurun' });
        }

        const activity = await Activity.create({
            name,
            points,
            type,
            userId: req.user.id,
        });

        // Log oluştur
        await Log.create({
            userId: req.user.id,
            activityId: activity._id,
            action: 'create',
            description: `${name} etkinliği oluşturuldu`,
        });

        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
            return res.status(404).json({ message: 'Etkinlik bulunamadı' });
        }

        if (activity.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Yetkiniz yok' });
        }

        await activity.deleteOne();

        // Log oluştur
        await Log.create({
            userId: req.user.id,
            activityId: activity._id,
            action: 'delete',
            description: `${activity.name} etkinliği silindi`,
        });

        res.json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Etkinlik gerçekleştir
const completeActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id)
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' })
        }

        const { quantity = 1 } = req.body
        
        // Puan hesaplama
        const pointChange = activity.type === 'positive' 
            ? activity.points * quantity 
            : -(activity.points * quantity)

        // Kullanıcı puanını güncelle
        const user = await User.findById(req.user.id)
        user.totalPoints = (user.totalPoints || 0) + pointChange
        await user.save()

        // Log oluştur
        await Log.create({
            userId: req.user.id,
            activityId: activity._id,
            action: 'complete',
            points: pointChange,
            quantity,
            description: `${activity.name} completed ${quantity} times (${pointChange} points)`
        })

        res.json({
            message: 'Activity completed successfully',
            newTotalPoints: user.totalPoints,
            pointChange
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    completeActivity,
}; 