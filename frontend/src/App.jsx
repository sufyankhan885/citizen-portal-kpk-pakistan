import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import RegisterComplaint from './pages/RegisterComplaint'
import TrackComplaint from './pages/TrackComplaint'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register-complaint" element={<RegisterComplaint />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
