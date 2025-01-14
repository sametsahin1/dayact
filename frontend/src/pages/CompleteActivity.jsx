import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getActivities } from '../features/activities/activitySlice'
import { completeActivity } from '../features/activities/activitySlice'

const CompleteActivity = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { activities, isLoading } = useSelector((state) => state.activities)

  const [formData, setFormData] = useState({
    activityType: '',
    activityId: '',
    quantity: 1,
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    dispatch(getActivities())
  }, [user, navigate, dispatch])

  const filteredActivities = activities.filter(
    (activity) => activity.type === formData.activityType
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.activityId && formData.quantity) {
      dispatch(completeActivity({
        id: formData.activityId,
        quantity: Number(formData.quantity)
      }))
      setFormData({
        activityType: '',
        activityId: '',
        quantity: 1,
      })
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      // Eğer tip değişirse, seçili aktiviteyi sıfırla
      ...(e.target.name === 'activityType' ? { activityId: '' } : {})
    }))
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="complete-container">
      <h2>Etkinlik Gerçekleştir</h2>
      <form onSubmit={handleSubmit} className="complete-form">
        <div className="form-group">
          <label>Etkinlik Tipi:</label>
          <select
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            required
          >
            <option value="">Seçiniz</option>
            <option value="positive">Pozitif Etkinlik</option>
            <option value="negative">Negatif Etkinlik</option>
          </select>
        </div>

        {formData.activityType && (
          <div className="form-group">
            <label>Etkinlik:</label>
            <select
              name="activityId"
              value={formData.activityId}
              onChange={handleChange}
              required
            >
              <option value="">Seçiniz</option>
              {filteredActivities.map((activity) => (
                <option key={activity._id} value={activity._id}>
                  {activity.name} ({activity.points} puan)
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.activityId && (
          <div className="form-group">
            <label>Miktar:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        )}

        {formData.activityId && (
          <button type="submit" className="btn">
            Tamamla
          </button>
        )}
      </form>
    </div>
  )
}

export default CompleteActivity 