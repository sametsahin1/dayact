import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
      <Router>
        <div className="app">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Activities />} />
                <Route path="/complete" element={<CompleteActivity />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/analysis" element={<Analysis />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
