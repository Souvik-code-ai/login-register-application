import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './routes/ProtectedRoutes'

function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route
        path='/'
        element={token ? <Navigate to='/home' /> : <LoginPage />}
      />

      <Route path='/register' element={<RegisterPage />} />

      <Route
        path='/home'
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App