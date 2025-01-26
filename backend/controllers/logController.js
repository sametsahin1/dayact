const Log = require('../models/Log')
const Activity = require('../models/Activity')
const User = require('../models/User')

// Logları getir
const getLogs = async (req, res) => {
    try {
        const logs = await Log.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);

        const formattedLogs = logs.map(log => {
            let description = '';

            switch(log.action) {
                case 'create':
                    description = `Created new activity: ${log.description}`;
                    break;
                case 'delete':
                    description = `Deleted activity: ${log.description}`;
                    break;
                case 'complete':
                    description = `Completed ${log.description}${log.quantity > 1 ? ` (${log.quantity}x)` : ''}`;
                    break;
                default:
                    description = `Updated ${log.description}`;
            }

            return {
                _id: log._id,
                description,
                points: log.points,
                type: log.type,
                createdAt: log.createdAt,
                action: log.action,
                quantity: log.quantity
            };
        });

        res.json(formattedLogs);
    } catch (error) {
        console.error('Get Logs Error:', error);
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
}

// Reset all data
const resetAllData = async (req, res) => {
    try {
        await Log.deleteMany({ user: req.user.id })
        await Activity.deleteMany({ user: req.user.id })
        
        const user = await User.findById(req.user.id)
        user.totalPoints = 0
        await user.save()

        res.json({ 
            message: 'All data has been reset successfully',
            newTotalPoints: 0
        })
    } catch (error) {
        console.error('Reset All Data Error:', error);
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports = {
    getLogs,
    resetAllData
} 