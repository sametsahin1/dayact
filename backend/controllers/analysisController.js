const Log = require('../models/Log');

const getAnalysis = async (req, res) => {
    try {
        const { period = 'day' } = req.query;
        let dateFilter = {};

        switch(period) {
            case 'week':
                dateFilter = { 
                    createdAt: { 
                        $gte: new Date(new Date().setDate(new Date().getDate() - 7))
                    }
                };
                break;
            case 'month':
                dateFilter = {
                    createdAt: {
                        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                    }
                };
                break;
            case 'year':
                dateFilter = {
                    createdAt: {
                        $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                    }
                };
                break;
            default: // day
                dateFilter = {
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                };
        }

        const logs = await Log.find({
            user: req.user.id,
            ...dateFilter
        })
        .populate('activity')
        .sort({ createdAt: -1 });

        // Analiz verilerini hesapla
        const analysis = {
            positive: {
                total: 0,
                activities: {}
            },
            negative: {
                total: 0,
                activities: {}
            }
        };

        logs.forEach(log => {
            const type = log.activity.type;
            const name = log.activity.name;
            const points = log.points;

            analysis[type].total += points;
            
            if (!analysis[type].activities[name]) {
                analysis[type].activities[name] = {
                    count: 0,
                    points: 0
                };
            }
            
            analysis[type].activities[name].count++;
            analysis[type].activities[name].points += points;
        });

        res.json(analysis);
    } catch (error) {
        console.error('Get Analysis Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAnalysis
}; 