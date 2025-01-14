import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLogs, resetAllData } from '../features/logs/logSlice'
import styled from 'styled-components'

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
            // Redux store'u güncelle
            dispatch({ type: 'auth/updatePoints', payload: 0 })
            // Sayfayı yenile
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
    <LogsContainer>
      <div className="logs-header">
        <h2>Activity History</h2>
        <button onClick={handleResetApp} className="btn-reset">
          Reset Application
        </button>
      </div>
      
      <FilterSection>
        <select
          name="period"
          value={filters.period}
          onChange={handleFilterChange}
        >
          <option value="day">Günlük</option>
          <option value="week">Haftalık</option>
          <option value="month">Aylık</option>
          <option value="year">Yıllık</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
      </FilterSection>

      <LogList>
        {logs.map((log) => (
          <LogItem key={log._id}>
            <LogTime>{new Date(log.createdAt).toLocaleString()}</LogTime>
            <LogDescription>{log.description}</LogDescription>
            {log.points && (
              <LogPoints positive={log.points > 0}>
                {log.points > 0 ? '+' : ''}{log.points} puan
              </LogPoints>
            )}
          </LogItem>
        ))}
      </LogList>
    </LogsContainer>
  )
}

const LogsContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    color: var(--primary-color);
    margin-bottom: 2rem;
    text-align: center;
  }
`

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  select, input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
`

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LogItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogTime = styled.span`
  color: #666;
  font-size: 0.9rem;
  min-width: 150px;
`

const LogDescription = styled.span`
  flex: 1;
  margin: 0 1rem;
`

const LogPoints = styled.span`
  color: ${props => props.positive ? 'green' : 'red'};
  font-weight: bold;
  min-width: 80px;
  text-align: right;
`

export default Logs 