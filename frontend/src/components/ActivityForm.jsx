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

  const onSubmit = async (e) => {
    e.preventDefault()

    // Form validation
    if (!name || !description || !points) {
      console.log('Missing fields:', { name, description, points })
      return
    }

    // Log the form data before dispatch
    console.log('Submitting Form Data:', {
      name,
      description,
      points: Number(points)
    })

    const activityData = {
      name,
      description,
      points: Number(points)
    }

    try {
      await dispatch(createActivity(activityData)).unwrap()
      // Clear form on success
      setFormData({
        name: '',
        description: '',
        points: ''
      })
    } catch (error) {
      console.error('Failed to create activity:', error)
    }
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
            placeholder='Enter activity name'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            value={description}
            onChange={onChange}
            placeholder='Enter activity description'
            required
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
            placeholder='Enter points value'
            min="0"
            required
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