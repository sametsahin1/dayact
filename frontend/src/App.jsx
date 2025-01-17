import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Provider } from 'react-redux'
import { store } from './features/store'
import Header from './components/Header'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Activities from './pages/Activities'
import Logs from './pages/Logs'
import Analysis from './pages/Analysis'

// Styles
import './styles/main.css'

// AppRoutes component for handling routes
const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth)

  return (
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
          <Route path="/" element={<Navigate to={user ? "/activities" : "/login"} />} />
          <Route path="*" element={<Navigate to={user ? "/activities" : "/login"} />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router basename="/apps/dayact">
        <AppRoutes />
      </Router>
    </Provider>
  )
}

export default App
