import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createActivity } from '../features/activities/activitySlice'

function ActivityForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    points: '',
    type: 'positive'
  })

  const { name, description, points, type } = formData
  const dispatch = useDispatch()

  const onChange = (e) => {
    console.log('Form Change:', {
      field: e.target.name,
      value: e.target.value,
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      }
    })

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !points || !type) {
      console.log('Form Validation Failed:', { 
        name: name || 'missing',
        description: description || 'missing',
        points: points || 'missing',
        type: type || 'missing'
      })
      return
    }

    const activityData = {
      name: name.trim(),
      description: description.trim(),
      points: Number(points),
      type
    }

    console.log('Submitting Activity Data:', activityData)

    try {
      const result = await dispatch(createActivity(activityData)).unwrap()
      console.log('Activity Created:', result)
      
      setFormData({
        name: '',
        description: '',
        points: '',
        type: 'positive'
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
          <label htmlFor='type'>Activity Type</label>
          <select
            name='type'
            id='type'
            value={type}
            onChange={onChange}
            required
          >
            <option value='positive'>Positive</option>
            <option value='negative'>Negative</option>
          </select>
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