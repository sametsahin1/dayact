import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLogs } from '../features/logs/logSlice'

const Analysis = () => {
  const [period, setPeriod] = useState('day')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const { logs } = useSelector((state) => state.logs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLogs({ period, startDate }))
  }, [dispatch, period, startDate])

  const groupedLogs = {
    positive: logs.filter(log => log.activityId?.type === 'positive'),
    negative: logs.filter(log => log.activityId?.type === 'negative')
  }

  const calculateTotal = (logs) => {
    return logs.reduce((sum, log) => {
      const points = Number(log.points) || 0
      return sum + points
    }, 0)
  }

  const totals = {
    positive: calculateTotal(groupedLogs.positive),
    negative: calculateTotal(groupedLogs.negative),
    get total() {
      return this.positive + this.negative
    }
  }

  // Tarih formatlamak için yardımcı fonksiyon
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <h2>Activity Analysis</h2>
        <div className="period-selector">
          <button 
            className={`period-btn ${period === 'day' ? 'active' : ''}`}
            onClick={() => setPeriod('day')}
          >
            Day
          </button>
          <button 
            className={`period-btn ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            Week
          </button>
          <button 
            className={`period-btn ${period === 'month' ? 'active' : ''}`}
            onClick={() => setPeriod('month')}
          >
            Month
          </button>
          <button 
            className={`period-btn ${period === 'year' ? 'active' : ''}`}
            onClick={() => setPeriod('year')}
          >
            Year
          </button>
        </div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="date-picker"
        />
      </div>

      <div className="analysis-content">
        <div className="analysis-section positive">
          <h3>Positive Activities</h3>
          {groupedLogs.positive.map(log => (
            <div key={log._id} className="activity-row">
              <span className="activity-name">{log.activityId?.name || 'Unknown Activity'}</span>
              <span className="activity-details">
                {log.quantity || 0}x ({log.points || 0} points)
              </span>
            </div>
          ))}
          <div className="section-total">
            Total Positive Points: +{totals.positive}
          </div>
        </div>

        <div className="analysis-section negative">
          <h3>Negative Activities</h3>
          {groupedLogs.negative.map(log => (
            <div key={log._id} className="activity-row">
              <span className="activity-name">{log.activityId?.name || 'Unknown Activity'}</span>
              <span className="activity-details">
                {log.quantity || 0}x ({log.points || 0} points)
              </span>
            </div>
          ))}
          <div className="section-total">
            Total Negative Points: {totals.negative}
          </div>
        </div>

        <div className="total-summary">
          <h3>Period Summary</h3>
          <div className="total-row">
            Net Points: {totals.total > 0 ? '+' : ''}{totals.total}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis 