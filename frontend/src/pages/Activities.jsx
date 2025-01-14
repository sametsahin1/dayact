import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getActivities, createActivity, deleteActivity } from '../features/activities/activitySlice'
import styled from 'styled-components'

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

  return (
    <ActivitiesContainer>
      <Column>
        <h2>Negatif Etkinlikler</h2>
        <ActivityList>
          {activities
            .filter((activity) => activity.type === 'negative')
            .map((activity) => (
              <ActivityItem key={activity._id}>
                <ActivityContent>
                  <span>{activity.name}</span>
                  <span>{activity.points} puan</span>
                </ActivityContent>
                <DeleteButton onClick={() => handleDelete(activity._id)}>
                  Sil
                </DeleteButton>
              </ActivityItem>
            ))}
        </ActivityList>
        <ActivityForm onSubmit={(e) => handleSubmit(e, 'negative')}>
          <input type="text" name="name" placeholder="Etkinlik Adı" required />
          <input
            type="number"
            name="points"
            placeholder="Puan Değeri"
            required
          />
          <button type="submit">Ekle</button>
        </ActivityForm>
      </Column>

      <Column>
        <h2>Pozitif Etkinlikler</h2>
        <ActivityList>
          {activities
            .filter((activity) => activity.type === 'positive')
            .map((activity) => (
              <ActivityItem key={activity._id}>
                <ActivityContent>
                  <span>{activity.name}</span>
                  <span>{activity.points} puan</span>
                </ActivityContent>
                <DeleteButton onClick={() => handleDelete(activity._id)}>
                  Sil
                </DeleteButton>
              </ActivityItem>
            ))}
        </ActivityList>
        <ActivityForm onSubmit={(e) => handleSubmit(e, 'positive')}>
          <input type="text" name="name" placeholder="Etkinlik Adı" required />
          <input
            type="number"
            name="points"
            placeholder="Puan Değeri"
            required
          />
          <button type="submit">Ekle</button>
        </ActivityForm>
      </Column>
    </ActivitiesContainer>
  )
}

const ActivitiesContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`

const Column = styled.div`
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }
`

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--background-color);
  border-radius: 5px;
`

const ActivityContent = styled.div`
  display: flex;
  gap: 1rem;
`

const ActivityForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`

const DeleteButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

export default Activities 