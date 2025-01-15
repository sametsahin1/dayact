import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Analysis() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <section className='heading'>
        <h1>Analysis</h1>
        <p>Activity Analysis</p>
      </section>

      <section className='content'>
        <h3>Analysis feature is temporarily disabled</h3>
      </section>
    </>
  )
}

export default Analysis 