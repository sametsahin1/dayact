import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLogs, resetAllData } from '../features/logs/logSlice'

const Logs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { logs, isLoading, isError, message } = useSelector((state) => state.logs)

  const [filters, setFilters] = useState({
    period: 'day', // day, week, month, year
    startDate: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    if (isError) {
      console.log(message)
    }

    dispatch(getLogs(filters))
  }, [user, navigate, isError, message, dispatch, filters])

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  const handleResetApp = () => {
    if (window.confirm('Are you sure you want to reset all activities and points? This action cannot be undone.')) {
      dispatch(resetAllData())
        .then(() => {
          dispatch({ type: 'auth/updatePoints', payload: 0 })
          window.location.reload()
        })
        .catch((error) => {
          console.error('Reset error:', error)
        })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h2>Activity History</h2>
        <button onClick={handleResetApp} className="btn-reset">
          Reset Application
        </button>
      </div>

      <div className="filter-section">
        <select
          name="period"
          value={filters.period}
          onChange={handleFilterChange}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Months</option>
          <option value="year">Year</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
      </div>

      <div className="log-list">
        {logs.map((log) => (
          <div className="log-item" key={log._id}>
            <span className="log-time">
              {new Date(log.createdAt).toLocaleString()}
            </span>
            <span className="log-description">{log.description}</span>
            {log.points && (
              <span className={`log-points ${log.points > 0 ? 'positive' : 'negative'}`}>
                {log.points > 0 ? '+' : ''}{log.points} points
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Logs 