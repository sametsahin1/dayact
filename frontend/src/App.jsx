import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Provider } from 'react-redux'
import { store } from './features/store'
import Header from './components/Header'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Activities from './pages/Activities'
import CompleteActivity from './pages/CompleteActivity'
import Logs from './pages/Logs'
import Analysis from './pages/Analysis'
import PrivateRoute from './components/PrivateRoute'

// Styles
import './styles/main.css'

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <Provider store={store}>
      <Router basename="/apps/dayact">
        <div className="app">
          <Header />
          <div className="container">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/activities" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/activities" />} />

              {/* Protected Routes */}
              <Route path="/activities" element={user ? <Activities /> : <Navigate to="/login" />} />
              <Route path="/logs" element={user ? <Logs /> : <Navigate to="/login" />} />
              <Route path="/analysis" element={user ? <Analysis /> : <Navigate to="/login" />} />

              {/* Default Route */}
              <Route path="*" element={<Navigate to={user ? "/activities" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
