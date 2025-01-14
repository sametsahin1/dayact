const Log = require('../models/Log')
const Activity = require('../models/Activity')
const User = require('../models/User')

// Logları getir
const getLogs = async (req, res) => {
    try {
        const { period, startDate } = req.query
        let query = { userId: req.user.id }
        
        // Tarih filtreleme
        if (startDate) {
            const start = new Date(startDate)
            const end = new Date(startDate)
            
            switch (period) {
                case 'day':
                    end.setDate(end.getDate() + 1)
                    break
                case 'week':
                    end.setDate(end.getDate() + 7)
                    break
                case 'month':
                    end.setMonth(end.getMonth() + 1)
                    break
                case 'year':
                    end.setFullYear(end.getFullYear() + 1)
                    break
            }
            
            query.createdAt = {
                $gte: start,
                $lt: end
            }
        }

        const logs = await Log.find(query)
            .sort({ createdAt: -1 })
            .populate('activityId', 'name type points')

        res.json(logs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Reset all data
const resetAllData = async (req, res) => {
    try {
        // Kullanıcının tüm loglarını sil
        await Log.deleteMany({ userId: req.user.id })
        
        // Kullanıcının tüm aktivitelerini sil
        await Activity.deleteMany({ userId: req.user.id })
        
        // Kullanıcının puanını sıfırla
        const user = await User.findById(req.user.id)
        user.totalPoints = 0
        await user.save()

        res.json({ 
            message: 'All data has been reset successfully',
            newTotalPoints: 0
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getLogs,
    resetAllData
} 