const Activity = require('../models/activityModel');

// Get activities
const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ user: req.user.id });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create activity
const createActivity = async (req, res) => {
    try {
        const activity = await Activity.create({
            user: req.user.id,
            name: req.body.name,
            points: req.body.points,
            type: req.body.type
        });
        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete activity
const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        if (activity.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await activity.remove();
        res.json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getActivities,
    createActivity,
    deleteActivity
}; 