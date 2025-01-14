import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const totalPoints = user?.totalPoints ?? 0

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">Activity Tracker</Link>
        {user && (
          <span className="total-points">
            Total Points: {totalPoints}
          </span>
        )}
      </div>

      <button 
        className={`mobile-menu-btn ${isMenuOpen ? 'mobile-menu-open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="mobile-menu-icon"></span>
      </button>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <Link to="/" className="nav-link" onClick={closeMenu}>Activities</Link>
            <Link to="/complete" className="nav-link" onClick={closeMenu}>Complete Activity</Link>
            <Link to="/logs" className="nav-link" onClick={closeMenu}>History</Link>
            <Link to="/analysis" className="nav-link" onClick={closeMenu}>Analysis</Link>
            <button onClick={() => { onLogout(); closeMenu(); }} className="nav-link btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="nav-link" onClick={closeMenu}>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header 