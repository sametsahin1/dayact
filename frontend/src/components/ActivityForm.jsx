import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createActivity } from '../features/activities/activitySlice'

function ActivityForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    points: ''
  })

  const { name, description, points } = formData
  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Log the form data before dispatch
    console.log('Form Data:', formData)

    const activityData = {
      name,
      description,
      points: Number(points)
    }

    dispatch(createActivity(activityData))
    setFormData({
      name: '',
      description: '',
      points: ''
    })
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Activity Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            value={description}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='points'>Points</label>
          <input
            type='number'
            name='points'
            id='points'
            value={points}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Activity
          </button>
        </div>
      </form>
    </section>
  )
}

export default ActivityForm 