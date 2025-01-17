import { useState } from 'react'
import { useSelector } from 'react-redux'

const Analysis = () => {
  const [period, setPeriod] = useState('day')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const logs = [] // Geçici olarak boş array

  const totals = {
    positive: 0,
    negative: 0,
    get total() {
      return this.positive + this.negative
    }
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
          <div className="section-total">
            Total Positive Points: +{totals.positive}
          </div>
        </div>

        <div className="analysis-section negative">
          <h3>Negative Activities</h3>
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