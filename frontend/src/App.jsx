import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
  return (
    <Provider store={store}>
      <Router basename="/apps/dayact">
        <div className="app">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/analysis" element={<Analysis />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
