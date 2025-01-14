import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getActivities, createActivity, deleteActivity } from '../features/activities/activitySlice'

const Activities = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { activities, isLoading, isError, message } = useSelector(
    (state) => state.activities
  )

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    if (isError) {
      console.log(message)
    }

    dispatch(getActivities())
  }, [user, navigate, isError, message, dispatch])

  const handleSubmit = (e, type) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const activityData = {
      name: formData.get('name'),
      points: Number(formData.get('points')),
      type
    }
    dispatch(createActivity(activityData))
    e.target.reset()
  }

  const handleDelete = (id) => {
    dispatch(deleteActivity(id))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="activities-container">
      <div className="activities-columns">
        <div className="activity-column">
          <h2>Negative Activities</h2>
          <div className="activity-list">
            {activities
              .filter((activity) => activity.type === 'negative')
              .map((activity) => (
                <div className="activity-item" key={activity._id}>
                  <div className="activity-content">
                    <span>{activity.name}</span>
                    <span>{activity.points} points</span>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(activity._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <form className="activity-form" onSubmit={(e) => handleSubmit(e, 'negative')}>
            <input type="text" name="name" placeholder="Activity Name" required />
            <input
              type="number"
              name="points"
              placeholder="Points Value"
              required
            />
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="activity-column">
          <h2>Positive Activities</h2>
          <div className="activity-list">
            {activities
              .filter((activity) => activity.type === 'positive')
              .map((activity) => (
                <div className="activity-item" key={activity._id}>
                  <div className="activity-content">
                    <span>{activity.name}</span>
                    <span>{activity.points} points</span>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(activity._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <form className="activity-form" onSubmit={(e) => handleSubmit(e, 'positive')}>
            <input type="text" name="name" placeholder="Activity Name" required />
            <input
              type="number"
              name="points"
              placeholder="Points Value"
              required
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Activities 