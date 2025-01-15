import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function Logs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <section className='heading'>
        <h1>Logs</h1>
        <p>Your activity logs</p>
      </section>

      <section className='content'>
        <h3>Logs feature is temporarily disabled</h3>
      </section>
    </>
  )
}

export default Logs 